'use client';

import styles from './MobileMenu.module.css';

interface MobileMenuProps {
    isOpen: boolean;
    onToggle: () => void;
    onClose: () => void;
}

/**
 * 各アプリウィンドウ（About, Blog, Portfolio）共通
 */
export function MobileMenu({ isOpen, onToggle, onClose }: MobileMenuProps) {
    return (
        <>
            <button
                className={styles.menuButton}
                onClick={onToggle}
            >
                {isOpen ? '閉じる' : 'メニュー'}
            </button>
            <div
                className={`${styles.overlay} ${isOpen ? styles.show : ''}`}
                onClick={onClose}
            />
        </>
    );
}
