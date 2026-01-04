'use client';

import { useState, useEffect } from "react";
import Image from "next/image";
import styles from '@/components/xp/TaskBar/SystemTray/SystemTray.module.css';

import githubLogo from '@/assets/sosial/github.png';
import qiitaLogo from '@/assets/sosial/qiita.png';
import zennLogo from '@/assets/sosial/zenn.png';
import findyLogo from '@/assets/sosial/findy.png';
import xLogo from '@/assets/sosial/x.png';

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
                <a href="https://github.com/CreareWorks" target="_blank" rel="noreferrer" className={styles.snsLink}>
                    <Image 
                        src={githubLogo} 
                        alt="GitHub" 
                        width={ICON_SIZE} 
                        height={ICON_SIZE} 
                    />
                </a>
                <a href="https://qiita.com/y_o_28" target="_blank" rel="noreferrer" className={styles.snsLink}>
                    <Image 
                        src={qiitaLogo} 
                        alt="Qiita" 
                        width={ICON_SIZE} 
                        height={ICON_SIZE} 
                    />
                </a>
                <a href="https://zenn.dev/creare" target="_blank" rel="noreferrer" className={styles.snsLink}>
                    <Image 
                        src={zennLogo} 
                        alt="Zenn" 
                        width={ICON_SIZE} 
                        height={ICON_SIZE} 
                    />
                </a>
                <a href="https://findy-code.io/skills-share/84ww_8Epwlqfg" target="_blank" rel="noreferrer" className={styles.snsLink}>
                    <Image 
                        src={findyLogo} 
                        alt="Findy" 
                        width={ICON_SIZE} 
                        height={ICON_SIZE} 
                    />
                </a>
                <a href="https://x.com/creareworks" target="_blank" rel="noreferrer" className={styles.snsLink}>
                    <Image 
                        src={xLogo} 
                        alt="x" 
                        width={ICON_SIZE} 
                        height={ICON_SIZE} 
                    />
                </a>
            </div>
            <div className={styles.clock}>{time}</div>
        </div>
    );
}