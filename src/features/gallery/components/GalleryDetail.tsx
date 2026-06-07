'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Photo } from '../types';
import styles from './GalleryApp.module.css';

interface GalleryDetailProps {
    photo: Photo;
    onBack: () => void;
    onPrev?: () => void;
    onNext?: () => void;
    hasPrev: boolean;
    hasNext: boolean;
}

/**
 * ギャラリーの写真詳細を表示するコンポーネント (Windows 画像と FAX ビューアを模倣)
 * 実際に拡大・縮小、回転、前後切り替えが動作します。
 */
export function GalleryDetail({
    photo,
    onBack,
    onPrev,
    onNext,
    hasPrev,
    hasNext,
}: GalleryDetailProps) {
    const [zoom, setZoom] = useState(1);
    const [rotate, setRotate] = useState(0);

    // 写真が切り替わったらズームと回転をリセット
    useEffect(() => {
        setZoom(1);
        setRotate(0);
    }, [photo.id]);

    const handleZoomIn = () => {
        setZoom(prev => Math.min(prev + 0.2, 3));
    };

    const handleZoomOut = () => {
        setZoom(prev => Math.max(prev - 0.2, 0.4));
    };

    const handleReset = () => {
        setZoom(1);
        setRotate(0);
    };

    const handleRotateLeft = () => {
        setRotate(prev => prev - 90);
    };

    const handleRotateRight = () => {
        setRotate(prev => prev + 90);
    };

    return (
        <div className={styles.viewerContainer}>
            <div className={styles.viewerContent}>
                <div className={styles.imageWrapper}>
                    <Image
                        src={photo.image}
                        alt={photo.title}
                        className={styles.mainImage}
                        style={{
                            transform: `scale(${zoom}) rotate(${rotate}deg)`,
                        }}
                        priority
                    />
                </div>

                <div className={styles.photoInfoPanel}>
                    <h3 className={styles.infoTitle}>{photo.title}</h3>
                    {photo.location && (
                        <p className={styles.infoMeta}>{photo.location}</p>
                    )}
                </div>
            </div>

            <div className={styles.viewerToolbar}>
                <button
                    className={styles.viewerButton}
                    onClick={onPrev}
                    disabled={!hasPrev}
                    title="前の画像"
                >
                    ◀
                </button>
                <button
                    className={styles.viewerButton}
                    onClick={onNext}
                    disabled={!hasNext}
                    title="次の画像"
                >
                    ▶
                </button>

                <div className={styles.divider} />

                <button
                    className={styles.viewerButton}
                    onClick={handleZoomIn}
                    title="拡大"
                >
                    ➕
                </button>
                <button
                    className={styles.viewerButton}
                    onClick={handleZoomOut}
                    title="縮小"
                >
                    ➖
                </button>
                <button
                    className={styles.viewerButton}
                    onClick={handleReset}
                    title="元のサイズ / リセット"
                >
                    ⛶
                </button>

                <div className={styles.divider} />

                <button
                    className={styles.viewerButton}
                    onClick={handleRotateLeft}
                    title="左に90度回転"
                >
                    ↺
                </button>
                <button
                    className={styles.viewerButton}
                    onClick={handleRotateRight}
                    title="右に90度回転"
                >
                    ↻
                </button>

                <div className={styles.divider} />

                <button
                    className={styles.backButton}
                    onClick={onBack}
                    title="一覧に戻る"
                >
                    閉じる
                </button>
            </div>
        </div>
    );
}
