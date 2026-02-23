import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const title = searchParams.get('title') || 'y-creare.dev';
        const date = searchParams.get('date') || '';
        const category = searchParams.get('category') || '';

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
                        backgroundColor: '#27ae60',
                        backgroundImage: 'linear-gradient(135deg, #27ae60 0%, #2ecc71 100%)',
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

                    {/* フッター */}
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
                        <div style={{ display: 'flex' }}>y-creare.dev</div>
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
    } catch (e: any) {
        console.error('OG Image Error:', e.message);
        return new Response(`Failed to generate image`, {
            status: 500,
        });
    }
}
