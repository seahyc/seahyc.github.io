# Retirement Planning Data

This directory holds locally bundled source data used by the retirement planning tool.

## Files

- `insurance-db.js`: normalized local insurance/scheme database used at runtime.
- `sources/`: downloaded official source documents and pages.

## Refreshing source documents

Run:

```bash
node scripts/refresh-retirement-planning-data.mjs
```

This downloads the source manifest declared in `insurance-db.js` into `data/sources/` so the browser app can remain local-first while still preserving a source trail for future rule updates.
