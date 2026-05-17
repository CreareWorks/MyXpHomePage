import { NextRequest } from 'next/server';
import { SITE_NAME } from '@/constants/siteConstants';
import { buildOgImageResponse } from '../_og-template';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        return buildOgImageResponse({
            title: searchParams.get('title') || SITE_NAME,
            date: searchParams.get('date') || '',
            category: searchParams.get('category') || '',
            gradient: 'linear-gradient(135deg, #0054E3 0%, #3A8BFF 100%)',
        });
    } catch (e) {
        console.error('OG Image Error:', e instanceof Error ? e.message : e);
        return new Response('Failed to generate image', { status: 500 });
    }
}
