const STORAGE_KEY = "free_flyer_diagnosis_entries";
const CONTACT_STORAGE_KEY = "direct_contact_entries";
const CHAT_EVENT_STORAGE_KEY = "chatbot_behavior_events";
const PLATFORM_PROJECT_KEY = "flyer_subscription_projects";
const SALES_STORAGE_KEY = "flyer_subscription_sales_records";
const PLATFORM_PLAN = {
  name: "スタンダード",
  monthlyLimit: 5
};

const initialData = () => ({
  flyer_file: "",
  issue_text: "",
  industry: "",
  flyer_purpose: "",
  distribution_method: "",
  distribution_area: "",
  desired_response: "",
  current_response_status: "",
  company_name: "",
  customer_name: "",
  email: "",
  diagnosis_focus: "",
  consent: false,
  created_at: ""
});

const state = {
  started: false,
  stage: "issue",
  data: initialData()
};

const fields = [
  {
    stage: "industry",
    field: "industry",
    label: "業種",
    question: "チラシを受け取りました。\nありがとうございます。\n\n診断レポートで見るポイントを整理するために、いくつか質問します。\n\nまず、業種を教えてください。",
    shortQuestion: "業種を教えてください。",
    chips: ["整体院・整骨院", "美容室・サロン", "飲食店", "リフォーム・工務店", "士業", "採用・求人", "その他"]
  },
  {
    stage: "flyer_purpose",
    field: "flyer_purpose",
    label: "チラシの目的",
    question: "ありがとうございます。\nこのチラシの目的を教えてください。",
    shortQuestion: "このチラシの目的を教えてください。",
    chips: ["新規集客", "予約獲得", "問い合わせ獲得", "求人募集", "イベント告知", "商品販売", "キャンペーン告知"]
  },
  {
    stage: "distribution_method",
    field: "distribution_method",
    label: "配布方法",
    question: "このチラシは、どのように配布・案内していますか？",
    shortQuestion: "配布方法を教えてください。",
    chips: ["ポスティング", "新聞折込", "店頭配布", "DM・郵送", "SNS・LINEで配信", "店内POP", "まだ配布していない"]
  },
  {
    stage: "distribution_area",
    field: "distribution_area",
    label: "配布地域",
    question: "配布・告知する地域を教えてください。\n例：広島市中区、店舗から半径3km以内、福山市周辺などで大丈夫です。",
    shortQuestion: "配布・告知する地域を教えてください。",
    chips: []
  },
  {
    stage: "desired_response",
    field: "desired_response",
    label: "増やしたい反応",
    question: "このチラシで、最終的に増やしたいものは何ですか？",
    shortQuestion: "増やしたい反応を教えてください。",
    chips: ["電話問い合わせ", "Web問い合わせ", "LINE登録", "予約", "来店", "見積もり依頼", "求人応募", "イベント参加"]
  },
  {
    stage: "current_response_status",
    field: "current_response_status",
    label: "現在の反応状況",
    question: "差し支えなければ、現在の反応状況を教えてください。\n分かる範囲で大丈夫です。",
    shortQuestion: "現在の反応状況を教えてください。",
    chips: ["まだ配布していない", "反応がほぼない", "少し反応はあるが少ない", "成約につながらない", "反応数は把握できていない", "わからない"]
  },
  {
    stage: "company_name",
    field: "company_name",
    label: "会社名・店舗名",
    question: "会社名・店舗名を教えてください。\n個人の方や、まだ屋号がない方は未入力でも大丈夫です。",
    shortQuestion: "会社名・店舗名を教えてください。",
    chips: [{ label: "未入力で進む", value: "未入力" }]
  },
  {
    stage: "customer_name",
    field: "customer_name",
    label: "お名前",
    question: "診断レポートをお送りするために、お名前を教えてください。",
    shortQuestion: "お名前を教えてください。",
    chips: []
  },
  {
    stage: "email",
    field: "email",
    label: "メールアドレス",
    question: "診断レポートの送付先メールアドレスを教えてください。",
    shortQuestion: "メールアドレスを教えてください。",
    chips: []
  }
];

const labels = {
  flyer_file: "チラシ画像/PDF",
  issue_text: "困っていること",
  diagnosis_focus: "重点確認ポイント",
  industry: "業種",
  flyer_purpose: "チラシの目的",
  distribution_method: "配布方法",
  distribution_area: "配布地域",
  desired_response: "増やしたい反応",
  current_response_status: "現在の反応状況",
  company_name: "会社名・店舗名",
  customer_name: "お名前",
  email: "メールアドレス",
  created_at: "申込日時"
};

const ADMIN_ENTRY_LABELS = {
  ...labels,
  intake_type: "受付種別",
  initial_concern: "最初の相談内容",
  target_audience: "想定ターゲット",
  service_price: "料金・価格帯",
  strengths: "強み",
  competitor_difference: "競合との違い",
  current_offer: "現在の特典・オファー",
  distribution_volume: "配布予定・配布数",
  contact_flow: "問い合わせ導線",
  reference_url: "参考URL",
  review_focus: "特に見てほしい点",
  desired_improvement: "希望する改善方向",
  inquiry_detail: "相談したい内容",
  production_item: "作りたいもの",
  preferred_timing: "希望時期",
  budget: "予算感",
  current_challenge: "現在の課題",
  phone: "電話番号",
  promotion_challenge: "現在の販促課題",
  promotion_channels: "使っている販促手段",
  consulting_scope: "相談したい範囲",
  goal: "目標",
  business_type: "事業形態",
  name: "お名前",
  topic: "相談内容",
  message: "メッセージ",
  consent: "同意確認"
};

const ADMIN_ROUTE_LABELS = {
  free_diagnosis: "無料チラシ診断",
  production_inquiry: "制作・料金相談",
  promotion_consulting: "販促伴走相談",
  direct_contact: "直接問い合わせ"
};

const ADMIN_ARCHIVE_FIELDS = {
  free_diagnosis: [
    "initial_concern",
    "flyer_file",
    "industry",
    "flyer_purpose",
    "distribution_method",
    "distribution_area",
    "desired_response",
    "current_response_status",
    "company_name",
    "customer_name",
    "email"
  ],
  production_inquiry: [
    "initial_concern",
    "inquiry_detail",
    "production_item",
    "preferred_timing",
    "budget",
    "current_challenge",
    "company_name",
    "customer_name",
    "email",
    "phone"
  ],
  promotion_consulting: [
    "initial_concern",
    "promotion_challenge",
    "promotion_channels",
    "consulting_scope",
    "goal",
    "preferred_timing",
    "budget",
    "company_name",
    "customer_name",
    "email",
    "phone"
  ],
  direct_contact: [
    "business_type",
    "company_name",
    "industry",
    "name",
    "email",
    "topic",
    "message"
  ]
};

const stageByName = Object.fromEntries(fields.map((field) => [field.stage, field]));
const fieldOrder = fields.map((field) => field.stage);

const fieldKeywords = {
  industry: [
    ["整体院・整骨院", /整体|整骨|接骨|鍼灸|治療院/],
    ["美容室・サロン", /美容室|美容院|サロン|ネイル|エステ|まつげ|アイラッシュ/],
    ["飲食店", /飲食|居酒屋|レストラン|カフェ|焼肉|宴会|ランチ/],
    ["リフォーム・工務店", /リフォーム|工務店|水回り|外壁|屋根|住宅|建築/],
    ["不動産", /不動産|賃貸|売買|土地|住宅販売/],
    ["士業", /税理士|会計士|行政書士|司法書士|社労士|弁護士|士業/],
    ["小売店", /小売|販売店|物販|雑貨|食品販売/],
    ["スクール・教室", /教室|スクール|塾|習い事|レッスン/],
    ["採用・求人", /求人|採用|スタッフ募集|人材/]
  ],
  flyer_purpose: [
    ["新規集客", /新規|集客|新規客|初回来店/],
    ["予約獲得", /予約/],
    ["問い合わせ獲得", /問い合わせ|問合せ|相談|資料請求/],
    ["求人募集", /求人|採用|応募|スタッフ募集/],
    ["イベント告知", /イベント|説明会|体験会|セミナー/],
    ["商品販売", /商品|販売|購入|物販/],
    ["キャンペーン告知", /キャンペーン|セール|割引|特典|初回/],
    ["既存客への案内", /既存客|リピート|再来店|顧客向け/]
  ],
  distribution_method: [
    ["ポスティング", /ポスティング|投函/],
    ["新聞折込", /新聞|折込|折り込み/],
    ["店頭配布", /店頭|手渡し|配布/],
    ["DM・郵送", /DM|郵送|ダイレクトメール/],
    ["SNS・LINEで配信", /SNS|Instagram|インスタ|X|Twitter|LINE|ライン/],
    ["店内POPとして掲示", /POP|店内|掲示/],
    ["まだ配布していない", /まだ配布|未配布|配布前|印刷前|これから配/]
  ],
  desired_response: [
    ["電話問い合わせ", /電話/],
    ["Web問い合わせ", /Web|WEB|フォーム|サイト|ホームページ/],
    ["LINE登録", /LINE|ライン/],
    ["予約", /予約/],
    ["来店", /来店|来院|来場/],
    ["見積もり依頼", /見積|見積もり|見積り/],
    ["求人応募", /応募|求人|採用/],
    ["イベント参加", /参加|申込|申し込み/],
    ["商品購入", /購入|販売|買/]
  ],
  current_response_status: [
    ["まだ配布していない", /まだ配布|未配布|配布前|印刷前/],
    ["配布したが反応がほぼない", /反応がない|反応なし|ほぼない|ゼロ|0件/],
    ["少し反応はあるが少ない", /少し|少ない|数件|数えるほど/],
    ["反応はあるが成約につながらない", /成約|契約|購入につながらない|予約につながらない/],
    ["反応数は把握できていない", /把握|計測|測って|分からない|わからない/]
  ]
};

const chatShell = document.querySelector(".chat-shell");
const chatMessages = document.getElementById("chatMessages");
const chatActions = document.getElementById("chatActions");
const chatForm = document.getElementById("chatForm");
const chatInput = document.getElementById("chatInput");
const flyerFileInput = document.getElementById("flyerFileInput");
const quickContactForm = document.getElementById("quickContactForm");
const contactStatus = document.getElementById("contactStatus");
const portalApp = document.querySelector(".portal-app");
const adminApp = document.querySelector(".admin-app");
const adminLoginForm = document.getElementById("adminLoginForm");
const adminLoginStatus = document.getElementById("adminLoginStatus");
const adminPasswordInput = document.getElementById("adminPasswordInput");
const adminPasswordToggle = document.getElementById("adminPasswordToggle");

let selectedPortalProjectId = "";
let selectedAdminProjectId = "";

if (chatShell) {
  chatShell.dataset.open = "false";
  window.addEventListener("pageshow", () => {
    chatShell.dataset.open = "false";
  });
}

document.querySelectorAll(".js-open-chat").forEach((button) => {
  if (chatShell) {
    button.addEventListener("click", openChat);
  }
});

const chatCloseButton = document.querySelector(".chat-close");

if (chatCloseButton && chatShell) {
  chatCloseButton.addEventListener("click", () => {
    logChatEvent("chat_close", {
      stage: state.stage || "",
      intakeType: state.intakeType || ""
    });
    chatShell.dataset.open = "false";
  });
}

if (chatForm && chatInput) {
  chatForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const text = chatInput.value.trim();
    if (!text) return;
    chatInput.value = "";
    addMessage("user", text);
    handleText(text);
  });
}

if (quickContactForm) {
  quickContactForm.addEventListener("submit", handleQuickContact);
}

if (portalApp) {
  initPortal();
}

if (adminApp) {
  initAdminAuth();
  initAdmin();
}

if (adminLoginForm) {
  adminLoginForm.addEventListener("submit", handleAdminLogin);
}

if (adminPasswordInput && adminPasswordToggle) {
  adminPasswordToggle.addEventListener("click", () => {
    const isVisible = adminPasswordInput.type === "text";
    adminPasswordInput.type = isVisible ? "password" : "text";
    adminPasswordToggle.classList.toggle("is-visible", !isVisible);
    adminPasswordToggle.setAttribute("aria-pressed", String(!isVisible));
    adminPasswordToggle.setAttribute("aria-label", isVisible ? "パスワードを表示" : "パスワードを非表示");
  });
}

if (flyerFileInput) {
  flyerFileInput.addEventListener("change", () => {
    const file = flyerFileInput.files[0];
    if (!file) return;

    const validType = /\.(jpe?g|png|pdf)$/i.test(file.name);
    if (!validType) {
      addMessage("bot", "このファイル形式またはサイズでは受付できないのじゃ。\njpg、png、pdfのいずれかで、10MB以内のファイルを送ってほしいのじゃ。");
      setActions([{ label: "チラシ画像/PDFを選択", kind: "file", important: true }]);
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      addMessage("bot", "このファイル形式またはサイズでは受付できないのじゃ。\njpg、png、pdfのいずれかで、10MB以内のファイルを送ってほしいのじゃ。");
      setActions([{ label: "別のファイルを選択", kind: "file", important: true }]);
      return;
    }

    state.data.flyer_file = {
      name: file.name,
      type: file.type || "不明",
      size: file.size,
      lastModified: file.lastModified
    };
    state.uploadedFile = file;
    logChatEvent("file_selected", {
      label: "チラシ画像/PDF選択",
      fileName: file.name,
      fileSize: file.size,
      stage: state.stage || "",
      intakeType: state.intakeType || ""
    });

    addMessage("user", `ファイルを選択しました：${file.name}`);
    addMessage("bot", "チラシを受け取ったのじゃ。\nありがとうなのじゃ。\n\n診断レポートで見るポイントを整理するために、いくつか質問するのじゃ。");
    if (state.editingField === "flyer_file") {
      state.editingField = "";
      addMessage("bot", "修正したのじゃ。確認画面に戻るのじゃ。");
      showConfirmation();
      return;
    }
    askNextMissing();
  });
}

function openChat() {
  if (!chatShell || !chatInput) return;
  chatShell.dataset.open = "true";
  if (!state.started) {
    state.started = true;
    state.stage = "issue";
    addMessage(
      "bot",
      "こんにちは。\n無料チラシ診断へようこそ。\n\n今お使いのチラシについて、反応が出にくい原因や改善ポイントをA4レポートでお返しします。\n\n診断は無料です。診断だけのご利用でも大丈夫です。\n\nまず最初にお聞きします。\n\n今のチラシで、一番気になっていることは何ですか？"
    );
    setActions([
      "配っても反応がない",
      "問い合わせが少ない",
      "予約につながらない",
      "求人応募が来ない",
      "何が悪いのかわからない",
      "配る前に見てほしい",
      "チラシがまだない"
    ]);
  }
  window.setTimeout(() => chatInput.focus(), 120);
}

function addMessage(role, text) {
  if (!chatMessages) return;
  const message = document.createElement("div");
  message.className = `message ${role}`;
  message.textContent = text;
  chatMessages.appendChild(message);
  scrollChatToBottom();
}

function addProgress(stageName) {
  const index = fieldOrder.indexOf(stageName);
  if (index < 0) return;
  addMessage("progress", `受付ステップ ${index + 1}/${fieldOrder.length}：${stageByName[stageName].label}`);
}

function addSummaryMessage() {
  const message = document.createElement("div");
  message.className = "message bot";
  const title = document.createElement("p");
  title.textContent = "ありがとうございます。以下の内容で無料チラシ診断を受け付けます。";
  message.appendChild(title);

  const summary = document.createElement("dl");
  summary.className = "summary-box";

  [
    "flyer_file",
    "industry",
    "flyer_purpose",
    "distribution_method",
    "distribution_area",
    "issue_text",
    "diagnosis_focus",
    "desired_response",
    "current_response_status",
    "company_name",
    "customer_name",
    "email"
  ].forEach((key) => {
    const row = document.createElement("div");
    const dt = document.createElement("dt");
    const dd = document.createElement("dd");
    dt.textContent = labels[key];
    dd.textContent = displayValue(key);
    row.append(dt, dd);
    summary.appendChild(row);
  });

  const note = document.createElement("p");
  note.textContent = "この内容で送信してよろしいですか？送信により、プライバシーポリシーに同意のうえ無料診断を申し込む形になります。";
  message.append(summary, note);
  chatMessages.appendChild(message);
  scrollChatToBottom();
}

function setActions(actions = []) {
  if (!chatActions) return;
  chatActions.replaceChildren();
  actions.forEach((action) => {
    const config = typeof action === "string" ? { label: action, value: action } : action;
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = config.label;
    if (config.important) button.classList.add("important");
    button.addEventListener("click", () => {
      if (config.kind === "file") {
        if (flyerFileInput) flyerFileInput.click();
        return;
      }
      if (config.kind === "confirm") {
        addMessage("user", "この内容で診断を申し込む");
        completeApplication();
        return;
      }
      if (config.kind === "copy") {
        copyAdminNotice();
        return;
      }
      if (config.kind === "reset") {
        restartChat();
        return;
      }
      const value = config.value || config.label;
      addMessage("user", value);
      handleText(value);
    });
    chatActions.appendChild(button);
  });
}

function handleText(rawText) {
  const text = rawText.trim();
  const stageForSupport = getCurrentStage();
  const preferFieldAnswer = stageForSupport && [
    "inquiry_detail",
    "production_item",
    "preferred_timing",
    "budget",
    "current_challenge",
    "promotion_challenge",
    "promotion_channels",
    "consulting_scope",
    "goal"
  ].includes(stageForSupport.name);
  const support = preferFieldAnswer ? null : getSupportResponse(text);

  if (support) {
    if (support.kind === "no-flyer") {
      handleNoFlyer();
      return;
    }
    addMessage("bot", support.message);
    repeatCurrentQuestion();
    return;
  }

  if (state.stage === "issue") {
    state.data.issue_text = text;
    captureExtraInfo(text, "issue_text");
    const reply = issueReply(text);
    addMessage("bot", reply);
    state.stage = "flyer_file";
    setActions([
      { label: "チラシ画像/PDFを選択", kind: "file", important: true },
      { label: "チラシがまだない", value: "チラシがまだない" }
    ]);
    return;
  }

  if (state.stage === "flyer_file") {
    if (looksLikeIssueText(text)) {
      state.data.issue_text = mergeIssueText(state.data.issue_text, text);
      const reply = issueReply(text);
      addMessage("bot", reply);
      setActions([
        { label: "チラシ画像/PDFを選択", kind: "file", important: true },
        { label: "PDFでも大丈夫？", value: "PDFでもいいですか？" },
        { label: "チラシがまだない", value: "チラシがまだない" }
      ]);
      return;
    }

    addMessage(
      "bot",
      "ありがとうございます。\n表面・裏面がある場合は、両方お送りください。スマホで撮影した写真でも大丈夫です。"
    );
    setActions([
      { label: "チラシ画像/PDFを選択", kind: "file", important: true },
      { label: "PDFでも大丈夫？", value: "PDFでもいいですか？" },
      { label: "チラシがまだない", value: "チラシがまだない" }
    ]);
    return;
  }

  if (state.stage === "confirm") {
    if (/申し込|送信|はい|ok|OK|お願いします|よろしい/.test(text)) {
      completeApplication();
      return;
    }
    addMessage("bot", "内容を修正したい場合は、もう一度最初から入力できます。");
    setActions([
      { label: "この内容で診断を申し込む", kind: "confirm", important: true },
      { label: "最初から入力し直す", kind: "reset" }
    ]);
    return;
  }

  const stage = stageByName[state.stage];
  if (!stage) {
    repeatCurrentQuestion();
    return;
  }

  if (stage.field === "email" && !isValidEmail(text)) {
    addMessage("bot", "メールアドレスの形式を確認できませんでした。\n例：sample@example.com のように入力してください。");
    setActions([]);
    return;
  }

  const answer = extractAnswer(stage.field, text);

  if (stage.field === "company_name" && /^(未入力|未入力で進む|なし|無し|ない|ありません|スキップ)$/i.test(text)) {
    state.data.company_name = "未入力";
  } else {
    state.data[stage.field] = answer;
  }

  captureExtraInfo(text, stage.field);
  askNextMissing();
}

function issueReply(text) {
  if (/求人|応募|採用/.test(text)) {
    state.data.diagnosis_focus = "求人訴求・応募前の不安・応募導線";
    return "ありがとうございます。\n求人チラシは、条件だけを載せても応募につながりにくいことがあります。\n\n応募する人は、給与や時間だけでなく、職場の雰囲気、自分にもできそうか、働く不安が少ないかを見ています。\n\n無料診断では、応募者目線で不安が減る内容になっているか、応募までの導線が分かりやすいかを確認します。\n\n診断のために、求人チラシ画像またはPDFを送っていただけますか？";
  }
  if (/予約/.test(text)) {
    state.data.diagnosis_focus = "予約理由・予約導線・対象者の具体性";
    return "ありがとうございます。\n予約につながらない場合、サービスの魅力は伝わっていても、予約までの理由や導線が弱いことがあります。\n\n誰向けなのか、どんな悩みに効くのか、今予約する理由があるのか、予約方法が分かりやすいか。このあたりが大切です。\n\n無料診断では、予約につながる流れになっているかを確認できます。\n\n診断のために、現在のチラシ画像またはPDFを送っていただけますか？";
  }
  if (/問い合わせ|問合せ|連絡|相談/.test(text)) {
    state.data.diagnosis_focus = "問い合わせ理由・CTA・問い合わせ方法";
    return "ありがとうございます。\n問い合わせが少ない場合、チラシを見た人が興味を持っていても、「今問い合わせる理由」や「問い合わせ方法の分かりやすさ」が弱い可能性があります。\n\n無料診断では、見出し・訴求・申し込み理由・CTAの流れを確認します。\n\n診断のために、現在のチラシ画像またはPDFを送っていただけますか？";
  }
  if (/Canva|キャンバ|素人|デザイン|見た目|古い|安っぽい/.test(text)) {
    state.data.diagnosis_focus = "見た目の信頼感・情報整理・訴求の優先順位";
    return "ありがとうございます。\n見た目に不安があると、このまま配って大丈夫かなと迷いますよね。\n\nただ、診断ではデザインの好みだけでなく、何を一番目立たせるべきか、情報の優先順位が伝わるか、信頼感を下げている要素がないかを確認します。\n\n診断のために、現在のチラシ画像またはPDFを送っていただけますか？";
  }
  if (/文字|情報|ごちゃ|読みにく|分かりにく|わかりにく/.test(text)) {
    state.data.diagnosis_focus = "情報量・読みやすさ・読み進める順番";
    return "ありがとうございます。\n情報が多いチラシは、伝えたいことを入れているのに読まれにくくなることがあります。\n\n無料診断では、最初に読むべき情報、後から見ればよい情報、問い合わせ前に必要な情報が整理されているかを確認します。\n\n診断のために、現在のチラシ画像またはPDFを送っていただけますか？";
  }
  if (/QR|LINE|電話|フォーム|導線|申し込み|申込み|CTA/.test(text)) {
    state.data.diagnosis_focus = "問い合わせ導線・CTA配置・行動の分かりやすさ";
    return "ありがとうございます。\n導線が分かりにくいと、興味を持った人でもそこで止まってしまいます。\n\n無料診断では、電話・Web・LINE・QRなどの入口が見つけやすいか、どの順番で行動すればよいかが伝わるかを確認します。\n\n診断のために、現在のチラシ画像またはPDFを送っていただけますか？";
  }
  if (/キャンペーン|セール|特典|割引|限定/.test(text)) {
    state.data.diagnosis_focus = "オファー・期限・今申し込む理由";
    return "ありがとうございます。\nキャンペーンは、内容が良くても「今動く理由」が弱いと後回しにされやすいです。\n\n無料診断では、特典の見せ方、期限や限定性、申し込みまでの流れが自然かを確認します。\n\n診断のために、現在のチラシ画像またはPDFを送っていただけますか？";
  }
  if (/来店|集客|客|反応|配っても|反響/.test(text)) {
    state.data.diagnosis_focus = "ターゲット・見出し・オファー・地域訴求";
    return "ありがとうございます。\n配っているのに反応がないと、印刷代や配布の手間が無駄になっているようで不安になりますよね。\n\nチラシの反応が出ない原因は、デザインだけではなく、ターゲット・見出し・オファー・問い合わせ導線にあることも多いです。\n\n無料診断では、どこを直せば反応につながりやすいかをA4レポートにまとめます。\n\n診断のために、現在のチラシ画像またはPDFを送っていただけますか？";
  }
  if (/悪い|わから|分から|原因|不安/.test(text)) {
    state.data.diagnosis_focus = "反応低下の原因特定・改善優先順位";
    return "ありがとうございます。\nそこが一番もどかしいですよね。\n\nチラシは、反応が出ない原因が一目では分かりにくいです。見出しなのか、ターゲットなのか、内容なのか、オファーなのか、導線なのか。\n原因が分からないまま作り直すと、また同じ失敗を繰り返してしまうことがあります。\n\n無料診断では、7つの視点で改善ポイントを整理します。\n\nまずは、診断したいチラシ画像またはPDFを送っていただけますか？";
  }
  if (/配る前|配布前|印刷前|これから/.test(text)) {
    state.data.diagnosis_focus = "配布前チェック・見出し・導線・無駄打ち防止";
    return "ありがとうございます。\n配布前に確認するのは、とても良い判断です。\n\nチラシは、印刷して配ってから直すと、印刷代も配布費もかかってしまいます。配る前に見出しや導線を確認しておくことで、無駄を減らせる可能性があります。\n\n無料診断では、配布前の改善ポイントも確認できます。\n\n診断したいチラシ画像またはPDFをアップロードしてください。";
  }
  state.data.diagnosis_focus = "ターゲット・訴求・オファー・導線";
  return "ありがとうございます。\nその不安は、チラシのどこを直せばよいかが見えにくい時ほど大きくなりますよね。\n\n無料診断では、ターゲット・見出し・欲しくなる理由・今申し込む理由・問い合わせ導線を確認し、改善ポイントをA4レポートにまとめます。\n\n診断のために、現在のチラシ画像またはPDFを送っていただけますか？";
}

function looksLikeIssueText(text) {
  return /反応|反響|問い合わせ|問合せ|予約|来店|応募|求人|採用|集客|配っても|読みにく|分かりにく|わかりにく|ごちゃ|デザイン|Canva|キャンバ|導線|QR|LINE|電話|フォーム|キャンペーン|セール|特典|割引|限定|悪い|わから|分から|原因|不安|配る前|配布前|印刷前/.test(text);
}

function mergeIssueText(current, next) {
  if (!current) return next;
  if (current.includes(next)) return current;
  return `${current} / 追加：${next}`;
}

function getSupportResponse(text) {
  const normalized = text.replace(/\s/g, "");
  const questionLike = /ですか|ますか|でしょうか|大丈夫|可能|知りたい|教えて|いくら|保証|営業|勧誘|しつこ|？|\?/.test(normalized);

  if (/チラシ(が|は)?まだない|まだ作ってない|まだありません|新しく作りたい/.test(normalized)) {
    return { kind: "no-flyer" };
  }

  if (/本当に?無料|無料.*(ですか|なの|大丈夫)|費用|0円|タダ/.test(normalized)) {
    return {
      message:
        "はい、無料です。\n現在のチラシを送っていただければ、改善ポイントをA4レポートにまとめてお送りします。\n\n診断だけのご利用でも問題ありません。"
    };
  }

  if (questionLike && /営業|売り込|勧誘|しつこ/.test(normalized)) {
    return {
      message:
        "ご安心ください。\n診断後に必要な方にはサブスクプランをご案内しますが、無理な営業は行いません。\n\nまずは、今のチラシの改善ポイントを知る目的でご利用ください。"
    };
  }

  if (questionLike && /古い|昔の|以前/.test(normalized)) {
    return {
      message:
        "はい、大丈夫です。\n古いチラシでも、現在の内容をもとに改善ポイントを確認できます。\n\n以前から使っているチラシほど、ターゲットや訴求が今の状況とズレている可能性があります。"
    };
  }

  if (
    /まだ配布していない|配布してない|印刷前|配布前/.test(normalized) &&
    /大丈夫|できますか|可能|いいですか|診断/.test(normalized) &&
    state.stage !== "issue"
  ) {
    return {
      message:
        "はい、大丈夫です。\n配布前のチラシでも診断できます。\n\n印刷前に見直すことで、見出し・オファー・導線の改善ポイントを確認できます。"
    };
  }

  if (questionLike && /PDF|pdf|画像|写真|アップロード/.test(text) && /いい|大丈夫|可能|できますか|可/.test(text)) {
    return {
      message:
        "はい、PDFでも画像でも大丈夫です。\n可能であれば、表面・裏面が分かる形でお送りください。スマホで撮影した写真でも問題ありません。"
    };
  }

  if (questionLike && /保証|必ず|効果|売上/.test(normalized)) {
    return {
      message:
        "反応や売上を保証するものではありません。\nただし、感覚だけで作るのではなく、ターゲット・訴求・オファー・導線を整理し、反応につながる可能性を高めるための診断を行います。"
    };
  }

  if (questionLike && /料金|価格|プラン|サブスク/.test(normalized)) {
    return {
      message:
        "無料診断は0円です。\n\n診断後、ご希望の方にはチラシ制作サブスクをご案内します。\n\nライト：月2点まで 9,800円\nスタンダード：月5点まで 19,800円\nプレミアム：月8点まで 29,800円\n\n診断だけのご利用でも問題ありません。"
    };
  }

  return null;
}

function handleNoFlyer() {
  state.data.flyer_file = "未作成";
  state.data.diagnosis_focus = state.data.diagnosis_focus || "新規制作の方向性・目的・ターゲット整理";
  if (!state.data.issue_text) {
    state.data.issue_text = "チラシがまだない";
  }
  addMessage(
    "bot",
    "ありがとうございます。\nチラシがまだない場合でも大丈夫です。\n\nその場合は、無料診断というより「新しく作るならどんなチラシがよいか」の簡易ヒアリングとして進められます。"
  );
  if (state.data.flyer_purpose) {
    askNextMissing();
  } else {
    state.stage = "flyer_purpose";
    addProgress("flyer_purpose");
    addMessage("bot", "まず、作りたいチラシの目的を教えてください。");
    setActions(stageByName.flyer_purpose.chips);
  }
}

function askNextMissing() {
  const next = fieldOrder.find((stageName) => {
    const field = stageByName[stageName].field;
    return !state.data[field];
  });

  if (!next) {
    showConfirmation();
    return;
  }

  askStage(next);
}

function askStage(stageName) {
  const stage = stageByName[stageName];
  state.stage = stageName;
  addProgress(stageName);
  addMessage("bot", stage.question);
  setActions(stage.chips);
}

function repeatCurrentQuestion() {
  if (state.stage === "issue") {
    addMessage("bot", "よろしければ、今のチラシで一番気になっていることを教えてください。");
    setActions([
      "配っても反応がない",
      "問い合わせが少ない",
      "予約につながらない",
      "求人応募が来ない",
      "何が悪いのかわからない",
      "配る前に見てほしい",
      "チラシがまだない"
    ]);
    return;
  }

  if (state.stage === "flyer_file") {
    addMessage("bot", "診断したいチラシ画像またはPDFを送ってください。");
    setActions([
      { label: "チラシ画像/PDFを選択", kind: "file", important: true },
      { label: "チラシがまだない", value: "チラシがまだない" }
    ]);
    return;
  }

  if (stageByName[state.stage]) {
    addMessage("bot", stageByName[state.stage].shortQuestion);
    setActions(stageByName[state.stage].chips);
    return;
  }

  setActions([]);
}

function showConfirmation() {
  state.stage = "confirm";
  addSummaryMessage();
  setActions([
    { label: "この内容で診断を申し込む", kind: "confirm", important: true },
    { label: "最初から入力し直す", kind: "reset" }
  ]);
}

function completeApplication() {
  state.data.consent = true;
  state.data.created_at = new Date().toLocaleString("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  });

  saveEntry();
  state.stage = "complete";

  addMessage(
    "bot",
    "ありがとうございます。\n無料チラシ診断の受付が完了しました。\n\nいただいたチラシと入力内容をもとに、7つのAI仙人の分析フレームを活用して、改善ポイントをA4レポートにまとめます。\n\n通常1〜3営業日以内に、メールにてお送りします。\n\nチラシを作り直す前に、まずは「どこを直せば反応につながりやすいのか」を一緒に見つけていきましょう。"
  );
  setActions([
    { label: "管理者通知をコピー", kind: "copy" },
    { label: "新しく診断する", kind: "reset" }
  ]);
}

function captureExtraInfo(text, currentField) {
  const email = text.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i);
  if (email && currentField !== "email" && !state.data.email) {
    state.data.email = email[0];
  }

  if (currentField !== "industry" && !state.data.industry) {
    const industry = findFieldKeyword("industry", text);
    if (industry) state.data.industry = industry;
  }

  if (currentField !== "flyer_purpose" && !state.data.flyer_purpose) {
    const purpose = findFieldKeyword("flyer_purpose", text);
    if (purpose) state.data.flyer_purpose = purpose;
  }

  if (currentField !== "distribution_method" && !state.data.distribution_method) {
    const method = findFieldKeyword("distribution_method", text);
    if (method) state.data.distribution_method = method;
  }

  if (currentField !== "desired_response" && !state.data.desired_response) {
    const response = findFieldKeyword("desired_response", text);
    if (response) state.data.desired_response = response;
  }

  if (currentField !== "current_response_status" && !state.data.current_response_status) {
    const status = findFieldKeyword("current_response_status", text);
    if (status) state.data.current_response_status = status;
  }

  if (currentField !== "distribution_area" && !state.data.distribution_area) {
    const area = extractArea(text);
    if (area) state.data.distribution_area = area;
  }
}

function extractAnswer(field, text) {
  if (field === "email") return text.toLowerCase();
  if (field === "distribution_area") {
    const area = extractArea(text);
    return area || text;
  }
  return findFieldKeyword(field, text) || text;
}

function findFieldKeyword(field, text) {
  const candidates = fieldKeywords[field] || [];
  const match = candidates.find(([, pattern]) => pattern.test(text));
  return match ? match[0] : "";
}

function extractArea(text) {
  const radius = text.match(/(店舗から)?半径[0-9０-９]+(km|キロ)(以内|圏内|周辺)?/);
  if (radius) return radius[0];

  const cityWard = text.match(/([一-龥ぁ-んァ-ヶー0-9０-９]+?市[一-龥ぁ-んァ-ヶー0-9０-９]+?区)/);
  if (cityWard) return cityWard[1];

  const city = text.match(/([一-龥ぁ-んァ-ヶー0-9０-９]+?市)(周辺|近郊|エリア)?/);
  if (city) return `${city[1]}${city[2] || ""}`;

  const wardTown = text.match(/([一-龥ぁ-んァ-ヶー0-9０-９]+?(区|町|村))(周辺|近郊|エリア)?/);
  if (wardTown) return `${wardTown[1]}${wardTown[3] || ""}`;

  const prefecture = text.match(/([一-龥ぁ-んァ-ヶー0-9０-９]+?(都|道|府|県))(周辺|近郊|エリア)?/);
  return prefecture ? `${prefecture[1]}${prefecture[3] || ""}` : "";
}

function isValidEmail(text) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text);
}

function displayValue(key) {
  const value = state.data[key];
  if (!value) return "未入力";
  if (typeof value === "object") {
    return `${value.name} (${formatBytes(value.size)})`;
  }
  return value;
}

function formatBytes(bytes) {
  if (!Number.isFinite(bytes)) return "サイズ不明";
  if (bytes < 1024) return `${bytes}B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)}KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)}MB`;
}

function saveEntry() {
  try {
    const entries = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    entries.push({
      ...state.data,
      flyer_file: displayValue("flyer_file")
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries, null, 2));
  } catch {
    // The visible受付 flow should still complete when browser storage is disabled.
  }
}

function buildAdminNotice() {
  return `【無料チラシ診断 申込】

■ お名前
${displayValue("customer_name")}

■ メールアドレス
${displayValue("email")}

■ 会社名・店舗名
${displayValue("company_name")}

■ 業種
${displayValue("industry")}

■ チラシの目的
${displayValue("flyer_purpose")}

■ 配布方法
${displayValue("distribution_method")}

■ 配布地域
${displayValue("distribution_area")}

■ 困っていること
${displayValue("issue_text")}

■ 重点確認ポイント
${displayValue("diagnosis_focus")}

■ 増やしたい反応
${displayValue("desired_response")}

■ 現在の反応状況
${displayValue("current_response_status")}

■ チラシ画像/PDF
${displayValue("flyer_file")}

■ 申込日時
${displayValue("created_at")}`;
}

async function copyAdminNotice() {
  try {
    await navigator.clipboard.writeText(buildAdminNotice());
    addMessage("system", "管理者通知テンプレートをコピーしました。");
  } catch {
    addMessage("bot", buildAdminNotice());
  }
}

async function handleQuickContact(event) {
  event.preventDefault();
  const formData = new FormData(quickContactForm);
  const entry = {
    business_type: String(formData.get("business_type") || "").trim(),
    company_name: String(formData.get("company_name") || "").trim(),
    industry: String(formData.get("industry") || "").trim(),
    name: String(formData.get("name") || "").trim(),
    email: String(formData.get("email") || "").trim(),
    topic: String(formData.get("topic") || "").trim(),
    message: String(formData.get("message") || "").trim(),
    created_at: new Date().toLocaleString("ja-JP", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit"
    })
  };

  if (!entry.business_type || !entry.name || !isValidEmail(entry.email) || !entry.topic || !entry.message) {
    setContactStatus("入力内容をご確認ください。事業形態、お名前、メールアドレス、相談内容、メッセージは必須です。", false);
    return;
  }

  saveContactEntry(entry);
  const notice = buildContactNotice(entry);

  try {
    await navigator.clipboard.writeText(notice);
    setContactStatus("お問い合わせ内容を受け付けました。内容を確認し、通常1〜3営業日以内に返信します。", true);
  } catch {
    setContactStatus("お問い合わせ内容を受け付けました。内容を確認し、通常1〜3営業日以内に返信します。", true);
  }

  quickContactForm.reset();
}

function setContactStatus(message, success) {
  if (!contactStatus) return;
  contactStatus.textContent = message;
  contactStatus.classList.toggle("success", Boolean(success));
}

function saveContactEntry(entry) {
  try {
    const entries = JSON.parse(localStorage.getItem(CONTACT_STORAGE_KEY) || "[]");
    entries.push(entry);
    localStorage.setItem(CONTACT_STORAGE_KEY, JSON.stringify(entries, null, 2));
  } catch {
    // The visible問い合わせ flow should still complete when browser storage is disabled.
  }
}

function buildContactNotice(entry) {
  return `【直接お問い合わせ】

■ 事業形態
${entry.business_type}

■ 会社名・屋号・店舗名
${entry.company_name || "未入力"}

■ 業種
${entry.industry || "未入力"}

■ お名前
${entry.name}

■ メールアドレス
${entry.email}

■ 相談内容
${entry.topic}

■ メッセージ
${entry.message}

■ 受付日時
${entry.created_at}`;
}

function restartChat() {
  if (!chatMessages) return;
  state.stage = "issue";
  state.data = initialData();
  chatMessages.replaceChildren();
  setActions([]);
  addMessage(
    "bot",
    "改めて受付を始めます。\n\n今のチラシで、一番気になっていることは何ですか？"
  );
  setActions([
    "配っても反応がない",
    "問い合わせが少ない",
    "予約につながらない",
    "求人応募が来ない",
    "何が悪いのかわからない",
    "配る前に見てほしい",
    "チラシがまだない"
  ]);
}

function scrollChatToBottom() {
  if (!chatMessages) return;
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function initPortal() {
  ensurePlatformDemoProjects();
  const projects = loadPlatformProjects();
  selectedPortalProjectId = projects[0]?.id || "";

  const projectList = document.getElementById("portalProjectList");
  if (projectList) {
    projectList.addEventListener("click", (event) => {
      const button = event.target.closest("[data-project-id]");
      if (!button) return;
      selectedPortalProjectId = button.dataset.projectId;
      renderPortal();
    });
  }

  const requestForm = document.getElementById("portalRequestForm");
  if (requestForm) {
    requestForm.addEventListener("submit", handlePortalRequest);
  }

  const revisionForm = document.getElementById("portalRevisionForm");
  if (revisionForm) {
    revisionForm.addEventListener("submit", handlePortalRevision);
  }

  renderPortal();
}

function initAdmin() {
  applyAdminView();
  clearAdminPrototypeDemoData();
  const projects = loadAdminProjects();
  selectedAdminProjectId = projects[0]?.id || "";

  const board = document.getElementById("adminBoard");
  if (board) {
    board.addEventListener("click", (event) => {
      const button = event.target.closest("[data-admin-action]");
      if (!button) return;
      const projectId = button.dataset.projectId;
      const action = button.dataset.adminAction;
      if (action === "select") {
        selectedAdminProjectId = projectId;
        renderAdmin();
        return;
      }
      if (action === "status") {
        updateProjectStatus(projectId, button.dataset.status);
      }
    });
  }

  const messageForm = document.getElementById("adminMessageForm");
  if (messageForm) {
    messageForm.addEventListener("submit", handleAdminMessage);
  }

  const deliveryForm = document.getElementById("adminDeliveryForm");
  if (deliveryForm) {
    deliveryForm.addEventListener("submit", handleAdminDelivery);
  }

  const salesSection = document.getElementById("admin-sales");
  if (salesSection) {
    salesSection.addEventListener("click", handleAdminSalesAction);
  }

  renderAdmin();
}

function applyAdminView() {
  const params = new URLSearchParams(window.location.search);
  const view = params.get("view") || "dashboard";
  document.body.dataset.adminView = view;

  document.querySelectorAll("[data-admin-view]").forEach((section) => {
    const views = String(section.dataset.adminView || "").split(/\s+/);
    section.hidden = !views.includes(view);
  });

  document.querySelectorAll("[data-admin-nav]").forEach((link) => {
    link.classList.toggle("is-active", link.dataset.adminNav === view);
  });
}

function initAdminAuth() {
  if (sessionStorage.getItem("owner_admin_authenticated") === "true") {
    document.body.classList.add("admin-authed");
  }
}

async function handleAdminLogin(event) {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  const ownerId = String(formData.get("owner_id") || "").trim().toLowerCase();
  const ownerPassword = String(formData.get("owner_password") || "");
  const credentialHash = await sha256(`${ownerId}:${ownerPassword}`);
  const expectedId = "info@en-so-bloom.com";
  const expectedHash = "79d2945fbd550fd49f3c51161e032aafbb5dc6d7d50a611d3bdee0b3f965ee2c";

  if (ownerId === expectedId && credentialHash === expectedHash) {
    sessionStorage.setItem("owner_admin_authenticated", "true");
    document.body.classList.add("admin-authed");
    event.currentTarget.reset();
    if (adminLoginStatus) {
      adminLoginStatus.textContent = "ログインしました。";
      adminLoginStatus.classList.remove("error");
    }
    return;
  }

  if (adminLoginStatus) {
    adminLoginStatus.textContent = "IDまたはパスワードが違います。";
    adminLoginStatus.classList.add("error");
  }
}

async function sha256(value) {
  const bytes = new TextEncoder().encode(value);
  const hash = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(hash))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

function handlePortalRequest(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const formData = new FormData(form);
  const now = new Date();
  const file = formData.get("asset");
  const message = String(formData.get("message") || "").trim();
  const title = String(formData.get("title") || "").trim();
  const type = String(formData.get("request_type") || "").trim();
  const purpose = String(formData.get("purpose") || "").trim();

  if (!title || !type || !purpose || !message) {
    setInlineStatus("portalRequestStatus", "作りたいもの、タイトル、目的、依頼内容を入力してください。", false);
    return;
  }

  const project = {
    id: createPlatformId(),
    customer_name: "サンプル店舗",
    plan_name: PLATFORM_PLAN.name,
    title,
    type,
    purpose,
    due_preference: String(formData.get("due_preference") || "").trim() || "指定なし",
    asset: fileToMeta(file),
    status: "受付確認中",
    created_at: now.toISOString(),
    updated_at: now.toISOString(),
    due_at: addBusinessDays(now, 3).toISOString(),
    messages: [
      {
        role: "client",
        author: "お客様",
        text: message,
        created_at: now.toISOString()
      },
      {
        role: "system",
        author: "システム",
        text: "制作依頼を受け付けました。担当者が内容を確認します。",
        created_at: now.toISOString()
      }
    ],
    deliveries: [],
    revisions: []
  };

  const projects = loadPlatformProjects();
  projects.unshift(project);
  savePlatformProjects(projects);
  selectedPortalProjectId = project.id;
  form.reset();
  setInlineStatus("portalRequestStatus", "制作依頼を送信しました。依頼一覧と管理画面に反映されています。", true);
  renderPortal();
}

function handlePortalRevision(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const projects = loadPlatformProjects();
  const project = projects.find((item) => item.id === selectedPortalProjectId);
  const formData = new FormData(form);
  const text = String(formData.get("revision_message") || "").trim();
  const file = formData.get("revision_asset");
  const fileMeta = fileToMeta(file);

  if (!project) {
    setInlineStatus("portalRevisionStatus", "修正依頼を送る案件を選択してください。", false);
    return;
  }

  if (!text && !fileMeta) {
    setInlineStatus("portalRevisionStatus", "修正内容、または修正用ファイルを入力してください。", false);
    return;
  }

  const now = new Date().toISOString();
  const revision = {
    text: text || "修正用ファイルを送信しました。",
    asset: fileMeta,
    created_at: now
  };
  project.revisions.push(revision);
  project.status = "修正対応";
  project.updated_at = now;
  project.messages.push({
    role: "client",
    author: "お客様",
    text: `${revision.text}${fileMeta ? `\n添付：${fileMeta.name}` : ""}`,
    created_at: now
  });

  savePlatformProjects(projects);
  form.reset();
  setInlineStatus("portalRevisionStatus", "修正依頼を送信しました。管理画面にも反映されています。", true);
  renderPortal();
}

function handleAdminMessage(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const formData = new FormData(form);
  const projectId = String(formData.get("project_id") || "");
  const message = String(formData.get("message") || "").trim();
  if (!projectId || !message) {
    setInlineStatus("adminMessageStatus", "対象案件と返信内容を入力してください。", false);
    return;
  }

  const projects = loadPlatformProjects();
  const project = projects.find((item) => item.id === projectId);
  if (!project) return;

  const now = new Date().toISOString();
  project.messages.push({
    role: "admin",
    author: "担当者",
    text: message,
    created_at: now
  });
  project.updated_at = now;
  savePlatformProjects(projects);
  selectedAdminProjectId = project.id;
  form.reset();
  setInlineStatus("adminMessageStatus", "返信を追加しました。顧客ポータルに表示されます。", true);
  renderAdmin();
}

function handleAdminDelivery(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const formData = new FormData(form);
  const projectId = String(formData.get("project_id") || "");
  const status = String(formData.get("delivery_status") || "初稿納品");
  const title = String(formData.get("title") || "").trim();
  const message = String(formData.get("message") || "").trim();
  const fileMeta = fileToMeta(formData.get("delivery_file"));

  if (!projectId || !title || !message) {
    setInlineStatus("adminDeliveryStatus", "対象案件、納品タイトル、メッセージを入力してください。", false);
    return;
  }

  const projects = loadPlatformProjects();
  const project = projects.find((item) => item.id === projectId);
  if (!project) return;

  const now = new Date().toISOString();
  const delivery = {
    title,
    message,
    file: fileMeta || { name: "納品ファイル未選択", size: 0, type: "未選択" },
    status,
    created_at: now
  };
  project.deliveries.push(delivery);
  project.status = status;
  project.updated_at = now;
  project.messages.push({
    role: "admin",
    author: "担当者",
    text: `${status}を登録しました。\n${message}\n納品：${delivery.file.name}`,
    created_at: now
  });

  savePlatformProjects(projects);
  selectedAdminProjectId = project.id;
  form.reset();
  setInlineStatus("adminDeliveryStatus", "納品を登録しました。顧客ポータルにも反映されています。", true);
  renderAdmin();
}

function renderPortal() {
  const projects = loadPlatformProjects();
  if (!projects.some((project) => project.id === selectedPortalProjectId)) {
    selectedPortalProjectId = projects[0]?.id || "";
  }
  const selectedProject = projects.find((project) => project.id === selectedPortalProjectId);

  renderPortalMetrics(projects);
  renderPortalProjectList(projects);
  renderPortalThread(selectedProject);
  renderPortalDetail(selectedProject);
  renderPortalDeliveries(projects);
}

function renderPortalMetrics(projects) {
  const monthProjects = projects.filter((project) => isThisMonth(project.created_at));
  const used = monthProjects.length;
  const remaining = Math.max(0, PLATFORM_PLAN.monthlyLimit - used);
  const active = projects.filter((project) => project.status !== "完了").length;
  const deliveries = projects.reduce((count, project) => count + project.deliveries.length, 0);
  const nextDue = projects
    .filter((project) => project.status !== "完了")
    .sort((a, b) => new Date(a.due_at) - new Date(b.due_at))[0];

  setText("portalPlanName", PLATFORM_PLAN.name);
  setText("portalRemainingSlots", `${remaining}点`);
  setText("portalUsageText", `今月 ${used}/${PLATFORM_PLAN.monthlyLimit} 点を利用`);
  setText("portalActiveCount", `${active}件`);
  setText("portalNextDelivery", nextDue ? formatShortDate(nextDue.due_at) : "-");
  setText("portalDeliveryCount", `${deliveries}件`);
}

function renderPortalProjectList(projects) {
  const list = document.getElementById("portalProjectList");
  setText("projectCountLabel", `${projects.length}件`);
  if (!list) return;
  if (!projects.length) {
    list.innerHTML = '<div class="empty-state">まだ制作依頼がありません。</div>';
    return;
  }

  list.innerHTML = projects
    .map(
      (project) => `
        <button class="project-card${project.id === selectedPortalProjectId ? " active" : ""}" type="button" data-project-id="${escapeHtml(project.id)}">
          <small>${escapeHtml(project.status)}</small>
          <strong>${escapeHtml(project.title)}</strong>
          <p>${escapeHtml(project.type)} / ${escapeHtml(formatShortDate(project.due_at))}目安</p>
        </button>
      `
    )
    .join("");
}

function renderPortalThread(project) {
  const title = document.getElementById("thread-title");
  const status = document.getElementById("threadStatus");
  const thread = document.getElementById("portalThread");
  if (!thread) return;

  if (!project) {
    if (title) title.textContent = "依頼を選択してください";
    if (status) {
      status.textContent = "未選択";
      status.className = "status-pill";
    }
    thread.innerHTML = '<div class="empty-state">左の依頼一覧から案件を選ぶか、新しい制作依頼を送ってください。</div>';
    return;
  }

  if (title) title.textContent = project.title;
  if (status) {
    status.textContent = project.status;
    status.className = `status-pill ${statusClass(project.status)}`;
  }

  thread.innerHTML = project.messages
    .map(
      (message) => `
        <article class="portal-message ${escapeHtml(message.role)}">
          <strong>${escapeHtml(message.author)}</strong>
          <p>${escapeHtml(message.text)}</p>
          <time>${escapeHtml(formatDateTime(message.created_at))}</time>
        </article>
      `
    )
    .join("");
  thread.scrollTop = thread.scrollHeight;
}

function renderPortalDetail(project) {
  const detail = document.getElementById("portalDetailList");
  if (!detail) return;
  if (!project) {
    detail.innerHTML = '<div><dt>状態</dt><dd>案件未選択</dd></div>';
    return;
  }

  const rows = [
    ["ステータス", project.status],
    ["作りたいもの", project.type],
    ["目的", project.purpose],
    ["希望納期", project.due_preference],
    ["初稿目安", formatShortDate(project.due_at)],
    ["素材", project.asset ? `${project.asset.name} (${formatBytes(project.asset.size)})` : "未添付"],
    ["修正依頼", `${project.revisions.length}件`],
    ["納品", `${project.deliveries.length}件`]
  ];
  detail.innerHTML = rows
    .map(([label, value]) => `<div><dt>${escapeHtml(label)}</dt><dd>${escapeHtml(value)}</dd></div>`)
    .join("");
}

function renderPortalDeliveries(projects) {
  const deliveryList = document.getElementById("portalDeliveryList");
  if (!deliveryList) return;
  const deliveries = projects.flatMap((project) =>
    project.deliveries.map((delivery) => ({
      ...delivery,
      projectTitle: project.title
    }))
  );

  if (!deliveries.length) {
    deliveryList.innerHTML = '<div class="empty-state">まだ納品データはありません。初稿が登録されるとここに表示されます。</div>';
    return;
  }

  deliveryList.innerHTML = deliveries
    .map(
      (delivery) => `
        <article class="delivery-card">
          <span>${escapeHtml(delivery.status)}</span>
          <h3>${escapeHtml(delivery.title)}</h3>
          <p>${escapeHtml(delivery.projectTitle)}</p>
          <p>${escapeHtml(delivery.message)}</p>
          <div class="delivery-file">${escapeHtml(delivery.file.name)}${delivery.file.size ? ` / ${escapeHtml(formatBytes(delivery.file.size))}` : ""}</div>
          <small>${escapeHtml(formatDateTime(delivery.created_at))}</small>
        </article>
      `
    )
    .join("");
}

function renderAdmin() {
  const projects = loadAdminProjects();
  if (!projects.some((project) => project.id === selectedAdminProjectId)) {
    selectedAdminProjectId = projects[0]?.id || "";
  }
  renderAdminMetrics(projects);
  renderAdminEntries();
  renderAdminChatAnalytics();
  renderAdminBoard(projects);
  renderAdminSales();
  renderAdminSelects(projects);
  renderAdminDetail(projects.find((project) => project.id === selectedAdminProjectId));
}

function renderAdminMetrics(projects) {
  const diagnosisEntries = loadStoredEntries(STORAGE_KEY);
  const contactEntries = loadStoredEntries(CONTACT_STORAGE_KEY);
  setText("adminPendingCount", `${projects.filter((project) => project.status === "受付確認中").length}件`);
  setText("adminWorkingCount", `${projects.filter((project) => project.status === "制作中").length}件`);
  setText("adminRevisionCount", `${projects.filter((project) => project.status === "修正対応").length}件`);
  setText("adminMonthlyCount", `${projects.filter((project) => isThisMonth(project.created_at)).length}件`);
  setText("adminDiagnosisCount", `${diagnosisEntries.length}件`);
  setText("adminContactCount", `${contactEntries.length}件`);
}

function renderAdminEntries() {
  renderAdminEntryList("adminDiagnosisEntries", loadStoredEntries(STORAGE_KEY), [
    "customer_name",
    "email",
    "company_name",
    "industry",
    "issue_text",
    "flyer_purpose",
    "distribution_method",
    "distribution_area",
    "desired_response",
    "current_response_status",
    "flyer_file"
  ]);
  renderAdminEntryList("adminContactEntries", loadStoredEntries(CONTACT_STORAGE_KEY), [
    "name",
    "customer_name",
    "email",
    "company_name",
    "business_type",
    "industry",
    "topic",
    "inquiry_detail",
    "production_item",
    "promotion_challenge",
    "message"
  ]);
}

function renderAdminEntryList(elementId, entries, fields) {
  const list = document.getElementById(elementId);
  if (!list) return;
  if (!entries.length) {
    list.innerHTML = '<div class="empty-state">まだ受付データはありません。</div>';
    return;
  }

  list.innerHTML = entries
    .slice(0, 12)
    .map((entry) => {
      const title = entry.customer_name || entry.name || entry.company_name || entry.email || "未入力";
      const rows = fields
        .filter((key) => entry[key])
        .slice(0, 8)
        .map(
          (key) => `
            <div>
              <dt>${escapeHtml(ADMIN_ENTRY_LABELS[key] || key)}</dt>
              <dd>${escapeHtml(formatAdminEntryValue(entry[key]))}</dd>
            </div>
          `
        )
        .join("");
      return `
        <article class="admin-entry-card">
          <header>
            <strong>${escapeHtml(title)}</strong>
            <time>${escapeHtml(formatDateTime(entry.created_at))}</time>
          </header>
          <dl>${rows || '<div><dt>内容</dt><dd>詳細未入力</dd></div>'}</dl>
        </article>
      `;
    })
    .join("");
}

function loadStoredEntries(key) {
  try {
    return JSON.parse(localStorage.getItem(key) || "[]");
  } catch {
    return [];
  }
}

function formatAdminEntryValue(value) {
  if (!value) return "-";
  if (typeof value === "object") {
    if (value.name) return `${value.name}${value.size ? `（${formatBytes(value.size)}）` : ""}`;
    return Object.values(value).filter(Boolean).join(" / ");
  }
  return value;
}

function renderAdminChatAnalytics() {
  const leads = getAdminChatLeads();
  const events = getAdminChatEvents();
  const total = leads.length;
  const diagnosisCount = leads.filter((lead) => lead.route === "free_diagnosis").length;
  const consultCount = leads.filter((lead) => ["production_inquiry", "promotion_consulting", "direct_contact"].includes(lead.route)).length;
  const attachmentCount = leads.filter((lead) => lead.flyer_file || lead.payload?.flyerFileName).length;
  const openCount = events.filter((event) => event.type === "chat_open" || event.type === "chat_focus").length;
  const buttonClickCount = events.filter((event) => event.type === "button_click").length;

  setText("chatTotalLeads", `${total}件`);
  setText("chatOpenCount", `${openCount}回`);
  setText("chatButtonClickCount", `${buttonClickCount}回`);
  setText("chatDiagnosisLeads", `${diagnosisCount}件`);
  setText("chatConsultLeads", `${consultCount}件`);
  setText("chatAttachmentRate", total ? `${Math.round((attachmentCount / total) * 100)}%` : "0%");

  renderAdminRouteBreakdown(leads);
  renderAdminIssueKeywords(leads, events);
  renderAdminButtonBreakdown(events);
  renderAdminConcernList(leads, events);
  renderAdminLatestLeads(leads);
  renderAdminLeadArchive(leads);
  renderAdminEventTimeline(events);
}

function getAdminChatLeads() {
  const diagnosisEntries = loadStoredEntries(STORAGE_KEY).map((entry) => normalizeAdminChatLead(entry, "free_diagnosis"));
  const contactEntries = loadStoredEntries(CONTACT_STORAGE_KEY).map((entry) => normalizeAdminChatLead(entry, getAdminEntryRoute(entry)));
  return [...diagnosisEntries, ...contactEntries].sort((a, b) => adminDateValue(b.created_at) - adminDateValue(a.created_at));
}

function getAdminChatEvents() {
  return loadStoredEntries(CHAT_EVENT_STORAGE_KEY)
    .map((event) => {
      const routeValue = event.route || event.route_label || "";
      const route = routeValue ? getAdminRouteKey(routeValue) : "";
      return {
        ...event,
        route,
        routeLabel: event.route_label || (route ? ADMIN_ROUTE_LABELS[route] : "")
      };
    })
    .sort((a, b) => adminDateValue(b.created_at) - adminDateValue(a.created_at));
}

function normalizeAdminChatLead(entry, fallbackRoute) {
  const payload = entry.payload || {};
  const route = getAdminRouteKey(entry.intake_type || payload.intakeType || fallbackRoute);
  return {
    ...entry,
    payload,
    route,
    routeLabel: ADMIN_ROUTE_LABELS[route] || ADMIN_ROUTE_LABELS.direct_contact,
    created_at: entry.created_at || payload.createdAt || "",
    customer_name: entry.customer_name || entry.name || payload.contactName || "",
    email: entry.email || payload.email || "",
    company_name: entry.company_name || payload.companyName || "",
    issue_text: entry.issue_text || entry.initial_concern || entry.inquiry_detail || entry.current_challenge || entry.promotion_challenge || entry.message || payload.issueText || payload.initialConcern || "",
    flyer_file: entry.flyer_file || (payload.flyerFileName ? { name: payload.flyerFileName, size: payload.flyerFileSize || 0 } : "")
  };
}

function getAdminEntryRoute(entry) {
  return getAdminRouteKey(entry.intake_type || entry.payload?.intakeType || "direct_contact");
}

function getAdminRouteKey(value) {
  const route = String(value || "").trim();
  if (route === "free_diagnosis" || route.includes("無料") || route.includes("診断")) return "free_diagnosis";
  if (route === "production_inquiry" || route.includes("制作") || route.includes("料金")) return "production_inquiry";
  if (route === "promotion_consulting" || route.includes("販促") || route.includes("伴走")) return "promotion_consulting";
  return route === "direct_contact" ? "direct_contact" : "direct_contact";
}

function renderAdminRouteBreakdown(leads) {
  const target = document.getElementById("chatRouteBreakdown");
  if (!target) return;
  const counts = Object.fromEntries(Object.keys(ADMIN_ROUTE_LABELS).map((key) => [key, 0]));
  leads.forEach((lead) => {
    counts[lead.route] = (counts[lead.route] || 0) + 1;
  });
  const max = Math.max(1, ...Object.values(counts));
  target.innerHTML = Object.entries(counts)
    .map(([route, count]) => {
      const percent = leads.length ? Math.round((count / leads.length) * 100) : 0;
      return `
        <div class="admin-bar-row">
          <span>${escapeHtml(ADMIN_ROUTE_LABELS[route])}</span>
          <strong>${count}件</strong>
          <i style="--bar: ${Math.max(6, (count / max) * 100)}%"></i>
          <small>${percent}%</small>
        </div>
      `;
    })
    .join("");
}

function renderAdminIssueKeywords(leads, events = []) {
  const target = document.getElementById("chatIssueKeywords");
  if (!target) return;
  const keywords = [
    ["反応がない", /反応|来ない|こない|ゼロ|少ない/],
    ["問い合わせ", /問い合わせ|問合せ|相談/],
    ["予約", /予約/],
    ["求人・応募", /求人|応募|採用|スタッフ/],
    ["配布前", /配布前|印刷前|これから|まだ配布/],
    ["料金", /料金|費用|価格|予算|見積/],
    ["制作相談", /制作|作りたい|デザイン|納期/],
    ["販促全体", /販促|集客全体|LINE|SNS|インスタ|LP|導線/]
  ];
  const eventText = events
    .filter((event) => ["initial_concern", "text_input"].includes(event.type))
    .map((event) => event.text || "")
    .join("\n");
  const text = `${leads.map((lead) => `${lead.issue_text || ""} ${lead.flyer_purpose || ""} ${lead.topic || ""}`).join("\n")}\n${eventText}`;
  const items = keywords
    .map(([label, pattern]) => ({
      label,
      count: (text.match(new RegExp(pattern.source, "g")) || []).length
    }))
    .filter((item) => item.count > 0)
    .sort((a, b) => b.count - a.count);

  if (!items.length) {
    target.innerHTML = '<div class="empty-state">まだ分析できる悩みデータがありません。</div>';
    return;
  }

  target.innerHTML = items
    .map((item) => `<span>${escapeHtml(item.label)} <b>${item.count}</b></span>`)
    .join("");
}

function renderAdminButtonBreakdown(events) {
  const target = document.getElementById("chatButtonBreakdown");
  if (!target) return;
  const buttonEvents = events.filter((event) => event.type === "button_click" && event.label);
  if (!buttonEvents.length) {
    target.innerHTML = '<div class="empty-state">まだボタン押下データはありません。</div>';
    return;
  }
  const counts = buttonEvents.reduce((acc, event) => {
    acc[event.label] = (acc[event.label] || 0) + 1;
    return acc;
  }, {});
  const rows = Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 8);
  const max = Math.max(1, ...rows.map(([, count]) => count));
  target.innerHTML = rows
    .map(([label, count]) => `
      <div class="admin-bar-row">
        <span>${escapeHtml(label)}</span>
        <strong>${count}回</strong>
        <i style="--bar: ${Math.max(6, (count / max) * 100)}%"></i>
        <small>${Math.round((count / buttonEvents.length) * 100)}%</small>
      </div>
    `)
    .join("");
}

function renderAdminConcernList(leads, events) {
  const target = document.getElementById("chatConcernList");
  if (!target) return;
  const concerns = [
    ...events
      .filter((event) => event.type === "initial_concern" && event.text)
      .map((event) => ({
        text: event.text,
        routeLabel: event.routeLabel || ADMIN_ROUTE_LABELS[event.route] || "未分岐",
        created_at: event.created_at
      })),
    ...leads
      .filter((lead) => lead.issue_text)
      .map((lead) => ({
        text: lead.issue_text,
        routeLabel: lead.routeLabel,
        created_at: lead.created_at
      }))
  ].sort((a, b) => adminDateValue(b.created_at) - adminDateValue(a.created_at));

  if (!concerns.length) {
    target.innerHTML = '<div class="empty-state">まだ悩み入力データはありません。</div>';
    return;
  }

  target.innerHTML = concerns
    .slice(0, 8)
    .map((item) => `
      <article class="admin-concern-card">
        <p>${escapeHtml(item.text)}</p>
        <footer>
          <span>${escapeHtml(item.routeLabel || "未分岐")}</span>
          <time>${escapeHtml(formatDateTime(item.created_at))}</time>
        </footer>
      </article>
    `)
    .join("");
}

function renderAdminLatestLeads(leads) {
  const target = document.getElementById("chatLatestLeads");
  if (!target) return;
  if (!leads.length) {
    target.innerHTML = '<div class="empty-state">まだチャット受付はありません。</div>';
    return;
  }
  target.innerHTML = leads
    .slice(0, 8)
    .map((lead) => {
      const name = lead.customer_name || lead.company_name || lead.email || "未入力";
      const issue = lead.issue_text || "相談内容未入力";
      const fileText = lead.flyer_file ? formatAdminEntryValue(lead.flyer_file) : "添付なし";
      return `
        <article class="admin-latest-card">
          <header>
            <span>${escapeHtml(lead.routeLabel)}</span>
            <time>${escapeHtml(formatDateTime(lead.created_at))}</time>
          </header>
          <strong>${escapeHtml(name)}</strong>
          <p>${escapeHtml(issue)}</p>
          <dl>
            <div><dt>メール</dt><dd>${escapeHtml(lead.email || "未入力")}</dd></div>
            <div><dt>添付</dt><dd>${escapeHtml(fileText)}</dd></div>
          </dl>
        </article>
      `;
    })
    .join("");
}

function renderAdminLeadArchive(leads) {
  const target = document.getElementById("chatLeadArchive");
  if (!target) return;
  if (!leads.length) {
    target.innerHTML = '<div class="empty-state">まだ問い合わせ・申し込み内容はありません。</div>';
    return;
  }

  target.innerHTML = leads
    .slice(0, 16)
    .map((lead) => {
      const name = lead.customer_name || lead.name || lead.company_name || lead.email || "未入力";
      const fields = ADMIN_ARCHIVE_FIELDS[lead.route] || ADMIN_ARCHIVE_FIELDS.direct_contact;
      const rows = fields
        .filter((key) => lead[key])
        .map((key) => `
          <div>
            <dt>${escapeHtml(ADMIN_ENTRY_LABELS[key] || key)}</dt>
            <dd>${escapeHtml(formatAdminEntryValue(lead[key]))}</dd>
          </div>
        `)
        .join("");
      return `
        <article class="admin-archive-card">
          <header>
            <span>${escapeHtml(lead.routeLabel)}</span>
            <strong>${escapeHtml(name)}</strong>
            <time>${escapeHtml(formatDateTime(lead.created_at))}</time>
          </header>
          <dl>${rows || '<div><dt>内容</dt><dd>詳細未入力</dd></div>'}</dl>
        </article>
      `;
    })
    .join("");
}

function renderAdminEventTimeline(events) {
  const target = document.getElementById("chatEventTimeline");
  if (!target) return;
  if (!events.length) {
    target.innerHTML = '<div class="empty-state">まだチャット行動ログはありません。</div>';
    return;
  }
  target.innerHTML = events
    .slice(0, 14)
    .map((event) => {
      const label = getAdminEventLabel(event);
      const detail = event.text || event.label || event.routeLabel || event.file_name || "-";
      return `
        <article class="admin-event-card">
          <span>${escapeHtml(label)}</span>
          <strong>${escapeHtml(detail)}</strong>
          <time>${escapeHtml(formatDateTime(event.created_at))}</time>
        </article>
      `;
    })
    .join("");
}

function getAdminEventLabel(event) {
  const labels = {
    chat_open: "開封",
    chat_focus: "再表示",
    chat_started: "開始",
    chat_close: "閉じる",
    button_click: "ボタン押下",
    text_input: "テキスト入力",
    initial_concern: "最初の悩み",
    route_selected: "導線選択",
    file_selected: "ファイル選択",
    lead_completed: "受付完了",
    chat_restart: "やり直し"
  };
  return labels[event.type] || event.type || "イベント";
}

function renderAdminSales() {
  const records = loadAdminSalesRecords();
  const paidThisMonth = records.filter((record) => record.status === "入金済み" && isThisMonth(record.paid_at || record.created_at));
  const activeContracts = records.filter((record) => record.billing_type === "月額" && record.contract_status === "契約中");
  const unpaid = records.filter((record) => record.status !== "入金済み");
  const monthlyTotal = paidThisMonth.reduce((sum, record) => sum + Number(record.amount || 0), 0);
  const mrrTotal = activeContracts.reduce((sum, record) => sum + Number(record.amount || 0), 0);
  const unpaidTotal = unpaid.reduce((sum, record) => sum + Number(record.amount || 0), 0);

  setText("salesMonthlyTotal", formatYen(monthlyTotal));
  setText("salesMrrTotal", formatYen(mrrTotal));
  setText("salesUnpaidTotal", formatYen(unpaidTotal));
  setText("salesActiveCount", `${activeContracts.length}件`);
  renderSalesContractList(records);
  renderSalesPaymentList(records);
}

function renderSalesContractList(records) {
  const target = document.getElementById("salesContractList");
  if (!target) return;
  const contracts = records.filter((record) => record.billing_type === "月額");
  if (!contracts.length) {
    target.innerHTML = '<div class="empty-state">まだ契約データはありません。</div>';
    return;
  }

  target.innerHTML = contracts
    .map((record) => `
      <article class="admin-sales-card">
        <header>
          <span>${escapeHtml(record.plan_name)}</span>
          <strong>${escapeHtml(record.customer_name)}</strong>
        </header>
        <dl>
          <div><dt>月額</dt><dd>${escapeHtml(formatYen(record.amount))}</dd></div>
          <div><dt>状態</dt><dd>${escapeHtml(record.contract_status)}</dd></div>
          <div><dt>次回請求</dt><dd>${escapeHtml(formatShortDate(record.next_billing_at))}</dd></div>
          <div><dt>決済方法</dt><dd>${escapeHtml(record.payment_method)}</dd></div>
        </dl>
      </article>
    `)
    .join("");
}

function renderSalesPaymentList(records) {
  const target = document.getElementById("salesPaymentList");
  if (!target) return;
  if (!records.length) {
    target.innerHTML = '<div class="empty-state">まだ請求データはありません。</div>';
    return;
  }

  target.innerHTML = records
    .slice()
    .sort((a, b) => adminDateValue(b.created_at) - adminDateValue(a.created_at))
    .map((record) => `
      <article class="admin-payment-card">
        <div>
          <span class="${record.status === "入金済み" ? "paid" : "unpaid"}">${escapeHtml(record.status)}</span>
          <strong>${escapeHtml(record.customer_name)} / ${escapeHtml(record.plan_name)}</strong>
          <p>${escapeHtml(record.billing_type)} ・ ${escapeHtml(formatYen(record.amount))} ・ ${escapeHtml(record.payment_method)}</p>
          <small>請求日：${escapeHtml(formatShortDate(record.created_at))}${record.paid_at ? ` / 入金日：${escapeHtml(formatShortDate(record.paid_at))}` : ""}</small>
        </div>
        <div class="admin-payment-actions">
          ${record.status === "入金済み" ? "" : `<button type="button" data-sales-action="paid" data-sales-id="${escapeHtml(record.id)}">入金済みにする</button>`}
          <button type="button" data-sales-action="link" data-sales-id="${escapeHtml(record.id)}">決済リンク</button>
        </div>
      </article>
    `)
    .join("");
}

function handleAdminSalesAction(event) {
  if (event.target.closest("#adminCreatePaymentLink")) {
    createSalesPaymentRecord();
    return;
  }
  const button = event.target.closest("[data-sales-action]");
  if (!button) return;
  const action = button.dataset.salesAction;
  const id = button.dataset.salesId;
  if (action === "paid") {
    updateSalesRecordStatus(id, "入金済み");
    return;
  }
  if (action === "link") {
    copySalesPaymentLink(id);
    return;
  }
}

function createSalesPaymentRecord() {
  const records = loadSalesRecords();
  const now = new Date();
  const id = `sales-${Date.now()}`;
  records.unshift({
    id,
    customer_name: "新規問い合わせ",
    plan_name: "決済リンク作成",
    amount: 0,
    billing_type: "単発",
    contract_status: "確認中",
    status: "未払い",
    payment_method: "カード決済待ち",
    payment_url: `https://example.com/pay/${id}`,
    created_at: now.toISOString(),
    paid_at: "",
    next_billing_at: ""
  });
  saveSalesRecords(records);
  renderAdminSales();
}

function updateSalesRecordStatus(id, status) {
  const records = loadSalesRecords();
  const record = records.find((item) => item.id === id);
  if (!record) return;
  record.status = status;
  record.paid_at = status === "入金済み" ? new Date().toISOString() : "";
  saveSalesRecords(records);
  renderAdminSales();
}

async function copySalesPaymentLink(id) {
  const record = loadSalesRecords().find((item) => item.id === id);
  if (!record) return;
  const link = record.payment_url || `https://example.com/pay/${encodeURIComponent(record.id)}`;
  try {
    await navigator.clipboard.writeText(link);
  } catch {
    console.info("payment-link", link);
  }
}

function loadSalesRecords() {
  try {
    return JSON.parse(localStorage.getItem(SALES_STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

function loadAdminSalesRecords() {
  return loadSalesRecords().filter((record) => !isDemoSalesRecord(record));
}

function saveSalesRecords(records) {
  localStorage.setItem(SALES_STORAGE_KEY, JSON.stringify(records, null, 2));
}

function loadAdminProjects() {
  return loadPlatformProjects().filter((project) => !isDemoProject(project));
}

function clearAdminPrototypeDemoData() {
  const projects = loadPlatformProjects();
  const cleanProjects = projects.filter((project) => !isDemoProject(project));
  if (cleanProjects.length !== projects.length) {
    savePlatformProjects(cleanProjects);
  }

  const records = loadSalesRecords();
  const cleanRecords = records.filter((record) => !isDemoSalesRecord(record));
  if (cleanRecords.length !== records.length) {
    saveSalesRecords(cleanRecords);
  }
}

function isDemoProject(project) {
  return String(project?.id || "").startsWith("demo-") || String(project?.customer_name || "").startsWith("サンプル");
}

function isDemoSalesRecord(record) {
  return String(record?.id || "").includes("-demo") || String(record?.customer_name || "").startsWith("サンプル");
}

function ensureSalesDemoRecords() {
  if (localStorage.getItem(SALES_STORAGE_KEY)) return;
  const now = new Date();
  const lastWeek = new Date(now);
  lastWeek.setDate(now.getDate() - 7);
  const nextMonth = new Date(now);
  nextMonth.setMonth(now.getMonth() + 1);
  const records = [
    {
      id: "sales-standard-demo",
      customer_name: "サンプル整体院",
      plan_name: "スタンダード",
      amount: 19800,
      billing_type: "月額",
      contract_status: "契約中",
      status: "入金済み",
      payment_method: "カード決済",
      payment_url: "https://example.com/pay/sales-standard-demo",
      created_at: lastWeek.toISOString(),
      paid_at: lastWeek.toISOString(),
      next_billing_at: nextMonth.toISOString()
    },
    {
      id: "sales-light-demo",
      customer_name: "サンプル飲食店",
      plan_name: "ライト",
      amount: 9800,
      billing_type: "月額",
      contract_status: "契約中",
      status: "未払い",
      payment_method: "カード決済待ち",
      payment_url: "https://example.com/pay/sales-light-demo",
      created_at: now.toISOString(),
      paid_at: "",
      next_billing_at: nextMonth.toISOString()
    },
    {
      id: "sales-consulting-demo",
      customer_name: "サンプル工務店",
      plan_name: "販促伴走プラン",
      amount: 150000,
      billing_type: "月額",
      contract_status: "契約中",
      status: "請求予定",
      payment_method: "請求書",
      payment_url: "https://example.com/pay/sales-consulting-demo",
      created_at: now.toISOString(),
      paid_at: "",
      next_billing_at: nextMonth.toISOString()
    },
    {
      id: "sales-one-shot-demo",
      customer_name: "サンプル士業事務所",
      plan_name: "単発チラシ制作",
      amount: 33000,
      billing_type: "単発",
      contract_status: "単発",
      status: "入金済み",
      payment_method: "カード決済",
      payment_url: "https://example.com/pay/sales-one-shot-demo",
      created_at: now.toISOString(),
      paid_at: now.toISOString(),
      next_billing_at: ""
    }
  ];
  saveSalesRecords(records);
}

function formatYen(value) {
  return new Intl.NumberFormat("ja-JP", {
    style: "currency",
    currency: "JPY",
    maximumFractionDigits: 0
  }).format(Number(value || 0));
}

function adminDateValue(value) {
  const time = Date.parse(value);
  return Number.isFinite(time) ? time : 0;
}

function renderAdminBoard(projects) {
  const board = document.getElementById("adminBoard");
  if (!board) return;
  const statuses = ["受付確認中", "制作中", "初稿納品", "修正対応", "完了"];
  board.innerHTML = statuses
    .map((status) => {
      const items = projects.filter((project) => project.status === status);
      return `
        <section class="board-column">
          <h3>${escapeHtml(status)} <span>${items.length}</span></h3>
          ${
            items.length
              ? items.map(renderAdminCard).join("")
              : '<div class="empty-state">該当案件なし</div>'
          }
        </section>
      `;
    })
    .join("");
}

function renderAdminCard(project) {
  const actions = ["制作中", "初稿納品", "修正対応", "完了"]
    .filter((status) => status !== project.status)
    .map(
      (status) =>
        `<button type="button" data-admin-action="status" data-project-id="${escapeHtml(project.id)}" data-status="${escapeHtml(status)}">${escapeHtml(status)}</button>`
    )
    .join("");
  return `
    <article class="admin-card">
      <strong>${escapeHtml(project.title)}</strong>
      <p>${escapeHtml(project.customer_name)} / ${escapeHtml(project.type)}</p>
      <p>初稿目安：${escapeHtml(formatShortDate(project.due_at))}</p>
      <div class="admin-card-actions">
        <button type="button" data-admin-action="select" data-project-id="${escapeHtml(project.id)}">詳細</button>
        ${actions}
      </div>
    </article>
  `;
}

function renderAdminSelects(projects) {
  ["adminMessageProject", "adminDeliveryProject"].forEach((id) => {
    const select = document.getElementById(id);
    if (!select) return;
    select.innerHTML = projects
      .map(
        (project) =>
          `<option value="${escapeHtml(project.id)}"${project.id === selectedAdminProjectId ? " selected" : ""}>${escapeHtml(project.title)}</option>`
      )
      .join("");
  });
}

function renderAdminDetail(project) {
  const detail = document.getElementById("adminCaseDetail");
  if (!detail) return;
  if (!project) {
    detail.innerHTML = '<div class="empty-state">案件を選択してください。</div>';
    return;
  }

  detail.innerHTML = `
    <h3>${escapeHtml(project.title)}</h3>
    <span class="status-pill ${statusClass(project.status)}">${escapeHtml(project.status)}</span>
    <div class="admin-case-meta">
      <div><span>顧客</span><strong>${escapeHtml(project.customer_name)}</strong></div>
      <div><span>作るもの</span><strong>${escapeHtml(project.type)}</strong></div>
      <div><span>目的</span><strong>${escapeHtml(project.purpose)}</strong></div>
      <div><span>初稿目安</span><strong>${escapeHtml(formatShortDate(project.due_at))}</strong></div>
      <div><span>素材</span><strong>${escapeHtml(project.asset ? project.asset.name : "未添付")}</strong></div>
      <div><span>納品数</span><strong>${project.deliveries.length}件</strong></div>
    </div>
    <div>
      <h3>最新メッセージ</h3>
      ${
        project.messages
          .slice(-4)
          .map(
            (message) => `
              <article class="portal-message ${escapeHtml(message.role)}">
                <strong>${escapeHtml(message.author)}</strong>
                <p>${escapeHtml(message.text)}</p>
                <time>${escapeHtml(formatDateTime(message.created_at))}</time>
              </article>
            `
          )
          .join("")
      }
    </div>
  `;
}

function updateProjectStatus(projectId, status) {
  const projects = loadPlatformProjects();
  const project = projects.find((item) => item.id === projectId);
  if (!project || !status) return;
  const now = new Date().toISOString();
  project.status = status;
  project.updated_at = now;
  project.messages.push({
    role: "system",
    author: "システム",
    text: `ステータスが「${status}」に更新されました。`,
    created_at: now
  });
  savePlatformProjects(projects);
  selectedAdminProjectId = project.id;
  renderAdmin();
}

function loadPlatformProjects() {
  try {
    return JSON.parse(localStorage.getItem(PLATFORM_PROJECT_KEY) || "[]");
  } catch {
    return [];
  }
}

function savePlatformProjects(projects) {
  localStorage.setItem(PLATFORM_PROJECT_KEY, JSON.stringify(projects, null, 2));
}

function ensurePlatformDemoProjects() {
  if (localStorage.getItem(PLATFORM_PROJECT_KEY)) return;
  const now = new Date();
  const earlier = new Date(now);
  earlier.setDate(now.getDate() - 2);
  const demoProjects = [
    {
      id: "demo-campaign",
      customer_name: "サンプル整体院",
      plan_name: PLATFORM_PLAN.name,
      title: "7月キャンペーン告知チラシ",
      type: "チラシ",
      purpose: "予約獲得",
      due_preference: "来週金曜まで",
      asset: { name: "campaign-photo.jpg", type: "image/jpeg", size: 248000 },
      status: "制作中",
      created_at: earlier.toISOString(),
      updated_at: earlier.toISOString(),
      due_at: addBusinessDays(earlier, 3).toISOString(),
      messages: [
        { role: "client", author: "お客様", text: "初回体験キャンペーンのチラシを作りたいです。肩こりに悩む女性向けでお願いします。", created_at: earlier.toISOString() },
        { role: "admin", author: "担当者", text: "内容確認しました。ターゲットと初回特典が伝わる構成で進めます。", created_at: now.toISOString() }
      ],
      deliveries: [],
      revisions: []
    },
    {
      id: "demo-banquet",
      customer_name: "サンプル居酒屋",
      plan_name: PLATFORM_PLAN.name,
      title: "夏の宴会予約POP",
      type: "店頭POP",
      purpose: "宴会予約獲得",
      due_preference: "できれば今週中",
      asset: { name: "menu.pdf", type: "application/pdf", size: 640000 },
      status: "初稿納品",
      created_at: now.toISOString(),
      updated_at: now.toISOString(),
      due_at: addBusinessDays(now, 2).toISOString(),
      messages: [
        { role: "client", author: "お客様", text: "店内に貼る宴会予約POPをお願いします。幹事向けに見せたいです。", created_at: now.toISOString() },
        { role: "admin", author: "担当者", text: "初稿を登録しました。料理・席・予算相談が伝わる形にしています。", created_at: now.toISOString() }
      ],
      deliveries: [
        {
          title: "宴会予約POP 初稿PDF",
          message: "初稿です。金額と予約条件をご確認ください。",
          file: { name: "banquet-pop-draft.pdf", type: "application/pdf", size: 980000 },
          status: "初稿納品",
          created_at: now.toISOString()
        }
      ],
      revisions: []
    }
  ];
  savePlatformProjects(demoProjects);
}

function fileToMeta(file) {
  if (!file || !file.name) return null;
  return {
    name: file.name,
    type: file.type || "不明",
    size: file.size || 0,
    lastModified: file.lastModified || Date.now()
  };
}

function createPlatformId() {
  return `project-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`;
}

function addBusinessDays(date, days) {
  const result = new Date(date);
  let remaining = days;
  while (remaining > 0) {
    result.setDate(result.getDate() + 1);
    const day = result.getDay();
    if (day !== 0 && day !== 6) remaining -= 1;
  }
  return result;
}

function isThisMonth(value) {
  const date = new Date(value);
  const now = new Date();
  return date.getFullYear() === now.getFullYear() && date.getMonth() === now.getMonth();
}

function formatShortDate(value) {
  if (!value) return "-";
  return new Date(value).toLocaleDateString("ja-JP", {
    month: "2-digit",
    day: "2-digit"
  });
}

function formatDateTime(value) {
  if (!value) return "-";
  return new Date(value).toLocaleString("ja-JP", {
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  });
}

function statusClass(status) {
  if (status === "制作中" || status === "修正対応") return "status-working";
  if (status === "初稿納品") return "status-delivered";
  if (status === "完了") return "status-complete";
  return "";
}

function setText(id, text) {
  const element = document.getElementById(id);
  if (element) element.textContent = text;
}

function setInlineStatus(id, text, success) {
  const element = document.getElementById(id);
  if (!element) return;
  element.textContent = text;
  element.classList.toggle("success", Boolean(success));
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

// Chatbot v2: concern-first intake flow for diagnosis, production, and promotion consulting.
const CHAT_ROUTE_LABELS = {
  free_diagnosis: "無料チラシ診断",
  production_inquiry: "制作・料金問い合わせ",
  promotion_consulting: "販促相談・伴走問い合わせ"
};

const CHAT_ROUTE_FIELDS = {
  free_diagnosis: [
    {
      name: "flyer_file",
      label: "チラシ画像またはPDF",
      question:
        "まず、診断したいチラシ画像またはPDFを送ってほしいのじゃ。\n表面だけでも大丈夫じゃ。裏面がある場合は、両方送るとより確認しやすいのじゃ。",
      action: { label: "チラシ画像/PDFを選択", kind: "file", important: true }
    },
    {
      name: "industry",
      label: "業種",
      question:
        "ありがとうなのじゃ。\n次に、業種を教えてほしいのじゃ。\n\n例：整体院、美容室、飲食店、リフォーム、士業、スクール、求人募集などじゃ。"
    },
    {
      name: "flyer_purpose",
      label: "チラシの目的",
      question:
        "このチラシの目的を教えてほしいのじゃ。\n\n例：問い合わせを増やしたい、予約を増やしたい、来店を増やしたい、求人応募を増やしたい、商品を販売したい、キャンペーンを知らせたい、などじゃ。"
    },
    {
      name: "distribution_method",
      label: "配布方法",
      question:
        "このチラシは、どのように配布している、または配布する予定じゃ？\n\n例：ポスティング、新聞折込、店頭配布、手渡し、DM、SNS掲載、既存客への案内などじゃ。"
    },
    {
      name: "distribution_area",
      label: "配布地域",
      question:
        "配布する地域も教えてほしいのじゃ。\n\n例：〇〇市、〇〇駅周辺、店舗から半径3km以内、〇〇区全域などじゃ。"
    },
    {
      name: "desired_response",
      label: "増やしたい反応",
      question:
        "このチラシで一番増やしたい反応は何じゃ？\n\n例：電話問い合わせ、LINE登録、Web予約、来店、資料請求、応募、購入などじゃ。"
    },
    {
      name: "current_response_status",
      label: "現在の反応状況",
      question:
        "今の反応状況も、分かる範囲で教えてほしいのじゃ。\n\n例：1,000枚配って問い合わせ1件、ほとんど反応なし、まだ配布前、以前より反応が落ちた、などじゃ。"
    },
    {
      name: "company_name",
      label: "会社名・店舗名",
      question: "診断レポートに記載するため、会社名または店舗名を教えてほしいのじゃ。"
    },
    {
      name: "customer_name",
      label: "お名前",
      question: "担当者のお名前を教えてほしいのじゃ。"
    },
    {
      name: "email",
      label: "メールアドレス",
      question:
        "診断レポートを送るメールアドレスを教えてほしいのじゃ。\n入力間違いがあるとレポートを届けられないため、確認できるアドレスを入力してほしいのじゃ。"
    }
  ],
  production_inquiry: [
    {
      name: "inquiry_detail",
      label: "相談したい内容",
      question:
        "制作・料金について相談したい内容を教えてほしいのじゃ。\n\n例：チラシを作りたい、料金を知りたい、見積もりがほしい、サブスクを相談したい、急ぎで制作したい、などじゃ。"
    },
    {
      name: "production_item",
      label: "作りたいもの",
      question:
        "今回作りたいもの、または相談したい制作物を教えてほしいのじゃ。\n\n例：チラシ、ポスター、DM、メニュー表、求人チラシ、LINE画像、SNS投稿画像、LPなどじゃ。"
    },
    {
      name: "preferred_timing",
      label: "希望時期",
      question:
        "希望の時期はあるかのう？\n\n例：できるだけ早く、今月中、来月配布予定、まだ未定、などじゃ。"
    },
    {
      name: "budget",
      label: "予算感",
      optional: true,
      question:
        "差し支えなければ、予算感も教えてほしいのじゃ。\n\n例：1万円以内、3万円前後、月額プランで相談したい、まだ分からない、などじゃ。\n\nまだ分からない場合は「未定」で大丈夫じゃ。"
    },
    {
      name: "current_challenge",
      label: "現在の課題",
      question:
        "今回、制作を考えている背景や課題も教えてほしいのじゃ。\n\n例：反応がない、毎回作るのが大変、求人応募を増やしたい、デザインを整えたい、販促物を継続して作りたい、などじゃ。"
    },
    {
      name: "company_name",
      label: "会社名・店舗名",
      question: "詳しい案内を送るために、会社名または店舗名を教えてほしいのじゃ。"
    },
    {
      name: "customer_name",
      label: "お名前",
      question: "担当者のお名前を教えてほしいのじゃ。"
    },
    {
      name: "email",
      label: "メールアドレス",
      question: "連絡用のメールアドレスを教えてほしいのじゃ。"
    },
    {
      name: "phone",
      label: "電話番号",
      optional: true,
      question:
        "電話での連絡を希望する場合は、電話番号も教えてほしいのじゃ。\nメールのみでよければ「なし」で大丈夫じゃ。"
    }
  ],
  promotion_consulting: [
    {
      name: "promotion_challenge",
      label: "現在の販促課題",
      question:
        "今いちばん困っている販促課題を教えてほしいのじゃ。\n\n例：問い合わせが増えない、リピートにつながらない、求人が集まらない、何から改善すればいいか分からない、などじゃ。"
    },
    {
      name: "promotion_channels",
      label: "使っている販促手段",
      question:
        "今使っている販促手段を教えてほしいのじゃ。\n\n例：チラシ、ホームページ、LP、LINE、Instagram、Googleマップ、広告、紹介、店頭告知などじゃ。"
    },
    {
      name: "consulting_scope",
      label: "相談したい範囲",
      question:
        "どのあたりまで相談したいか教えてほしいのじゃ。\n\n例：チラシ改善だけ、LINE導線も含めたい、SNSも見てほしい、販促全体を整理したい、毎月伴走してほしい、などじゃ。"
    },
    {
      name: "goal",
      label: "目標",
      question:
        "今後増やしたい成果を教えてほしいのじゃ。\n\n例：問い合わせ、予約、来店、求人応募、リピート、客単価、売上などじゃ。"
    },
    {
      name: "preferred_timing",
      label: "希望時期",
      question:
        "相談を始めたい時期はあるかのう？\n\n例：できるだけ早く、今月中、来月から、まだ未定、などじゃ。"
    },
    {
      name: "budget",
      label: "予算感",
      optional: true,
      question:
        "差し支えなければ、販促相談や伴走に使える予算感を教えてほしいのじゃ。\n\n例：まずは小さく相談したい、月5万円以内、月15万円前後、内容を見て相談したい、まだ分からない、などじゃ。\n\nまだ分からない場合は「未定」で大丈夫じゃ。"
    },
    {
      name: "company_name",
      label: "会社名・店舗名",
      question: "詳しい案内を送るために、会社名または店舗名を教えてほしいのじゃ。"
    },
    {
      name: "customer_name",
      label: "お名前",
      question: "担当者のお名前を教えてほしいのじゃ。"
    },
    {
      name: "email",
      label: "メールアドレス",
      question: "連絡用のメールアドレスを教えてほしいのじゃ。"
    },
    {
      name: "phone",
      label: "電話番号",
      optional: true,
      question:
        "電話での連絡を希望する場合は、電話番号も教えてほしいのじゃ。\nメールのみでよければ「なし」で大丈夫じゃ。"
    }
  ]
};

const CHAT_SUMMARY_FIELDS = {
  free_diagnosis: [
    "intake_type",
    "initial_concern",
    "flyer_file",
    "industry",
    "flyer_purpose",
    "distribution_method",
    "distribution_area",
    "desired_response",
    "current_response_status",
    "company_name",
    "customer_name",
    "email"
  ],
  production_inquiry: [
    "intake_type",
    "initial_concern",
    "inquiry_detail",
    "production_item",
    "preferred_timing",
    "budget",
    "current_challenge",
    "company_name",
    "customer_name",
    "email",
    "phone"
  ],
  promotion_consulting: [
    "intake_type",
    "initial_concern",
    "promotion_challenge",
    "promotion_channels",
    "consulting_scope",
    "goal",
    "preferred_timing",
    "budget",
    "company_name",
    "customer_name",
    "email",
    "phone"
  ]
};

const CHAT_LABELS = {
  intake_type: "受付種別",
  initial_concern: "困っていること",
  issue_text: "困っていること",
  flyer_file: "チラシ画像/PDF",
  industry: "業種",
  flyer_purpose: "チラシの目的",
  distribution_method: "配布方法",
  distribution_area: "配布地域",
  desired_response: "増やしたい反応",
  current_response_status: "現在の反応状況",
  company_name: "会社名・店舗名",
  customer_name: "お名前",
  email: "メールアドレス",
  inquiry_detail: "相談したい内容",
  production_item: "作りたいもの",
  preferred_timing: "希望時期",
  budget: "予算感",
  current_challenge: "現在の課題",
  phone: "電話番号",
  promotion_challenge: "現在の販促課題",
  promotion_channels: "使っている販促手段",
  consulting_scope: "相談したい範囲",
  goal: "目標"
};

function createChatLeadData() {
  return {
    ...initialData(),
    intake_type: "",
    initial_concern: "",
    inquiry_detail: "",
    production_item: "",
    preferred_timing: "",
    budget: "",
    current_challenge: "",
    phone: "",
    promotion_challenge: "",
    promotion_channels: "",
    consulting_scope: "",
    goal: ""
  };
}

function createChatEventId() {
  return `chat-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function logChatEvent(type, detail = {}) {
  try {
    const entries = JSON.parse(localStorage.getItem(CHAT_EVENT_STORAGE_KEY) || "[]");
    const event = {
      id: createChatEventId(),
      session_id: state.chatSessionId || "",
      type,
      label: detail.label || "",
      value: detail.value || "",
      route: detail.route || state.intakeType || "",
      route_label: detail.routeLabel || (state.intakeType ? CHATBOT_V3_ROUTE_LABELS[state.intakeType] : ""),
      stage: detail.stage || state.stage || "",
      text: detail.text || "",
      file_name: detail.fileName || "",
      file_size: detail.fileSize || 0,
      created_at: new Date().toISOString()
    };
    entries.unshift(event);
    localStorage.setItem(CHAT_EVENT_STORAGE_KEY, JSON.stringify(entries.slice(0, 500)));
  } catch (error) {
    console.warn("chatbot-event-log-failed", error);
  }
}

function openChat() {
  if (!chatShell || !chatInput) return;
  const wasOpen = chatShell.dataset.open === "true";
  if (!state.chatSessionId || !state.started) {
    state.chatSessionId = createChatEventId();
  }
  chatShell.dataset.open = "true";
  logChatEvent(wasOpen ? "chat_focus" : "chat_open", {
    stage: state.stage || "",
    intakeType: state.intakeType || ""
  });
  if (!state.started) {
    state.started = true;
    state.stage = "initial_concern";
    state.intakeType = "";
    state.data = createChatLeadData();
    addMessage(
      "bot",
      "こんにちは。\n今のチラシや販促について、気になっていることを教えてほしいのじゃ。\n\nたとえば、\n「チラシを配っても反応がない」\n「作り直す前に見てほしい」\n「制作料金を知りたい」\n「集客全体を相談したい」\nなど、まだ整理できていなくても大丈夫じゃ。"
    );
    setActions([
      "チラシを無料診断してほしい",
      "制作料金を知りたい",
      "販促全体を相談したい",
      "まだよく分からない"
    ]);
  }
  window.setTimeout(() => chatInput.focus(), 120);
}

function setActions(actions = []) {
  if (!chatActions) return;
  chatActions.replaceChildren();
  actions.forEach((action) => {
    const config = typeof action === "string" ? { label: action, value: action } : action;
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = config.label;
    if (config.important) button.classList.add("important");
    button.addEventListener("click", () => {
      if (config.kind === "file") {
        if (flyerFileInput) flyerFileInput.click();
        return;
      }
      if (config.kind === "route") {
        addMessage("user", config.label);
        startChatRoute(config.route);
        return;
      }
      if (config.kind === "confirm") {
        addMessage("user", "この内容で送信する");
        completeApplication();
        return;
      }
      if (config.kind === "copy") {
        copyAdminNotice();
        return;
      }
      if (config.kind === "reset") {
        restartChat();
        return;
      }
      const value = config.value || config.label;
      addMessage("user", value);
      handleText(value);
    });
    chatActions.appendChild(button);
  });
}

function handleText(rawText) {
  const text = rawText.trim();
  if (!text) return;

  if (state.stage === "initial_concern") {
    state.data.initial_concern = text;
    state.data.issue_text = text;
    const route = detectChatRoute(text);
    if (route) {
      startChatRoute(route);
      return;
    }
    const firstQuestionSupport = getSupportResponse(text);
    if (firstQuestionSupport) {
      addMessage("bot", firstQuestionSupport.message);
      if (firstQuestionSupport.actions) {
        setActions(firstQuestionSupport.actions);
      } else {
        repeatCurrentQuestion();
      }
      return;
    }
    showRouteChoice();
    return;
  }

  const stageForSupportV2 = getCurrentStage();
  const preferFieldAnswerV2 = stageForSupportV2 && [
    "inquiry_detail",
    "production_item",
    "preferred_timing",
    "budget",
    "current_challenge",
    "promotion_challenge",
    "promotion_channels",
    "consulting_scope",
    "goal"
  ].includes(stageForSupportV2.name);
  const support = preferFieldAnswerV2 ? null : getSupportResponse(text);
  if (support) {
    addMessage("bot", support.message);
    if (support.route) {
      startChatRoute(support.route, { skipIntro: true });
      return;
    }
    if (support.actions) {
      setActions(support.actions);
      return;
    }
    repeatCurrentQuestion();
    return;
  }

  if (state.stage === "flyer_file") {
    if (/チラシがまだない|まだない|未作成|これから作|新しく作/i.test(text)) {
      addMessage(
        "bot",
        "チラシがまだない場合は、制作・料金問い合わせとして進めるのが自然じゃ。\n新しく作る前提で、内容や料金の相談を受け付けるのじゃ。"
      );
      startChatRoute("production_inquiry", { skipIntro: true });
      return;
    }
    addMessage("bot", "診断にはチラシ画像またはPDFが必要なのじゃ。\njpg、png、pdfのいずれかで、10MB以内のファイルを送ってほしいのじゃ。");
    setActions([{ label: "チラシ画像/PDFを選択", kind: "file", important: true }]);
    return;
  }

  if (state.stage === "confirm") {
    if (/同意|送信|申し込|問い合わせ|はい|ok|OK/i.test(text)) {
      completeApplication();
      return;
    }
    if (/修正|やり直|戻/i.test(text)) {
      restartChat();
      return;
    }
    addMessage("bot", "送信する場合は「この内容で送信する」を押してほしいのじゃ。修正する場合は、もう一度最初から入力できるのじゃ。");
    setActions([
      { label: "この内容で送信する", kind: "confirm", important: true },
      { label: "修正する", kind: "reset" }
    ]);
    return;
  }

  const stage = getCurrentStage();
  if (!stage) {
    repeatCurrentQuestion();
    return;
  }

  if (stage.name === "email" && !isValidEmail(text)) {
    addMessage(
      "bot",
      "メールアドレスの形式が少し違うようじゃ。\n診断レポートや案内を届けるため、もう一度確認して入力してほしいのじゃ。"
    );
    return;
  }

  state.data[stage.name] = extractAnswer(stage.name, text);
  if (stage.name === "company_name" && /なし|ない|個人|未定/i.test(text)) {
    state.data.company_name = text;
  }
  captureExtraInfo(text);
  askNextMissing();
}

function detectChatRoute(text) {
  const value = text.toLowerCase();
  if (/料金|費用|見積|見積もり|サブスク|月額|納期|急ぎ|作って|制作|依頼|デザイン|プラン/.test(value)) {
    return "production_inquiry";
  }
  if (/集客全体|販促全体|販促相談|伴走|line|sns|instagram|インスタ|lp|ホームページ|毎月|仕組み|売上|導線|チラシ以外|何から改善/.test(value)) {
    return "promotion_consulting";
  }
  if (/反応|問い合わせ|予約|来店|求人|応募|何が悪|配布前|canva|診断|改善点|見てほしい|作り直す前|無料診断/.test(value)) {
    return "free_diagnosis";
  }
  if (/まだよく分からない|わからない|分からない|迷って/.test(value)) return "";
  return "";
}

function startChatRoute(route, options = {}) {
  state.intakeType = route;
  state.data.intake_type = CHAT_ROUTE_LABELS[route];

  if (!options.skipIntro) {
    if (route === "free_diagnosis") {
      addMessage(
        "bot",
        "なるほどじゃ。\n今のチラシで反応や問い合わせにつながっているか不安なのじゃな。\n\nその場合は、まず無料チラシ診断で、見出し・ターゲット・訴求・オファー・問い合わせ導線などを確認するのがよいのじゃ。\n\n診断だけでも無料で利用できるので、まずは今のチラシ画像またはPDFを送ってほしいのじゃ。"
      );
    }
    if (route === "production_inquiry") {
      addMessage(
        "bot",
        "もちろん相談できるのじゃ。\nチラシ制作や料金について知りたい場合は、制作・料金問い合わせとして受付できるのじゃ。"
      );
    }
    if (route === "promotion_consulting") {
      addMessage(
        "bot",
        "なるほどじゃ。\nチラシ単体というより、集客や販促全体の流れを相談したいのじゃな。\n\nその場合は、販促相談・伴走問い合わせとして受付するのがよいのじゃ。"
      );
    }
  }

  askNextMissing();
}

function showRouteChoice() {
  addMessage(
    "bot",
    "ありがとうなのじゃ。\nそなたの状況だと、いくつか相談先が考えられるのじゃ。\n\n今の気持ちに一番近いものを選んでほしいのじゃ。"
  );
  setActions([
    { label: "今のチラシの改善点を無料で見てほしい", kind: "route", route: "free_diagnosis", important: true },
    { label: "チラシ制作や料金について知りたい", kind: "route", route: "production_inquiry" },
    { label: "チラシ以外も含めて販促全体を相談したい", kind: "route", route: "promotion_consulting" }
  ]);
}

function getSupportResponse(text) {
  if (/料金|いくら|費用|価格|プラン/.test(text)) {
    return {
      message:
        "無料診断は費用がかからないのじゃ。\n制作を依頼する場合は、内容や点数によってプランが変わるのじゃ。\n\n料金について詳しく知りたい場合は、制作・料金問い合わせとして受付できるのじゃ。",
      actions: [
        { label: "まず無料診断を受けたい", kind: "route", route: "free_diagnosis", important: true },
        { label: "制作・料金について問い合わせたい", kind: "route", route: "production_inquiry" }
      ]
    };
  }
  if (/急ぎ|至急|早く|最短/.test(text)) {
    return {
      message:
        "急ぎの場合は、制作・料金問い合わせとして受付するのがよいのじゃ。\n希望時期を確認したうえで、対応できる範囲を案内する流れじゃ。",
      route: "production_inquiry"
    };
  }
  if (/チラシ以外|line|sns|instagram|インスタ|ホームページ|lp|販促全体|集客全体/.test(text)) {
    return {
      message:
        "チラシ以外も含めて相談したい場合は、販促相談・伴走問い合わせとして受付できるのじゃ。\nどこまで相談したいかを整理しながら進めるのじゃ。",
      route: "promotion_consulting"
    };
  }
  if (/本当に無料|無料ですか|無料なの|費用かから/.test(text)) {
    return {
      message:
        "無料チラシ診断だけなら費用はかからないのじゃ。\n診断後に制作を依頼するかどうかは、レポートを見てから判断できるのじゃ。"
    };
  }
  if (/診断だけ|見るだけ|依頼しなくても|契約しなくても/.test(text)) {
    return {
      message:
        "大丈夫じゃ。\n診断だけ利用して、自分で改善する形でも問題ないのじゃ。\n必要な人だけ、後から制作や販促相談を利用できる流れじゃ。"
    };
  }
  if (/pdf|PDF/.test(text)) {
    return {
      message: "PDFでも大丈夫じゃ。\n画像でもPDFでも、内容が読める状態であれば診断できるのじゃ。"
    };
  }
  if (/古い|昔の|過去/.test(text)) {
    return {
      message:
        "古いチラシでも大丈夫じゃ。\n過去に使ったチラシを見ることで、反応が出にくかった原因や、次に直すべきポイントを整理しやすくなるのじゃ。"
    };
  }
  if (/効果.*保証|保証.*効果|売上.*保証|必ず.*(反応|売上|増え|出る)|反応.*保証/.test(text)) {
    return {
      message:
        "反応や売上の保証はできないのじゃ。\nただし、反応を落としている可能性があるポイントや、改善の優先順位を整理することはできるのじゃ。"
    };
  }
  return null;
}

function getCurrentFields() {
  return CHAT_ROUTE_FIELDS[state.intakeType] || [];
}

function getCurrentStage() {
  return getCurrentFields().find((field) => field.name === state.stage);
}

function addProgress(stageName) {
  const fields = getCurrentFields();
  const index = fields.findIndex((field) => field.name === stageName);
  if (index < 0) return;
  addMessage("progress", `受付ステップ ${index + 1}/${fields.length}：${fields[index].label}`);
}

function askNextMissing() {
  const fields = getCurrentFields();
  const next = fields.find((field) => !state.data[field.name]);
  if (next) {
    askStage(next.name);
    return;
  }
  showConfirmation();
}

function askStage(stageName) {
  const stage = getCurrentFields().find((field) => field.name === stageName);
  if (!stage) return;
  state.stage = stageName;
  addProgress(stageName);
  addMessage("bot", stage.question);
  if (stage.action) {
    setActions([stage.action]);
  } else if (stage.optional) {
    setActions(["未定", "なし"]);
  } else {
    setActions([]);
  }
}

function repeatCurrentQuestion() {
  if (state.stage === "initial_concern") {
    addMessage("bot", "まず、今のチラシや販促で気になっていることを自由に教えてほしいのじゃ。");
    return;
  }
  const stage = getCurrentStage();
  if (!stage) return;
  addMessage("bot", `続けるのじゃ。\n\n${stage.question}`);
  if (stage.action) setActions([stage.action]);
}

function addSummaryMessage() {
  if (!chatMessages) return;
  const route = state.intakeType || "free_diagnosis";
  const message = document.createElement("div");
  message.className = "message bot";
  const title = document.createElement("p");
  title.textContent = "最後に確認じゃ。以下の内容で受付するのじゃ。";
  message.appendChild(title);

  const summary = document.createElement("dl");
  summary.className = "summary-box";

  (CHAT_SUMMARY_FIELDS[route] || CHAT_SUMMARY_FIELDS.free_diagnosis).forEach((key) => {
    const row = document.createElement("div");
    const dt = document.createElement("dt");
    const dd = document.createElement("dd");
    dt.textContent = CHAT_LABELS[key] || labels[key] || key;
    dd.textContent = displayValue(key);
    row.append(dt, dd);
    summary.appendChild(row);
  });

  const note = document.createElement("p");
  if (route === "free_diagnosis") {
    note.textContent = "送ってもらったチラシ画像と入力内容は、無料診断レポート作成のために使用するのじゃ。同意して無料診断に申し込む場合は、送信してほしいのじゃ。";
  } else if (route === "production_inquiry") {
    note.textContent = "入力内容をもとに、制作内容や料金の案内を行うのじゃ。同意して問い合わせる場合は、送信してほしいのじゃ。";
  } else {
    note.textContent = "入力内容をもとに、販促相談・伴走について案内するのじゃ。同意して問い合わせる場合は、送信してほしいのじゃ。";
  }
  message.append(summary, note);
  chatMessages.appendChild(message);
  scrollChatToBottom();
}

function showConfirmation() {
  state.stage = "confirm";
  addSummaryMessage();
  setActions([
    { label: "この内容で送信する", kind: "confirm", important: true },
    { label: "修正する", kind: "reset" }
  ]);
}

function completeApplication() {
  const missingRequired = getCurrentFields().find((field) => !field.optional && !state.data[field.name]);
  if (missingRequired) {
    addMessage("bot", `まだ「${missingRequired.label}」が入力されていないのじゃ。先にここを確認するのじゃ。`);
    askStage(missingRequired.name);
    return;
  }
  state.data.consent = true;
  state.data.created_at = new Date().toISOString();
  saveEntry(state.data);

  if (state.intakeType === "free_diagnosis") {
    addMessage(
      "bot",
      "ありがとうございますじゃ。\n無料チラシ診断の受付が完了したのじゃ。\n\nいただいたチラシと入力内容をもとに、7つのAI仙人の分析フレームを活用して、改善ポイントをA4レポートにまとめるのじゃ。\n\n通常1〜3営業日以内に、入力してもらったメールアドレス宛に送るのじゃ。\n診断だけの利用でも大丈夫じゃ。"
    );
  } else if (state.intakeType === "production_inquiry") {
    addMessage(
      "bot",
      "ありがとうございますじゃ。\n制作・料金問い合わせの受付が完了したのじゃ。\n\n入力内容を確認のうえ、制作内容や料金の目安についてメールで案内するのじゃ。\n\nなお、今のチラシがある場合は、無料診断を先に受けることで、作り直すべきポイントが分かりやすくなるのじゃ。"
    );
  } else {
    addMessage(
      "bot",
      "ありがとうございますじゃ。\n販促相談・伴走問い合わせの受付が完了したのじゃ。\n\n入力内容を確認のうえ、販促課題や相談内容に合わせて案内するのじゃ。\n\nチラシ、LINE、SNS、LP、既存客向けの案内など、必要な範囲を整理しながら進められるのじゃ。"
    );
  }

  setActions([
    { label: "管理者通知をコピー", kind: "copy" },
    { label: "新しく相談する", kind: "reset" }
  ]);
}

function saveEntry(entry) {
  const routeKey = state.intakeType === "free_diagnosis" ? STORAGE_KEY : CONTACT_STORAGE_KEY;
  const entries = JSON.parse(localStorage.getItem(routeKey) || "[]");
  entries.unshift(entry);
  localStorage.setItem(routeKey, JSON.stringify(entries));
}

function buildAdminNotice() {
  const route = state.intakeType || "free_diagnosis";
  const title = route === "free_diagnosis" ? "無料チラシ診断 申込" : CHAT_ROUTE_LABELS[route];
  const lines = [`【${title}】`, ""];
  (CHAT_SUMMARY_FIELDS[route] || CHAT_SUMMARY_FIELDS.free_diagnosis).forEach((key) => {
    lines.push(`■ ${CHAT_LABELS[key] || labels[key] || key}`);
    lines.push(displayValue(key));
    lines.push("");
  });
  lines.push("■ 申込日時");
  lines.push(displayValue("created_at"));
  return lines.join("\n");
}

function displayValue(key) {
  const value = state.data[key];
  if (key === "created_at") {
    return value ? new Date(value).toLocaleString("ja-JP") : "-";
  }
  if (key === "flyer_file") {
    if (!value) return "未入力";
    if (typeof value === "string") return value;
    return `${value.name}（${formatBytes(value.size)}）`;
  }
  return value || "未入力";
}

function restartChat() {
  if (!chatMessages) return;
  state.started = false;
  state.stage = "initial_concern";
  state.intakeType = "";
  state.data = createChatLeadData();
  chatMessages.replaceChildren();
  setActions([]);
  openChat();
}

// Chatbot v3: complete production-ready intake flow.
const CHATBOT_V3_ROUTE_LABELS = {
  free_diagnosis: "無料チラシ診断",
  production_inquiry: "制作・料金問い合わせ",
  promotion_consulting: "販促相談・伴走問い合わせ"
};

const CHATBOT_V3_LABELS = {
  intake_type: "受付種別",
  initial_concern: "困っていること",
  flyer_file: "チラシ画像/PDF",
  industry: "業種",
  flyer_purpose: "チラシの目的",
  distribution_method: "配布方法",
  distribution_area: "配布地域",
  desired_response: "増やしたい反応",
  current_response_status: "現在の反応状況",
  target_audience: "主なターゲット",
  service_price: "商品・サービスの価格帯",
  strengths: "自社の強み",
  competitor_difference: "競合との違い",
  current_offer: "現在のオファー・特典",
  distribution_volume: "配布枚数・配布予定日",
  contact_flow: "問い合わせ導線",
  reference_url: "参考URL・SNS",
  review_focus: "特に見てほしいポイント",
  desired_improvement: "希望する改善方向",
  inquiry_detail: "相談したい内容",
  production_item: "作りたいもの",
  preferred_timing: "希望時期",
  budget: "予算感",
  current_challenge: "現在の課題",
  promotion_challenge: "現在の販促課題",
  promotion_channels: "使っている販促手段",
  consulting_scope: "相談したい範囲",
  goal: "目標",
  company_name: "会社名・店舗名",
  customer_name: "お名前",
  email: "メールアドレス",
  phone: "電話番号",
  consent: "同意確認",
  created_at: "受付日時"
};

const CHATBOT_V3_FIELDS = {
  free_diagnosis: [
    {
      name: "flyer_file",
      label: "チラシ画像またはPDF",
      question:
        "まず、診断したいチラシ画像またはPDFを送ってほしいのじゃ。\n表面だけでも大丈夫じゃ。裏面がある場合は、両方送るとより確認しやすいのじゃ。",
      action: { label: "チラシ画像/PDFを選択", kind: "file", important: true }
    },
    {
      name: "industry",
      label: "業種",
      question:
        "ありがとうなのじゃ。\n次に、業種を教えてほしいのじゃ。\n\n例：整体院、美容室、飲食店、リフォーム、士業、スクール、求人募集などじゃ。"
    },
    {
      name: "flyer_purpose",
      label: "チラシの目的",
      question:
        "このチラシの目的を教えてほしいのじゃ。\n\n例：問い合わせを増やしたい、予約を増やしたい、来店を増やしたい、求人応募を増やしたい、商品を販売したい、キャンペーンを知らせたい、などじゃ。"
    },
    {
      name: "target_audience",
      label: "主なターゲット",
      question:
        "主に誰に向けたチラシなのか教えてほしいのじゃ。\n\n例：30〜50代女性、近隣の戸建て世帯、宴会の幹事、未経験で地元勤務を探す人、などじゃ。"
    },
    {
      name: "distribution_method",
      label: "配布方法",
      question:
        "このチラシは、どのように配布している、または配布する予定じゃ？\n\n例：ポスティング、新聞折込、店頭配布、手渡し、DM、SNS掲載、既存客への案内などじゃ。"
    },
    {
      name: "distribution_area",
      label: "配布地域",
      question:
        "配布する地域も教えてほしいのじゃ。\n\n例：〇〇市、〇〇駅周辺、店舗から半径3km以内、〇〇区全域などじゃ。"
    },
    {
      name: "distribution_volume",
      label: "配布枚数・配布予定日",
      optional: true,
      question:
        "分かる範囲で、配布枚数や配布予定日も教えてほしいのじゃ。\n\n例：3,000枚、来月上旬、まだ未定、などじゃ。未定なら「未定」で大丈夫じゃ。"
    },
    {
      name: "desired_response",
      label: "増やしたい反応",
      question:
        "このチラシで一番増やしたい反応は何じゃ？\n\n例：電話問い合わせ、LINE登録、Web予約、来店、資料請求、応募、購入などじゃ。"
    },
    {
      name: "current_response_status",
      label: "現在の反応状況",
      question:
        "今の反応状況も、分かる範囲で教えてほしいのじゃ。\n\n例：1,000枚配って問い合わせ1件、ほとんど反応なし、まだ配布前、以前より反応が落ちた、などじゃ。"
    },
    {
      name: "service_price",
      label: "商品・サービスの価格帯",
      optional: true,
      question:
        "商品やサービスの価格帯も、分かる範囲で教えてほしいのじゃ。\n\n例：初回3,980円、平均単価8,000円、見積もり制、求人なので給与条件、などじゃ。"
    },
    {
      name: "strengths",
      label: "自社の強み",
      optional: true,
      question:
        "お店やサービスの強みを教えてほしいのじゃ。\n\n例：地域密着、専門性、実績、丁寧な対応、価格、早さ、安心感、などじゃ。"
    },
    {
      name: "competitor_difference",
      label: "競合との違い",
      optional: true,
      question:
        "競合や近いサービスと比べて、違いがあれば教えてほしいのじゃ。\n\n分からなければ「不明」で大丈夫じゃ。"
    },
    {
      name: "current_offer",
      label: "現在のオファー・特典",
      optional: true,
      question:
        "今のチラシに、特典や申し込み理由はあるかのう？\n\n例：初回無料、期間限定、先着枠、無料相談、割引、特になし、などじゃ。"
    },
    {
      name: "contact_flow",
      label: "問い合わせ導線",
      optional: true,
      question:
        "問い合わせや申し込みは、どこから受ける想定じゃ？\n\n例：電話、LINE、Webフォーム、QRコード、来店、メール、などじゃ。"
    },
    {
      name: "reference_url",
      label: "参考URL・SNS",
      optional: true,
      question:
        "ホームページやSNS、参考URLがあれば送ってほしいのじゃ。\nない場合は「なし」で大丈夫じゃ。"
    },
    {
      name: "review_focus",
      label: "特に見てほしいポイント",
      optional: true,
      question:
        "診断で特に見てほしいところはあるかのう？\n\n例：見出し、デザイン、文章、導線、特典、ターゲット、全体、などじゃ。"
    },
    {
      name: "desired_improvement",
      label: "希望する改善方向",
      optional: true,
      question:
        "希望する改善方向があれば教えてほしいのじゃ。\n\n例：もっと反応を増やしたい、信頼感を出したい、女性向けにしたい、求人応募を増やしたい、などじゃ。"
    },
    {
      name: "company_name",
      label: "会社名・店舗名",
      question: "診断レポートに記載するため、会社名または店舗名を教えてほしいのじゃ。"
    },
    {
      name: "customer_name",
      label: "お名前",
      question: "担当者のお名前を教えてほしいのじゃ。"
    },
    {
      name: "email",
      label: "メールアドレス",
      question:
        "診断レポートを送るメールアドレスを教えてほしいのじゃ。\n入力間違いがあるとレポートを届けられないため、確認できるアドレスを入力してほしいのじゃ。"
    }
  ],
  production_inquiry: [
    {
      name: "inquiry_detail",
      label: "相談したい内容",
      question:
        "制作・料金について相談したい内容を教えてほしいのじゃ。\n\n例：チラシを作りたい、料金を知りたい、見積もりがほしい、サブスクを相談したい、急ぎで制作したい、などじゃ。"
    },
    {
      name: "production_item",
      label: "作りたいもの",
      question:
        "今回作りたいもの、または相談したい制作物を教えてほしいのじゃ。\n\n例：チラシ、ポスター、DM、メニュー表、求人チラシ、LINE画像、SNS投稿画像、LPなどじゃ。"
    },
    {
      name: "preferred_timing",
      label: "希望時期",
      question:
        "希望の時期はあるかのう？\n\n例：できるだけ早く、今月中、来月配布予定、まだ未定、などじゃ。"
    },
    {
      name: "budget",
      label: "予算感",
      optional: true,
      question:
        "差し支えなければ、予算感も教えてほしいのじゃ。\n\n例：1万円以内、3万円前後、月額プランで相談したい、まだ分からない、などじゃ。\n\nまだ分からない場合は「未定」で大丈夫じゃ。"
    },
    {
      name: "current_challenge",
      label: "現在の課題",
      question:
        "今回、制作を考えている背景や課題も教えてほしいのじゃ。\n\n例：反応がない、毎回作るのが大変、求人応募を増やしたい、デザインを整えたい、販促物を継続して作りたい、などじゃ。"
    },
    {
      name: "company_name",
      label: "会社名・店舗名",
      question: "詳しい案内を送るために、会社名または店舗名を教えてほしいのじゃ。"
    },
    {
      name: "customer_name",
      label: "お名前",
      question: "担当者のお名前を教えてほしいのじゃ。"
    },
    {
      name: "email",
      label: "メールアドレス",
      question: "連絡用のメールアドレスを教えてほしいのじゃ。"
    },
    {
      name: "phone",
      label: "電話番号",
      optional: true,
      question:
        "電話での連絡を希望する場合は、電話番号も教えてほしいのじゃ。\nメールのみでよければ「なし」で大丈夫じゃ。"
    }
  ],
  promotion_consulting: [
    {
      name: "promotion_challenge",
      label: "現在の販促課題",
      question:
        "今いちばん困っている販促課題を教えてほしいのじゃ。\n\n例：問い合わせが増えない、リピートにつながらない、求人が集まらない、何から改善すればいいか分からない、などじゃ。"
    },
    {
      name: "promotion_channels",
      label: "使っている販促手段",
      question:
        "今使っている販促手段を教えてほしいのじゃ。\n\n例：チラシ、ホームページ、LP、LINE、Instagram、Googleマップ、広告、紹介、店頭告知などじゃ。"
    },
    {
      name: "consulting_scope",
      label: "相談したい範囲",
      question:
        "どのあたりまで相談したいか教えてほしいのじゃ。\n\n例：チラシ改善だけ、LINE導線も含めたい、SNSも見てほしい、販促全体を整理したい、毎月伴走してほしい、などじゃ。"
    },
    {
      name: "goal",
      label: "目標",
      question:
        "今後増やしたい成果を教えてほしいのじゃ。\n\n例：問い合わせ、予約、来店、求人応募、リピート、客単価、売上などじゃ。"
    },
    {
      name: "preferred_timing",
      label: "希望時期",
      question:
        "相談を始めたい時期はあるかのう？\n\n例：できるだけ早く、今月中、来月から、まだ未定、などじゃ。"
    },
    {
      name: "budget",
      label: "予算感",
      optional: true,
      question:
        "差し支えなければ、販促相談や伴走に使える予算感を教えてほしいのじゃ。\n\n例：まずは小さく相談したい、月5万円以内、月15万円前後、内容を見て相談したい、まだ分からない、などじゃ。\n\nまだ分からない場合は「未定」で大丈夫じゃ。"
    },
    {
      name: "company_name",
      label: "会社名・店舗名",
      question: "詳しい案内を送るために、会社名または店舗名を教えてほしいのじゃ。"
    },
    {
      name: "customer_name",
      label: "お名前",
      question: "担当者のお名前を教えてほしいのじゃ。"
    },
    {
      name: "email",
      label: "メールアドレス",
      question: "連絡用のメールアドレスを教えてほしいのじゃ。"
    },
    {
      name: "phone",
      label: "電話番号",
      optional: true,
      question:
        "電話での連絡を希望する場合は、電話番号も教えてほしいのじゃ。\nメールのみでよければ「なし」で大丈夫じゃ。"
    }
  ]
};

const CHATBOT_V3_SUMMARY_FIELDS = {
  free_diagnosis: [
    "intake_type",
    "initial_concern",
    "flyer_file",
    "industry",
    "flyer_purpose",
    "target_audience",
    "distribution_method",
    "distribution_area",
    "distribution_volume",
    "desired_response",
    "current_response_status",
    "service_price",
    "strengths",
    "competitor_difference",
    "current_offer",
    "contact_flow",
    "reference_url",
    "review_focus",
    "desired_improvement",
    "company_name",
    "customer_name",
    "email"
  ],
  production_inquiry: [
    "intake_type",
    "initial_concern",
    "inquiry_detail",
    "production_item",
    "preferred_timing",
    "budget",
    "current_challenge",
    "company_name",
    "customer_name",
    "email",
    "phone"
  ],
  promotion_consulting: [
    "intake_type",
    "initial_concern",
    "promotion_challenge",
    "promotion_channels",
    "consulting_scope",
    "goal",
    "preferred_timing",
    "budget",
    "company_name",
    "customer_name",
    "email",
    "phone"
  ]
};

function createChatLeadData() {
  return {
    ...initialData(),
    intake_type: "",
    initial_concern: "",
    target_audience: "",
    service_price: "",
    strengths: "",
    competitor_difference: "",
    current_offer: "",
    distribution_volume: "",
    contact_flow: "",
    reference_url: "",
    review_focus: "",
    desired_improvement: "",
    inquiry_detail: "",
    production_item: "",
    preferred_timing: "",
    budget: "",
    current_challenge: "",
    promotion_challenge: "",
    promotion_channels: "",
    consulting_scope: "",
    goal: "",
    phone: "",
    consent: false,
    created_at: ""
  };
}

function openChat() {
  if (!chatShell || !chatInput) return;
  chatShell.dataset.open = "true";
  if (!state.started) {
    state.started = true;
    state.stage = "initial_concern";
    state.pendingQuestion = null;
    state.intakeType = "";
    state.isSubmitting = false;
    state.errorMessage = "";
    state.uploadedFile = null;
    state.data = createChatLeadData();
    logChatEvent("chat_started", { stage: "initial_concern" });
    addMessage(
      "bot",
      "こんにちは。\n今のチラシや販促について、気になっていることを教えてほしいのじゃ。\n\nたとえば、\n「チラシを配っても反応がない」\n「作り直す前に見てほしい」\n「制作料金を知りたい」\n「集客全体を相談したい」\nなど、まだ整理できていなくても大丈夫じゃ。"
    );
    setActions([
      "チラシを無料診断してほしい",
      "制作料金を知りたい",
      "販促全体を相談したい",
      "まだよく分からない"
    ]);
  }
  window.setTimeout(() => chatInput.focus(), 120);
}

function setActions(actions = []) {
  if (!chatActions) return;
  chatActions.replaceChildren();
  actions.forEach((action) => {
    const config = typeof action === "string" ? { label: action, value: action } : action;
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = config.label;
    if (config.important) button.classList.add("important");
    button.addEventListener("click", () => {
      logChatEvent("button_click", {
        label: config.label,
        value: config.value || config.label,
        route: config.route || state.intakeType || "",
        routeLabel: config.route ? CHATBOT_V3_ROUTE_LABELS[config.route] : "",
        stage: state.stage || "",
        kind: config.kind || "text"
      });
      if (config.kind === "file") {
        if (flyerFileInput) flyerFileInput.click();
        return;
      }
      if (config.kind === "route") {
        addMessage("user", config.label);
        startChatRoute(config.route);
        return;
      }
      if (config.kind === "confirm") {
        addMessage("user", "同意して送信する");
        completeApplication();
        return;
      }
      if (config.kind === "confirm_preview") {
        addMessage("user", "同意して確認へ進む");
        state.data.consent = true;
        showConfirmation();
        return;
      }
      if (config.kind === "edit_menu") {
        showEditFieldChoice();
        return;
      }
      if (config.kind === "edit_field") {
        addMessage("user", `${config.label}を修正`);
        state.editingField = config.field;
        askStage(config.field, { editing: true });
        return;
      }
      if (config.kind === "copy") {
        copyAdminNotice();
        return;
      }
      if (config.kind === "reset") {
        restartChat();
        return;
      }
      const value = config.value || config.label;
      addMessage("user", value);
      handleText(value);
    });
    chatActions.appendChild(button);
  });
}

function handleText(rawText) {
  const text = rawText.trim();
  if (!text) return;
  logChatEvent("text_input", {
    text,
    stage: state.stage || "",
    route: state.intakeType || ""
  });

  if (state.stage === "initial_concern") {
    state.data.initial_concern = text;
    state.data.issue_text = text;
    logChatEvent("initial_concern", {
      text,
      stage: "initial_concern"
    });
    const route = detectChatRoute(text);
    if (route) {
      startChatRoute(route);
      return;
    }
    const support = getSupportResponse(text);
    if (support) {
      addMessage("bot", support.message);
      if (support.route) {
        startChatRoute(support.route, { skipIntro: true });
        return;
      }
      if (support.actions) {
        setActions(support.actions);
        return;
      }
    }
    showRouteChoice();
    return;
  }

  if (state.stage === "confirm") {
    if (/同意|送信|申し込|問い合わせ|はい|ok|OK/.test(text)) {
      completeApplication();
      return;
    }
    if (/修正|直す|変更/.test(text)) {
      showEditFieldChoice();
      return;
    }
    addMessage("bot", "送信する場合は「同意して送信する」、修正する場合は「項目を修正する」を選んでほしいのじゃ。");
    setActions([
      { label: "同意して送信する", kind: "confirm", important: true },
      { label: "項目を修正する", kind: "edit_menu" },
      { label: "最初からやり直す", kind: "reset" }
    ]);
    return;
  }

  if (state.stage === "consent") {
    if (/同意|確認|進む|はい|ok|OK/.test(text)) {
      state.data.consent = true;
      showConfirmation();
      return;
    }
    if (/修正|直す|変更/.test(text)) {
      showEditFieldChoice();
      return;
    }
    addMessage("bot", "確認画面に進む場合は「同意して確認へ進む」、修正する場合は「項目を修正する」を選んでほしいのじゃ。");
    setActions([
      { label: "同意して確認へ進む", kind: "confirm_preview", important: true },
      { label: "項目を修正する", kind: "edit_menu" },
      { label: "最初からやり直す", kind: "reset" }
    ]);
    return;
  }

  if (state.stage === "flyer_file") {
    if (/チラシがまだない|まだない|未作成|これから作|新しく作/i.test(text)) {
      addMessage(
        "bot",
        "チラシがまだない場合は、制作・料金問い合わせとして進めるのが自然じゃ。\n新しく作る前提で、内容や料金の相談を受け付けるのじゃ。"
      );
      startChatRoute("production_inquiry", { skipIntro: true });
      return;
    }
    const support = getSupportResponse(text, { allowRoute: false });
    if (support) {
      addMessage("bot", support.message);
      repeatCurrentQuestion();
      return;
    }
    addMessage("bot", "診断にはチラシ画像またはPDFが必要なのじゃ。\njpg、png、pdfのいずれかで、10MB以内のファイルを送ってほしいのじゃ。");
    setActions([{ label: "チラシ画像/PDFを選択", kind: "file", important: true }]);
    return;
  }

  const currentStage = getCurrentStage();
  const supportAllowed = !currentStage || ![
    "inquiry_detail",
    "production_item",
    "preferred_timing",
    "budget",
    "current_challenge",
    "promotion_challenge",
    "promotion_channels",
    "consulting_scope",
    "goal",
    "desired_response",
    "current_response_status",
    "strengths"
  ].includes(currentStage.name);
  const support = getSupportResponse(text, { allowRoute: supportAllowed });
  if (support) {
    addMessage("bot", support.message);
    if (support.route) {
      startChatRoute(support.route, { skipIntro: true });
      return;
    }
    if (support.actions) {
      setActions(support.actions);
      return;
    }
    repeatCurrentQuestion();
    return;
  }

  if (!currentStage) {
    repeatCurrentQuestion();
    return;
  }

  if (currentStage.name === "email" && !isValidEmail(text)) {
    addMessage(
      "bot",
      "メールアドレスの形式が少し違うようじゃ。\n診断レポートや案内を届けるため、もう一度確認して入力してほしいのじゃ。"
    );
    return;
  }

  state.data[currentStage.name] = extractAnswer(currentStage.name, text);
  captureExtraInfo(text);

  if (state.editingField) {
    state.editingField = "";
    addMessage("bot", "修正したのじゃ。確認画面に戻るのじゃ。");
    showConfirmation();
    return;
  }

  askNextMissing();
}

function detectChatRoute(text) {
  const value = text.toLowerCase();
  if (/料金|費用|見積|見積もり|サブスク|月額|納期|急ぎ|作って|制作|依頼|デザイン|プラン/.test(value)) {
    return "production_inquiry";
  }
  if (/伴走|販促全体|集客全体|販促相談|line|sns|instagram|インスタ|lp|ホームページ|毎月|仕組み|売上|導線|チラシ以外|何から改善/.test(value)) {
    return "promotion_consulting";
  }
  if (/反応がない|反応|問い合わせがない|問い合わせが来ない|予約が入らない|来店につながらない|応募が来ない|求人|何が悪|配布前|見てほしい|診断|改善点|canva|不安|作り直す前|無料診断/.test(value)) {
    return "free_diagnosis";
  }
  return "";
}

function startChatRoute(route, options = {}) {
  state.intakeType = route;
  state.data.intake_type = CHATBOT_V3_ROUTE_LABELS[route];
  state.editingField = "";
  logChatEvent("route_selected", {
    route,
    routeLabel: CHATBOT_V3_ROUTE_LABELS[route],
    stage: state.stage || ""
  });

  if (!options.skipIntro) {
    if (route === "free_diagnosis") {
      addMessage(
        "bot",
        "なるほどじゃ。\n今のチラシで反応や問い合わせにつながっているか不安なのじゃな。\n\nその場合は、まず無料チラシ診断で、見出し・ターゲット・訴求・オファー・問い合わせ導線などを確認するのがよいのじゃ。\n診断だけでも無料で利用できるので、まずは今のチラシ画像またはPDFを送ってほしいのじゃ。"
      );
    } else if (route === "production_inquiry") {
      addMessage(
        "bot",
        "もちろん相談できるのじゃ。\nチラシ制作や料金について知りたい場合は、制作・料金問い合わせとして受付できるのじゃ。"
      );
    } else {
      addMessage(
        "bot",
        "なるほどじゃ。\nチラシ単体というより、集客や販促全体の流れを相談したいのじゃな。\n販促相談・伴走問い合わせとして受付するのがよいのじゃ。"
      );
    }
  }
  askNextMissing();
}

function showRouteChoice() {
  addMessage(
    "bot",
    "ありがとうなのじゃ。\nそなたの状況だと、いくつか相談先が考えられるのじゃ。\n\n今の気持ちに一番近いものを選んでほしいのじゃ。"
  );
  setActions([
    { label: "今のチラシの改善点を無料で見てほしい", kind: "route", route: "free_diagnosis", important: true },
    { label: "チラシ制作や料金について知りたい", kind: "route", route: "production_inquiry" },
    { label: "チラシ以外も含めて販促全体を相談したい", kind: "route", route: "promotion_consulting" }
  ]);
}

function getSupportResponse(text, options = {}) {
  const allowRoute = options.allowRoute !== false;
  if (/本当に無料|無料ですか|無料なの|費用かから/.test(text)) {
    return {
      message:
        "無料チラシ診断だけなら費用はかからないのじゃ。\n診断後に制作を依頼するかどうかは、レポートを見てから判断できるのじゃ。"
    };
  }
  if (/診断だけ|見るだけ|依頼しなくても|契約しなくても/.test(text)) {
    return {
      message:
        "大丈夫じゃ。\n診断だけ利用して、自分で改善する形でも問題ないのじゃ。\n必要な人だけ、後から制作や販促相談を利用できる流れじゃ。"
    };
  }
  if (/pdf|PDF|画像|写真/.test(text) && /いい|大丈夫|可能|できますか|可/.test(text)) {
    return {
      message: "PDFでも大丈夫じゃ。\n画像でもPDFでも、内容が読める状態であれば診断できるのじゃ。"
    };
  }
  if (/古い|昔の|過去/.test(text)) {
    return {
      message:
        "古いチラシでも大丈夫じゃ。\n過去に使ったチラシを見ることで、反応が出にくかった原因や、次に直すべきポイントを整理しやすくなるのじゃ。"
    };
  }
  if (/効果.*保証|保証.*効果|売上.*保証|必ず.*(反応|売上|増え|出る)|反応.*保証/.test(text)) {
    return {
      message:
        "反応や売上の保証はできないのじゃ。\nただし、反応を落としている可能性があるポイントや、改善の優先順位を整理することはできるのじゃ。"
    };
  }
  if (/急ぎ|至急|早く|最短/.test(text)) {
    return {
      message:
        "急ぎの場合は、制作・料金問い合わせとして受付するのがよいのじゃ。\n希望時期を確認したうえで、対応できる範囲を案内する流れじゃ。",
      route: allowRoute ? "production_inquiry" : ""
    };
  }
  if (/チラシ以外|line|sns|instagram|インスタ|ホームページ|lp|販促全体|集客全体/.test(text)) {
    return {
      message:
        "チラシ以外も相談できるのじゃ。\nLINE、SNS、LP、既存客向け案内なども含めて相談したい場合は、販促相談・伴走問い合わせとして受付するのがよいのじゃ。",
      route: allowRoute ? "promotion_consulting" : ""
    };
  }
  if (/料金|いくら|費用|価格|プラン/.test(text)) {
    return {
      message:
        "無料診断は費用がかからないのじゃ。\n制作を依頼する場合は、内容や点数によってプランが変わるのじゃ。\n\n料金について詳しく知りたい場合は、制作・料金問い合わせとして受付できるのじゃ。",
      actions: allowRoute ? [
        { label: "まず無料診断を受けたい", kind: "route", route: "free_diagnosis", important: true },
        { label: "制作・料金について問い合わせたい", kind: "route", route: "production_inquiry" }
      ] : null
    };
  }
  return null;
}

function getCurrentFields() {
  return CHATBOT_V3_FIELDS[state.intakeType] || [];
}

function getCurrentStage() {
  return getCurrentFields().find((field) => field.name === state.stage);
}

function addProgress(stageName) {
  const fields = getCurrentFields();
  const index = fields.findIndex((field) => field.name === stageName);
  if (index < 0) return;
  addMessage("progress", `受付ステップ ${index + 1}/${fields.length}：${fields[index].label}`);
}

function askNextMissing() {
  const fields = getCurrentFields();
  const next = fields.find((field) => !state.data[field.name]);
  if (next) {
    askStage(next.name);
    return;
  }
  showConsentStep();
}

function askStage(stageName, options = {}) {
  const stage = getCurrentFields().find((field) => field.name === stageName);
  if (!stage) return;
  state.stage = stageName;
  if (!options.editing) addProgress(stageName);
  addMessage("bot", options.editing ? `「${stage.label}」を修正するのじゃ。\n\n${stage.question}` : stage.question);
  if (stage.action) {
    setActions([stage.action]);
  } else if (stage.optional) {
    setActions(["未定", "なし"]);
  } else {
    setActions([]);
  }
}

function repeatCurrentQuestion() {
  const stage = getCurrentStage();
  if (!stage) {
    addMessage("bot", "まず、今のチラシや販促で気になっていることを教えてほしいのじゃ。");
    return;
  }
  addMessage("bot", `続けるのじゃ。\n\n${stage.question}`);
  if (stage.action) setActions([stage.action]);
}

function showConsentStep() {
  state.stage = "consent";
  addMessage(
    "bot",
    "最後に確認じゃ。\n入力内容は、受付対応・診断レポート作成・制作や販促相談の案内に使用するのじゃ。\n同意して進む場合は「同意して確認へ進む」を押してほしいのじゃ。"
  );
  setActions([
    { label: "同意して確認へ進む", kind: "confirm_preview", important: true },
    { label: "項目を修正する", kind: "edit_menu" },
    { label: "最初からやり直す", kind: "reset" }
  ]);
}

function showConfirmation() {
  state.stage = "confirm";
  addSummaryMessage();
  setActions([
    { label: "同意して送信する", kind: "confirm", important: true },
    { label: "項目を修正する", kind: "edit_menu" },
    { label: "最初からやり直す", kind: "reset" }
  ]);
}

function addSummaryMessage() {
  if (!chatMessages) return;
  const route = state.intakeType || "free_diagnosis";
  const message = document.createElement("div");
  message.className = "message bot";
  const title = document.createElement("p");
  title.textContent = "以下の内容で受付するのじゃ。";
  message.appendChild(title);

  const summary = document.createElement("dl");
  summary.className = "summary-box";
  getSummaryFields(route).forEach((key) => {
    const row = document.createElement("div");
    const dt = document.createElement("dt");
    const dd = document.createElement("dd");
    dt.textContent = CHATBOT_V3_LABELS[key] || key;
    dd.textContent = displayValue(key);
    row.append(dt, dd);
    summary.appendChild(row);
  });
  const note = document.createElement("p");
  note.textContent = "内容に問題なければ「同意して送信する」を押してほしいのじゃ。修正したい場合は、項目ごとに直せるのじゃ。";
  message.append(summary, note);
  chatMessages.appendChild(message);
  scrollChatToBottom();
}

function showEditFieldChoice() {
  const route = state.intakeType || "free_diagnosis";
  addMessage("bot", "どの項目を修正するか選んでほしいのじゃ。");
  const actions = getSummaryFields(route)
    .filter((key) => !["intake_type", "created_at", "consent", "initial_concern"].includes(key))
    .map((key) => ({
      label: CHATBOT_V3_LABELS[key] || key,
      kind: "edit_field",
      field: key
    }));
  actions.push({ label: "最初からやり直す", kind: "reset" });
  setActions(actions);
}

function getSummaryFields(route) {
  return CHATBOT_V3_SUMMARY_FIELDS[route] || CHATBOT_V3_SUMMARY_FIELDS.free_diagnosis;
}

async function completeApplication() {
  const validation = validateChatLead(state.data);
  if (!validation.valid) {
    addMessage("bot", validation.message);
    if (validation.field === "consent") {
      showConsentStep();
    } else if (validation.field) {
      askStage(validation.field);
    }
    return;
  }

  state.data.consent = true;
  state.data.created_at = new Date().toISOString();
  state.isSubmitting = true;
  state.errorMessage = "";
  setActions([]);

  try {
    await submitChatLead(state.data);
    logChatEvent("lead_completed", {
      route: state.intakeType,
      routeLabel: CHATBOT_V3_ROUTE_LABELS[state.intakeType],
      stage: "complete"
    });
  } catch (error) {
    state.isSubmitting = false;
    state.errorMessage = error.message;
    addMessage("bot", "送信中に問題が起きたのじゃ。\n少し時間をおいて、もう一度試してほしいのじゃ。");
    setActions([
      { label: "もう一度送信する", kind: "confirm", important: true },
      { label: "管理者通知をコピー", kind: "copy" },
      { label: "項目を修正する", kind: "edit_menu" }
    ]);
    return;
  }

  state.isSubmitting = false;
  if (state.intakeType === "free_diagnosis") {
    addMessage(
      "bot",
      "ありがとうございますじゃ。\n無料チラシ診断の受付が完了したのじゃ。\n\nいただいたチラシと入力内容をもとに、7つのAI仙人の分析フレームを活用して、改善ポイントをA4レポートにまとめるのじゃ。\n\n通常1〜3営業日以内に、入力してもらったメールアドレス宛に送るのじゃ。\n診断だけの利用でも大丈夫じゃ。"
    );
  } else if (state.intakeType === "production_inquiry") {
    addMessage(
      "bot",
      "ありがとうございますじゃ。\n制作・料金問い合わせの受付が完了したのじゃ。\n\n入力内容を確認のうえ、制作内容や料金の目安についてメールで案内するのじゃ。\n\nなお、今のチラシがある場合は、無料診断を先に受けることで、作り直すべきポイントが分かりやすくなるのじゃ。"
    );
  } else {
    addMessage(
      "bot",
      "ありがとうございますじゃ。\n販促相談・伴走問い合わせの受付が完了したのじゃ。\n\n入力内容を確認のうえ、販促課題や相談内容に合わせて案内するのじゃ。\n\nチラシ、LINE、SNS、LP、既存客向けの案内など、必要な範囲を整理しながら進められるのじゃ。"
    );
  }
  setActions([
    { label: "管理者通知をコピー", kind: "copy" },
    { label: "新しく相談する", kind: "reset" }
  ]);
}

function validateChatLead(data) {
  if (!state.intakeType) {
    return { valid: false, message: "受付種別が選ばれていないのじゃ。まず相談内容を選ぶのじゃ。" };
  }
  const missing = getCurrentFields().find((field) => !field.optional && !data[field.name]);
  if (missing) {
    return { valid: false, field: missing.name, message: `まだ「${missing.label}」が入力されていないのじゃ。先にここを確認するのじゃ。` };
  }
  if (!data.email || !isValidEmail(data.email)) {
    return {
      valid: false,
      field: "email",
      message: "メールアドレスの形式が少し違うようじゃ。\n診断レポートや案内を届けるため、もう一度確認して入力してほしいのじゃ。"
    };
  }
  if (state.intakeType === "free_diagnosis" && !data.flyer_file) {
    return {
      valid: false,
      field: "flyer_file",
      message: "無料診断ではチラシ画像またはPDFが必要なのじゃ。"
    };
  }
  if (!data.consent) {
    return {
      valid: false,
      field: "consent",
      message: "送信前に、入力内容の利用について同意確認が必要なのじゃ。"
    };
  }
  return { valid: true };
}

function buildChatLeadPayload(data) {
  return {
    intakeType: state.intakeType || null,
    initialConcern: data.initial_concern || "",
    issueText: data.issue_text || data.initial_concern || "",
    flyerFileName: data.flyer_file?.name || "",
    flyerFileType: data.flyer_file?.type || "",
    flyerFileSize: data.flyer_file?.size || 0,
    industry: data.industry || "",
    flyerPurpose: data.flyer_purpose || "",
    distributionMethod: data.distribution_method || "",
    distributionArea: data.distribution_area || "",
    desiredResponse: data.desired_response || "",
    currentResult: data.current_response_status || "",
    targetAudience: data.target_audience || "",
    servicePrice: data.service_price || "",
    strengths: data.strengths || "",
    competitorDifference: data.competitor_difference || "",
    currentOffer: data.current_offer || "",
    distributionVolume: data.distribution_volume || "",
    contactFlow: data.contact_flow || "",
    referenceUrl: data.reference_url || "",
    reviewFocus: data.review_focus || "",
    desiredImprovement: data.desired_improvement || "",
    inquiryDetail: data.inquiry_detail || "",
    desiredDeliverable: data.production_item || "",
    desiredTiming: data.preferred_timing || "",
    budget: data.budget || "",
    currentIssue: data.current_challenge || "",
    promotionIssue: data.promotion_challenge || "",
    currentPromotionMethods: data.promotion_channels || "",
    consultationScope: data.consulting_scope || "",
    goal: data.goal || "",
    companyName: data.company_name || "",
    contactName: data.customer_name || "",
    email: data.email || "",
    phone: data.phone || "",
    consent: Boolean(data.consent),
    createdAt: data.created_at || new Date().toISOString()
  };
}

function buildChatLeadFormData(data) {
  const payload = buildChatLeadPayload(data);
  const formData = new FormData();
  formData.append("payload", JSON.stringify(payload));
  Object.entries(payload).forEach(([key, value]) => {
    formData.append(key, String(value ?? ""));
  });
  if (state.uploadedFile) {
    formData.append("flyerFile", state.uploadedFile, state.uploadedFile.name);
  }
  return formData;
}

async function submitChatLead(data) {
  const payload = buildChatLeadPayload(data);
  const endpoint = window.CHATBOT_ENDPOINT || "";
  const routeKey = state.intakeType === "free_diagnosis" ? STORAGE_KEY : CONTACT_STORAGE_KEY;
  const entries = JSON.parse(localStorage.getItem(routeKey) || "[]");
  entries.unshift({ ...data, payload });
  localStorage.setItem(routeKey, JSON.stringify(entries));

  if (!endpoint) {
    console.info("chatbot-lead", payload);
    return { ok: true, mocked: true };
  }

  const response = await fetch(endpoint, {
    method: "POST",
    body: buildChatLeadFormData(data)
  });
  if (!response.ok) {
    throw new Error(`Submit failed: ${response.status}`);
  }
  return response.json().catch(() => ({ ok: true }));
}

function saveEntry(entry) {
  const routeKey = state.intakeType === "free_diagnosis" ? STORAGE_KEY : CONTACT_STORAGE_KEY;
  const entries = JSON.parse(localStorage.getItem(routeKey) || "[]");
  entries.unshift(entry);
  localStorage.setItem(routeKey, JSON.stringify(entries));
}

function buildAdminNotice() {
  const route = state.intakeType || "free_diagnosis";
  const title = route === "free_diagnosis" ? "無料チラシ診断 申込" : CHATBOT_V3_ROUTE_LABELS[route];
  const lines = [`【${title}】`, ""];
  getSummaryFields(route).forEach((key) => {
    lines.push(`■ ${CHATBOT_V3_LABELS[key] || key}`);
    lines.push(displayValue(key));
    lines.push("");
  });
  lines.push("■ 同意確認");
  lines.push(state.data.consent ? "同意済み" : "未同意");
  lines.push("");
  lines.push("■ 申込日時");
  lines.push(displayValue("created_at"));
  return lines.join("\n");
}

function displayValue(key) {
  const value = state.data[key];
  if (key === "created_at") {
    return value ? new Date(value).toLocaleString("ja-JP") : "未入力";
  }
  if (key === "consent") {
    return value ? "同意済み" : "未同意";
  }
  if (key === "flyer_file") {
    if (!value) return "未入力";
    if (typeof value === "string") return value;
    return `${value.name}（${formatBytes(value.size)}）`;
  }
  return value || "未入力";
}

function restartChat() {
  if (!chatMessages) return;
  logChatEvent("chat_restart", {
    stage: state.stage || "",
    route: state.intakeType || ""
  });
  state.started = false;
  state.stage = "initial_concern";
  state.pendingQuestion = null;
  state.intakeType = "";
  state.chatSessionId = "";
  state.isSubmitting = false;
  state.errorMessage = "";
  state.uploadedFile = null;
  state.editingField = "";
  state.data = createChatLeadData();
  if (flyerFileInput) flyerFileInput.value = "";
  chatMessages.replaceChildren();
  setActions([]);
  openChat();
}
