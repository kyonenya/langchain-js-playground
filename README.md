# PDF Question AI

PDFを読み込んだ ChatGPT が質問に答えてくれるアプリ

## 処理フロー

PDF文書の中から質問に関連しそうな箇所を類似度検索をかけて抽出。質問文と合わせてプロンプトとして送信し、応答をリアルタイムで表示する。

1. PDFファイルと質問文がフォームからフロント側から Submit されたらサーバーサイドで 2〜4 の処理を開始
    - Next.js 13.4 の [Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions) を用いてサーバー側の関数をフロント側から直接実行
1. PDFをパースして3000文字 (欧文)／1000文字 (和文) ごとのドキュメントに分割
    - 和文か欧文かを判定して自動で分割する文字数を出し分け。和文はトークン数が多くなってしまうので
1. 入力された質問文に関連していそうなドキュメントをPDFの中から抽出
    - [Langchain.js](https://github.com/hwchase17/langchainjs) の Embedding[^embedding] を用いてドキュメントをベクトル化し、質問文とのコサイン類似度が高い上位5件を抽出
    - 内部的には OpenAI の `text-embedding-ada-002`（Embedding に特化したモデル）が呼ばれている
1. 入力された質問文と関連するドキュメント5件をプロンプトテンプレートに流し込み、プロンプトを作成
    - 「以下に与えられた質問と長文の抜粋部分から最終的な答えを作りなさい。英語での質問には英語で、日本語には日本語で答えなさい」
1. サーバー側で生成されたプロンプトをフロント側で受け取り、Next.js の API Route による API エンドポイントにプロンプトを POST
    - ここで `chatgpt-3.5-turbo-16k` モデルにプロンプトを投げる
1. 本家 ChatGPT 同様、レスポンスがストリームで（1文字づつリアルタイムで）フロント側に返ってくる
    - Vercel の [AI SDK](https://sdk.vercel.ai/docs) を用いて実装した
    - この API エンドポイントはエッジランタイムに（内部的には Cloudflare に）デプロイされているので、通常のサーバーレス関数と異なり、レスポンス開始から30秒間バックグラウンドで非同期処理を返しつづけることができる

[^embedding]: Embedding (埋め込み)：文章を数値化して計算可能な対象にすること。ここではPDFドキュメントは 1536 次元のベクトル表現に変換され、質問文のベクトルと同じ方向を向いている度合いが高い＝コサインが 1 に近いほど類似度が高いことになる。

## 使い方

![Animation_quasi-observation](https://github.com/kyonenya/next-langchain-pdf/assets/62150154/ccc6b294-bc83-46c1-aa2c-6afc4a284726)

PDFには拙論 [サルトル想像論における「準観察」のテーゼ――想像と知覚の差異について](https://hosei.repo.nii.ac.jp/?action=pages_view_main&active_action=repository_view_main_item_detail&item_id=26057&item_no=1&page_id=13&block_id=83) を使用。
