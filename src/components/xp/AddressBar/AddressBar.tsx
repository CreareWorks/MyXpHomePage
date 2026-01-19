import React from 'react';
import styles from './AddressBar.module.css';

interface AddressBarProps {
    address: string;
    showIcon?: boolean;
}

export function AddressBar({ address, showIcon = true }: AddressBarProps) {
    return (
        <div className={styles.addressInput}>
            {showIcon && <span className={styles.addressIcon}>📂</span>}
            <span className={styles.addressBarText}>{address}</span>
        </div>
    );
}
