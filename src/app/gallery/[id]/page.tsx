import { notFound } from 'next/navigation';
import { PHOTOS } from '@/features/gallery/data/photos';
import { Metadata } from 'next';
import { SITE_BASE_URL, SITE_NAME } from '@/constants/siteConstants';
import Image from 'next/image';

interface Props {
    params: Promise<{ id: string }>;
}

/**
 * 静的パスの生成 (SSG)
 */
export async function generateStaticParams() {
    return PHOTOS.map((photo) => ({
        id: photo.id,
    }));
}

/**
 * 個別詳細ページのメタデータ生成
 */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = await params;
    const photo = PHOTOS.find(p => p.id === id);

    if (!photo) {
        return {
            title: `Not Found | ${SITE_NAME}`,
        };
    }

    const title = `${photo.title} | ギャラリー | ${SITE_NAME}`;
    const description = photo.description;

    return {
        title,
        description,
        alternates: {
            canonical: `${SITE_BASE_URL}/gallery/${id}`,
        },
        openGraph: {
            title,
            description,
            url: `${SITE_BASE_URL}/gallery/${id}`,
            siteName: SITE_NAME,
            type: 'article',
            locale: 'ja_JP',
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
        },
    };
}

/**
 * ギャラリー写真の個別静的詳細ページ
 */
export default async function GalleryItemPage({ params }: Props) {
    const { id } = await params;
    const photo = PHOTOS.find(p => p.id === id);

    if (!photo) {
        notFound();
    }

    return (
        <article style={{ padding: '40px 20px', maxWidth: '800px', margin: '0 auto', fontFamily: 'sans-serif' }}>
            <header style={{ marginBottom: '2rem', borderBottom: '1px solid #ccc', paddingBottom: '1rem' }}>
                <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>{photo.title}</h1>
                {photo.location && (
                    <div style={{ display: 'flex', gap: '1rem', color: '#666', marginTop: '0.5rem' }}>
                        <span>📍 {photo.location}</span>
                    </div>
                )}
            </header>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center' }}>
                <div style={{ border: '1px solid #ccc', padding: '10px', backgroundColor: '#fff', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                    <Image
                        src={photo.image}
                        alt={photo.title}
                        width={600}
                        height={450}
                        style={{ maxWidth: '100%', height: 'auto', display: 'block' }}
                        priority
                    />
                </div>
                <p style={{ fontSize: '1.1rem', lineHeight: '1.6', color: '#333', alignSelf: 'flex-start', whiteSpace: 'pre-wrap' }}>
                    {photo.description}
                </p>
            </div>
        </article>
    );
}
