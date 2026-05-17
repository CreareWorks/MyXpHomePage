import type { HTMLAttributes, ThHTMLAttributes, TdHTMLAttributes, ReactNode } from 'react';
import { getAllPosts, getPostBySlug } from './utils/fetchPosts';
import { BlogAppLayout } from './components/BlogAppLayout';
import { BlogPost } from './types';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { LinkCard } from '@/components/common/LinkCard/LinkCard';

import remarkGfm from 'remark-gfm';
import tableStyles from './components/MdxTable.module.css';

const mdxComponents = {
    LinkCard,
    table: (props: HTMLAttributes<HTMLTableElement>) => (
        <div className={tableStyles.tableWrapper}>
            <table className={tableStyles.table} {...props} />
        </div>
    ),
    th: (props: ThHTMLAttributes<HTMLTableCellElement>) => <th className={tableStyles.th} {...props} />,
    td: (props: TdHTMLAttributes<HTMLTableCellElement>) => <td className={tableStyles.td} {...props} />,
    tr: (props: HTMLAttributes<HTMLTableRowElement>) => <tr className={tableStyles.tr} {...props} />,
};

interface ServerBlogContentProps {
    slug?: string | undefined;
}

export async function ServerBlogContent({ slug }: ServerBlogContentProps) {
    const allPosts = await getAllPosts();

    let currentPost: BlogPost | null | undefined = undefined;
    let postContent: ReactNode = null;

    if (slug) {
        currentPost = await getPostBySlug(slug);
        if (currentPost) {
            postContent = (
                <MDXRemote
                    source={currentPost.content}
                    options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
                    components={mdxComponents}
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

