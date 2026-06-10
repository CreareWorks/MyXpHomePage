'use client';

import { useMemo } from 'react';
import { useQueryState } from 'nuqs';
import styles from './GalleryApp.module.css';
import { PHOTOS } from '../data/photos';
import { GalleryList } from './GalleryList';
import { GalleryDetail } from './GalleryDetail';
import { useMobileSidebar } from '@/hooks/useMobileSidebar';
import { AddressBar } from '@/components/xp/AddressBar/AddressBar';
import { ExplorerAppLayout } from '@/components/xp/WindowAppLayout/ExplorerAppLayout';
import { ExplorerSidebar } from '@/components/xp/ExplorerSidebar/ExplorerSidebar';
import { SidebarAppLinks } from '@/components/xp/ExplorerSidebar/SidebarAppLinks';
import { DESKTOP_ICON_IDS } from '@/constants/desktopIconConstants';

/**
 * ギャラリーアプリのメインコンポーネント
 */
export function GalleryApp() {
    const { isSidebarOpen, toggleSidebar, closeSidebar } = useMobileSidebar();
    const [photoId, setPhotoId] = useQueryState('slug', {
        history: 'push',
        shallow: true
    });

    const currentPhoto = useMemo(() => {
        if (!photoId) return null;
        return PHOTOS.find(p => p.id === photoId) || null;
    }, [photoId]);

    const currentIndex = useMemo(() => {
        if (!photoId) return -1;
        return PHOTOS.findIndex(p => p.id === photoId);
    }, [photoId]);

    const hasPrev = currentIndex > 0;
    const hasNext = currentIndex < PHOTOS.length - 1 && currentIndex !== -1;

    const handlePrev = () => {
        if (hasPrev) {
            const prevPhoto = PHOTOS[currentIndex - 1];
            if (prevPhoto) {
                setPhotoId(prevPhoto.id);
            }
        }
    };

    const handleNext = () => {
        if (hasNext) {
            const nextPhoto = PHOTOS[currentIndex + 1];
            if (nextPhoto) {
                setPhotoId(nextPhoto.id);
            }
        }
    };

    const handleBack = () => {
        setPhotoId(null);
    };

    return (
        <ExplorerAppLayout
            isSidebarOpen={isSidebarOpen}
            onToggleSidebar={toggleSidebar}
            onCloseSidebar={closeSidebar}
            mainClassName={currentPhoto ? styles.contentAreaDetail : styles.contentArea}
            toolbar={
                <div className={styles.toolbar}>
                    <div style={{ fontSize: '11px', color: '#666', marginRight: '8px' }}>アドレス</div>
                    <AddressBar
                        address={`My Documents\\My Pictures${currentPhoto ? `\\${currentPhoto.title}` : ''}`}
                    />
                </div>
            }
            sidebar={
                <ExplorerSidebar isOpen={isSidebarOpen}>
                    <SidebarAppLinks currentAppId={DESKTOP_ICON_IDS.GALLERY} />
                    
                </ExplorerSidebar>
            }
        >
            {currentPhoto ? (
                <GalleryDetail
                    photo={currentPhoto}
                    onBack={handleBack}
                    onPrev={handlePrev}
                    onNext={handleNext}
                    hasPrev={hasPrev}
                    hasNext={hasNext}
                />
            ) : (
                <GalleryList
                    photos={PHOTOS}
                    onSelect={(id) => setPhotoId(id)}
                />
            )}
        </ExplorerAppLayout>
    );
}
