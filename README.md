# youta-xp-homepage

WindowsXPのUIをNext.jsで再現した、ポートフォリオサイト兼エンジニアリングブログ。

**Live:** [https://y-creare.dev](https://y-creare.dev)

---

## コンセプト

かつてのインターネットが持っていた「ワクワク感」を、現代の技術構成で体験できるように設計しています。
マルチウィンドウ、タスクバー、スタートメニューなど、Windows XP の操作感を Web ブラウザ上で再現することを目指しています。

---

## 技術スタック

| 領域 | 採用技術 |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | CSS Modules (Vanilla CSS) |
| State | `nuqs` — ウィンドウ状態を URL クエリパラメータと同期 |
| Content | MDX (gray-matter) |

---

## SEO戦略

当サイトはナビゲーションをURLクエリパラメータ（`?app=blog&slug=...`）で実装しているため、クローラーにインデックスされにくいという課題があります。
これを解決するため、**Middlewareを利用した動的レンダリング**と**パスベースURLの併用**を採用しています。

- **クローラー (`/blog/[slug]`)**: XP UIを持たないプレーンなSSRページを直接返却し、クリーンなURLでのインデックスを実現
- **ブラウザ (`/blog/[slug]`)**: Middlewareがアクセスを検知し、XP UIの該当状態（`/?app=blog&slug=...`）へリダイレクト

この構造により「Next.jsらしいSEO対策」と「特殊なユーザー体験」を両立しています。

---

## 開発コマンド

```bash
pnpm dev    # 開発サーバー起動
pnpm build  # ビルド
pnpm start  # プロダクション実行
```
