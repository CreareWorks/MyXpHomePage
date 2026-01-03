import styles from '@/components/xp/StartButton/StartButton.module.css';
import startButtonLogo from '@/assets/startButtonXpLogo.png';
import Image from 'next/image';

export function StartButton() {
    return (
        <button className={styles.container}>
            <div className={styles.logoWrapper}>
                <Image
                    src={startButtonLogo}
                    className={styles.logo}
                    alt='Windows XP logo'
                    width={18}
                    priority
                >
                </Image>
            </div>
            <span className={styles.startText}>スタート</span>
        </button>
    )
}

