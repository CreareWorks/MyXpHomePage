import React from 'react';
import { Project } from '../types';
import { PORTFOLIO_CATEGORIES } from '../constants/portfolioConstants';
import { SITE_BASE_URL } from '@/constants/siteConstants';
import xpPortfolio from '@/assets/portfolio/youta-dev-xp-hp.png';
import skillsheetBuilder from '@/assets/portfolio/skillsheet-builder.png';

export const PROJECTS: Project[] = [
    {
        metadata: {
            id: 'skillsheet-builder',
            title: 'Skill Sheet Builder',
            date: '2025-01',
            category: PORTFOLIO_CATEGORIES.WEB_APP,
            description: 'AIを活用してスキルシートの診断・作成を自動化するサービスです。',
            thumbnail: skillsheetBuilder,
            url: 'https://skillsheet-builder.vercel.app/',
            techStack: ['Next.js', 'React', 'Gemini AI', 'Google Sheets API', 'TypeScript'],
        },
        content: (
            <div>
                <h3>プロジェクト概要</h3>
                <p>エンジニアのキャリア支援を目的とした、AI搭載型のスキルシート作成ツールです。対話形式で情報を入力するだけで、AIが市場価値を最大化するように内容を調整し、整形済みのスプレッドシートとして出力します。</p>
                <h3>主な機能</h3>
                <ul>
                    <li><strong>対話型フォーム</strong>: チャットボット形式でストレスなく経歴を入力可能。</li>
                    <li><strong>スプレッドシート連携</strong>: Google Sheets APIを使用し、個人のGoogleドライブに直接シートを生成。</li>
                    <li><strong>AI キャリアレビュー</strong>: Gemini AIが客観的な視点で経歴を分析し、具体的な改善アドバイスを提供。</li>
                    <li><strong>レーダーチャートによる可視化</strong>: スキルバランスを視覚的に把握。</li>
                </ul>
                <h3>使用技術</h3>
                <p>Next.js', 'React', 'Gemini AI', 'Google Sheets API', 'TypeScript</p>
            </div>
        )
    },
    {
        metadata: {
            id: 'xp-portfolio',
            title: 'Windows XP Portfolio',
            date: '2026-01',
            category: PORTFOLIO_CATEGORIES.WEB_APP,
            description: 'Windows XPのUIを模したHP、当サイトです。',
            thumbnail: xpPortfolio,
            url: SITE_BASE_URL,
            githubUrl: 'https://github.com/CreareWorks/MyXpHomePage',
            techStack: ['Next.js', 'React', 'TypeScript', 'CSS Modules'],
        },
        content: (
            <div>
                <h3>プロジェクト概要</h3>
                <p>Windows XPの懐かしいデザインを現代のWeb技術（Next.js 15, React 19）で再現したプロジェクトです。</p>
                <h3>主な機能</h3>
                <ul>
                    <li>ウィンドウのドラッグ、リサイズ、最大化・最小化機能</li>
                    <li>スタートメニューとタスクバーによるマルチウィンドウ操作</li>
                    <li>MDXを使用したブログ機能と詳細なメタデータ管理</li>
                    <li>Windows XPのデザインを模したUI</li>
                    <li>ポートフォリオサイトの管理機能</li>
                    <li>スキル表示</li>
                </ul>
            </div>
        )
    }
];
