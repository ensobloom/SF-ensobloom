import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

export function getServiceClient() {
  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error("SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required");
  }
  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      persistSession: false
    }
  });
}

export function requireAdmin(request: Request) {
  const expected = Deno.env.get("ADMIN_READ_TOKEN");
  if (!expected) {
    throw new Error("ADMIN_READ_TOKEN is not configured");
  }
  const token = request.headers.get("x-admin-token") || request.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
  if (token !== expected) {
    return false;
  }
  return true;
}
