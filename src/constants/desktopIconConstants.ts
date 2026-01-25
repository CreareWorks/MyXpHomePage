export const DESKTOP_ICON_IDS = {
    ABOUT: 'about',
    PORTFOLIO: 'portfolio',
    BLOG: 'blog',
    SKILLSHEET: 'skills',
    MINESWEEPER: 'minesweeper',
    GAMES_FOLDER: 'games',
    PINBALL: 'pinball',
} as const;

export type DesktopIconId = (typeof DESKTOP_ICON_IDS)[keyof typeof DESKTOP_ICON_IDS];
