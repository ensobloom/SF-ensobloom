import { handleOptions, jsonResponse } from "../_shared/cors.ts";
import { getServiceClient, requireAdmin } from "../_shared/supabase.ts";

const bucketName = "flyer-files";

Deno.serve(async (request) => {
  const options = handleOptions(request);
  if (options) return options;
  if (request.method !== "GET") {
    return jsonResponse({ ok: false, error: "Method not allowed" }, 405);
  }

  try {
    if (!requireAdmin(request)) {
      return jsonResponse({ ok: false, error: "Unauthorized" }, 401);
    }
    const supabase = getServiceClient();
    const [diagnosisResult, contactResult] = await Promise.all([
      supabase
        .from("diagnosis_requests")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(100),
      supabase
        .from("contact_requests")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(100)
    ]);

    if (diagnosisResult.error) throw diagnosisResult.error;
    if (contactResult.error) throw contactResult.error;

    const diagnosisEntries = await Promise.all(
      (diagnosisResult.data || []).map((row) => withSignedFlyerUrl(supabase, row))
    );

    return jsonResponse({
      ok: true,
      diagnosisEntries,
      contactEntries: contactResult.data || []
    });
  } catch (error) {
    console.error(error);
    return jsonResponse({ ok: false, error: String(error?.message || error) }, 500);
  }
});

async function withSignedFlyerUrl(supabase: ReturnType<typeof getServiceClient>, row: Record<string, unknown>) {
  const path = String(row.flyer_file_path || "");
  if (!path) return row;
  const { data, error } = await supabase.storage
    .from(bucketName)
    .createSignedUrl(path, 60 * 60 * 24);
  if (error) {
    console.error(error);
    return row;
  }
  return {
    ...row,
    flyer_file_url: data.signedUrl
  };
}
