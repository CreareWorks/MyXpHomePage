import { NextRequest, NextResponse } from 'next/server';
import { parse } from 'node-html-parser';

const MAX_RESPONSE_SIZE = 2 * 1024 * 1024; // 2MB

const BLOCKED_HOSTNAMES = new Set(['localhost', '0.0.0.0']);

function isBlockedIPv4(hostname: string): boolean {
    const parts = hostname.split('.').map(Number);
    if (parts.length !== 4 || !parts.every((p) => !isNaN(p) && p >= 0 && p <= 255)) return false;
    const [a, b] = parts as [number, number, number, number];
    if (a === 10) return true;
    if (a === 172 && b >= 16 && b <= 31) return true;
    if (a === 192 && b === 168) return true;
    if (a === 127) return true;
    if (a === 169 && b === 254) return true;
    return false;
}

function isBlockedHost(hostname: string): boolean {
    if (BLOCKED_HOSTNAMES.has(hostname)) return true;

    // IPv4
    if (isBlockedIPv4(hostname)) return true;

    // IPv4-mapped IPv6 (::ffff:192.168.x.x)
    const ipv4Mapped = hostname.match(/^(?:\[?::ffff:)([0-9.]+)\]?$/i);
    if (ipv4Mapped && ipv4Mapped[1] && isBlockedIPv4(ipv4Mapped[1])) return true;

    // IPv6 loopback
    const bare = hostname.replace(/^\[/, '').replace(/\]$/, '');
    if (bare === '::1') return true;

    // IPv6 link-local (fe80::/10)
    if (/^fe[89ab]/i.test(bare)) return true;

    // IPv6 unique local (fc00::/7)
    if (/^f[cd]/i.test(bare)) return true;

    return false;
}

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const url = searchParams.get('url');

    if (!url) {
        return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    let parsedUrl: URL;
    try {
        parsedUrl = new URL(url);
    } catch {
        return NextResponse.json({ error: 'Invalid URL format' }, { status: 400 });
    }

    if (parsedUrl.protocol !== 'http:' && parsedUrl.protocol !== 'https:') {
        return NextResponse.json({ error: 'Invalid URL protocol' }, { status: 400 });
    }

    if (isBlockedHost(parsedUrl.hostname)) {
        return NextResponse.json({ error: 'Invalid URL' }, { status: 400 });
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    try {
        const response = await fetch(parsedUrl.toString(), {
            headers: {
                'User-Agent': 'AntigravityLinkPreview/1.0',
            },
            signal: controller.signal,
            redirect: 'manual',
        });
        clearTimeout(timeoutId);

        // リダイレクトをブロック（SSRF 対策）
        if (response.status >= 300 && response.status < 400) {
            return NextResponse.json({ error: 'Redirects are not allowed' }, { status: 400 });
        }

        if (!response.ok) {
            throw new Error(`Failed to fetch: ${response.statusText}`);
        }

        // Content-Type チェック
        const contentType = response.headers.get('content-type') ?? '';
        if (!contentType.includes('text/html')) {
            return NextResponse.json({ error: 'Non-HTML response' }, { status: 400 });
        }

        // Content-Length が大きすぎる場合は弾く
        const contentLength = response.headers.get('content-length');
        if (contentLength && parseInt(contentLength) > MAX_RESPONSE_SIZE) {
            return NextResponse.json({ error: 'Response too large' }, { status: 400 });
        }

        // ストリームで読み取りつつサイズ上限を守る
        const reader = response.body?.getReader();
        if (!reader) throw new Error('No response body');
        let totalSize = 0;
        const chunks: Uint8Array[] = [];
        while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            totalSize += value.byteLength;
            if (totalSize > MAX_RESPONSE_SIZE) {
                await reader.cancel();
                return NextResponse.json({ error: 'Response too large' }, { status: 400 });
            }
            chunks.push(value);
        }
        const html = new TextDecoder().decode(
            chunks.reduce((acc, chunk) => {
                const merged = new Uint8Array(acc.length + chunk.length);
                merged.set(acc, 0);
                merged.set(chunk, acc.length);
                return merged;
            }, new Uint8Array(0))
        );
        const root = parse(html);

        const getMeta = (name: string) => {
            return (
                root.querySelector(`meta[property="${name}"]`)?.getAttribute('content') ||
                root.querySelector(`meta[name="${name}"]`)?.getAttribute('content') ||
                ''
            );
        };

        const title = getMeta('og:title') || root.querySelector('title')?.innerText || '';
        const description = getMeta('og:description') || getMeta('description') || '';
        let image = getMeta('og:image') || '';
        const siteName = getMeta('og:site_name') || '';

        // 画像URLが相対パスの場合、絶対パスに変換
        if (image && !image.startsWith('http')) {
            const baseUrl = new URL(url);
            image = new URL(image, baseUrl.origin).toString();
        }

        // ファビコンの取得
        let favicon = root.querySelector('link[rel="icon"]')?.getAttribute('href') ||
            root.querySelector('link[rel="shortcut icon"]')?.getAttribute('href') ||
            '';

        if (favicon && !favicon.startsWith('http')) {
            const baseUrl = new URL(url);
            favicon = new URL(favicon, baseUrl.origin).toString();
        }

        return NextResponse.json({
            title,
            description,
            image,
            siteName,
            favicon,
            url
        });
    } catch (error) {
        console.error('OGP Error:', error);
        return NextResponse.json({ error: 'Failed to fetch metadata' }, { status: 500 });
    }
}
