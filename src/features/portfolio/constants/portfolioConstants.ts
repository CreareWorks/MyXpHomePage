export const PORTFOLIO_CATEGORIES = {
    WEB_APP: 'Webアプリ',
    OTHER: 'その他',
} as const;

export type PortfolioCategory = typeof PORTFOLIO_CATEGORIES[keyof typeof PORTFOLIO_CATEGORIES];
