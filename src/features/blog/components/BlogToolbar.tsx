import styles from './BlogApp.module.css';
import { AddressBar } from '@/components/xp/AddressBar/AddressBar';

interface BlogToolbarProps {
    canGoBack: boolean;
    goBack: () => void;
    onUp: () => void;
    addressText: string;
}

export const BlogToolbar = ({
    canGoBack,
    goBack,
    onUp,
    addressText,
}: BlogToolbarProps) => {
    return (
        <div className={styles.toolbar}>
            <div className={styles.toolbarContainer}>
                <div className={styles.navRow}>
                    <button
                        className={`${styles.backButtonContainer} ${!canGoBack ? styles.disabled : ''}`}
                        onClick={goBack}
                        disabled={!canGoBack}
                        title="Back"
                    >
                        <span className={styles.xpBackButton}>←</span>
                        <span className={styles.xpBackText}>戻る</span>
                    </button>

                    <button
                        className={styles.upButton}
                        onClick={onUp}
                        title="Up"
                    >
                        📁
                    </button>

                </div>

                <div className={styles.navRow}>
                    <div className={styles.addressLabel}>Address</div>
                    <AddressBar address={addressText} />
                </div>
            </div>
        </div>
    );
};
