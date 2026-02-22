import { getAllPosts, getPostBySlug } from './utils/fetchPosts';
import { BlogAppLayout } from './components/BlogAppLayout';
import { BlogPost } from './types';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { LinkCard } from '@/components/common/LinkCard/LinkCard';

interface ServerBlogContentProps { 
    slug?: string | undefined;
}

/**
 * ブログのServer Component
 */
export async function ServerBlogContent({ slug }: ServerBlogContentProps) {
    // slugがないときは一覧表示
    const allPosts = await getAllPosts();

    let currentPost: BlogPost | null | undefined = undefined;
    let postContent: React.ReactNode = null;

    if (slug) {
        currentPost = await getPostBySlug(slug);
        if (currentPost) {
            postContent = (
                <MDXRemote
                    source={currentPost.content}
                    components={{ LinkCard }}
                />
            );
        }
    }

    return (
        <BlogAppLayout
            key={slug || 'list'}
            allPosts={allPosts}
            currentPost={currentPost ?? undefined}
            postContent={postContent}
        />
    );
}

// ここでしか使わないので別ファイルに切り分けしないでおく
const styles = {
    container: {
        padding: '20px',
        background: 'white',
        height: '100%',
    },
}
