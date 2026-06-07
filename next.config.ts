import type { NextConfig } from "next";

const commonHeaders = [
    { key: 'X-Content-Type-Options', value: 'nosniff' },
    { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains; preload' },
    { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
    { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
];

const nextConfig: NextConfig = {
    reactCompiler: true,
    async redirects() {
        return [
            { source: '/about', destination: '/?app=about', permanent: false },
            { source: '/blog', destination: '/?app=blog', permanent: false },
            { source: '/portfolio', destination: '/?app=portfolio', permanent: false },
            { source: '/gallery', destination: '/?app=gallery', permanent: false },
            { source: '/skills', destination: '/?app=skills', permanent: false },
            { source: '/minesweeper', destination: '/?app=minesweeper', permanent: false },
            { source: '/games', destination: '/?app=games', permanent: false },
        ];
    },
    async headers() {
        return [
            {
                // 全パスにデフォルトヘッダーを適用
                source: '/(.*)',
                headers: [
                    ...commonHeaders,
                    { key: 'X-Frame-Options', value: 'DENY' },
                ],
            },
            {
                // PDF は後から上書き: 同一オリジンの iframe 表示を許可
                source: '/(.*\\.pdf)',
                headers: [
                    { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
                ],
            },
        ];
    },
};

export default nextConfig;
