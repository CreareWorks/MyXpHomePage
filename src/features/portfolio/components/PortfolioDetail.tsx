'use client';

import Image from 'next/image';
import styles from './PortfolioApp.module.css';
import { Project } from '../types';

interface PortfolioDetailProps {
    project: Project;
    onBack: () => void;
}

export function PortfolioDetail({ project, onBack }: PortfolioDetailProps) {
    const { metadata, content } = project;

    return (
        <div className={styles.detailContainer}>
            <button className={styles.backButton} onClick={onBack}>
                ← 戻る
            </button>

            {metadata.status === 'suspended' && (
                <div className={styles.suspendedNotice}>
                    ⚠️ このサービスは現在停止中です。
                </div>
            )}

            <div className={styles.detailHeader}>
                <h2 className={styles.detailTitle}>{metadata.title}</h2>
                <div className={styles.detailMeta}>
                    <span>カテゴリ: {metadata.category}</span>
                    <span>開発時期: {metadata.date}</span>
                </div>
            </div>

            <div className={styles.thumbnailWrapper}>
                <Image
                    src={metadata.thumbnail}
                    alt={metadata.title}
                    className={styles.thumbnail}
                    width={980}
                    height={600}
                    style={{ objectFit: 'contain', width: '100%', height: 'auto' }}
                />
            </div>

            <div className={styles.detailBody}>
                {content}
            </div>

            <div className={styles.actionButtons}>
                {metadata.url && (
                    <a href={metadata.url} target="_blank" rel="noopener noreferrer" className={styles.actionButton}>
                        サイトを見る
                    </a>
                )}
                {metadata.githubUrl && (
                    <a href={metadata.githubUrl} target="_blank" rel="noopener noreferrer" className={`${styles.actionButton} ${styles.githubButton}`}>
                        GitHubで見る
                    </a>
                )}
            </div>
        </div>
    );
}
