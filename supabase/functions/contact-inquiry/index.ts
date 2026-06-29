import { handleOptions, jsonResponse } from "../_shared/cors.ts";
import { getServiceClient } from "../_shared/supabase.ts";
import { sendAdminNotification } from "../_shared/notify.ts";

Deno.serve(async (request) => {
  const options = handleOptions(request);
  if (options) return options;
  if (request.method !== "POST") {
    return jsonResponse({ ok: false, error: "Method not allowed" }, 405);
  }

  try {
    const body = await request.json();
    const supabase = getServiceClient();
    const row = {
      intake_type: body.type || "direct_contact",
      source: body.source || "contact_page",
      business_type: body.business_type || "",
      company_name: body.company_name || "",
      industry: body.industry || "",
      customer_name: body.name || body.customer_name || "",
      name: body.name || "",
      email: body.email || "",
      phone: body.phone || "",
      topic: body.topic || "",
      message: body.message || "",
      payload: body
    };
    const { data, error } = await supabase
      .from("contact_requests")
      .insert(row)
      .select("id")
      .single();
    if (error) throw error;
    await notifySafely(() =>
      sendAdminNotification({
        subject: "【無料診断LP】直接問い合わせが入りました",
        text: body.notice || buildNotice(row)
      })
    );
    return jsonResponse({ ok: true, id: data.id });
  } catch (error) {
    console.error(error);
    return jsonResponse({ ok: false, error: String(error?.message || error) }, 500);
  }
});

async function notifySafely(send: () => Promise<unknown>) {
  try {
    return await send();
  } catch (error) {
    console.error("notification failed", error);
    return { skipped: true, error: String(error?.message || error) };
  }
}

function buildNotice(row: Record<string, unknown>) {
  return [
    "【直接お問い合わせ】",
    "",
    `■ お名前\n${row.name || row.customer_name || "-"}`,
    `■ メールアドレス\n${row.email || "-"}`,
    `■ 会社名・店舗名\n${row.company_name || "-"}`,
    `■ 相談内容\n${row.topic || "-"}`,
    `■ メッセージ\n${row.message || "-"}`
  ].join("\n\n");
}
