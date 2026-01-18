import { BlogCategory } from '@/constants/blogConstants';

export type PostMetadata = {
    title: string;
    date: string;
    category: BlogCategory;
    description: string;
    slug: string;
};

export type BlogPost = {
    metadata: PostMetadata;
    content: string;
};