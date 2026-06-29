type MailPayload = {
  subject: string;
  text: string;
};

export async function sendAdminNotification(payload: MailPayload) {
  const apiKey = Deno.env.get("RESEND_API_KEY");
  const to = Deno.env.get("ADMIN_NOTIFY_EMAIL");
  const from = Deno.env.get("FROM_EMAIL") || "Enso Bloom <noreply@example.com>";
  if (!apiKey || !to) {
    console.info("notification skipped", payload.subject);
    return { skipped: true };
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from,
      to,
      subject: payload.subject,
      text: payload.text
    })
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(`Resend failed: ${response.status} ${message}`);
  }

  return response.json().catch(() => ({ ok: true }));
}
