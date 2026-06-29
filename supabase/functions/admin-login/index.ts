import { handleOptions, jsonResponse } from "../_shared/cors.ts";

Deno.serve(async (request) => {
  const options = handleOptions(request);
  if (options) return options;
  if (request.method !== "POST") {
    return jsonResponse({ ok: false, error: "Method not allowed" }, 405);
  }

  try {
    const { ownerId, ownerPassword } = await request.json();
    const expectedId = Deno.env.get("OWNER_ID");
    const expectedPassword = Deno.env.get("OWNER_PASSWORD");
    const adminToken = Deno.env.get("ADMIN_READ_TOKEN");
    if (!expectedId || !expectedPassword || !adminToken) {
      return jsonResponse({ ok: false, error: "Admin auth is not configured" }, 500);
    }

    if (String(ownerId || "").toLowerCase() !== expectedId.toLowerCase() || ownerPassword !== expectedPassword) {
      return jsonResponse({ ok: false }, 401);
    }

    return jsonResponse({ ok: true, token: adminToken });
  } catch (error) {
    console.error(error);
    return jsonResponse({ ok: false, error: String(error?.message || error) }, 500);
  }
});
