'use client';

import React from 'react';
import Image from 'next/image';
import styles from '../About.module.css';
import { DESKTOP_APP_CONFIGS } from '@/config/desktopApps';
import { DESKTOP_ICON_IDS } from '@/constants/desktopIconConstants';

interface SidebarProps {
    onNavigate: (id: string) => void;
}

export function Sidebar({ onNavigate }: SidebarProps) {
    const menuApps = DESKTOP_APP_CONFIGS.filter(app => app.id !== DESKTOP_ICON_IDS.ABOUT);

    return (
        <aside className={styles.sidebar}>
            <div className={styles.sidebarSection}>
                <div className={styles.sidebarHeader}>
                    コンテンツ
                </div>
                <div className={styles.sidebarContent}>
                    {menuApps.map(app => (
                        <div
                            key={app.id}
                            className={styles.sidebarLink}
                            onClick={() => onNavigate(app.id)}
                        >
                            <div className={styles.sidebarIcon}>
                                <Image
                                    src={app.icon}
                                    alt=""
                                    width={16}
                                    height={16}
                                />
                            </div>
                            {app.title}
                        </div>
                    ))}
                </div>
            </div>
        </aside>
    );
}
