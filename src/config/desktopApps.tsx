import { ReactNode } from 'react';
import { StaticImageData } from 'next/image';
import { DESKTOP_ICON_IDS, type DesktopIconId } from '@/constants/desktopIcon';

// アイコン画像のimport群
import aboutIcon from '@/assets/icon/about.png';
import blogIcon from '@/assets/icon/blog.png';
import portfolioIcon from '@/assets/icon/portfolio.png';
import rssIcon from '@/assets/icon/rss.png';
import skillsheetIcon from '@/assets/icon/skillsheet.png';

// 各コンテンツ
import { Content as AboutContent } from '@/features/about/Content';
import { Content as BlogContent } from '@/features/blog/Content';
import { Content as PortfolioContent } from '@/features/portfolio/Content';
import { Content as RssContent } from '@/features/rss/Content';
import { Content as SkillsheetContent } from '@/features/skillsheet/Content';

export interface DesktopAppConfig {
    id: DesktopIconId;
    title: string;
    icon: StaticImageData;
    component: ReactNode;
}

export const DESKTOP_APPS: DesktopAppConfig[] = [
    {
        id: DESKTOP_ICON_IDS.ABOUT,
        title: '私について',
        icon: aboutIcon,
        component: <AboutContent />,
    },
    {
        id: DESKTOP_ICON_IDS.BLOG,
        title: 'ブログ',
        icon: blogIcon,
        component: <BlogContent />,
    },
    {
        id: DESKTOP_ICON_IDS.PORTFOLIO,
        title: 'ポートフォリオ',
        icon: portfolioIcon,
        component: <PortfolioContent />,
    },
    {
        id: DESKTOP_ICON_IDS.RSS,
        title: 'RSS',
        icon: rssIcon,
        component: <RssContent />,
    },
    {
        id: DESKTOP_ICON_IDS.SKILLSHEET,
        title: 'スキルシート',
        icon: skillsheetIcon,
        component: <SkillsheetContent />,
    },
];