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
        <div
            className={styles.detailContainer}
            style={{
                maxWidth: '1200px',
                margin: '0 auto',
                width: '100%'
            }}
        >
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

            <div
                className={styles.thumbnailWrapper}
                style={{
                    marginBottom: '30px',
                    height: 'auto',
                    maxHeight: '600px',
                    background: '#f8f8f8',
                    maxWidth: '980px',
                    margin: '0 auto 30px auto',
                    border: '1px solid #ccc',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    overflow: 'hidden'
                }}
            >
                <img
                    src={typeof metadata.thumbnail === 'string' ? metadata.thumbnail : (metadata.thumbnail as StaticImageData).src}
                    alt={metadata.title}
                    className={styles.thumbnail}
                    style={{
                        maxWidth: '100%',
                        maxHeight: '100%',
                        width: 'auto',
                        height: 'auto',
                        display: 'block'
                    }}
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
