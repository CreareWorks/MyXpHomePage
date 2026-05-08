import { NextRequest, NextResponse } from 'next/server';
import { parse } from 'node-html-parser';

const BLOCKED_HOSTNAMES = new Set(['localhost', '0.0.0.0']);

function isBlockedHost(hostname: string): boolean {
    if (BLOCKED_HOSTNAMES.has(hostname)) return true;
    if (hostname === '127.0.0.1' || hostname.startsWith('127.')) return true;
    if (hostname === '::1' || hostname === '[::1]') return true;
    if (hostname === '169.254.169.254') return true;

    const parts = hostname.split('.').map(Number);
    if (parts.length === 4 && parts.every((p) => !isNaN(p) && p >= 0 && p <= 255)) {
        const [a, b] = parts as [number, number, number, number];
        if (a === 10) return true;
        if (a === 172 && b >= 16 && b <= 31) return true;
        if (a === 192 && b === 168) return true;
    }

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
        });
        clearTimeout(timeoutId);

        if (!response.ok) {
            throw new Error(`Failed to fetch: ${response.statusText}`);
        }

        const html = await response.text();
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
