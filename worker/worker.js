// Cloudflare Worker: subscribe endpoint backed by a private GitHub Gist
// Deploy: npx wrangler deploy worker/worker.js --name subscribe-worker
// Secrets: wrangler secret put GH_PAT / GIST_ID / ALLOWED_ORIGIN

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") || "";
    const allowed = env.ALLOWED_ORIGIN || "https://seahyingcong.com";
    const corsHeaders = {
      "Access-Control-Allow-Origin": allowed,
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };

    // CORS preflight
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    if (request.method !== "POST") {
      return json({ error: "Method not allowed" }, 405, corsHeaders);
    }

    // Reject requests from other origins
    if (origin && !origin.startsWith(allowed)) {
      return json({ error: "Forbidden" }, 403, corsHeaders);
    }

    try {
      const body = await request.json();
      const email = (body.email || "").trim().toLowerCase();

      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return json({ error: "Invalid email address" }, 400, corsHeaders);
      }

      // Read current gist
      const gistRes = await fetch(`https://api.github.com/gists/${env.GIST_ID}`, {
        headers: {
          Authorization: `Bearer ${env.GH_PAT}`,
          "User-Agent": "subscribe-worker",
        },
      });

      if (!gistRes.ok) {
        throw new Error(`Gist read failed: ${gistRes.status}`);
      }

      const gist = await gistRes.json();
      const content = gist.files["subscribers.txt"].content;
      const emails = content.split("\n").map((e) => e.trim().toLowerCase()).filter(Boolean);

      // Deduplicate
      if (emails.includes(email)) {
        return json({ ok: true, message: "You're already subscribed!" }, 200, corsHeaders);
      }

      // Append and update gist
      const updated = content.trimEnd() + "\n" + email + "\n";
      const patchRes = await fetch(`https://api.github.com/gists/${env.GIST_ID}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${env.GH_PAT}`,
          "User-Agent": "subscribe-worker",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          files: { "subscribers.txt": { content: updated } },
        }),
      });

      if (!patchRes.ok) {
        throw new Error(`Gist update failed: ${patchRes.status}`);
      }

      return json({ ok: true, message: "Subscribed! You'll get an email when I publish." }, 200, corsHeaders);
    } catch (err) {
      console.error(err);
      return json({ error: "Something went wrong. Try again later." }, 500, corsHeaders);
    }
  },
};

function json(data, status, headers) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...headers, "Content-Type": "application/json" },
  });
}
