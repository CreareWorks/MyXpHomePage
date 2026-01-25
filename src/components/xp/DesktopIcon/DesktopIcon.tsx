import { useRef } from 'react';
import Image, { StaticImageData } from 'next/image';
import styles from './DesktopIcon.module.css';

interface DesktopIconProps {
    label: string;
    icon: StaticImageData;
    isSelected: boolean;
    onClick: () => void;
    onDoubleClick: () => void;
    priority?: boolean;
    variant?: 'desktop' | 'explorer';
}

export function DesktopIcon({
    label,
    icon,
    isSelected,
    onClick,
    onDoubleClick,
    priority,
    variant = 'desktop'
}: DesktopIconProps) {
    const lastTapTimeRef = useRef<number>(0);

    const handleTouchEnd = (e: React.TouchEvent) => {
        e.stopPropagation();

        const now = Date.now();
        // スマホのダブルタップに対応させる
        if (now - lastTapTimeRef.current < 300) {
            onDoubleClick();
            lastTapTimeRef.current = 0;
        } else {
            onClick();
            lastTapTimeRef.current = now;
        }
    };

    return (
        <div
            className={`${styles.container} ${isSelected ? styles.selected : ''} ${styles[variant]}`}
            // PC用: クリック
            onClick={(e) => {
                e.stopPropagation();
                onClick();
            }}
            // PC用: ダブルクリック
            onDoubleClick={(e) => {
                e.stopPropagation();
                onDoubleClick();
            }}

            onTouchEnd={handleTouchEnd}
        >
            <div className={styles.iconImage}>
                <Image
                    src={icon}
                    alt={label}
                    draggable={false}
                    priority={!!priority}
                />
            </div>
            <span className={styles.label}>{label}</span>
        </div>
    );
}