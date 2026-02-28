import { MetadataRoute } from 'next';
import { SITE_BASE_URL } from '@/constants/siteConstants';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
        },
        sitemap: `${SITE_BASE_URL}/sitemap.xml`,
    };
}
