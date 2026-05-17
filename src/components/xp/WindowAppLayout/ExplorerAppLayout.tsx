import type { ReactNode } from 'react';
import styles from './ExplorerAppLayout.module.css';
import { MobileMenu } from './MobileMenu';

interface ExplorerAppLayoutProps {
    children: ReactNode;
    sidebar: ReactNode;
    toolbar?: ReactNode;
    isSidebarOpen: boolean;
    onToggleSidebar: () => void;
    onCloseSidebar: () => void;
    containerClassName?: string | undefined;
    mainClassName?: string | undefined;
}

export function ExplorerAppLayout({
    children,
    sidebar,
    toolbar,
    isSidebarOpen,
    onToggleSidebar,
    onCloseSidebar,
    containerClassName = '',
    mainClassName = ''
}: ExplorerAppLayoutProps) {
    return (
        <div className={`${styles.container} ${isSidebarOpen ? styles.sidebarOpen : ''} ${containerClassName}`}>
            <MobileMenu
                isOpen={isSidebarOpen}
                onToggle={onToggleSidebar}
                onClose={onCloseSidebar}
            />

            {toolbar}

            <div className={styles.mainArea}>
                {sidebar}
                <main className={`${styles.contentArea} ${mainClassName}`}>
                    {children}
                </main>
            </div>
        </div>
    );
}
