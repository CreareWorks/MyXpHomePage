'use client';

import styles from './FolderView.module.css';
import { DesktopIcon } from '@/components/xp/DesktopIcon/DesktopIcon';
import { useWindows } from '@/contexts/WindowsContext';
import { DESKTOP_APP_CONFIGS } from '@/config/desktopApps';
import { DesktopIconId } from '@/constants/desktopIconConstants';

interface FolderViewProps {
    childrenIds: DesktopIconId[];
}

export function FolderView({ childrenIds }: FolderViewProps) {
    const { openWindow, selectIcon, selectedIconId } = useWindows();

    const childConfigs = childrenIds
        .map(id => DESKTOP_APP_CONFIGS.find(config => config.id === id))
        .filter((config) => !!config);

    return (
        <div className={styles.container}>
            <div className={styles.iconGrid}>
                {childConfigs.map(config => (
                    <DesktopIcon
                        key={config.id}
                        label={config.title}
                        icon={config.icon}
                        isSelected={selectedIconId === config.id}
                        onClick={() => selectIcon(config.id)}
                        onDoubleClick={() => openWindow(config.id)}
                        variant="explorer"
                    />
                ))}
            </div>
        </div>
    );
}
