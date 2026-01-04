import Image, { StaticImageData } from "next/image";
import styles from '@/components/xp/WindowFrame/WindowFrame.module.css';
import { useWindowFrame } from '@/components/xp/WindowFrame/hooks/useWindowFrame';

interface WindowFrameProps {
    title: string;
    icon: StaticImageData;
    isMaximized?: boolean;
    onClose: () => void;
    onMinimize: () => void;
    onMaximize: () => void;
    children: React.ReactNode;
}

export function WindowFrame({
    title,
    icon,
    isMaximized,
    onClose,
    onMinimize,
    onMaximize,
    children
}: WindowFrameProps) {
    const { 
        position,
        size,
        isMounted,
        handleMouseDownDrag,
        handleMouseDownResize,
        handleTouchStartDrag,
        handleTouchStartResize,
    } = useWindowFrame();

    if (!isMounted) return null;

    return (
        <div 
            className={`${styles.window} ${isMaximized ? styles.maximizedWindow : ''}`}
            style={isMaximized ? undefined : {
                top: position.y,
                left: position.x,
                width: size.width,
                height: size.height,
            }}
        >
            <div 
                className={styles.titleBar}
                onMouseDown={handleMouseDownDrag}
                onTouchStart={handleTouchStartDrag}
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

                <div className={styles.buttonGroup}>
                    <button
                        className={styles.minimizeButton}
                        onClick={(e) => {
                            e.stopPropagation();
                            onMinimize();
                        }}
                        aria-label='Minimize'
                        >
                        _
                    </button>
                    <button 
                        className={styles.maximizeButton}
                        onClick={(e) => {
                            e.stopPropagation();
                            onMaximize();
                        }}
                    >
                        {isMaximized ? '❐' : '□'} 
                    </button>
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
            </div>
            <div className={styles.content}>
                {children}
            </div>

            <div 
                className={styles.resizer} 
                onMouseDown={handleMouseDownResize}
                onTouchStart={handleTouchStartResize}
            />
        </div>
    );
}