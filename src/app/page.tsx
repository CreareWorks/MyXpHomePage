'use client'

import styles from '@/app/page.module.css';
import { DesktopIcon } from '@/components/xp/DesktopIcon/DesktopIcon';
import { WindowFrame } from '@/components/xp/WindowFrame/WindowFrame';
import { TaskBar } from '@/components/xp/TaskBar/TaskBar';

import { DESKTOP_APPS } from '@/config/desktopApps';

import { useDesktop } from '@/hooks/useDesktop';
import { Suspense } from 'react';

function DesktopContent() {
  const {
    selectedIconId,
    openWindowIds,
    activeWindowId,
    minimizedWindowIds,
    maximizedWindowIds,
    selectIcon,
    openWindow,
    closeWindow,
    minimizeWindow,
    focusWindow,
    handleTaskClick,
    toggleMaximizeWindow,
  } = useDesktop();

  return (
    <main
      className={styles.mainContainer}
      onClick={() => selectIcon(null)}
    >
      {/* デスクトップアイコン */}
      {DESKTOP_APPS.map((app) => (
        <DesktopIcon
          key={app.id}
          label={app.title}
          icon={app.icon}
          isSelected={selectedIconId === app.id}
          onClick={() => selectIcon(app.id)}
          onDoubleClick={() => openWindow(app.id)}
        />
      ))}

      {/* ウィンドウ描画 */}
      {DESKTOP_APPS.map((app) => {
        if (!openWindowIds.includes(app.id)) return null;

        const isMinimized = minimizedWindowIds.includes(app.id);
        const isMaximized = maximizedWindowIds.includes(app.id);
        const isActive = activeWindowId === app.id;

        return (
          <div
            key={app.id}
            className={`
              ${styles.windowWrapper} 
              ${isActive ? styles.active : ''} 
              ${isMinimized ? styles.hidden : ''}
            `}
            // ウィンドウ領域をクリック(MouseDown)した時点で最前面にする
            onMouseDown={() => focusWindow(app.id)}
          >
            {/* アクティブなら手前(z:100)、それ以外は奥(z:1) */}
            <div className={styles.windowContent}>
              <WindowFrame
                title={app.title}
                icon={app.icon}
                isMaximized={isMaximized}
                onClose={() => closeWindow(app.id)}
                onMinimize={() => minimizeWindow(app.id)}
                onMaximize={() => toggleMaximizeWindow(app.id)}
              >
                {app.component}
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
        onTaskClick={handleTaskClick}
      />
    </main>
  );
}

export default function DesktopPage() {
  return (
    <Suspense fallback={<div>Loading XP...</div>}>
      <DesktopContent />
    </Suspense>
  );
}
