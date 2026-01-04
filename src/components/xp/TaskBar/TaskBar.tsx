import styles from '@/components/xp/TaskBar/TaskBar.module.css';
import { StartButton } from '@/components/xp/TaskBar/StartButton/StartButton';
import { SystemTray } from './SystemTray/SystemTray';
import { TaskbarItems } from './TaskbarItems/TaskbarItems';
import { type DesktopIconId } from '@/constants/desktopIcon';

interface TaskBarProps {
    openWindowIds: DesktopIconId[];
    activeWindowId: DesktopIconId | null;
    minimizedWindowIds: DesktopIconId[];
    onTaskClick: (id: DesktopIconId) => void;
}

export function TaskBar({ 
    openWindowIds, 
    activeWindowId, 
    minimizedWindowIds, 
    onTaskClick 
}: TaskBarProps) {
    return (
        <footer className={styles.bar}>
            <StartButton/>

            <TaskbarItems
                openWindowIds={openWindowIds}
                activeWindowId={activeWindowId}
                minimizedWindowIds={minimizedWindowIds}
                onTaskClick={onTaskClick}
            />

            <SystemTray/>
        </footer>
    );
}