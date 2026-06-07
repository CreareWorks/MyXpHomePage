import { StaticImageData } from 'next/image';
import { DESKTOP_ICON_IDS, type DesktopIconId } from '@/constants/desktopIconConstants';

import aboutIcon from '@/assets/icon/about.png';
import blogIcon from '@/assets/icon/blog.png';
import portfolioIcon from '@/assets/icon/portfolio.png';
import galleryIcon from '@/assets/icon/gallery.png';
import skillsheetIcon from '@/assets/icon/skillsheet.png';
import minesweeperIcon from '@/assets/icon/minesweeper.png';
import folderIcon from '@/assets/icon/folder.png';

export interface DesktopAppConfig {
    id: DesktopIconId;
    title: string;
    icon: StaticImageData;
    defaultSize?: { width: number; height: number };
    childrenIds?: DesktopIconId[];
    frameContentClassName?: string;
}

export const DESKTOP_APP_CONFIGS: DesktopAppConfig[] = [
    {
        id: DESKTOP_ICON_IDS.ABOUT,
        title: '私について',
        icon: aboutIcon,
    },
    {
        id: DESKTOP_ICON_IDS.BLOG,
        title: 'ブログ',
        icon: blogIcon,
    },
    {
        id: DESKTOP_ICON_IDS.PORTFOLIO,
        title: 'ポートフォリオ',
        icon: portfolioIcon,
    },
    {
        id: DESKTOP_ICON_IDS.GALLERY,
        title: 'ギャラリー',
        icon: galleryIcon,
    },
    {
        id: DESKTOP_ICON_IDS.SKILLSHEET,
        title: 'スキルシート',
        icon: skillsheetIcon,
        frameContentClassName: 'skillsheet-frame-override',
    },
    {
        id: DESKTOP_ICON_IDS.MINESWEEPER,
        title: 'マインスイーパー',
        icon: minesweeperIcon,
        defaultSize: { width: 300, height: 400 },
    },
    {
        id: DESKTOP_ICON_IDS.GAMES_FOLDER,
        title: 'ゲーム',
        icon: folderIcon,
        childrenIds: [DESKTOP_ICON_IDS.MINESWEEPER],
        defaultSize: { width: 600, height: 400 },
    },
];

export const ON_DESKTOP_ICON_IDS: DesktopIconId[] = [
    DESKTOP_ICON_IDS.ABOUT,
    DESKTOP_ICON_IDS.BLOG,
    DESKTOP_ICON_IDS.PORTFOLIO,
    DESKTOP_ICON_IDS.GALLERY,
    DESKTOP_ICON_IDS.SKILLSHEET,
    DESKTOP_ICON_IDS.GAMES_FOLDER,
];
