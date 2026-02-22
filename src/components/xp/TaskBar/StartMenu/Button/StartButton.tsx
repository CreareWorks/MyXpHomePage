import styles from './StartButton.module.css';
import startButtonLogo from '@/assets/startButtonXpLogo.png';
import Image from 'next/image';

interface StartButtonProps {
    isOpen: boolean;
    onClick: () => void;
}

export function StartButton({
    isOpen,
    onClick
}: StartButtonProps) {
    return (
        <button
            className={`${styles.container} ${isOpen ? styles.active : ''}`}
            onClick={(e) => {
                e.stopPropagation();
                onClick();
            }}
        >
            <div className={styles.logoWrapper}>
                <Image
                    src={startButtonLogo}
                    className={styles.logo}
                    alt='Windows XP logo'
                    width={18}
                    height={18}
                />
            </div>
            <span className={styles.startText}>スタート</span>
        </button>
    )
}