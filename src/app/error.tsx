'use client';

import { useEffect } from 'react';

interface ErrorProps {
    error: Error & { digest?: string };
    reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div style={{ padding: '40px', fontFamily: 'Tahoma, sans-serif', textAlign: 'center' }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>⚠️</div>
            <h2 style={{ fontSize: 18, marginBottom: 8 }}>Program Error</h2>
            <p style={{ color: '#666', marginBottom: 24 }}>予期せぬエラーが発生しました。</p>
            <button
                onClick={reset}
                style={{
                    padding: '6px 20px',
                    cursor: 'pointer',
                    fontFamily: 'Tahoma, sans-serif',
                }}
            >
                再試行
            </button>
        </div>
    );
}
