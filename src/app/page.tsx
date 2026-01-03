'use client'

import { useState } from 'react';
import { DesktopIcon } from '@/components/xp/DesktopIcon/DesktopIcon';
import { WindowFrame } from '@/components/xp/WindowFrame/WindowFrame';
import styles from '@/app/page.module.css';
import { DESKTOP_ICON_IDS, type DesktopIconId } from '@/constants/desktop';

import aboutIcon from '@/assets/icon/about.png';

export default function Desktop() {
  const [selectedId, setSelectedId] = useState<DesktopIconId | null>(null);
  const [isWindowOpen, setIsWindowOpen] = useState<boolean>(false);

  return (
    <main
      className={styles.mainContainer}
      onClick={() => setSelectedId(null)}
    >
      <DesktopIcon
        label='私について'
        icon={aboutIcon}
        isSelected={selectedId === DESKTOP_ICON_IDS.ABOUT}
        onClick={() => setSelectedId(DESKTOP_ICON_IDS.ABOUT)}
        onDoubleClick={() => setIsWindowOpen(true)}
      />

      {
        isWindowOpen && (
          <WindowFrame
            title='私について'
            icon={aboutIcon}
            onClose={ () => setIsWindowOpen(false) }
          >
            <h2>私について</h2>
            <p>はじめまして</p>
            <p>testtesttesttest hogehogehoge</p>
          </WindowFrame>
        )
      }
    </main>
  )
}
