'use client';

import React from "react";
import { useQueryState, parseAsString } from 'nuqs';
import styles from './About.module.css';
import { Sidebar } from "./components/Sidebar";
import { ProfileHeader } from "./components/ProfileHeader";
import { AboutBody } from "./components/AboutBody";

export function Content() {
    const [, setApp] = useQueryState('app', parseAsString.withDefault('').withOptions({ history: 'push' }));
    const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

    const navigateTo = (id: string) => {
        setApp(id);
        setIsSidebarOpen(false);
    };

    return (
        <div className={`${styles.container} ${isSidebarOpen ? styles.sidebarOpen : ''}`}>
            <button
                className={styles.menuButton}
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
                {isSidebarOpen ? '閉じる' : 'メニュー'}
            </button>

            <div className={styles.overlay} onClick={() => setIsSidebarOpen(false)} />

            <Sidebar onNavigate={navigateTo} />

            <main className={styles.mainContent}>
                <ProfileHeader />
                <AboutBody />
            </main>
        </div>
    );
}