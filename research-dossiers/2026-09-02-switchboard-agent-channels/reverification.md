# Re-verification log (performed 2026-11-21)

| Claim (evidence id) | Method | Result |
|---|---|---|
| E03 Meta Send API user-initiated | WebFetch developers.facebook.com Instagram messaging API doc (Postman mirror in notes rendered empty) | Confirmed: conversations begin when user messages; window usually 24h, up to 7 days (Click-to-Direct ad; Human Agent tag) |
| E04 LinkedIn approvals | WebFetch learn.microsoft.com page | Confirmed: most permissions/programs need explicit approval; open permissions are profile, email, w_member_social. Page does not mention messaging specifically; "broad messaging restricted" is my inference |
| E05/E06 Unipile | WebFetch pricing | Confirmed: EUR 49 / USD 55 for up to 10 accounts; USD 5.50 for 11–50; reverse engineering for LinkedIn, WhatsApp, Instagram; Telegram via official API (notes lump Telegram into reverse-engineered list; page says Telegram official) |
| E08 $275 for 50 accounts | Arithmetic from E06 | 55 + 40×5.5 = 275. Consistent |
| E10 DMnode plans/terms | WebFetch dmnode.com, /terms | Confirmed: $50 Starter (1 sender, 150 DMs), $500 Growth (25 senders, 12,500 DMs); terms: availability and delivery not guaranteed, third-party providers |
| E11 HeyReach | WebFetch | Confirmed $79/sender, $999 Agency 25 senders (also $1,399 50 senders, $2,999 unlimited) |
| E12 IGdm | WebFetch | Confirmed $8.99 (3 accounts), $19.99 unlimited; $29.99 Ultra also listed |
| E13 Modash | WebFetch | Partial: annual billing $199 Essentials, $499 Performance; monthly $299/$599 implied by "save $100/month", not stated; API pricing on a separate page not read |
| E01/E02 Cody post, Notion brief | WebFetch / curl | NOT verified: X returns 402/JS shell; Notion renders empty. Rests on notes |
| E07/E09 Salesrobot, DMnode launch posts; E08 Anuj post | not fetched | NOT verified |
| E15–E22 marketplace listings | not fetched | NOT verified; perishable |
| E14 Switchboard capabilities | not re-inspected | NOT verified |
