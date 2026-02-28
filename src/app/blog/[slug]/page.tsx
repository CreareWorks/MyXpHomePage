import { notFound } from 'next/navigation';
import { getPostBySlug, getAllPosts } from '@/features/blog/utils/fetchPosts';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { LinkCard } from '@/components/common/LinkCard/LinkCard';
import { Metadata } from 'next';
import { SITE_BASE_URL, SITE_NAME } from '@/constants/siteConstants';

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    const posts = getAllPosts();
    return posts.map((post) => ({
        slug: post.slug,
    }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const post = await getPostBySlug(slug);

    if (!post) {
        return {
            title: `Not Found | ${SITE_NAME}`,
        };
    }

    const { metadata } = post;
    const title = `${metadata.title} | ${SITE_NAME}`;
    const description = metadata.description;

    const ogParams = new URLSearchParams({
        title: metadata.title,
        date: metadata.date,
        category: metadata.category || '',
    });
    const imageUrl = `${SITE_BASE_URL}/api/og-blog?${ogParams.toString()}`;

    return {
        title,
        description,
        alternates: {
            canonical: `${SITE_BASE_URL}/blog/${slug}`,
        },
        openGraph: {
            title,
            description,
            url: `${SITE_BASE_URL}/blog/${slug}`,
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

export default async function BlogPostPage({ params }: Props) {
    const { slug } = await params;
    const post = await getPostBySlug(slug);

    if (!post) {
        notFound();
    }

    return (
        <article style={{ padding: '40px 20px', maxWidth: '800px', margin: '0 auto', fontFamily: 'sans-serif' }}>
            <header style={{ marginBottom: '2rem', borderBottom: '1px solid #ccc', paddingBottom: '1rem' }}>
                <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>{post.metadata.title}</h1>
                <div style={{ display: 'flex', gap: '1rem', color: '#666', marginTop: '0.5rem' }}>
                    <time dateTime={post.metadata.date}>{post.metadata.date}</time>
                    {post.metadata.category && <span>📁 {post.metadata.category}</span>}
                </div>
            </header>

            <div className="mdx-content">
                <MDXRemote source={post.content} components={{ LinkCard }} />
            </div>
        </article>
    );
}
