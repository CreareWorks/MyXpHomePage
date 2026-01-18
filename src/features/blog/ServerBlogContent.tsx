import { getAllPosts, getPostBySlug } from './utils/fetchPosts';
import { BlogAppLayout } from './components/BlogAppLayout';
import { BlogPost } from './types';

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
    
    if (slug) {
        // 同期版実装済みと仮定
        currentPost = getPostBySlug(slug);
    }
    return (
        <BlogAppLayout
            allPosts={allPosts}
            currentPost={currentPost ?? undefined} 
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
