import React from 'react';
import Image from 'next/image';
import styles from './StartMenu.module.css';
import { DESKTOP_APPS, ON_DESKTOP_ICON_IDS } from '@/config/desktopApps';
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
    if (!isOpen) return null;

    // シャットダウン処理：ブラウザのタブを閉じる
    const handleShutDown = () => {
        alert('当サイトを見つけて、触ってくれてありがとうございます、シャットダウンの概念がweb上で存在しない分、感謝をお伝えします。');
    };

    return (
        <>
            <div className={styles.overlay} onClick={onClose} />

            <div className={styles.menuContainer}>
                {/* ヘッダー */}
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

                {/* ボディ */}
                <div className={styles.body}>
                    {/* 左カラム：アプリ一覧 (About, Portfolio, etc.) */}
                    <div className={styles.leftColumn}>
                        {DESKTOP_APPS
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

                    {/* 右カラム：ソーシャルリンク一覧 (GitHub, Qiita, etc.) */}
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
                                    alt="ソーシャルアイコンがぞう"
                                    className={styles.socialIcon}
                                />
                                <div className={styles.itemText}>
                                    <span className={styles.itemTitle}>{link.title}</span>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>

                {/* フッター */}
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
                        title="このタブを閉じます"
                    >
                        <div className={styles.shutDownIcon}>⏻</div>
                        <span>終了オプション</span>
                    </button>
                </div>
            </div>
        </>
    );
};