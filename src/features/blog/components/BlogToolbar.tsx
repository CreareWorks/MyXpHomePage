import React from 'react';
import styles from './BlogApp.module.css';

interface BlogToolbarProps {
    canGoBack: boolean;
    canGoForward: boolean;
    goBack: () => void;
    goForward: () => void;
    onUp: () => void;
    isSidebarOpen: boolean;
    toggleSidebar: () => void;
    addressText: string;
}

export const BlogToolbar = ({
    canGoBack,
    canGoForward,
    goBack,
    goForward,
    onUp,
    isSidebarOpen,
    toggleSidebar,
    addressText,
}: BlogToolbarProps) => {
    return (
        <div className={styles.toolbar}>
            <div className={styles.toolbarContainer}>
                <div className={styles.navRow}>
                    <div
                        className={`${styles.backButtonContainer} ${!canGoBack ? styles.disabled : ''}`}
                        onClick={canGoBack ? goBack : undefined}
                        title="Back"
                    >
                        <div className={styles.xpBackButton}>
                            ←
                        </div>
                        <span className={styles.xpBackText}>戻る</span>
                        <div className={styles.xpDropdown}>▼</div>
                    </div>
                    <button
                        className={styles.xpForwardButton}
                        onClick={goForward}
                        disabled={!canGoForward}
                        title="Forward"
                    >
                        →
                    </button>

                    <button
                        className={styles.upButton}
                        onClick={onUp}
                        title="Up"
                    >
                        📁
                    </button>

                    <button
                        className={styles.hamburger}
                        onClick={toggleSidebar}
                    >
                        ☰
                    </button>
                </div>

                <div className={styles.navRow}>
                    <div className={styles.addressLabel}>Address</div>
                    <div className={styles.addressInput}>
                        <span className={styles.addressIcon}>📂</span>
                        {addressText}
                    </div>
                </div>
            </div>
        </div>
    );
};
