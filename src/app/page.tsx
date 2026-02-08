import { Suspense } from 'react';
import { DesktopContent } from '@/components/DesktopContent';
import { DESKTOP_APP_CONFIGS } from '@/config/desktopApps';
import { Content as AboutContent } from '@/features/about/Content';
import { ServerBlogContent } from '@/features/blog/ServerBlogContent';
import { Content as PortfolioContent } from '@/features/portfolio/Content';
import { Content as SkillsheetContent } from '@/features/skillsheet/Content';
import Minesweeper from '@/features/minesweeper/Minesweeper';
import Pinball from '@/features/pinball/Pinball';
import { FolderView } from '@/components/xp/FolderView/FolderView';
import { DESKTOP_ICON_IDS } from '@/constants/desktopIconConstants';
import { Metadata } from 'next';
import { getPostBySlug } from '@/features/blog/utils/fetchPosts';

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const params = await searchParams;
  const app = typeof params?.app === 'string' ? params.app : undefined;
  const slug = typeof params?.slug === 'string' ? params.slug : undefined;

  let title = 'youta.dev';
  let description = 'Windows XPをモチーフにしたポートフォリオサイト';

  const baseUrl = 'https://youta-dev.vercel.app';
  let imageUrl = `${baseUrl}/og-image.png`;

  if (app === DESKTOP_ICON_IDS.BLOG && slug) {
    const post = await getPostBySlug(slug);
    if (post) {
      title = `${post.metadata.title} | youta.dev`;
      description = post.metadata.description || description;

      const ogParams = new URLSearchParams({
        title: post.metadata.title,
        date: post.metadata.date,
        category: post.metadata.category || '',
      });
      imageUrl = `${baseUrl}/api/og-blog?${ogParams.toString()}`;
    }
  } else if (app) {
    const config = DESKTOP_APP_CONFIGS.find(c => c.id === app);
    if (config) {
      title = `${config.title} | youta.dev`;
    }
  }

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: baseUrl,
      siteName: 'youta.dev',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: 'youta.dev - Windows XP Portfolio',
        },
      ],
      locale: 'ja_JP',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
  };
}

/**
 * メインデスクトップページ
 */
export default async function DesktopPage({ searchParams }: PageProps) {

  const params = await searchParams;
  const slug = typeof params?.slug === 'string' ? params.slug : undefined;

  return (
    <Suspense fallback={<div>Loading XP...</div>}>
      <DesktopContent configs={DESKTOP_APP_CONFIGS}>
        {{
          about: <AboutContent />,
          blog: <ServerBlogContent slug={slug} />,
          portfolio: <PortfolioContent />,
          skills: <SkillsheetContent />,
          minesweeper: <Minesweeper />,
          pinball: <Pinball />,
          games: <FolderView childrenIds={[DESKTOP_ICON_IDS.MINESWEEPER, DESKTOP_ICON_IDS.PINBALL]} />,
        }}
      </DesktopContent>
    </Suspense>
  );
}
