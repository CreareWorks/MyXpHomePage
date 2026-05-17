import type { ReactNode } from 'react';
import styles from './ExplorerSidebar.module.css';

interface ExplorerSidebarProps {
    isOpen: boolean;
    children: ReactNode;
    className?: string;
}

export function ExplorerSidebar({ isOpen, children, className = '' }: ExplorerSidebarProps) {
    return (
        <aside className={`${styles.sidebar} ${isOpen ? styles.open : ''} ${className}`}>
            {children}
        </aside>
    );
}

interface SidebarSectionProps {
    children: ReactNode;
    className?: string;
}

export function SidebarSection({ children, className = '' }: SidebarSectionProps) {
    return (
        <div className={`${styles.sidebarSection} ${className}`}>
            {children}
        </div>
    );
}

interface SidebarHeaderProps {
    title: string;
    children?: ReactNode;
}

export function SidebarHeader({ title, children }: SidebarHeaderProps) {
    return (
        <div className={styles.sidebarHeader}>
            <span>{title}</span>
            {children}
        </div>
    );
}

interface SidebarContentProps {
    children: ReactNode;
    className?: string;
}

export function SidebarContent({ children, className = '' }: SidebarContentProps) {
    return (
        <div className={`${styles.sidebarContent} ${className}`}>
            {children}
        </div>
    );
}

interface SidebarLinkProps {
    icon?: ReactNode | string;
    label: string;
    onClick?: () => void;
    isActive?: boolean;
    className?: string;
}

export function SidebarLink({ icon, label, onClick, isActive, className = '' }: SidebarLinkProps) {
    return (
        <div
            className={`${styles.sidebarLink} ${isActive ? styles.active : ''} ${className}`}
            onClick={onClick}
        >
            {icon && (
                <span className={styles.sidebarIcon}>
                    {typeof icon === 'string' ? icon : icon}
                </span>
            )}
            <span className={styles.label}>{label}</span>
        </div>
    );
}
