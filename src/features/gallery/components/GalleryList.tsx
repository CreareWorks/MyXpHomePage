import Image from 'next/image';
import { Photo } from '../types';
import styles from './GalleryApp.module.css';

interface GalleryListProps {
    photos: Photo[];
    onSelect: (id: string) => void;
}

/**
 * ギャラリーの写真一覧を表示するコンポーネント (エクスプローラーのマイピクチャ縮小版表示を模倣)
 */
export function GalleryList({ photos, onSelect }: GalleryListProps) {
    return (
        <div className={styles.gridContainer}>
            {photos.map(photo => (
                <div
                    key={photo.id}
                    className={styles.photoCard}
                    onClick={() => onSelect(photo.id)}
                    title={photo.title}
                >
                    <div className={styles.thumbnailWrapper}>
                        <Image
                            src={photo.image}
                            alt={photo.title}
                            width={100}
                            height={100}
                            className={styles.thumbnail}
                            placeholder="blur"
                        />
                    </div>
                    <span className={styles.photoTitle}>{photo.title}</span>
                </div>
            ))}
        </div>
    );
}
