'use client';

import { useState, useMemo, useTransition } from 'react';
import type { ChangeEvent, ReactNode } from 'react';
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
    postContent?: ReactNode;
}

export const BlogAppLayout = ({ allPosts, currentPost, postContent }: BlogAppLayoutProps) => {
    const { isSidebarOpen, toggleSidebar, closeSidebar } = useMobileSidebar();
    const [isPending, startTransition] = useTransition();

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [selectedGenre, setSelectedGenre] = useState<string | null>(null);

    const [slug, setSlug] = useQueryState('slug', {
        history: 'push',
        shallow: false,
    });

    // 記事を表示中なら「戻る」でリストに戻れる
    const canGoBack = slug !== null;

    const navigate = (newSlug: string | null) => {
        if (newSlug === slug) return;
        startTransition(() => {
            setSlug(newSlug);
        });
    };

    const goBack = () => {
        startTransition(() => {
            setSlug(null);
        });
    };

    const filteredPosts = useMemo(() => {
        return allPosts.filter(post => {
            const matchQuery = searchQuery
                ? post.title.toLowerCase().includes(searchQuery.toLowerCase())
                : true;
            const matchDate = selectedDate
                ? post.date.startsWith(selectedDate)
                : true;
            const postCategory = post.category || BLOG_CATEGORIES.OTHER;
            const matchGenre = selectedGenre
                ? postCategory === selectedGenre
                : true;
            return matchQuery && matchDate && matchGenre;
        });
    }, [allPosts, searchQuery, selectedDate, selectedGenre]);

    const archiveDates = useMemo(() => {
        const dates = new Set(allPosts.map(p => p.date.substring(0, 7)));
        return Array.from(dates).sort().reverse() as string[];
    }, [allPosts]);

    const genres = useMemo(() => {
        const cats = new Set(allPosts.map(p => p.category || BLOG_CATEGORIES.OTHER));
        return Array.from(cats).sort() as string[];
    }, [allPosts]);

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
        if (currentPost) navigate(null);
    };

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
        if (currentPost) navigate(null);
        setSearchQuery('');
        setSelectedDate(null);
        setSelectedGenre(null);
    };

    const getAddressText = () => {
        if (currentPost) return `My Documents\\Blog\\${currentPost.metadata.slug}`;
        let p = `My Documents\\Blog`;
        if (selectedGenre) p += `\\${selectedGenre}`;
        if (selectedDate) p += `\\${selectedDate}`;
        if (searchQuery) p += `\\Search: "${searchQuery}"`;
        return p;
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
