import React from 'react';
import styles from './BlogApp.module.css';

interface BlogSidebarProps {
    isOpen: boolean;
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
    isOpen,
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
        <div className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
            {/* 検索 */}
            <div className={styles.sidebarBox}>
                <div className={styles.sidebarHeader}>Search</div>
                <div className={styles.sidebarContent}>
                    <input
                        type="text"
                        className={styles.searchInput}
                        placeholder="Search titles..."
                        value={searchQuery}
                        onChange={onSearchChange}
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
                            onClick={() => onFilterGenre(genre)}
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
                            onClick={() => onFilterDate(date)}
                        >
                            📅 {date}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
