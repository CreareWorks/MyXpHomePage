import type { ChangeEvent } from 'react';
import {
    SidebarSection,
    SidebarHeader,
    SidebarContent,
    SidebarLink
} from '@/components/xp/ExplorerSidebar/ExplorerSidebar';
import styles from './BlogApp.module.css';
import { SidebarAppLinks } from '@/components/xp/ExplorerSidebar/SidebarAppLinks';
import { DESKTOP_ICON_IDS } from '@/constants/desktopIconConstants';

interface BlogSidebarProps {
    searchQuery: string;
    onSearchChange: (e: ChangeEvent<HTMLInputElement>) => void;
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
            <SidebarAppLinks currentAppId={DESKTOP_ICON_IDS.BLOG} />
            {/* 検索 */}
            <SidebarSection>
                <SidebarHeader title="検索" />
                <SidebarContent>
                    <input
                        type="text"
                        className={styles.searchInput}
                        placeholder="タイトルで検索..."
                        value={searchQuery}
                        onChange={onSearchChange}
                    />
                </SidebarContent>
            </SidebarSection>

            {/* ジャンル */}
            <SidebarSection>
                <SidebarHeader title="ジャンル" />
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
                <SidebarHeader title="アーカイブ" />
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
