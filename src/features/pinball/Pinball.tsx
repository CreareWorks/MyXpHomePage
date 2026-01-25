'use client';

import React from 'react';
import styles from './Pinball.module.css';

export default function Pinball() {
    return (
        <div className={styles.container}>
            <div className={styles.iframeWrapper}>
                <iframe
                    src="https://alula.github.io/SpaceCadetPinball/"
                    className={styles.iframe}
                    title="3D Pinball for Windows - Space Cadet"
                    frameBorder="0"
                />
            </div>
            <div className={styles.overlay}>
                <p>3D Pinball for Windows - Space Cadet</p>
            </div>
        </div>
    );
}
