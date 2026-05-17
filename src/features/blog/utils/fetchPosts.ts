import 'server-only';
import { cache } from 'react';

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { z } from 'zod';
import { PostMetadata, BlogPost } from '../types';
import { BLOG_CATEGORIES, BlogCategory } from '@/constants/blogConstants';

const postsDirectory = path.join(process.cwd(), 'src/features/blog/content');

const PostFrontmatterSchema = z.object({
    title: z.string(),
    date: z.string(),
    category: z.string().optional(),
    description: z.string().optional(),
});

const validateCategory = (category: unknown): BlogCategory => {
    const validCategories = Object.values(BLOG_CATEGORIES) as string[];
    if (typeof category === 'string' && validCategories.includes(category)) {
        return category as BlogCategory;
    }
    return BLOG_CATEGORIES.OTHER;
};

const getFilesRecursively = (dir: string): string[] => {
    let results: string[] = [];
    if (!fs.existsSync(dir)) return [];
    const list = fs.readdirSync(dir);
    list.forEach((file) => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat && stat.isDirectory()) {
            results = results.concat(getFilesRecursively(filePath));
        } else {
            results.push(filePath);
        }
    });
    return results;
};

// リクエスト内でファイルスキャンを1回に集約
const getAllPostFiles = cache((): string[] => {
    return getFilesRecursively(postsDirectory).filter((f) => f.endsWith('.mdx'));
});

export const getAllPosts = cache((): PostMetadata[] => {
    const allPosts = getAllPostFiles().map((filePath) => {
        const fileContents = fs.readFileSync(filePath, 'utf8');
        const { data } = matter(fileContents);

        const parsed = PostFrontmatterSchema.safeParse(data);
        if (!parsed.success) {
            console.warn(`Invalid frontmatter in ${filePath}:`, parsed.error.issues);
            return null;
        }

        const slug = path.basename(filePath).replace(/\.mdx$/, '');
        return {
            slug,
            title: parsed.data.title,
            date: parsed.data.date,
            category: validateCategory(parsed.data.category),
            description: parsed.data.description ?? '',
        } satisfies PostMetadata;
    }).filter((p): p is PostMetadata => p !== null);

    return allPosts.sort((a, b) => (a.date < b.date ? 1 : -1));
});

const VALID_SLUG_PATTERN = /^[a-zA-Z0-9_-]+$/;

export const getPostBySlug = cache((slug: string): BlogPost | null => {
    if (!VALID_SLUG_PATTERN.test(slug)) return null;

    const targetFile = getAllPostFiles().find(
        (filePath) => path.basename(filePath) === `${slug}.mdx`
    );

    if (!targetFile) return null;

    try {
        const fileContents = fs.readFileSync(targetFile, 'utf8');
        const { data, content } = matter(fileContents);

        const parsed = PostFrontmatterSchema.safeParse(data);
        if (!parsed.success) {
            console.warn(`Invalid frontmatter in ${targetFile}:`, parsed.error.issues);
            return null;
        }

        const metadata: PostMetadata = {
            slug,
            title: parsed.data.title,
            date: parsed.data.date,
            category: validateCategory(parsed.data.category),
            description: parsed.data.description ?? '',
        };

        return { metadata, content };
    } catch (error) {
        console.error(`Error reading post ${slug}:`, error);
        return null;
    }
});
