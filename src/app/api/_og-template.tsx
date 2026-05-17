import { ImageResponse } from 'next/og';
import { SITE_NAME } from '@/constants/siteConstants';

interface OgImageParams {
    title: string;
    date: string;
    category: string;
    gradient: string;
}

export function buildOgImageResponse({ title, date, category, gradient }: OgImageParams) {
    return new ImageResponse(
        (
            <div
                style={{
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    backgroundImage: gradient,
                    padding: '60px 80px',
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '20px',
                        flex: 1,
                        justifyContent: 'center',
                    }}
                >
                    <div
                        style={{
                            fontSize: 72,
                            fontWeight: 'bold',
                            color: 'white',
                            lineHeight: 1.2,
                            textShadow: '0 4px 8px rgba(0,0,0,0.3)',
                            display: 'flex',
                            flexWrap: 'wrap',
                            maxWidth: '1040px',
                        }}
                    >
                        {title}
                    </div>

                    <div
                        style={{
                            display: 'flex',
                            gap: '20px',
                            fontSize: 28,
                            color: 'rgba(255,255,255,0.9)',
                        }}
                    >
                        {category && (
                            <div
                                style={{
                                    display: 'flex',
                                    backgroundColor: 'rgba(255,255,255,0.2)',
                                    padding: '8px 16px',
                                    borderRadius: '8px',
                                }}
                            >
                                📁 {category}
                            </div>
                        )}
                        {date && (
                            <div
                                style={{
                                    display: 'flex',
                                    backgroundColor: 'rgba(255,255,255,0.2)',
                                    padding: '8px 16px',
                                    borderRadius: '8px',
                                }}
                            >
                                📅 {date}
                            </div>
                        )}
                    </div>
                </div>

                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '16px',
                        fontSize: 32,
                        color: 'white',
                        fontWeight: 'bold',
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            width: '48px',
                            height: '48px',
                            backgroundColor: 'white',
                            borderRadius: '8px',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: 32,
                        }}
                    >
                        💻
                    </div>
                    <div style={{ display: 'flex' }}>{SITE_NAME}</div>
                </div>
            </div>
        ),
        {
            width: 1200,
            height: 630,
            headers: {
                'Cache-Control': 'public, s-maxage=31536000, stale-while-revalidate',
            },
        }
    );
}
