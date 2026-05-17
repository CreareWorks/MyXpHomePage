'use client';

import { useEffect, useState } from 'react';
import styles from './LinkCard.module.css';

interface LinkCardProps {
    url: string;
}

interface OgData {
    title: string;
    description: string;
    image: string;
    siteName: string;
    favicon: string;
    url: string;
}

export function LinkCard({ url }: LinkCardProps) {
    const [data, setData] = useState<OgData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        setError(false);
        setLoading(true);
        let isMounted = true;

        const fetchOg = async () => {
            try {
                const res = await fetch(`/api/og?url=${encodeURIComponent(url)}`);
                if (!res.ok) throw new Error(res.statusText);
                const json = await res.json() as OgData;
                if (isMounted) {
                    setData(json);
                    setLoading(false);
                }
            } catch {
                if (isMounted) {
                    setError(true);
                    setLoading(false);
                }
            }
        };

        fetchOg();
        return () => { isMounted = false; };
    }, [url]);

    if (loading) {
        return (
            <div className={styles.skeleton}>
                <div className={styles.skeletonContent}>
                    <div className={styles.skeletonTitle}></div>
                    <div className={styles.skeletonText}></div>
                </div>
            </div>
        );
    }

    if (error || !data) {
        return (
            <a href={url} target="_blank" rel="noopener noreferrer" className={styles.fallback}>
                {url}
            </a>
        );
    }

    return (
        <a
            href={data.url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.card}
            title={data.title}
        >
            <div className={styles.borderLeft}></div>
            <div className={styles.content}>
                <div className={styles.siteInfo}>
                    {data.favicon && (
                        <img src={data.favicon} alt="" className={styles.favicon} />
                    )}
                    <span className={styles.siteName}>{data.siteName || new URL(url).hostname}</span>
                </div>
                <h4 className={styles.title}>{data.title}</h4>
                {data.description && (
                    <p className={styles.description}>{data.description}</p>
                )}
                {data.image && (
                    <div className={styles.imageWrapper}>
                        <img src={data.image} alt="" className={styles.image} />
                    </div>
                )}
            </div>
        </a>
    );
}
