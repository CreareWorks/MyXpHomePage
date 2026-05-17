// ブログカテゴリ定義
export const BLOG_CATEGORIES = {
    TECH: 'Tech',
    LIFE: 'Life',
    MANAGEMENT: 'Management',
    OTHER: 'Other',
} as const;

export type BlogCategory = typeof BLOG_CATEGORIES[keyof typeof BLOG_CATEGORIES];
