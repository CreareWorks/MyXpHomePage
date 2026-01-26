import { NextRequest, NextResponse } from 'next/server';
import { parse } from 'node-html-parser';

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const url = searchParams.get('url');

    if (!url) {
        return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    try {
        const response = await fetch(url, {
            headers: {
                'User-Agent': 'AntigravityLinkPreview/1.0',
            },
        });

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
