import { StartButton } from '@/components/xp/StartButton/StartButton';
import styles from '@/components/xp/TaskBar/TaskBar.module.css';

export function TaskBar() {
    return (
        <footer className={styles.bar}>
            <StartButton/>
        </footer>
    )
}