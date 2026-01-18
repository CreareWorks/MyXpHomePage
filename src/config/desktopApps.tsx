import { ReactNode } from 'react';
import { StaticImageData } from 'next/image';
import { DESKTOP_ICON_IDS, type DesktopIconId } from '@/constants/desktopIconConstants';

// アイコン画像のimport群
import aboutIcon from '@/assets/icon/about.png';
import blogIcon from '@/assets/icon/blog.png';
import portfolioIcon from '@/assets/icon/portfolio.png';
import rssIcon from '@/assets/icon/rss.png';
import skillsheetIcon from '@/assets/icon/skillsheet.png';

export interface DesktopAppConfig {
    id: DesktopIconId;
    title: string;
    icon: StaticImageData;
    component?: ReactNode;
    serverComponentPath?: string;
}

/**
 * デスクトップアプリの基本設定
 * componentは後から注入される
 */
export const DESKTOP_APP_CONFIGS: Omit<DesktopAppConfig, 'component'>[] = [
    {
        id: DESKTOP_ICON_IDS.ABOUT,
        title: '私について',
        icon: aboutIcon,
        serverComponentPath: '@/features/about/Content',
    },
    {
        id: DESKTOP_ICON_IDS.BLOG,
        title: 'ブログ',
        icon: blogIcon,
        serverComponentPath: '@/features/blog/ServerBlogContent',
    },
    {
        id: DESKTOP_ICON_IDS.PORTFOLIO,
        title: 'ポートフォリオ',
        icon: portfolioIcon,
        serverComponentPath: '@/features/portfolio/Content',
    },
    {
        id: DESKTOP_ICON_IDS.RSS,
        title: 'RSS',
        icon: rssIcon,
        serverComponentPath: '@/features/rss/Content',
    },
    {
        id: DESKTOP_ICON_IDS.SKILLSHEET,
        title: 'スキルシート',
        icon: skillsheetIcon,
        serverComponentPath: '@/features/skillsheet/Content',
    },
];

/**
 * 後方互換性のため、DESKTOP_APPSとしてもエクスポート
 * (componentは含まれないが、タイトルやアイコン情報は使用可能)
 */
export const DESKTOP_APPS = DESKTOP_APP_CONFIGS as DesktopAppConfig[];