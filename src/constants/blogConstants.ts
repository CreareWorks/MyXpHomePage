/**
 * ブログ機能で使用する定数定義
 */

// フィルタの種類
export const BLOG_FILTER_TYPES = {
    DATE: 'date',
    GENRE: 'genre',
} as const;

export type BlogFilterType = typeof BLOG_FILTER_TYPES[keyof typeof BLOG_FILTER_TYPES];
