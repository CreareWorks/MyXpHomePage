import { StaticImageData } from 'next/image';

/**
 * ギャラリーに表示する写真のメタデータ型定義
 */
export interface Photo {
    id: string;          // 一意識別子 (URLスラッグ)
    title: string;       // 写真のタイトル
    description: string; // 写真の説明文
    image: StaticImageData; // Next.js最適化画像データ
    location?: string;   // 撮影場所 (任意)
}
