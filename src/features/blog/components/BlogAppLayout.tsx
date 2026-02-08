'use client';

import React, { useState, useMemo, useTransition, useEffect, useRef } from 'react';
import styles from '@/features/blog/components/BlogApp.module.css';
import { PostMetadata, BlogPost } from '@/features/blog/types/index';
import { useQueryState } from 'nuqs';
import { BLOG_CATEGORIES } from '@/constants/blogConstants';
import { BlogToolbar } from './BlogToolbar';
import { BlogSidebar } from './BlogSidebar';
import { BlogMainContent } from './BlogMainContent';
import { useMobileSidebar } from '@/hooks/useMobileSidebar';
import { ExplorerAppLayout } from '@/components/xp/WindowAppLayout/ExplorerAppLayout';
import { ExplorerSidebar } from '@/components/xp/ExplorerSidebar/ExplorerSidebar';

interface BlogAppLayoutProps {
    allPosts: PostMetadata[];
    currentPost?: BlogPost | undefined;
    postContent?: React.ReactNode;
}

export const BlogAppLayout = ({ allPosts, currentPost, postContent }: BlogAppLayoutProps) => {
    // 状態管理
    const { isSidebarOpen, toggleSidebar, closeSidebar } = useMobileSidebar();
    const [isPending, startTransition] = useTransition();

    const historyIndexRef = useRef(0);
    const historyStackRef = useRef<(string | null)[]>([null]);
    const [canGoBack, setCanGoBack] = useState(false);
    const previousSlugRef = useRef<string | null>(null);

    // フィルタ条件のState
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [selectedGenre, setSelectedGenre] = useState<string | null>(null);

    // URL操作用
    const [slug, setSlug] = useQueryState('slug', {
        history: 'push',
        shallow: false,
    });

    // 履歴の状態を更新する関数
    const updateHistoryState = () => {
        setCanGoBack(historyIndexRef.current > 0);
    };

    // slugが変更されたときの処理
    useEffect(() => {
        const currentSlug = slug;
        const previousSlug = previousSlugRef.current;

        if (previousSlug === null && currentSlug === null) {
            previousSlugRef.current = currentSlug;
            updateHistoryState();
            return;
        }

        if (currentSlug === previousSlug) {
            return;
        }

        const slugIndexInHistory = historyStackRef.current.findIndex(
            (item, idx) => item === currentSlug && idx !== historyIndexRef.current
        );

        if (slugIndexInHistory !== -1) {
            historyIndexRef.current = slugIndexInHistory;
            previousSlugRef.current = currentSlug;
            updateHistoryState();
        } else {
            historyStackRef.current = historyStackRef.current.slice(0, historyIndexRef.current + 1);
            historyStackRef.current.push(currentSlug);
            historyIndexRef.current = historyStackRef.current.length - 1;
            previousSlugRef.current = currentSlug;
            updateHistoryState();
        }
    }, [slug]);

    const navigate = (newSlug: string | null) => {
        if (newSlug === slug) return;

        startTransition(() => {
            setSlug(newSlug);
        });
    };

    const goBack = () => {
        if (historyIndexRef.current > 0) {
            const targetIndex = historyIndexRef.current - 1;
            const targetSlug = historyStackRef.current[targetIndex] ?? null;

            startTransition(() => {
                setSlug(targetSlug);
            });
        }
    };

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
        return Array.from(dates).sort().reverse() as string[];
    }, [allPosts]);

    // リスト作成（ジャンル）
    const genres = useMemo(() => {
        const cats = new Set(allPosts.map(p => p.category || BLOG_CATEGORIES.OTHER));
        return Array.from(cats).sort() as string[];
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
        if (currentPost) return `My Documents\\Blog\\${currentPost.metadata.slug}`;

        let path = `My Documents\\Blog`;
        if (selectedGenre) path += `\\${selectedGenre}`;
        if (selectedDate) path += `\\${selectedDate}`;
        if (searchQuery) path += `\\Search: "${searchQuery}"`;
        return path;
    };

    return (
        <ExplorerAppLayout
            isSidebarOpen={isSidebarOpen}
            onToggleSidebar={toggleSidebar}
            onCloseSidebar={closeSidebar}
            toolbar={
                <BlogToolbar
                    canGoBack={canGoBack}
                    goBack={goBack}
                    onUp={onUp}
                    addressText={getAddressText()}
                />
            }
            sidebar={
                <ExplorerSidebar isOpen={isSidebarOpen}>
                    <BlogSidebar
                        searchQuery={searchQuery}
                        onSearchChange={handleSearch}
                        genres={genres}
                        selectedGenre={selectedGenre}
                        onFilterGenre={onFilterGenre}
                        archiveDates={archiveDates}
                        selectedDate={selectedDate}
                        onFilterDate={onFilterDate}
                    />
                </ExplorerSidebar>
            }
        >
            <BlogMainContent
                currentPost={currentPost}
                postContent={postContent}
                filteredPosts={filteredPosts}
                searchQuery={searchQuery}
                selectedGenre={selectedGenre}
                selectedDate={selectedDate}
                isLoading={isPending}
                onNavigate={navigate}
            />
        </ExplorerAppLayout>
    );
};