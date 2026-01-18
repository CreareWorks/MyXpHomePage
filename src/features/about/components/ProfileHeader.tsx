'use client';

import React from 'react';
import Image from 'next/image';
import styles from '../About.module.css';
import profileImage from '@/assets/userCover.png';

export function ProfileHeader() {
    return (
        <header className={styles.header}>
            <div className={styles.avatarWrapper}>
                <Image
                    src={profileImage}
                    alt="Profile"
                    width={82}
                    height={82}
                    className={styles.avatarImage}
                />
            </div>
            <div className={styles.titleInfo}>
                <h1>Youta Oshima</h1>
                <div className={styles.subtitle}>Web Developer</div>
            </div>
        </header>
    );
}
