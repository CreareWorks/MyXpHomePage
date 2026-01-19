'use client';

import React, { useState, useMemo, useTransition } from 'react';
import styles from '@/features/blog/components/BlogApp.module.css';
import { PostMetadata, BlogPost } from '@/features/blog/types/index';
import { useQueryState } from 'nuqs';
import { BLOG_CATEGORIES } from '@/constants/blogConstants';
import { BlogToolbar } from './BlogToolbar';
import { BlogSidebar } from './BlogSidebar';
import { BlogMainContent } from './BlogMainContent';
import { MobileMenu } from '@/components/xp/WindowAppLayout/MobileMenu';
import { useMobileSidebar } from '@/hooks/useMobileSidebar';

interface BlogAppLayoutProps {
    allPosts: PostMetadata[];
    currentPost?: BlogPost | undefined;
    postContent?: React.ReactNode;
}

export const BlogAppLayout = ({ allPosts, currentPost, postContent }: BlogAppLayoutProps) => {
    // 状態管理
    const { isSidebarOpen, toggleSidebar, closeSidebar } = useMobileSidebar();
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
        if (newSlug === historyStack[currentIndex]) return;

        startTransition(() => {
            setSlug(newSlug);
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


    // フィルタリング
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

            // ジャンル (メタデータ)
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

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
        if (currentPost) navigate(null);
    };

    // フィルタ操作ハンドラ（ラッパー）
    const onFilterGenre = (genre: string) => {
        if (currentPost) navigate(null);
        setSelectedGenre(prev => prev === genre ? null : genre);
        closeSidebar();
    };

    const onFilterDate = (date: string) => {
        if (currentPost) navigate(null);
        setSelectedDate(prev => prev === date ? null : date);
        closeSidebar();
    };

    const onUp = () => {
        if (currentPost) {
            navigate(null);
        }
        setSearchQuery('');
        setSelectedDate(null);
        setSelectedGenre(null);
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
        <div className={`${styles.container} ${isSidebarOpen ? styles.sidebarOpen : ''}`}>
            <MobileMenu
                isOpen={isSidebarOpen}
                onToggle={toggleSidebar}
                onClose={closeSidebar}
            />
            <BlogToolbar
                canGoBack={canGoBack}
                canGoForward={canGoForward}
                goBack={goBack}
                goForward={goForward}
                onUp={onUp}
                addressText={getAddressText()}
            />

            <div className={styles.mainArea}>
                <BlogSidebar
                    isOpen={isSidebarOpen}
                    searchQuery={searchQuery}
                    onSearchChange={handleSearch}
                    genres={genres}
                    selectedGenre={selectedGenre}
                    onFilterGenre={onFilterGenre}
                    archiveDates={archiveDates}
                    selectedDate={selectedDate}
                    onFilterDate={onFilterDate}
                />

                <BlogMainContent
                    currentPost={currentPost}
                    postContent={postContent}
                    filteredPosts={filteredPosts}
                    searchQuery={searchQuery}
                    selectedGenre={selectedGenre}
                    selectedDate={selectedDate}
                    onNavigate={navigate}
                />
            </div>
        </div>
    );
};