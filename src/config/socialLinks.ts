import { StaticImageData } from 'next/image';

import githubLogo from '@/assets/sosial/github.png';
import qiitaLogo from '@/assets/sosial/qiita.png';
import zennLogo from '@/assets/sosial/zenn.png';
import findyLogo from '@/assets/sosial/findy.png';
import xLogo from '@/assets/sosial/x.png';

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
];