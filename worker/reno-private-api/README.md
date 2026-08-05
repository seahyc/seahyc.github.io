# Renovation private marker API

This tiny Worker supplies the precise home-window position only after Cloudflare
Access has authenticated a permitted owner. The public Three.js bundle contains
the block geometry, but not the storey/stack selection.

Required Worker secrets:

- `ALLOWED_EMAILS`: comma-separated owner email allowlist.
- `HOME_MARKER_JSON`: normalized marker data with `buildingIndex`, `heightRatio`,
  `side`, and `bayIndex`. Do not add the postal address, block number, stack number
  or storey label; the client only needs anonymous geometry indexes and ratios.

The Worker has no `workers.dev` address and is routed only through
`seahyingcong.com/reno/api/*`, which is inside the existing Cloudflare Access
application.
