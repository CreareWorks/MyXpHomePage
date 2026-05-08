import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const BOT_USER_AGENTS = /googlebot|bingbot|yandexbot|duckduckbot|slurp|baiduspider|ia_archiver|twitterbot|facebookexternalhit|facebot|linkedinbot|embedly|pinterest|slackbot|vkShare|outbrain|W3C_Validator/i;

export function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const userAgent = request.headers.get('user-agent') || '';

    const isBot = BOT_USER_AGENTS.test(userAgent);

    // /blog/[slug] へのアクセスを傍受
    if (pathname.startsWith('/blog/')) {
        const slug = pathname.replace('/blog/', '');

        // クローラーの場合はそのままSSRページを見せる
        if (isBot) {
            return NextResponse.next();
        }

        // 人間のブラウザアクセスの場合は、デスクトップUIへリダイレクト
        const url = request.nextUrl.clone();
        url.pathname = '/';
        url.searchParams.set('app', 'blog');
        url.searchParams.set('slug', slug);
        return NextResponse.redirect(url);
    }

    // /portfolio/[id] へのアクセスを傍受
    if (pathname.startsWith('/portfolio/')) {
        const id = pathname.replace('/portfolio/', '');

        if (isBot) {
            return NextResponse.next();
        }

        const url = request.nextUrl.clone();
        url.pathname = '/';
        url.searchParams.set('app', 'portfolio');
        url.searchParams.set('slug', id);
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}

// 適用するパスを指定
export const config = {
    matcher: ['/blog/:path*', '/portfolio/:path*'],
};
