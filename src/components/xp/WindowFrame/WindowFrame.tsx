import Image, { StaticImageData } from "next/image";
import styles from '@/components/xp/WindowFrame/WindowFrame.module.css';

interface WindowFrameProps {
    title: string;
    icon: StaticImageData;
    onClose: () => void;
    children: React.ReactNode;
}

export function WindowFrame({
    title,
    icon,
    onClose,
    children
}: WindowFrameProps) {
    return (
        <div className={styles.window}>
            <div className={styles.titleBar}>
                <div className={styles.titleGroup}>
                    <Image 
                        src={icon} 
                        alt="コンテンツのアイコンイメージ"
                        width={16} 
                        height={16} 
                        className={styles.icon}
                        draggable={false} 
                    />
                    <span className={styles.titleText}>{title}</span>
                </div>

                <button
                    className={styles.closeButton}
                    onClick={(e) => {
                        e.stopPropagation();
                        onClose();
                    }}
                    aria-label='Close'
                >
                    ×
                </button>
            </div>
            <div className={styles.content}>
                {children}
            </div>
        </div>
    );
}