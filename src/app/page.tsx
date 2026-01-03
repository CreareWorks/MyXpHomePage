'use client'

import { useState } from 'react';
import { DesktopIcon } from '@/components/xp/DesktopIcon/DesktopIcon';
import { WindowFrame } from '@/components/xp/WindowFrame/WindowFrame';
import styles from '@/app/page.module.css';
import { DESKTOP_APPS } from '@/config/desktopApps';
import { type DesktopIconId } from '@/constants/desktopIcon';

export default function Desktop() {
  const [selectedIconId, setSelectedIconId] = useState<DesktopIconId | null>(null);
  const [openWindowIds, setOpenWindowIds] = useState<DesktopIconId[]>([]);

  const handleOpenWindow = (id: DesktopIconId) => {
    if (!openWindowIds.includes(id)) {
      setOpenWindowIds((prev) => [...prev, id]);
    }
  };
  const handleCloseWindow = (id: DesktopIconId) => {
    setOpenWindowIds((prev) => prev.filter((openId) => openId !== id));
  };

  return (
    <main
      className={styles.mainContainer}
      onClick={() => setSelectedIconId(null)}
    >
      {DESKTOP_APPS.map((app) => (
        <DesktopIcon
          key={app.id}
          label={app.title}
          icon={app.icon}
          isSelected={selectedIconId === app.id}
          onClick={() => setSelectedIconId(app.id)}
          onDoubleClick={() => handleOpenWindow(app.id)}
        />
        
      ))}

      {DESKTOP_APPS.map((app) => {
        if (!openWindowIds.includes(app.id)) return null;

        return (
          <WindowFrame
            key={app.id}
            title={app.title}
            icon={app.icon}
            onClose={() => handleCloseWindow(app.id)}
          >
            {app.component}
          </WindowFrame>
        );
      })}
    </main>
  )
}
