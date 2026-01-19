'use client';

import React from "react";
import { useQueryState, parseAsString } from 'nuqs';
import styles from './About.module.css';
import { Sidebar } from "./components/Sidebar";
import { ProfileHeader } from "./components/ProfileHeader";
import { AboutBody } from "./components/AboutBody";
import { MobileMenu } from "@/components/xp/WindowAppLayout/MobileMenu";
import { useMobileSidebar } from "@/hooks/useMobileSidebar";

export function Content() {
    const [, setApp] = useQueryState('app', parseAsString.withDefault('').withOptions({ history: 'push' }));
    const { isSidebarOpen, toggleSidebar, closeSidebar } = useMobileSidebar();

    const navigateTo = (id: string) => {
        setApp(id);
        closeSidebar();
    };

    return (
        <div className={`${styles.container} ${isSidebarOpen ? styles.sidebarOpen : ''}`}>
            <MobileMenu
                isOpen={isSidebarOpen}
                onToggle={toggleSidebar}
                onClose={closeSidebar}
            />

            <Sidebar onNavigate={navigateTo} />

            <main className={styles.mainContent}>
                <ProfileHeader />
                <AboutBody />
            </main>
        </div>
    );
}