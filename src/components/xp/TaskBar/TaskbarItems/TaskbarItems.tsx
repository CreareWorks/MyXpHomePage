import Image from 'next/image';
import { DESKTOP_APP_CONFIGS, DesktopAppConfig } from '@/config/desktopApps';
import { type DesktopIconId } from '@/constants/desktopIconConstants';
import styles from './TaskbarItems.module.css';

interface TaskbarItemsProps {
    openWindowIds: DesktopIconId[];
    activeWindowId: DesktopIconId | null;
    minimizedWindowIds: DesktopIconId[];
    onTaskClick: (id: DesktopIconId) => void;
}

export function TaskbarItems({
    openWindowIds = [],
    activeWindowId,
    minimizedWindowIds,
    onTaskClick
}: TaskbarItemsProps) {
    return (
        <div className={styles.container}>
            {openWindowIds.map((id) => {
                const app: DesktopAppConfig | undefined = DESKTOP_APP_CONFIGS.find(app => app.id === id);
                if (!app) return null;

                const isActive: boolean = ((activeWindowId === id) && (!minimizedWindowIds.includes(id)));

                return (
                    <button
                        key={id}
                        className={`${styles.taskButton} ${isActive ? styles.active : ''}`}
                        onClick={() => onTaskClick(id)}
                    >
                        <Image src={app.icon} alt="" width={16} height={16} />
                        <span className={styles.title}>{app.title}</span>
                    </button>
                );
            })}
        </div>
    )
};
