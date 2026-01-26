import { ReactNode } from 'react';
import { StaticImageData } from 'next/image';
import { DESKTOP_ICON_IDS, type DesktopIconId } from '@/constants/desktopIconConstants';

// アイコン画像のimport群
import aboutIcon from '@/assets/icon/about.png';
import blogIcon from '@/assets/icon/blog.png';
import portfolioIcon from '@/assets/icon/portfolio.png';
import skillsheetIcon from '@/assets/icon/skillsheet.png';
import minesweeperIcon from '@/assets/icon/minesweeper.png';
import folderIcon from '@/assets/icon/folder.png';
import pinballIcon from '@/assets/icon/pinball.png';

export type AppType = 'app' | 'folder';

export interface DesktopAppConfig {
    id: DesktopIconId;
    title: string;
    icon: StaticImageData;
    type: AppType;
    component?: ReactNode;
    serverComponentPath?: string;
    defaultSize?: { width: number; height: number };
    childrenIds?: DesktopIconId[]; // フォルダの場合の中身
    frameContentClassName?: string;
}

/**
 * 全てのアプリ/フォルダの定義（マスターレジストリ）
 */
export const DESKTOP_APP_CONFIGS: Omit<DesktopAppConfig, 'component'>[] = [
    {
        id: DESKTOP_ICON_IDS.ABOUT,
        title: '私について',
        icon: aboutIcon,
        type: 'app',
        serverComponentPath: '@/features/about/Content',
    },
    {
        id: DESKTOP_ICON_IDS.BLOG,
        title: 'ブログ',
        icon: blogIcon,
        type: 'app',
        serverComponentPath: '@/features/blog/ServerBlogContent',
    },
    {
        id: DESKTOP_ICON_IDS.PORTFOLIO,
        title: 'ポートフォリオ',
        icon: portfolioIcon,
        type: 'app',
        serverComponentPath: '@/features/portfolio/Content',
    },
    {
        id: DESKTOP_ICON_IDS.SKILLSHEET,
        title: 'スキルシート',
        icon: skillsheetIcon,
        type: 'app',
        serverComponentPath: '@/features/skillsheet/Content',
        frameContentClassName: 'skillsheet-frame-override',
    },
    {
        id: DESKTOP_ICON_IDS.MINESWEEPER,
        title: 'マインスイーパー',
        icon: minesweeperIcon,
        type: 'app',
        defaultSize: { width: 300, height: 400 },
    },
    {
        id: DESKTOP_ICON_IDS.PINBALL,
        title: 'ピンボール',
        icon: pinballIcon,
        type: 'app',
        defaultSize: { width: 600, height: 800 },
        frameContentClassName: 'pinball-frame-override',
    },
    {
        id: DESKTOP_ICON_IDS.GAMES_FOLDER,
        title: 'ゲーム',
        icon: folderIcon,
        type: 'folder',
        childrenIds: [DESKTOP_ICON_IDS.MINESWEEPER, DESKTOP_ICON_IDS.PINBALL],
        defaultSize: { width: 600, height: 400 },
    },
];

/**
 * デスクトップ上に表示するアイコンのIDリスト
 */
export const ON_DESKTOP_ICON_IDS: DesktopIconId[] = [
    DESKTOP_ICON_IDS.ABOUT,
    DESKTOP_ICON_IDS.BLOG,
    DESKTOP_ICON_IDS.PORTFOLIO,
    DESKTOP_ICON_IDS.SKILLSHEET,
    DESKTOP_ICON_IDS.GAMES_FOLDER, // マインスイーパーはこの中
];

export const DESKTOP_APPS = DESKTOP_APP_CONFIGS as DesktopAppConfig[];