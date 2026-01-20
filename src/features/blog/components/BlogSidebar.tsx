import React from 'react';
import {
    SidebarSection,
    SidebarHeader,
    SidebarContent,
    SidebarLink
} from '@/components/xp/ExplorerSidebar/ExplorerSidebar';
import styles from './BlogApp.module.css';

interface BlogSidebarProps {
    searchQuery: string;
    onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    genres: string[];
    selectedGenre: string | null;
    onFilterGenre: (genre: string) => void;
    archiveDates: string[];
    selectedDate: string | null;
    onFilterDate: (date: string) => void;
}

export const BlogSidebar = ({
    searchQuery,
    onSearchChange,
    genres,
    selectedGenre,
    onFilterGenre,
    archiveDates,
    selectedDate,
    onFilterDate,
}: BlogSidebarProps) => {
    return (
        <>
            {/* 検索 */}
            <SidebarSection>
                <SidebarHeader title="Search" />
                <SidebarContent>
                    <input
                        type="text"
                        className={styles.searchInput}
                        placeholder="Search titles..."
                        value={searchQuery}
                        onChange={onSearchChange}
                    />
                </SidebarContent>
            </SidebarSection>

            {/* ジャンル */}
            <SidebarSection>
                <SidebarHeader title="Categories" />
                <SidebarContent>
                    {genres.map(genre => (
                        <SidebarLink
                            key={genre}
                            label={genre}
                            isActive={selectedGenre === genre}
                            onClick={() => onFilterGenre(genre)}
                            icon="📁"
                        />
                    ))}
                </SidebarContent>
            </SidebarSection>

            {/* 日付アーカイブ */}
            <SidebarSection>
                <SidebarHeader title="Archives" />
                <SidebarContent>
                    {archiveDates.map(date => (
                        <SidebarLink
                            key={date}
                            label={date}
                            isActive={selectedDate === date}
                            onClick={() => onFilterDate(date)}
                            icon="📅"
                        />
                    ))}
                </SidebarContent>
            </SidebarSection>
        </>
    );
};
