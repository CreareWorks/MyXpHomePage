'use client';

import { useState, useEffect } from "react";
import Image from "next/image";
import styles from '@/components/xp/TaskBar/SystemTray/SystemTray.module.css';
import { SOCIAL_LINKS } from '@/config/socialLinks';

export function SystemTray() {
    const [time, setTime] = useState<string>('');

    useEffect(() => {
        const updateTime = () => {
            const now: Date = new Date();
            setTime(now.toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' }));
        }
        updateTime();
        const timer = setInterval(updateTime, 1000);
        return () => clearInterval(timer);
    }, []);

    const ICON_SIZE = 22;

    return (
        <div className={styles.container}>
            <div className={styles.snsIcons}>
                {SOCIAL_LINKS.map((link) => (
                    <a 
                        key={link.id}
                        href={link.url} 
                        target="_blank" 
                        rel="noreferrer" 
                        className={styles.snsLink}
                        title={link.title}
                    >
                        <Image 
                            src={link.icon} 
                            alt={link.title} 
                            width={ICON_SIZE} 
                            height={ICON_SIZE} 
                        />
                    </a>
                ))}
            </div>
            <div className={styles.clock}>{time}</div>
        </div>
    );
}