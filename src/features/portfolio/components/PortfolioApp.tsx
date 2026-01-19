'use client';

import React, { useState, useMemo } from 'react';
import { useQueryState } from 'nuqs';
import styles from './PortfolioApp.module.css';
import { PROJECTS } from '../data/projects';
import { PORTFOLIO_CATEGORIES } from '../constants/portfolioConstants';
import { PortfolioList } from './PortfolioList';
import { PortfolioDetail } from './PortfolioDetail';
import { MobileMenu } from '@/components/xp/WindowAppLayout/MobileMenu';
import { useMobileSidebar } from '@/hooks/useMobileSidebar';
import { AddressBar } from '@/components/xp/AddressBar/AddressBar';

export function PortfolioApp() {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const { isSidebarOpen, toggleSidebar, closeSidebar } = useMobileSidebar();
    const [projectId, setProjectId] = useQueryState('pid', {
        history: 'push',
        shallow: true
    });

    const filteredProjects = useMemo(() => {
        if (!selectedCategory) return PROJECTS;
        return PROJECTS.filter(p => p.metadata.category === selectedCategory);
    }, [selectedCategory]);

    const currentProject = useMemo(() => {
        if (!projectId) return null;
        return PROJECTS.find(p => p.metadata.id === projectId) || null;
    }, [projectId]);

    const categories = Object.values(PORTFOLIO_CATEGORIES);

    return (
        <div className={`${styles.container} ${isSidebarOpen ? styles.sidebarOpen : ''}`}>
            <MobileMenu
                isOpen={isSidebarOpen}
                onToggle={toggleSidebar}
                onClose={closeSidebar}
            />
            <div className={styles.toolbar}>
                <div style={{ fontSize: '11px', color: '#666' }}>Address</div>
                <AddressBar
                    address={`My Documents\\My Portfolio${currentProject ? `\\${currentProject.metadata.title}` : selectedCategory ? `\\${selectedCategory}` : ''}`}
                />
            </div>

            <div className={styles.mainArea}>
                <aside className={styles.sidebar}>
                    <div className={styles.sidebarSection}>
                        <div className={styles.sidebarHeader}>
                            Categories
                        </div>
                        <div className={styles.sidebarContent}>
                            <div
                                className={`${styles.categoryLink} ${!selectedCategory ? styles.active : ''}`}
                                onClick={() => {
                                    setSelectedCategory(null);
                                    setProjectId(null);
                                    closeSidebar();
                                }}
                            >
                                全てのプロジェクト
                            </div>
                            {categories.map(cat => (
                                <div
                                    key={cat}
                                    className={`${styles.categoryLink} ${selectedCategory === cat ? styles.active : ''}`}
                                    onClick={() => {
                                        setSelectedCategory(cat);
                                        setProjectId(null);
                                        closeSidebar();
                                    }}
                                >
                                    {cat}
                                </div>
                            ))}
                        </div>
                    </div>
                </aside>

                <main className={styles.contentArea}>
                    {currentProject ? (
                        <PortfolioDetail
                            project={currentProject}
                            onBack={() => setProjectId(null)}
                        />
                    ) : (
                        <PortfolioList
                            projects={filteredProjects.map(p => p.metadata)}
                            onSelect={(id) => setProjectId(id)}
                        />
                    )}
                </main>
            </div>
        </div>
    );
}
