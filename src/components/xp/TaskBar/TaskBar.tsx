import styles from '@/components/xp/TaskBar/TaskBar.module.css';
import { StartButton } from '@/components/xp/TaskBar/StartMenu/Button/StartButton';
import { StartMenu } from '@/components/xp/TaskBar/StartMenu/Menu/StartMenu';
import { SystemTray } from './SystemTray/SystemTray';
import { TaskbarItems } from './TaskbarItems/TaskbarItems';
import { type DesktopIconId } from '@/constants/desktopIconConstants';

interface TaskBarProps {
    openWindowIds: DesktopIconId[];
    activeWindowId: DesktopIconId | null;
    minimizedWindowIds: DesktopIconId[];
    isStartMenuOpen: boolean;
    onTaskClick: (id: DesktopIconId) => void;
    onToggleStartMenu: () => void;
    onCloseStartMenu: () => void;
    onAppClick: (id: DesktopIconId) => void;
    onLogOff: () => void;
}

export function TaskBar({
    openWindowIds,
    activeWindowId,
    minimizedWindowIds,
    isStartMenuOpen,
    onTaskClick,
    onToggleStartMenu,
    onCloseStartMenu,
    onAppClick,
    onLogOff,
}: TaskBarProps) {
    return (
        <footer className={styles.bar}>
            {/* スタートメニュー */}
            <StartMenu
                isOpen={isStartMenuOpen}
                onClose={onCloseStartMenu}
                onAppClick={onAppClick}
                onLogOff={onLogOff}
            />
            {/* スタートボタン */}
            <StartButton
                isOpen={isStartMenuOpen}
                onClick={onToggleStartMenu}
            />

            {/*　開いてるアプリのタブ */}
            <TaskbarItems
                openWindowIds={openWindowIds}
                activeWindowId={activeWindowId}
                minimizedWindowIds={minimizedWindowIds}
                onTaskClick={onTaskClick}
            />

            {/* システムトレイ */}
            <SystemTray />
        </footer>
    );
}