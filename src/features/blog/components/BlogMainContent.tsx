import React from 'react';
import styles from './BlogApp.module.css';
import { BlogPost, PostMetadata } from '@/features/blog/types/index';

interface BlogMainContentProps {
    currentPost?: BlogPost | undefined;
    filteredPosts: PostMetadata[];
    searchQuery: string;
    selectedGenre: string | null;
    selectedDate: string | null;
    onNavigate: (slug: string) => void;
}

export const BlogMainContent = ({
    currentPost,
    filteredPosts,
    searchQuery,
    selectedGenre,
    selectedDate,
    onNavigate,
}: BlogMainContentProps) => {
    return (
        <div className={styles.contentArea}>
            {currentPost ? (
                // 詳細表示
                <div className={styles.detailContainer}>
                    <h1 className={styles.detailTitle}>{currentPost.metadata.title}</h1>
                    <div className={styles.detailMeta}>
                        {currentPost.metadata.date}
                    </div>
                    <div className={`markdown-body ${styles.detailBody}`}>
                        <pre>{currentPost.content}</pre>
                    </div>
                </div>
            ) : (
                // 一覧表示（フィルタ適用後）
                <div className={styles.listContainer}>
                    {(searchQuery || selectedDate || selectedGenre) && (
                        <div className={styles.filterInfo}>
                            Filter: {searchQuery} {selectedGenre} {selectedDate} ({filteredPosts.length} items)
                        </div>
                    )}

                    {filteredPosts.length > 0 ? (
                        <div className={styles.fileGrid}>
                            {filteredPosts.map((post) => (
                                <div
                                    key={post.slug}
                                    className={styles.fileItem}
                                    // ダブルクリックで詳細へ履歴移動
                                    onDoubleClick={() => onNavigate(post.slug)}
                                    title={post.title}
                                >
                                    <div className={styles.fileIcon}>📄</div>
                                    <span className={styles.fileLabel}>{post.title}</span>
                                    <span className={styles.fileDate}>{post.date}</span>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className={styles.noItemsMessage}>
                            記事が見つかりませんでした。
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};
