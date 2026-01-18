import React from "react";
import Image from "next/image";
import styles from './About.module.css';
import { SOCIAL_LINKS } from "@/config/socialLinks";
import profileImage from '@/assets/userCover.png';

export function Content() {
    return (
        <div className={styles.container}>
            <div className={styles.profileHeader}>
                <div className={styles.avatar}>
                    <Image
                        src={profileImage}
                        alt="Profile"
                        width={80}
                        height={80}
                        style={{ objectFit: 'cover' }}
                    />
                </div>
                <div className={styles.nameGroup}>
                    <h1>Youta Oshima</h1>
                    <div className={styles.role}>
                        <span>Web Developer</span>
                        <span className={styles.tag}>Creare</span>
                    </div>
                </div>
            </div>

            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Introduction</h2>
                <div className={styles.text}>
                    <p>
                        はじめまして、大島（Creare）です。<br />
                        都内でWebエンジニアとして働いています。
                    </p>
                    <p>
                        開発自体だけでなく、人への関心(マネジメント)や組織設計等にも関心を高く持って日々の業務に当たるように心がけています。
                    </p>
                    <p>
                        当サイトは"Windows XP" をテーマに、懐かしさと新しさが同居する体験を求めてこれからも更新していく予定です。
                    </p>
                </div>
            </section>

            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Connections & Skills</h2>
                <div className={styles.linkGrid}>
                    {SOCIAL_LINKS.map((link) => (
                        <a
                            key={link.id}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.linkCard}
                        >
                            <div className={styles.linkIconWrapper}>
                                <Image
                                    src={link.icon}
                                    alt={link.title}
                                    width={32}
                                    height={32}
                                />
                            </div>
                            <div className={styles.linkInfo}>
                                <span className={styles.linkTitle}>{link.title}</span>
                                <span className={styles.linkDesc}>{link.description}</span>
                            </div>
                        </a>
                    ))}
                </div>
            </section>
        </div>
    );
}