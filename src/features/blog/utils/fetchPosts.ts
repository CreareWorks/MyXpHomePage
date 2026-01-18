import 'server-only';

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { PostMetadata, BlogPost } from '../types';
import { BLOG_CATEGORIES, BlogCategory } from '@/constants/blogConstants';

const postsDirectory = path.join(process.cwd(), 'src/features/blog/content');

/**
 * カテゴリのバリデーションとフォールバック処理
 */
const validateCategory = (category: any): BlogCategory => {
    // 定数の値リストを取得
    const validCategories = Object.values(BLOG_CATEGORIES) as string[];

    if (validCategories.includes(category)) {
        return category as BlogCategory;
    }

    return BLOG_CATEGORIES.OTHER;
};

/**
 * 指定したディレクトリ以下の全てのファイルを再帰的に取得するヘルパー関数
 */
const getFilesRecursively = (dir: string): string[] => {
    let results: string[] = [];

    if (!fs.existsSync(dir)) return [];

    const list = fs.readdirSync(dir);

    list.forEach((file) => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat && stat.isDirectory()) {
            // ディレクトリなら再帰的に探索して結合
            results = results.concat(getFilesRecursively(filePath));
        } else {
            // ファイルならリストに追加
            results.push(filePath);
        }
    });

    return results;
};

/**
 * 全ての記事のメタデータを取得する (一覧表示用)
 */
export const getAllPosts = (): PostMetadata[] => {
    // 再帰的に全MDXファイルのパスを取得
    const allFiles = getFilesRecursively(postsDirectory);

    const allPosts = allFiles
        .filter((filePath) => filePath.endsWith('.mdx'))
        .map((filePath) => {
            // ファイル読み込み
            const fileContents = fs.readFileSync(filePath, 'utf8');

            // gray-matterでメタデータ解析
            const { data } = matter(fileContents);

            // ファイル名をスラッグとして使用 (拡張子除去しておく)
            const fileName = path.basename(filePath);
            const slug = fileName.replace(/\.mdx$/, '');

            return {
                slug,
                title: data.title,
                date: data.date,
                category: validateCategory(data.category),
                description: data.description || '',
            } as PostMetadata;
        });

    // 日付の新しい順にソート (降順)
    return allPosts.sort((a, b) => (a.date < b.date ? 1 : -1));
};

/**
 * 特定の記事を取得する (詳細表示用)
 */
export const getPostBySlug = (slug: string): BlogPost | null => {
    // ファイルパスを特定するために全探索 (年月フォルダ構造のため)
    const allFiles = getFilesRecursively(postsDirectory);

    // ファイル名が {slug}.mdx と一致するものを探す
    const targetFile = allFiles.find((filePath) =>
        path.basename(filePath) === `${slug}.mdx`
    );

    if (!targetFile) return null;

    try {
        const fileContents = fs.readFileSync(targetFile, 'utf8');
        const { data, content } = matter(fileContents);

        // メタデータの構築
        const metadata: PostMetadata = {
            slug,
            title: data.title,
            date: data.date,
            category: validateCategory(data.category),
            description: data.description || '',
        };

        return {
            metadata,
            content,
        };
    } catch (error) {
        console.error(`Error reading post ${slug}:`, error);
        return null;
    }
};

/**
 * 全カテゴリ一覧を取得する (重複なし)
 */
export const getAllCategories = (): string[] => {
    const posts = getAllPosts();
    const categories = new Set(posts.map((post) => post.category));
    return Array.from(categories).sort();
};