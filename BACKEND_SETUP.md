# 本番連携メモ

このLPはGitHub Pages上でも表示できますが、受付内容の確実な保存、ファイルアップロード、管理者通知、決済、管理画面ログインはサーバー側APIが必要です。

フロント側では `app-config.js` に公開してよい接続先だけを設定します。メール送信用APIキー、Stripe Secret Key、Supabase service role key などの秘密情報は絶対に置かないでください。

## 推奨構成

- データ保存: Supabase
- ファイル保存: Supabase Storage
- 管理者通知メール: Resend または SendGrid
- 決済: Stripe Checkout / Payment Link
- 公開ページ: GitHub Pages
- API: Supabase Edge Functions、Vercel Functions、Netlify Functions など

## app-config.js

```js
window.EN_SO_BLOOM_CONFIG = {
  backendMode: "production",
  apiBaseUrl: "https://example.supabase.co/functions/v1",
  supabaseAnonKey: "公開してよいanon key",
  endpoints: {
    chatbotLead: "/chatbot-lead",
    contactInquiry: "/contact-inquiry",
    adminLogin: "/admin-login",
    projectRequest: "/project-request",
    projectRevision: "/project-revision",
    adminMessage: "/admin-message",
    adminDelivery: "/admin-delivery",
    salesCheckout: "/sales-checkout"
  },
  stripe: {
    lightPaymentLink: "https://buy.stripe.com/...",
    standardPaymentLink: "https://buy.stripe.com/...",
    premiumPaymentLink: "https://buy.stripe.com/...",
    companionInquiryUrl: "contact.html"
  }
};
```

## 受信API

### chatbotLead

無料診断、制作料金問い合わせ、販促相談を受け取ります。`multipart/form-data` で送信されます。

- `payload`: JSON文字列
- `flyerFile`: チラシ画像/PDF。無料診断で添付されるファイル
- その他: `payload` 内の項目を個別フィールドとして同梱

保存先の例:

- `chat_leads`
- `diagnosis_requests`
- `contact_requests`
- `flyer_files` storage bucket

受付後に管理者へメール通知してください。

### contactInquiry

問い合わせページからの相談を受け取ります。JSONで送信されます。

主な項目:

- `business_type`
- `company_name`
- `industry`
- `name`
- `email`
- `topic`
- `message`
- `created_at`
- `notice`

### adminLogin

管理者ログインをサーバー側で判定します。JSONで送信されます。

```json
{
  "ownerId": "info@en-so-bloom.com",
  "ownerPassword": "入力されたパスワード"
}
```

成功時は以下のように返します。

```json
{
  "ok": true,
  "token": "管理画面用JWTなど"
}
```

現在のフロントにはローカル確認用のログイン判定も残しています。本番では必ず `adminLogin` endpoint を設定してください。

### projectRequest / projectRevision

ユーザー側マイページの制作依頼・修正依頼を保存します。JSONで送信されます。

### adminMessage / adminDelivery

管理者側から顧客への返信・納品登録を保存します。JSONで送信されます。

納品ファイルを本番保存する場合は、API側でStorageアップロード用の署名付きURLを発行するか、別途アップロードAPIを追加してください。

### salesCheckout

管理画面の売上管理から決済リンクを作成します。JSONで送信されます。

成功時は以下のいずれかのキーでURLを返してください。

```json
{
  "ok": true,
  "url": "https://checkout.stripe.com/..."
}
```

## 現在できること

- チャット受付内容を外部APIへ送信
- チラシ画像/PDFを `chatbotLead` にアップロード送信
- 問い合わせフォームを外部APIへ送信
- 管理者ログインを外部APIで判定
- マイページの制作依頼・修正依頼を外部APIへ送信
- 管理画面の返信・納品・決済リンク作成を外部APIへ送信
- API未設定時はローカル保存で動作確認

## 営業開始前の必須作業

1. Supabaseなどで保存先DBとStorageを作成
2. `chatbotLead` でファイル保存と管理者通知メールを実装
3. `contactInquiry` で問い合わせ保存と管理者通知メールを実装
4. `adminLogin` をサーバー側認証に切り替え
5. Stripeの本番決済リンク、またはCheckout作成APIを設定
6. `app-config.js` に本番API URLを設定
7. 送信テスト、通知テスト、ファイル確認、決済テストを実施
