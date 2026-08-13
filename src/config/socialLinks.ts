import { StaticImageData } from 'next/image';

import githubLogo from '@/assets/social/github.png';
import qiitaLogo from '@/assets/social/qiita.png';
import zennLogo from '@/assets/social/zenn.png';
import findyLogo from '@/assets/social/findy.png';
import xLogo from '@/assets/social/x.png';
import credlyLogo from '@/assets/social/credly.png';

export interface SocialLink {
    id: string;
    title: string;
    url: string;
    icon: StaticImageData;
    description: string;
}

export const SOCIAL_LINKS: SocialLink[] = [
    {
        id: 'github',
        title: 'GitHub',
        url: 'https://github.com/CreareWorks',
        icon: githubLogo,
        description: 'ソースコードや開発履歴',
    },
    {
        id: 'qiita',
        title: 'Qiita',
        url: 'https://qiita.com/y_o_28',
        icon: qiitaLogo,
        description: '技術的な備忘録・知見',
    },
    {
        id: 'zenn',
        title: 'Zenn',
        url: 'https://zenn.dev/creare',
        icon: zennLogo,
        description: '技術記事やスクラップ',
    },
    {
        id: 'findy',
        title: 'Findy',
        url: 'https://findy-code.io/skills-share/84ww_8Epwlqfg',
        icon: findyLogo,
        description: 'スキル偏差値・実績',
    },
    {
        id: 'x',
        title: 'X (Twitter)',
        url: 'https://x.com/creareworks',
        icon: xLogo,
        description: '最新情報やつぶやき',
    },
    {
        id: 'credly',
        title: 'Credly',
        url: 'https://www.credly.com/users/youta',
        icon: credlyLogo,
        description: '取得資格・デジタルバッジ',
    },
];