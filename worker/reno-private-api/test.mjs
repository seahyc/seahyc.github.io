import assert from "node:assert/strict";
import worker from "./index.js";

const env = {
  ALLOWED_EMAILS: "owner@example.com,partner@example.com",
  HOME_MARKER_JSON: JSON.stringify({ heightRatio: .95, side: "east", bayIndex: 1, buildingIndex: 42 }),
};

const anonymous = await worker.fetch(new Request("https://example.com/reno/api/private-home-marker"), env);
assert.equal(anonymous.status, 403);

const authorized = await worker.fetch(new Request("https://example.com/reno/api/private-home-marker", {
  headers: { "CF-Access-Authenticated-User-Email": "OWNER@example.com" },
}), env);
assert.equal(authorized.status, 200);
assert.deepEqual(await authorized.json(), { marker: { heightRatio: .95, side: "east", bayIndex: 1, buildingIndex: 42 } });

const missing = await worker.fetch(new Request("https://example.com/reno/api/unknown", {
  headers: { "CF-Access-Authenticated-User-Email": "owner@example.com" },
}), env);
assert.equal(missing.status, 404);

console.log("Verified private marker authorization, normalized response and closed route surface.");
