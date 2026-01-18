import React, { Component, ReactNode } from 'react';
import styles from '@/components/xp/ErrorBoundary/WindowErrorBoundary.module.css';

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

export class WindowErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    render() {
        if (this.state.hasError) {
            return this.props.fallback || (
                <div className={styles.container}>
                    <div className={styles.header}>
                        <span className={styles.icon}>⚠️</span>
                        <h3 className={styles.title}>Program Error</h3>
                    </div>
                    <p className={styles.message}>予期せぬエラーが発生しました。</p>
                    <details className={styles.details}>
                        <summary className={styles.summary}>詳細情報</summary>
                        <pre className={styles.errorContent}>
                            {this.state.error?.message}
                        </pre>
                    </details>
                </div>
            );
        }

        return this.props.children;
    }
}