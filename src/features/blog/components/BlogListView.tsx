'use client';

import React, { useTransition } from 'react';
import styles from '@/features/blog/components/BlogApp.module.css';
import { PostMetadata } from '@/features/blog/types/index';
import { useQueryState } from 'nuqs';

interface BlogListPresenterProps {
    posts: PostMetadata[];
}

export const BlogListView = ({ posts }: BlogListPresenterProps) => {
    const [, setSlug] = useQueryState('slug', {
        history: 'push',
        shallow: false,
    });
    const handlePostClick = (slug: string) => {
        setSlug(slug);
    };

    return (
        <div className={styles.container}>
            {/* ツールバー */}
            <div className={styles.toolbar}>
                <div className={styles.toolbarRow}>
                    <button className={styles.navButton} disabled>←</button>
                    <button className={styles.navButton} style={{ marginLeft: 4 }} disabled>→</button>
                    <span style={{ marginLeft: 10, color: '#666', fontSize: 20 }}>📁</span>
                </div>
                <div className={styles.toolbarRow}>
                    <span className={styles.addressLabel}>Address</span>
                    <div className={styles.addressInput}>
                        <span style={{ marginRight: 4 }}>📂</span>
                        My Documents\Blog
                    </div>
                    <button className={styles.goButton}>Go</button>
                </div>
            </div>

            <div className={styles.mainArea}>
                {/* サイドバー */}
                <div className={styles.sidebar}>
                    <div className={styles.sidebarBox}>
                        <div className={styles.sidebarHeader}>
                            <span>Blog Tasks</span>
                        </div>
                        <div className={styles.sidebarContent}>
                            <div className={styles.sidebarLink}>
                                <span>🔍</span> Search posts
                            </div>
                        </div>
                    </div>

                    <div className={styles.sidebarBox}>
                        <div className={styles.sidebarHeader}>
                            <span>Details</span>
                        </div>
                        <div className={styles.sidebarContent}>
                            <div style={{ fontSize: '11px', color: '#333' }}>
                                <strong>Blog</strong><br />
                                File Folder<br /><br />
                                Total: {posts.length} posts
                            </div>
                        </div>
                    </div>
                </div>

                {/* メインコンテンツ */}
                <div className={styles.contentArea}>
                    {posts.length === 0 ? (
                        <div style={{ padding: 20, fontSize: 12, color: '#666' }}>No posts found.</div>
                    ) : (
                        <div className={styles.fileGrid}>
                            {posts.map((post) => (
                                <div
                                    key={post.slug}
                                    className={styles.fileItem}
                                    onDoubleClick={() => handlePostClick(post.slug)}
                                    title={post.title}
                                >
                                    <div className={styles.fileIcon}>📄</div>
                                    <span className={styles.fileLabel}>{post.title}</span>
                                    <span className={styles.fileDate}>{post.date}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};