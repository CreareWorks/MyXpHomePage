# Claude用プロジェクトガイド

## プロジェクト概要

Windows XP の UI を Next.js 15 で再現したポートフォリオサイト兼エンジニアリングブログ。
公開URL: https://y-creare.dev

---

## アーキテクチャの要点

- **状態管理**: ウィンドウの開閉・アクティブアプリは `nuqs` で URL クエリパラメータに同期（例: `?app=blog&slug=ses`）
- **SEO**: Middleware がクローラーを `/blog/[slug]` のSSRページへ、ブラウザを `/?app=blog&slug=...` へ振り分ける
- **スタイリング**: CSS Modules (Vanilla CSS) のみ。CSS-in-JS は使用していない

---

## ブログ記事の追加

### 仕組み

MDXファイルを配置するだけで自動的に記事として認識される（`fetchPosts.ts` が再帰的にスキャン）。
**`posts.ts` のような手動のデータ登録ファイルは存在しない。**

### ファイル配置

```
src/features/blog/content/{YYYY}/{MM}/{DD}/{slug}.mdx
```

例: `src/features/blog/content/2026/05/17/pm-team.mdx`

### MDX frontmatter

```yaml
---
title: "記事タイトル"
date: "YYYY-MM-DD"
category: "Tech" # Tech | Life | Management | Other
description: "記事の説明（titleと同じでも可）"
---
```

### カテゴリ

| 値 | 用途 |
|---|---|
| `Tech` | 技術系記事 |
| `Life` | キャリア・思想・日常系 |
| `Management` | チーム・組織・PM関連 |
| `Other` | その他 |


### 文体ガイドライン

既存記事（特に `ses.mdx`）の文体を参照すること。主な特徴:

- `<br/>` タグで段落内改行を多用
- 「〜と思います」「〜と感じています」の柔らかい断定
- 口語的で個人の体験・感情を交えた語り口
- `**太字**` で重要キーワードを強調
- `---` で区切り線
- 番号付き見出し（`## 1. 〜`）
- 括弧で補足 `（〜）`
- まとめは箇条書き＋最後に一言の締め

---

## ポートフォリオの追加

### ファイル

`src/features/portfolio/data/projects.tsx` の `PROJECTS` 配列に追記する。

### 画像

サムネイル画像を `src/assets/portfolio/` に配置し、ファイル先頭でインポートする。

### エントリ構造

```tsx
{
    metadata: {
        id: 'unique-id',
        title: 'プロジェクト名',
        date: 'YYYY-MM',
        category: PORTFOLIO_CATEGORIES.WEB_APP,
        description: '一行の説明',
        thumbnail: importedImage,
        url: 'https://...',       // 任意
        githubUrl: 'https://...', // 任意
        techStack: ['Next.js', 'TypeScript'],
        status: 'active',         // active | suspended など
    },
    content: (
        <div>
            <h3>プロジェクト概要</h3>
            <p>詳細説明</p>
        </div>
    )
}
```

---

## コーディング規約

- コメントは基本不要。WHYが非自明な場合のみ1行
- CSS は CSS Modules のみ（グローバルスタイルへの追記は最小限）
- `server-only` を使用している箇所はクライアントから呼び出さない
- 新規ファイルより既存ファイルの編集を優先
