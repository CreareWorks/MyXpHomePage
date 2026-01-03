import Image, { StaticImageData } from 'next/image';
import styles from '@/components/xp/DesktopIcon/DesktopIcon.module.css';

interface DesktopIconProps {
    label: string;
    icon: StaticImageData;
    isSelected: boolean;
    onClick: () => void;
    onDoubleClick: () => void;
}

export function DesktopIcon({
    label,
    icon,
    isSelected,
    onClick,
    onDoubleClick
}: DesktopIconProps) {
    return (
        <div
            className={`${styles.container} ${isSelected ? styles.selected : ''}`}
            onClick={(e) => {
                e.stopPropagation();
                onClick();
            }}
            onDoubleClick={(e) => {
                e.stopPropagation();
                onDoubleClick();
            }}
        >
            <div className={styles.iconImage}>
                <Image
                    src={icon}
                    alt={label}
                    draggable={false}
                />
            </div>
            <span className={styles.label}>{label}</span>
        </div>
    )
}