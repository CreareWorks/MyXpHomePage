'use client';

import styles from './About.module.css';
import { Sidebar } from "./components/Sidebar";
import { ProfileHeader } from "./components/ProfileHeader";
import { AboutBody } from "./components/AboutBody";
import { useMobileSidebar } from "@/hooks/useMobileSidebar";
import { ExplorerAppLayout } from "@/components/xp/WindowAppLayout/ExplorerAppLayout";
import { ExplorerSidebar } from "@/components/xp/ExplorerSidebar/ExplorerSidebar";

export function Content() {
    const { isSidebarOpen, toggleSidebar, closeSidebar } = useMobileSidebar();

    return (
        <ExplorerAppLayout
            isSidebarOpen={isSidebarOpen}
            onToggleSidebar={toggleSidebar}
            onCloseSidebar={closeSidebar}
            sidebar={
                <ExplorerSidebar isOpen={isSidebarOpen}>
                    <Sidebar />
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