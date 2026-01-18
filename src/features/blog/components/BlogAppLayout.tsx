'use client';

import React, { useState, useMemo, useTransition, useEffect } from 'react';
import styles from '@/features/blog/components/BlogApp.module.css';
import { PostMetadata, BlogPost } from '@/features/blog/types/index';
import { useQueryState } from 'nuqs';
import { BLOG_FILTER_TYPES, BlogFilterType, BLOG_CATEGORIES } from '@/constants/blogConstants';

interface BlogAppLayoutProps {
    allPosts: PostMetadata[];
    currentPost?: BlogPost | undefined;
}

export const BlogAppLayout = ({ allPosts, currentPost }: BlogAppLayoutProps) => {
    // 状態管理
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [, startTransition] = useTransition();

    // フィルタ条件のState
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [selectedGenre, setSelectedGenre] = useState<string | null>(null);

    // URL操作用
    const [slug, setSlug] = useQueryState('slug', {
        history: 'push',
        shallow: false,
    });

    // 履歴スタック (初期値は現在のslug)
    const [historyStack, setHistoryStack] = useState<(string | null)[]>([slug ?? null]);
    const [currentIndex, setCurrentIndex] = useState(0);

    // ナビゲーション処理（新規移動）
    const navigate = (newSlug: string | null) => {
        // 同じ場所なら何もしない
        if (newSlug === historyStack[currentIndex]) return;

        startTransition(() => {
            setSlug(newSlug);

            // 履歴の更新: 現在位置より先を削除し、新しい履歴を追加
            const newHistory = historyStack.slice(0, currentIndex + 1);
            newHistory.push(newSlug);
            setHistoryStack(newHistory);
            setCurrentIndex(newHistory.length - 1);
        });
    };

    // 戻る
    const goBack = () => {
        if (currentIndex > 0) {
            const prevIndex = currentIndex - 1;
            const prevSlug = historyStack[prevIndex] ?? null;
            startTransition(() => {
                setSlug(prevSlug);
                setCurrentIndex(prevIndex);
            });
        }
    };

    // 進む
    const goForward = () => {
        if (currentIndex < historyStack.length - 1) {
            const nextIndex = currentIndex + 1;
            const nextSlug = historyStack[nextIndex] ?? null;
            startTransition(() => {
                setSlug(nextSlug);
                setCurrentIndex(nextIndex);
            });
        }
    };

    const canGoBack = currentIndex > 0;
    const canGoForward = currentIndex < historyStack.length - 1;


    // フィルタリングロジック
    const filteredPosts = useMemo(() => {
        return allPosts.filter(post => {
            // 検索 (タイトル)
            const matchQuery = searchQuery
                ? post.title.toLowerCase().includes(searchQuery.toLowerCase())
                : true;

            // 日付 (YYYY-MM)
            const matchDate = selectedDate
                ? post.date.startsWith(selectedDate)
                : true;

            // ジャンル (メタデータ or 仮)
            const postCategory = post.category || BLOG_CATEGORIES.OTHER;
            const matchGenre = selectedGenre
                ? postCategory === selectedGenre
                : true;

            return matchQuery && matchDate && matchGenre;
        });
    }, [allPosts, searchQuery, selectedDate, selectedGenre]);

    // リスト作成（アーカイブ用: YYYY-MM）
    const archiveDates = useMemo(() => {
        const dates = new Set(allPosts.map(p => p.date.substring(0, 7)));
        return Array.from(dates).sort().reverse();
    }, [allPosts]);

    // リスト作成（ジャンル）
    const genres = useMemo(() => {
        const cats = new Set(allPosts.map(p => p.category || BLOG_CATEGORIES.OTHER));
        return Array.from(cats).sort();
    }, [allPosts]);

    // フィルタ操作ハンドラ
    const handleFilter = (type: BlogFilterType, value: string) => {
        if (currentPost) navigate(null); // 詳細から一覧に戻る履歴を追加

        if (type === BLOG_FILTER_TYPES.DATE) {
            setSelectedDate(prev => prev === value ? null : value);
        } else if (type === BLOG_FILTER_TYPES.GENRE) {
            setSelectedGenre(prev => prev === value ? null : value);
        }
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
        if (currentPost) navigate(null);
    };

    // ツールバーのアドレス表示用テキスト生成
    const getAddressText = () => {
        if (currentPost) return `My Documents\\My Blog\\${currentPost.metadata.slug}`;

        let path = `My Documents\\My Blog`;
        if (selectedGenre) path += `\\${selectedGenre}`;
        if (selectedDate) path += `\\${selectedDate}`;
        if (searchQuery) path += `\\Search: "${searchQuery}"`;
        return path;
    };

    return (
        <div className={styles.container}>
            {/* ツールバー */}
            <div className={styles.toolbar}>
                <div className={styles.toolbarContainer}>
                    <div className={styles.navRow}>
                        <div
                            className={`${styles.backButtonContainer} ${!canGoBack ? styles.disabled : ''}`}
                            onClick={canGoBack ? goBack : undefined}
                            title="Back"
                        >
                            <div className={styles.xpBackButton}>
                                ←
                            </div>
                            <span className={styles.xpBackText}>戻る</span>
                            <div className={styles.xpDropdown}>▼</div>
                        </div>
                        <button
                            className={styles.xpForwardButton}
                            onClick={goForward}
                            disabled={!canGoForward}
                            title="Forward"
                        >
                            →
                        </button>

                        <button
                            className={styles.upButton}
                            onClick={() => {
                                if (currentPost) {
                                    navigate(null);
                                }
                                setSearchQuery('');
                                setSelectedDate(null);
                                setSelectedGenre(null);
                            }}
                            title="Up"
                        >
                            📁
                        </button>

                        <button
                            className={styles.hamburger}
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        >
                            ☰
                        </button>
                    </div>

                    <div className={styles.navRow}>
                        <div className={styles.addressLabel}>Address</div>
                        <div className={styles.addressInput}>
                            <span className={styles.addressIcon}>📂</span>
                            {getAddressText()}
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.mainArea}>
                {/* サイドバー: 検索 & フィルタ */}
                <div className={`${styles.sidebar} ${isSidebarOpen ? styles.open : ''}`}>
                    {/* 検索 */}
                    <div className={styles.sidebarBox}>
                        <div className={styles.sidebarHeader}>Search</div>
                        <div className={styles.sidebarContent}>
                            <input
                                type="text"
                                className={styles.searchInput}
                                placeholder="Search titles..."
                                value={searchQuery}
                                onChange={handleSearch}
                            />
                        </div>
                    </div>

                    {/* ジャンル */}
                    <div className={styles.sidebarBox}>
                        <div className={styles.sidebarHeader}>Categories</div>
                        <div className={styles.sidebarContent}>
                            {genres.map(genre => (
                                <div
                                    key={genre}
                                    className={`${styles.filterItem} ${selectedGenre === genre ? styles.active : ''}`}
                                    onClick={() => handleFilter(BLOG_FILTER_TYPES.GENRE, genre)}
                                >
                                    📁 {genre}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 日付アーカイブ */}
                    <div className={styles.sidebarBox}>
                        <div className={styles.sidebarHeader}>Archives</div>
                        <div className={styles.sidebarContent}>
                            {archiveDates.map(date => (
                                <div
                                    key={date}
                                    className={`${styles.filterItem} ${selectedDate === date ? styles.active : ''}`}
                                    onClick={() => handleFilter(BLOG_FILTER_TYPES.DATE, date)}
                                >
                                    📅 {date}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* メイン表示エリア */}
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
                                            onDoubleClick={() => navigate(post.slug)}
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
            </div>
        </div>
    );
};