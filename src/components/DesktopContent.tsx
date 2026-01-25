'use client'

import styles from '@/app/page.module.css';
import { DesktopIcon } from '@/components/xp/DesktopIcon/DesktopIcon';
import { WindowFrame } from '@/components/xp/WindowFrame/WindowFrame';
import { TaskBar } from '@/components/xp/TaskBar/TaskBar';
import { WindowsProvider, useWindows } from '@/contexts/WindowsContext';
import { DesktopAppConfig, ON_DESKTOP_ICON_IDS } from '@/config/desktopApps';
import { ReactNode } from 'react';
import { DesktopIconId } from '@/constants/desktopIconConstants';

interface DesktopContentProps {
    configs: Omit<DesktopAppConfig, 'component'>[];
    children: Record<DesktopIconId, ReactNode>;
}

export function DesktopContent({ configs, children }: DesktopContentProps) {
    return (
        <WindowsProvider>
            <DesktopContentInner configs={configs} children={children} />
        </WindowsProvider>
    );
}

function DesktopContentInner({ configs, children }: DesktopContentProps) {
    const {
        selectedIconId,
        openWindowIds,
        activeWindowId,
        minimizedWindowIds,
        maximizedWindowIds,
        isStartMenuOpen,
        selectIcon,
        openWindow,
        closeWindow,
        minimizeWindow,
        focusWindow,
        handleTaskClick,
        toggleMaximizeWindow,
        toggleStartMenu,
        closeStartMenu,
        closeAllWindows,
    } = useWindows();

    return (
        <main
            className={styles.mainContainer}
            onClick={() => selectIcon(null)}
        >
            {/* デスクトップアイコン */}
            {configs
                .filter(config => ON_DESKTOP_ICON_IDS.includes(config.id))
                .map((config) => (
                    <DesktopIcon
                        key={config.id}
                        label={config.title}
                        icon={config.icon}
                        isSelected={selectedIconId === config.id}
                        onClick={() => selectIcon(config.id)}
                        onDoubleClick={() => openWindow(config.id)}
                        priority={true}
                    />
                ))}

            {/* ウィンドウ描画 */}
            {configs.map((config) => {
                if (!openWindowIds.includes(config.id)) return null;

                const isMinimized = minimizedWindowIds.includes(config.id);
                const isMaximized = maximizedWindowIds.includes(config.id);
                const isActive = activeWindowId === config.id;

                return (
                    <div
                        key={config.id}
                        className={`
              ${styles.windowWrapper} 
              ${isActive ? styles.active : ''} 
              ${isMinimized ? styles.hidden : ''}
            `}
                        onMouseDown={() => focusWindow(config.id)}
                    >
                        <div className={`${styles.windowContent} ${isMaximized ? styles.maximized : ''}`}>
                            <WindowFrame
                                title={config.title}
                                icon={config.icon}
                                isMaximized={isMaximized}
                                onClose={() => closeWindow(config.id)}
                                onMinimize={() => minimizeWindow(config.id)}
                                onMaximize={() => toggleMaximizeWindow(config.id)}
                                defaultSize={config.defaultSize}
                            >
                                {children[config.id]}
                            </WindowFrame>
                        </div>
                    </div>
                );
            })}

            {/* タスクバー */}
            <TaskBar
                openWindowIds={openWindowIds}
                activeWindowId={activeWindowId}
                minimizedWindowIds={minimizedWindowIds}
                isStartMenuOpen={isStartMenuOpen}
                onTaskClick={handleTaskClick}
                onToggleStartMenu={toggleStartMenu}
                onCloseStartMenu={closeStartMenu}
                onAppClick={openWindow}
                onLogOff={closeAllWindows}
            />
        </main>
    );
}
