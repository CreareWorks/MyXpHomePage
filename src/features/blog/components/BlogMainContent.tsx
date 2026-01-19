import React from 'react';
import styles from './BlogApp.module.css';
import { BlogPost, PostMetadata } from '@/features/blog/types/index';

interface BlogMainContentProps {
    currentPost?: BlogPost | undefined;
    postContent?: React.ReactNode;
    filteredPosts: PostMetadata[];
    searchQuery: string;
    selectedGenre: string | null;
    selectedDate: string | null;
    isLoading?: boolean;
    onNavigate: (slug: string) => void;
}

export const BlogMainContent = ({
    currentPost,
    postContent,
    filteredPosts,
    searchQuery,
    selectedGenre,
    selectedDate,
    isLoading,
    onNavigate,
}: BlogMainContentProps) => {
    return (
        <div className={styles.contentArea}>
            {isLoading && (
                <div className={styles.loadingOverlay}>
                    <div className={styles.searchFlashlight}>🔦</div>
                    <div className={styles.loadingText}>読込み中...</div>
                </div>
            )}
            {currentPost ? (
                // 詳細表示
                <div className={styles.detailContainer}>
                    <h1 className={styles.detailTitle}>{currentPost.metadata.title}</h1>
                    <div className={styles.detailMeta}>
                        {currentPost.metadata.date}
                    </div>
                    <div className={`markdown-body ${styles.detailBody}`}>
                        {postContent || <pre>{currentPost.content}</pre>}
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
                                    onClick={() => onNavigate(post.slug)}
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
