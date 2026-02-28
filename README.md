# youta-xp-homepage

WindowsXPのUIをNextで再現した、ポートフォリオサイト(HP)兼エンジニアリングブログです。

## コンセプト
かつてのインターネットが持っていた「ワクワク感」を、現代の技術構成（Next.js 15, React 19）で体験できるように設計しています。
マルチウィンドウ、タスクバー、スタートメニューなど、当時の操作感を Web ブラウザ上で再現することを目指しています。

## 技術方針
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: CSS Modules (Vanilla CSS) を使用し、XP の質感（グラデーション、立体感）を詳細に表現
- **State Management**: `nuqs` を使用し、ウィンドウの開閉やアクティブなアプリの状態を URL クエリパラメータと同期。ブラウザの「戻る・進む」での直感的な操作を実現。

## SEO対策 (Dynamic Rendering)
当サイトはWindows XP風のシームレスなUIを実現するため、ブログやポートフォリオのナビゲーションをURLクエリパラメータ（`?app=blog&slug=...`）の変更として実装しています。
しかし、クエリパラメータを用いたSPAベースのルーティングは、Googlebotなどの検索エンジンにインデックスされにくいというSEO上の課題があります。

これを解決するため、当サイトでは **Middlewareを利用した動的レンダリング（Dynamic Rendering）** と **パスベースURLの併用** を採用しています。

- **クローラーのリクエスト (`/blog/[slug]`)**: 検索エンジンには専用に用意したXPのUIを持たないプレーンなSSRページ（記事本文・メタデータのみ）を直接返却します。これによりクリーンなURLでの確実なインデックスを実現します。
- **人間のリクエスト (`/blog/[slug]`)**: 通常のブラウザからのアクセス時には、Middlewareがアクセスを検知し、即座にXP UIの該当状態（`/?app=blog&slug=...`）へリダイレクトします。これによりXP体験を損ないません。

このアプローチにより、「Next.jsらしいモダンなSEO対策」と「特殊なユーザー体験」を両立しています。

---

## コンテンツの追加手順(時間経つと忘れそうなので残しておく。)

### 1. ブログ記事の追加
ブログは MDX を使用して管理。

1.  `src/features/blog/content/` 配下に、日付に基づいたディレクトリを作成。
    - 例: `src/features/blog/content/2026/01/20/my-new-post.mdx`
2.  作成した MDX ファイルに記事内容を記述。
3.  `src/features/blog/data/posts.ts` を開き、作成した記事のメタデータを追加。
    ```typescript
    {
        slug: 'my-new-post',
        title: '記事タイトル',
        date: '2026-01-20',
        category: BLOG_CATEGORIES.TECH, // 任意のカテゴリ
        excerpt: '記事の要約をここに記述します。',
        image: '/path/to/image.png' // 省略可能
    }
    ```

### 2. ポートフォリオの追加
ポートフォリオの内容はデータファイルで直接管理。

1.  関連する画像（サムネイルなど）を `src/assets/portfolio/` に配置。
2.  `src/features/portfolio/data/projects.tsx` を開く。
3.  `PROJECTS` 配列に新しいプロジェクトオブジェクトを追加。
    ```tsx
    {
        metadata: {
            id: 'unique-project-id',
            title: 'プロジェクト名',
            date: '2026-01',
            category: PORTFOLIO_CATEGORIES.WEB_APP,
            description: '簡単な説明文',
            thumbnail: projectImage, // インポートした画像
            url: 'https://...',     // 公開URL（任意）
            githubUrl: 'https://...', // GitHub（任意）
            techStack: ['Next.js', 'React'],
        },
        content: (
            <div>
                <h3>プロジェクト概要</h3>
                <p>詳細な説明を React 要素として記述。</p>
            </div>
        )
    }
    ```

---

## 開発コマンド
```bash
npm run dev    # 開発サーバー起動
npm run build  # ビルド
npm run start  # プロダクション実行
```
