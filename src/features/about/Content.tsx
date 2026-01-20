'use client';

import React from "react";
import { useQueryState, parseAsString } from 'nuqs';
import styles from './About.module.css';
import { Sidebar } from "./components/Sidebar";
import { ProfileHeader } from "./components/ProfileHeader";
import { AboutBody } from "./components/AboutBody";
import { useMobileSidebar } from "@/hooks/useMobileSidebar";
import { ExplorerAppLayout } from "@/components/xp/WindowAppLayout/ExplorerAppLayout";
import { ExplorerSidebar } from "@/components/xp/ExplorerSidebar/ExplorerSidebar";

export function Content() {
    const [, setApp] = useQueryState('app', parseAsString.withDefault('').withOptions({ history: 'push' }));
    const { isSidebarOpen, toggleSidebar, closeSidebar } = useMobileSidebar();

    const navigateTo = (id: string) => {
        setApp(id);
        closeSidebar();
    };

    return (
        <ExplorerAppLayout
            isSidebarOpen={isSidebarOpen}
            onToggleSidebar={toggleSidebar}
            onCloseSidebar={closeSidebar}
            sidebar={
                <ExplorerSidebar isOpen={isSidebarOpen}>
                    <Sidebar onNavigate={navigateTo} />
                </ExplorerSidebar>
            }
        >
            <main className={styles.mainContent}>
                <ProfileHeader />
                <AboutBody />
            </main>
        </ExplorerAppLayout>
    );
}