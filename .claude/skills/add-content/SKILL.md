---
name: add-content
description: ブログ記事またはポートフォリオを追加する plan 駆動ワークフロー。content-planner sub-agent がプランを生成し、親エージェントが実装する。
user-invocable: true
---

# コンテンツ追加ワークフロー

引数: $ARGUMENTS（`blog` または `portfolio`。省略時はユーザーに確認する）

---

## Step 1: 情報収集

コンテンツの種類（ブログ記事 / ポートフォリオ）を確定し、以下を収集する。

**ブログ記事の場合:**
| 項目 | 説明 |
|---|---|
| タイトル | 日本語タイトル |
| スラッグ | URLに使うファイル名（英小文字・ハイフン区切り。例: `pm-team`） |
| カテゴリ | `Tech` / `Life` / `Management` / `Other` |
| 構成 | 見出しレベルの箇条書き（ユーザーが提供） |

**ポートフォリオの場合:**
| 項目 | 説明 |
|---|---|
| プロジェクトID | 英小文字・ハイフン区切り |
| タイトル | プロジェクト名 |
| 説明 | 一行の説明文 |
| 技術スタック | カンマ区切りリスト |
| URL | 公開URL（任意） |
| GitHub URL | リポジトリURL（任意） |

---

## （参考）新しいカテゴリを追加する場合

上記テーブルに存在しないカテゴリが必要になった場合は、実装前に以下を行う。

1. `src/constants/blogConstants.ts` の `BLOG_CATEGORIES` に追加する
   ```ts
   NEW_CATEGORY: 'NewCategory',
   ```
2. このファイル（SKILL.md）のカテゴリ一覧を更新する
3. `CLAUDE.md` の frontmatter コメントとカテゴリ表を更新する

---

## Step 2: content-planner sub-agent を呼び出す

`content-planner` sub-agent を呼び出し、収集した情報を以下の形式で渡す。

```
コンテンツ種別: blog または portfolio
[収集した全情報をそのまま渡す]
```

**重要:** sub-agent はプランの生成のみを行い、実装はしない。
sub-agent が `.claude/plans/{slug}-plan.md` にプランを出力するまで待つ。

---

## Step 3: プランを確認・提示

生成された `.claude/plans/{slug}-plan.md` を読み込み、内容をユーザーに提示する。

- 修正が必要な場合は sub-agent を再実行する
- 問題なければユーザーの承認を得る

---

## Step 4: 実装

ユーザー承認後、プランファイルの指示に従って実装する。
sub-agent に実装を委ねず、**親エージェントが直接実装すること**。

実装完了後、プランファイル（`.claude/plans/{slug}-plan.md`）を削除する。
