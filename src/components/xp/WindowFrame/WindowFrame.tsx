import Image, { StaticImageData } from "next/image";
import styles from '@/components/xp/WindowFrame/WindowFrame.module.css';
import { useWindowFrame } from '@/components/xp/WindowFrame/hooks/useWindowFrame';

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
    const { 
        position,
        size,
        handleMouseDownDrag,
        handleMouseDownResize
    } = useWindowFrame();

    return (
        <div 
            className={styles.window}
            style={{
                top: position.y,
                left: position.x,
                width: size.width,
                height: size.height,
            }}
        >
            <div 
                className={styles.titleBar}
                onMouseDown={handleMouseDownDrag}
                style={{ cursor: 'default' }}
            >
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

            <div 
                className={styles.resizer} 
                onMouseDown={handleMouseDownResize}
            />
        </div>
    );
}