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
import { PROJECTS } from '@/features/portfolio/data/projects';
import { SITE_BASE_URL, SITE_NAME } from '@/constants/siteConstants';

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export const revalidate = 60; // 1 minute


export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const params = await searchParams;
  const app = typeof params?.app === 'string' ? params.app : undefined;
  const slug = typeof params?.slug === 'string' ? params.slug : undefined;

  let title = SITE_NAME;
  let description = 'はじめまして、Creare(大島)と申します、当サイトはWindows XPをモチーフにしたポートフォリオサイトとなります。ご覧いただけると幸いです。';

  const baseUrl = SITE_BASE_URL;
  let imageUrl = `${baseUrl}/og-image.jpg`;
  let canonicalUrl = baseUrl;
  let imageWidth = 1200;
  let imageHeight = 630;
  let imageType = 'image/jpeg';

  if (app === DESKTOP_ICON_IDS.BLOG && slug) {
    const post = await getPostBySlug(slug);
    if (post) {
      title = `${post.metadata.title} | ${SITE_NAME}`;
      description = post.metadata.description || description;
      canonicalUrl = `${baseUrl}/blog/${slug}`;

      const ogParams = new URLSearchParams({
        title: post.metadata.title,
        date: post.metadata.date,
        category: post.metadata.category || '',
      });
      imageUrl = `${baseUrl}/api/og-blog?${ogParams.toString()}`;
      imageWidth = 1200;
      imageHeight = 630;
      imageType = 'image/png';
    }
  } else if (app === DESKTOP_ICON_IDS.PORTFOLIO && slug) {
    const project = PROJECTS.find(p => p.metadata.id === slug);
    if (project) {
      title = `${project.metadata.title} | Portfolio | ${SITE_NAME}`;
      description = project.metadata.description || description;
      canonicalUrl = `${baseUrl}/portfolio/${slug}`;

      const ogParams = new URLSearchParams({
        title: project.metadata.title,
        date: project.metadata.date,
        category: project.metadata.category || '',
      });
      imageUrl = `${baseUrl}/api/og-portfolio?${ogParams.toString()}`;
      imageWidth = 1200;
      imageHeight = 630;
      imageType = 'image/png';
    }
  } else if (app) {
    const config = DESKTOP_APP_CONFIGS.find(c => c.id === app);
    if (config) {
      title = `${config.title} | ${SITE_NAME}`;
      canonicalUrl = `${baseUrl}/?app=${app}`;
    }
  }

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: SITE_NAME,
      images: [
        {
          url: imageUrl,
          secureUrl: imageUrl,
          width: imageWidth,
          height: imageHeight,
          alt: title,
          type: imageType,
        },
      ],
      locale: 'ja_JP',
      type: app === DESKTOP_ICON_IDS.BLOG ? 'article' : 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      site: '@creareworks',
      creator: '@creareworks',
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
