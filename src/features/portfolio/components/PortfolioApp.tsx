'use client';

import React, { useState, useMemo } from 'react';
import { useQueryState } from 'nuqs';
import styles from './PortfolioApp.module.css';
import { PROJECTS } from '../data/projects';
import { PORTFOLIO_CATEGORIES } from '../constants/portfolioConstants';
import { PortfolioList } from './PortfolioList';
import { PortfolioDetail } from './PortfolioDetail';
import { useMobileSidebar } from '@/hooks/useMobileSidebar';
import { AddressBar } from '@/components/xp/AddressBar/AddressBar';
import { ExplorerAppLayout } from '@/components/xp/WindowAppLayout/ExplorerAppLayout';
import { ExplorerSidebar, SidebarSection, SidebarHeader, SidebarContent, SidebarLink } from '@/components/xp/ExplorerSidebar/ExplorerSidebar';

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
        <ExplorerAppLayout
            isSidebarOpen={isSidebarOpen}
            onToggleSidebar={toggleSidebar}
            onCloseSidebar={closeSidebar}
            toolbar={
                <div className={styles.toolbar}>
                    <div style={{ fontSize: '11px', color: '#666' }}>Address</div>
                    <AddressBar
                        address={`My Documents\\My Portfolio${currentProject ? `\\${currentProject.metadata.title}` : selectedCategory ? `\\${selectedCategory}` : ''}`}
                    />
                </div>
            }
            sidebar={
                <ExplorerSidebar isOpen={isSidebarOpen}>
                    <SidebarSection>
                        <SidebarHeader title="Categories" />
                        <SidebarContent>
                            <SidebarLink
                                label="全てのプロジェクト"
                                isActive={!selectedCategory}
                                onClick={() => {
                                    setSelectedCategory(null);
                                    setProjectId(null);
                                    closeSidebar();
                                }}
                            />
                            {categories.map(cat => (
                                <SidebarLink
                                    key={cat}
                                    label={cat}
                                    isActive={selectedCategory === cat}
                                    onClick={() => {
                                        setSelectedCategory(cat);
                                        setProjectId(null);
                                        closeSidebar();
                                    }}
                                />
                            ))}
                        </SidebarContent>
                    </SidebarSection>
                </ExplorerSidebar>
            }
        >
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
        </ExplorerAppLayout>
    );
}
