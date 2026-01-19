'use client';

import React from 'react';
import styles from './PortfolioApp.module.css';
import { Project } from '../types';
import { StaticImageData } from 'next/image';

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

            <div className={styles.detailHeader}>
                <h2 className={styles.detailTitle}>{metadata.title}</h2>
                <div className={styles.detailMeta}>
                    <span>カテゴリ: {metadata.category}</span>
                    <span>開発時期: {metadata.date}</span>
                </div>
            </div>

            <div className={styles.thumbnailWrapper} style={{ marginBottom: '30px', height: 'auto', maxHeight: '500px', background: '#f8f8f8' }}>
                <img
                    src={typeof metadata.thumbnail === 'string' ? metadata.thumbnail : (metadata.thumbnail as StaticImageData).src}
                    alt={metadata.title}
                    className={styles.thumbnail}
                    style={{ width: '100%', height: 'auto' }}
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
