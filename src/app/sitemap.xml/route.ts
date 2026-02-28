import { getAllPosts } from '@/features/blog/utils/fetchPosts';
import { PROJECTS } from '@/features/portfolio/data/projects';
import { DESKTOP_ICON_IDS } from '@/constants/desktopIconConstants';
import { SITE_BASE_URL } from '@/constants/siteConstants';

function escapeXml(url: string): string {
    return url.replace(/&/g, '&amp;');
}

export async function GET() {
    const now = new Date().toISOString();
    const allPosts = getAllPosts();

    type SitemapEntry = {
        url: string;
        lastmod: string;
        changefreq: string;
        priority: string;
    };

    const urls: SitemapEntry[] = [
        // トップページ
        {
            url: SITE_BASE_URL,
            lastmod: now,
            changefreq: 'daily',
            priority: '1.0',
        },

        // 各アプリページ
        {
            url: `${SITE_BASE_URL}/?app=${DESKTOP_ICON_IDS.ABOUT}`,
            lastmod: now,
            changefreq: 'monthly',
            priority: '0.8',
        },
        {
            url: `${SITE_BASE_URL}/?app=${DESKTOP_ICON_IDS.BLOG}`,
            lastmod: now,
            changefreq: 'daily',
            priority: '0.9',
        },
        {
            url: `${SITE_BASE_URL}/?app=${DESKTOP_ICON_IDS.PORTFOLIO}`,
            lastmod: now,
            changefreq: 'monthly',
            priority: '0.8',
        },
        {
            url: `${SITE_BASE_URL}/?app=${DESKTOP_ICON_IDS.SKILLSHEET}`,
            lastmod: now,
            changefreq: 'monthly',
            priority: '0.7',
        },

        // ブログ記事（MDXから自動取得）
        ...allPosts.map((post) => ({
            url: `${SITE_BASE_URL}/?app=${DESKTOP_ICON_IDS.BLOG}&slug=${post.slug}`,
            lastmod: post.date ? new Date(post.date).toISOString() : now,
            changefreq: 'weekly',
            priority: '0.7',
        })),

        // ポートフォリオ各プロジェクト
        ...PROJECTS.map((project) => ({
            url: `${SITE_BASE_URL}/?app=${DESKTOP_ICON_IDS.PORTFOLIO}&slug=${project.metadata.id}`,
            lastmod: project.metadata.date
                ? new Date(project.metadata.date).toISOString()
                : now,
            changefreq: 'monthly',
            priority: '0.6',
        })),
    ];

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
            .map(
                ({ url, lastmod, changefreq, priority }) => `  <url>
    <loc>${escapeXml(url)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
            )
            .join('\n')}
</urlset>`;

    return new Response(xml, {
        headers: {
            'Content-Type': 'application/xml; charset=utf-8',
            // 1時間キャッシュ（本番環境向け）
            'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
        },
    });
}
