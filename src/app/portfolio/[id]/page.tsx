import { notFound } from 'next/navigation';
import { PROJECTS } from '@/features/portfolio/data/projects';
import { Metadata } from 'next';
import { SITE_BASE_URL, SITE_NAME } from '@/constants/siteConstants';

interface Props {
    params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
    return PROJECTS.map((project) => ({
        id: project.metadata.id,
    }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = await params;
    const project = PROJECTS.find(p => p.metadata.id === id);

    if (!project) {
        return {
            title: `Not Found | ${SITE_NAME}`,
        };
    }

    const { metadata } = project;
    const title = `${metadata.title} | Portfolio | ${SITE_NAME}`;
    const description = metadata.description;

    const ogParams = new URLSearchParams({
        title: metadata.title,
        date: metadata.date,
        category: metadata.category || '',
    });
    const imageUrl = `${SITE_BASE_URL}/api/og-portfolio?${ogParams.toString()}`;

    return {
        title,
        description,
        alternates: {
            canonical: `${SITE_BASE_URL}/portfolio/${id}`,
        },
        openGraph: {
            title,
            description,
            url: `${SITE_BASE_URL}/portfolio/${id}`,
            siteName: SITE_NAME,
            images: [
                {
                    url: imageUrl,
                    width: 1200,
                    height: 630,
                    alt: metadata.title,
                },
            ],
            type: 'article',
            locale: 'ja_JP',
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [imageUrl],
        },
    };
}

export default async function PortfolioItemPage({ params }: Props) {
    const { id } = await params;
    const project = PROJECTS.find(p => p.metadata.id === id);

    if (!project) {
        notFound();
    }

    return (
        <article style={{ padding: '40px 20px', maxWidth: '800px', margin: '0 auto', fontFamily: 'sans-serif' }}>
            <header style={{ marginBottom: '2rem', borderBottom: '1px solid #ccc', paddingBottom: '1rem' }}>
                <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>{project.metadata.title}</h1>
                <div style={{ display: 'flex', gap: '1rem', color: '#666', marginTop: '0.5rem' }}>
                    <time dateTime={project.metadata.date}>{project.metadata.date}</time>
                    {project.metadata.category && <span>📁 {project.metadata.category}</span>}
                </div>
            </header>

            <div className="portfolio-content">
                {project.content}
            </div>
        </article>
    );
}
