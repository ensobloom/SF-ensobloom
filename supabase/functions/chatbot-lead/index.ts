import { handleOptions, jsonResponse } from "../_shared/cors.ts";
import { getServiceClient } from "../_shared/supabase.ts";
import { sendAdminNotification } from "../_shared/notify.ts";

const bucketName = "flyer-files";

Deno.serve(async (request) => {
  const options = handleOptions(request);
  if (options) return options;
  if (request.method !== "POST") {
    return jsonResponse({ ok: false, error: "Method not allowed" }, 405);
  }

  try {
    const formData = await request.formData();
    const payloadText = String(formData.get("payload") || "{}");
    const payload = JSON.parse(payloadText);
    const intakeType = String(payload.intakeType || "free_diagnosis");
    const supabase = getServiceClient();
    const id = crypto.randomUUID();
    const flyerFile = formData.get("flyerFile");

    let flyerFilePath = "";
    let flyerFileName = String(payload.flyerFileName || "");
    let flyerFileType = String(payload.flyerFileType || "");
    let flyerFileSize = Number(payload.flyerFileSize || 0);

    if (flyerFile instanceof File && flyerFile.size > 0) {
      flyerFileName = flyerFile.name;
      flyerFileType = flyerFile.type;
      flyerFileSize = flyerFile.size;
      const safeName = flyerFile.name.replace(/[^\w.\-ぁ-んァ-ヶ一-龠々ー]/g, "_");
      flyerFilePath = `diagnosis/${id}/${safeName}`;
      const { error: uploadError } = await supabase.storage
        .from(bucketName)
        .upload(flyerFilePath, flyerFile, {
          contentType: flyerFile.type || "application/octet-stream",
          upsert: false
        });
      if (uploadError) throw uploadError;
    }

    if (intakeType === "free_diagnosis") {
      const row = {
        id,
        intake_type: intakeType,
        initial_concern: payload.initialConcern || "",
        issue_text: payload.issueText || "",
        industry: payload.industry || "",
        flyer_purpose: payload.flyerPurpose || "",
        target_audience: payload.targetAudience || "",
        distribution_method: payload.distributionMethod || "",
        distribution_area: payload.distributionArea || "",
        distribution_volume: payload.distributionVolume || "",
        desired_response: payload.desiredResponse || "",
        current_response_status: payload.currentResult || "",
        service_price: payload.servicePrice || "",
        strengths: payload.strengths || "",
        competitor_difference: payload.competitorDifference || "",
        current_offer: payload.currentOffer || "",
        contact_flow: payload.contactFlow || "",
        reference_url: payload.referenceUrl || "",
        review_focus: payload.reviewFocus || "",
        desired_improvement: payload.desiredImprovement || "",
        company_name: payload.companyName || "",
        customer_name: payload.contactName || "",
        email: payload.email || "",
        phone: payload.phone || "",
        flyer_file_name: flyerFileName,
        flyer_file_type: flyerFileType,
        flyer_file_size: flyerFileSize,
        flyer_file_path: flyerFilePath,
        payload
      };
      const { error } = await supabase.from("diagnosis_requests").insert(row);
      if (error) throw error;
      await sendAdminNotification({
        subject: "【無料チラシ診断】新しい申込が入りました",
        text: buildDiagnosisNotice(row)
      });
      return jsonResponse({ ok: true, id, type: "diagnosis" });
    }

    const row = {
      id,
      intake_type: intakeType,
      source: "chatbot",
      company_name: payload.companyName || "",
      customer_name: payload.contactName || "",
      email: payload.email || "",
      phone: payload.phone || "",
      inquiry_detail: payload.inquiryDetail || payload.initialConcern || "",
      production_item: payload.desiredDeliverable || "",
      preferred_timing: payload.desiredTiming || "",
      budget: payload.budget || "",
      current_challenge: payload.currentIssue || "",
      promotion_challenge: payload.promotionIssue || "",
      promotion_channels: payload.currentPromotionMethods || "",
      consulting_scope: payload.consultationScope || "",
      goal: payload.goal || "",
      payload
    };
    const { error } = await supabase.from("contact_requests").insert(row);
    if (error) throw error;
    await sendAdminNotification({
      subject: "【無料診断LP】チャット相談が入りました",
      text: buildContactNotice(row)
    });
    return jsonResponse({ ok: true, id, type: "contact" });
  } catch (error) {
    console.error(error);
    return jsonResponse({ ok: false, error: String(error?.message || error) }, 500);
  }
});

function buildDiagnosisNotice(row: Record<string, unknown>) {
  return [
    "【無料チラシ診断 申込】",
    "",
    `■ お名前\n${row.customer_name || "-"}`,
    `■ メールアドレス\n${row.email || "-"}`,
    `■ 電話番号\n${row.phone || "-"}`,
    `■ 会社名・店舗名\n${row.company_name || "-"}`,
    `■ 業種\n${row.industry || "-"}`,
    `■ チラシの目的\n${row.flyer_purpose || "-"}`,
    `■ 増やしたい反応\n${row.desired_response || "-"}`,
    `■ 現在の反応状況\n${row.current_response_status || "-"}`,
    `■ 特に見てほしいポイント\n${row.review_focus || "-"}`,
    `■ 希望する改善方向\n${row.desired_improvement || "-"}`,
    `■ チラシファイル\n${row.flyer_file_name || "未添付"}`,
    `■ Storage Path\n${row.flyer_file_path || "-"}`
  ].join("\n\n");
}

function buildContactNotice(row: Record<string, unknown>) {
  return [
    "【チャット相談 受付】",
    "",
    `■ お名前\n${row.customer_name || "-"}`,
    `■ メールアドレス\n${row.email || "-"}`,
    `■ 電話番号\n${row.phone || "-"}`,
    `■ 会社名・店舗名\n${row.company_name || "-"}`,
    `■ 相談内容\n${row.inquiry_detail || row.promotion_challenge || "-"}`
  ].join("\n\n");
}
