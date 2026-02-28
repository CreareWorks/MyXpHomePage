'use client';

import React from 'react';
import Image from 'next/image';
import styles from '../About.module.css';
import { SOCIAL_LINKS } from "@/config/socialLinks";
import introduceImage from '@/assets/about/introduce.png';

export function AboutBody() {
    return (
        <>
            <section className={styles.section}>
                <div className={styles.sectionTitle}>自己紹介</div>
                <div className={styles.paragraph}>
                    はじめまして、大島（Creare）と申します。都内でWebエンジニアとして働いています。
                </div>
                <div className={styles.paragraph}>
                    技術への探究心はもちろん、人や組織、マネジメントといった領域にも強い関心を持っており、技術と組織の両面からより良いプロダクト作りを目指しています。
                </div>
                <div className={styles.paragraph}>
                    このサイトは "Windows XP" をテーマに、かつてのインターネットが持っていたワクワク感と現代の最新技術を融合させるべく、これからもアップデートを続けていく予定です。
                </div>
            </section>

            <section className={styles.section}>
                <div className={styles.sectionTitle}>このサイトの楽しみ方</div>
                <div className={styles.paragraph}>
                    <p>このサイトはマルチウィンドウに対応しており、ウィンドウの最大化を解除（元に戻す）したり、最小化することでデスクトップのアイコンから複数のアプリを同時に立ち上げることができます。</p>
                    <p>また、スタートボタンやタスクバーなどもXP風の操作感を表現しています、ぜひあの頃の懐かしさを思い出しつつ楽しんでいただけたらと思います！</p>
                </div>
                <div className={styles.introImageWrapper}>
                    <Image
                        src={introduceImage}
                        alt="HPの楽しみ方"
                        className={styles.introImage}
                    />
                </div>
            </section>

            <section className={styles.section}>
                <div className={styles.sectionTitle}>外部リンク</div>
                <div className={styles.linkGrid}>
                    {SOCIAL_LINKS.map((link) => (
                        <a
                            key={link.id}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.linkItem}
                        >
                            <div className={styles.linkIcon}>
                                <Image
                                    src={link.icon}
                                    alt={link.title}
                                    width={32}
                                    height={32}
                                />
                            </div>
                            <div className={styles.linkTexts}>
                                <span className={styles.linkName}>{link.title}</span>
                                <span className={styles.linkDescription}>{link.description}</span>
                            </div>
                        </a>
                    ))}
                </div>
            </section>
        </>
    );
}
