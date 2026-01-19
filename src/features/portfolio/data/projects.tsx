import React from 'react';
import { Project } from '../types';
import { PORTFOLIO_CATEGORIES } from '../constants/portfolioConstants';
import xpPortfolio from '@/assets/portfolio/youta-dev-xp-hp.png';

export const PROJECTS: Project[] = [
    {
        metadata: {
            id: 'xp-portfolio',
            title: 'Windows XP Portfolio',
            date: '2026-01',
            category: PORTFOLIO_CATEGORIES.WEB_APP,
            description: 'Windows XPのUIを模したHP、当サイトです。',
            thumbnail: xpPortfolio,
            url: 'https://youta-dev.vercel.app',
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
                    <li>スタートメニューとタス1クバーによるマルチウィンドウ操作</li>
                    <li>MDXを使用したブログ機能と詳細なメタデータ管理</li>
                    <li>Windows XPのデザインを模したUI</li>
                    <li>ポートフォリオサイトの管理機能</li>
                    <li>RSSフィードの表示</li>
                    <li>スキル表示</li>
                </ul>
            </div>
        )
    }
];
