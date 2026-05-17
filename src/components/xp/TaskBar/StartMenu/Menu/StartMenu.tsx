'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from './StartMenu.module.css';
import { DESKTOP_APP_CONFIGS, ON_DESKTOP_ICON_IDS } from '@/config/desktopApps';
import { SOCIAL_LINKS } from '@/config/socialLinks';
import { type DesktopIconId } from '@/constants/desktopIconConstants';
import userCover from '@/assets/userCover.png';

interface StartMenuProps {
    isOpen: boolean;
    onClose: () => void;
    onAppClick: (id: DesktopIconId) => void;
    onLogOff: () => void;
}

export const StartMenu = ({
    isOpen,
    onClose,
    onAppClick,
    onLogOff
}: StartMenuProps) => {
    const [shutdownMessage, setShutdownMessage] = useState(false);

    if (!isOpen) return null;

    const handleShutDown = () => {
        setShutdownMessage(true);
    };

    return (
        <>
            <div className={styles.overlay} onClick={onClose} />

            <div className={styles.menuContainer}>
                <div className={styles.header}>
                    <div className={styles.userIconFrame}>
                        <Image
                            src={userCover}
                            alt="プロフィール画像"
                            className={styles.profileImage}
                        />
                    </div>
                    <span className={styles.userName}>大島 遥汰 / Creare Works</span>
                </div>

                {shutdownMessage ? (
                    <div className={styles.shutdownDialog}>
                        <p>当サイトを見つけて、触ってくれてありがとうございます。</p>
                        <p>シャットダウンの概念がweb上で存在しない分、感謝をお伝えします。</p>
                        <button className={styles.shutdownOkButton} onClick={onClose}>OK</button>
                    </div>
                ) : (
                    <div className={styles.body}>
                        <div className={styles.leftColumn}>
                            {DESKTOP_APP_CONFIGS
                                .filter(app => ON_DESKTOP_ICON_IDS.includes(app.id))
                                .map((app) => (
                                    <div
                                        key={app.id}
                                        className={styles.menuItem}
                                        onClick={() => onAppClick(app.id)}
                                    >
                                        <Image
                                            src={app.icon}
                                            alt="アプリ画像"
                                            className={styles.appIcon}
                                        />
                                        <div className={styles.itemText}>
                                            <span className={styles.itemTitle}>{app.title}</span>
                                        </div>
                                    </div>
                                ))}
                        </div>

                        <div className={styles.rightColumn}>
                            {SOCIAL_LINKS.map((link) => (
                                <a
                                    key={link.id}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={styles.menuItem}
                                >
                                    <Image
                                        src={link.icon}
                                        alt="ソーシャルアイコン"
                                        className={styles.socialIcon}
                                    />
                                    <div className={styles.itemText}>
                                        <span className={styles.itemTitle}>{link.title}</span>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>
                )}

                <div className={styles.footer}>
                    <button
                        className={styles.logOffButton}
                        onClick={onLogOff}
                        title="開いているウィンドウをすべて閉じます"
                    >
                        <div className={styles.logOffIcon}>🔑</div>
                        <span>ログオフ</span>
                    </button>

                    <button
                        className={styles.shutDownButton}
                        onClick={handleShutDown}
                        title="終了オプション"
                    >
                        <div className={styles.shutDownIcon}>⏻</div>
                        <span>終了オプション</span>
                    </button>
                </div>
            </div>
        </>
    );
};
