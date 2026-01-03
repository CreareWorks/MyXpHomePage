export const DESKTOP_ICON_IDS = {
    ABOUT: 1,
    PORTFOLIO: 2,
    BLOG: 3,
    RSS: 4,
    SKILLSHEET: 5,
} as const;

export type DesktopIconId = (typeof DESKTOP_ICON_IDS)[keyof typeof DESKTOP_ICON_IDS];
