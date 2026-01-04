export const DESKTOP_ICON_IDS = {
    ABOUT: 'about',
    PORTFOLIO: 'portfolio',
    BLOG: 'blog',
    RSS: 'rss',
    SKILLSHEET: 'skills',
} as const;

export type DesktopIconId = (typeof DESKTOP_ICON_IDS)[keyof typeof DESKTOP_ICON_IDS];
