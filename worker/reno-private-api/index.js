const JSON_HEADERS = {
  "Content-Type": "application/json; charset=utf-8",
  "Cache-Control": "private, no-store, max-age=0",
  Vary: "CF-Access-Authenticated-User-Email",
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (request.method !== "GET") return respond({ error: "Method not allowed" }, 405);
    if (url.pathname !== "/reno/api/private-home-marker") return respond({ error: "Not found" }, 404);

    const email = (request.headers.get("CF-Access-Authenticated-User-Email") || "").trim().toLowerCase();
    const allowed = new Set((env.ALLOWED_EMAILS || "").split(",").map((value) => value.trim().toLowerCase()).filter(Boolean));
    if (!email || !allowed.has(email)) return respond({ error: "Forbidden" }, 403);

    try {
      const marker = JSON.parse(env.HOME_MARKER_JSON || "null");
      const validSide = marker?.side === "east" || marker?.side === "west";
      if (!validSide || !Number.isFinite(marker?.heightRatio) || !Number.isFinite(marker?.bayIndex)) throw new Error("Invalid marker configuration");
      return respond({ marker: {
        heightRatio: Math.max(.1, Math.min(.985, marker.heightRatio)),
        side: marker.side,
        bayIndex: Math.max(0, Math.round(marker.bayIndex)),
      } });
    } catch (error) {
      console.error("Private home marker is not configured", error);
      return respond({ error: "Private marker unavailable" }, 503);
    }
  },
};

function respond(body, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: JSON_HEADERS });
}
