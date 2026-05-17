import { useState, useEffect } from 'react';
import styles from './BlogApp.module.css';
import { BlogPost, PostMetadata } from '@/features/blog/types/index';
import { WindowErrorBoundary } from '@/components/xp/ErrorBoundary/WindowErrorBoundary';

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

const ITEMS_PER_PAGE = 10;

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
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery, selectedGenre, selectedDate]);

    const totalPages = Math.ceil(filteredPosts.length / ITEMS_PER_PAGE);
    const paginatedPosts = filteredPosts.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

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
                        <span className={styles.detailDate}>📅 {currentPost.metadata.date}</span>
                        {currentPost.metadata.category && (
                            <span className={styles.detailCategory}>📁 {currentPost.metadata.category}</span>
                        )}
                    </div>
                    <div className={`markdown-body ${styles.detailBody}`}>
                        <WindowErrorBoundary>
                            {postContent || <pre>{currentPost.content}</pre>}
                        </WindowErrorBoundary>
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
                        <div className={styles.blogListWrapper}>
                            <div className={styles.blogList}>
                                {paginatedPosts.map((post) => (
                                    <div
                                        key={post.slug}
                                        className={styles.blogListItem}
                                        onClick={() => onNavigate(post.slug)}
                                    >
                                        <div className={styles.blogListItemHeader}>
                                            <h2 className={styles.blogListTitle}>{post.title}</h2>
                                            <div className={styles.blogListMeta}>
                                                <span className={styles.blogListDate}>📅 {post.date}</span>
                                                {post.category && (
                                                    <span className={styles.blogListCategory}>📁 {post.category}</span>
                                                )}
                                            </div>
                                        </div>
                                        {post.description && (
                                            <p className={styles.blogListDescription}>{post.description}</p>
                                        )}
                                    </div>
                                ))}
                            </div>
                            
                            {totalPages > 0 && (
                                <div className={styles.pager}>
                                    <button 
                                        className={styles.pagerButton} 
                                        disabled={currentPage === 1}
                                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                    >
                                        &lt; 前へ
                                    </button>
                                    <span className={styles.pagerInfo}>
                                        {currentPage} / {totalPages}
                                    </span>
                                    <button 
                                        className={styles.pagerButton} 
                                        disabled={currentPage === totalPages}
                                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                    >
                                        次へ &gt;
                                    </button>
                                </div>
                            )}
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
