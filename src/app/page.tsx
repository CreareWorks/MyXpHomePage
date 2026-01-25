import { Suspense } from 'react';
import { DesktopContent } from '@/components/DesktopContent';
import { DESKTOP_APP_CONFIGS } from '@/config/desktopApps';
import { Content as AboutContent } from '@/features/about/Content';
import { ServerBlogContent } from '@/features/blog/ServerBlogContent';
import { Content as PortfolioContent } from '@/features/portfolio/Content';
import { Content as RssContent } from '@/features/rss/Content';
import { Content as SkillsheetContent } from '@/features/skillsheet/Content';
import Minesweeper from '@/features/minesweeper/Minesweeper';
import Pinball from '@/features/pinball/Pinball';
import { FolderView } from '@/components/xp/FolderView/FolderView';
import { DESKTOP_ICON_IDS } from '@/constants/desktopIconConstants';

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
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
          rss: <RssContent />,
          skills: <SkillsheetContent />,
          minesweeper: <Minesweeper />,
          pinball: <Pinball />,
          games: <FolderView childrenIds={[DESKTOP_ICON_IDS.MINESWEEPER, DESKTOP_ICON_IDS.PINBALL]} />,
        }}
      </DesktopContent>
    </Suspense>
  );
}
