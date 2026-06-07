import { Photo } from '../types';

// 新しく投下された画像群のインポート
import imgL from '@/assets/gallery/L.jpg';
import imgAtsunuriHaise from '@/assets/gallery/atsunuri_haise.jpg';
import imgAtsunuriKaneki from '@/assets/gallery/atsunuri_kaneki.jpg';
import imgCopicKaneki from '@/assets/gallery/copic_kaneki.jpg';
import imgChronoTrigger from '@/assets/gallery/cronotrigger.jpg';
import imgDbz from '@/assets/gallery/dbz.jpg';
import imgHaise from '@/assets/gallery/haise.jpg';
import imgIzumiSakai from '@/assets/gallery/izumi_sakai.jpg';
import imgJoruno from '@/assets/gallery/joruno.jpg';
import imgKanekiDegital from '@/assets/gallery/kaneki_degital.jpg';
import imgMyWorld from '@/assets/gallery/my_world.jpg';
import imgMyWorld2 from '@/assets/gallery/my_world2.jpg';
import imgMyWorld3 from '@/assets/gallery/my_world3.jpg';
import imgSasakiHaise from '@/assets/gallery/sasaki_haise.jpg';
import imgTsubasaHonda from '@/assets/gallery/tsubasa_honda.jpg';

/**
 * ギャラリーに表示する写真の静的データリスト (日付情報なし)
 */
export const PHOTOS: Photo[] = [
    {
        id: 'izumi_sakai',
        title: '坂井泉水',
        description: 'ZARDの坂井泉水さんを描いた作品です。',
        image: imgIzumiSakai,
    },
    {
        id: 'tsubasa_honda',
        title: '本田翼',
        description: '本田翼さんを描いたファンアートイラストです。',
        image: imgTsubasaHonda,
    },
    {
        id: 'cronotrigger',
        title: 'クロノ・トリガー',
        description: 'クロノ・トリガーのキャラクターたちを描いたファンアート作品です。',
        image: imgChronoTrigger,
    },
    {
        id: 'dbz',
        title: 'ドラゴンボールZ',
        description: 'ドラゴンボールZ of 孫悟空とベジータを描いたファンアート作品です。',
        image: imgDbz,
    },
    {
        id: 'joruno',
        title: 'ジョルノ・ジョバァーナ',
        description: 'ジョジョの奇妙な冒険 第5部のジョルノ・ジョバァーナを描いた作品です。',
        image: imgJoruno,
    },
    {
        id: 'atsunuri_kaneki',
        title: '金木研 (厚塗り)',
        description: '東京喰種の金木研を厚塗りで表現したイラスト作品です。',
        image: imgAtsunuriKaneki,
    },
    {
        id: 'atsunuri_haise',
        title: '佐々木琲世 (厚塗り)',
        description: '東京喰種:reの佐々木琲世を厚塗りで表現したイラスト作品です。',
        image: imgAtsunuriHaise,
    },
    {
        id: 'copic_kaneki',
        title: '金木研 (コピック)',
        description: 'コピックを使ってアナログで描いた東京喰種の金木研です。',
        image: imgCopicKaneki,
    },
    {
        id: 'kaneki_degital',
        title: '金木研 (デジタル)',
        description: 'デジタルで仕上げた東京喰種の金木研のイラスト作品です。',
        image: imgKanekiDegital,
    },
    {
        id: 'haise',
        title: '佐々木琲世 (立ち絵)',
        description: '東京喰種:reの佐々木琲世を描いたイラスト作品です',
        image: imgHaise,
    },
    {
        id: 'sasaki_haise',
        title: '佐々木琲世 (表情)',
        description: '東京喰種:reの佐々木琲世の表情を描いたイラスト作品です。',
        image: imgSasakiHaise,
    },
    {
        id: 'L',
        title: 'L (エル)',
        description: 'DEATH NOTEのL（エル）を描いた作品です。',
        image: imgL,
    },
    {
        id: 'my_world',
        title: 'My World 1',
        description: 'オリジナルイラスト作品「My World」シリーズの第1作目です。',
        image: imgMyWorld,
    },
    {
        id: 'my_world2',
        title: 'My World 2',
        description: 'オリジナルイラスト作品「My World」シリーズの第2作目です。',
        image: imgMyWorld2,
    },
    {
        id: 'my_world3',
        title: 'My World 3',
        description: 'オリジナルイラスト作品「My World」シリーズの第3作目です。',
        image: imgMyWorld3,
    },
];
