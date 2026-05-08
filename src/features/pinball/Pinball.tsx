'use client';

import React, { useState, useEffect } from 'react';
import styles from './Pinball.module.css';

export default function Pinball() {
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsReady(true), 300);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className={styles.container}>
            {isReady ? (
                <iframe
                    src="https://alula.github.io/SpaceCadetPinball/"
                    className={styles.iframe}
                    title="3D Pinball for Windows - Space Cadet"
                    frameBorder="0"
                    allow="autoplay; fullscreen; pointer-lock"
                    loading="eager"
                    referrerPolicy="no-referrer"
                    sandbox="allow-scripts allow-same-origin allow-pointer-lock allow-fullscreen"
                />
            ) : (
                <div style={{ flex: 1, backgroundColor: 'black' }} />
            )}
            <div className={styles.bottomBar}>
                <span>3D Pinball for Windows - Space Cadet</span>
            </div>
        </div>
    );
}
