# WholeHearted site — handoff notes (Oct 3, 2026)

## What changed this session
- **New page `/protocol`** — long-form Metabolic Reset funnel modeled on claudiapadron.com/protocol-4409 and andryam.com/protocol.
  - Files: `SRC/pages/protocol.astro`, `SRC/layouts/ProtocolLayout.astro` (logo-only header, no nav, FDA disclaimer footer),
    `SRC/components/ProtocolCTA.astro`, `SRC/components/AsSeenIn.astro`, `SRC/components/LineIcon.astro`.
  - All CTAs → `LINKS.unicity.tryIt` (ufeelgreat.com/c/wholehearted). Sticky CTA bar on mobile.
- **Molly is front and center** across the site (Chris removed): About page rewritten as "Meet Molly" with her full story;
  homepage has a "Hi, I'm Molly" card; protocol page uses a condensed version of her story + commission/results disclosure.
- **Credentials:** Certified Health Coach (program TBD), Functional Nutrition, Pastoral Counselor, BS Family & Child Studies.
- **"As Seen In" scrolling logo banner** — logos in `public/press/` (transparent PNGs). Claims verified by Chris.
- **Line icons** replaced emoji on benefit cards and the site-wide TrustBar ("ER Nurse Reviewed" → "Faith-Centered Coaching").
- **Colors** added to `SRC/styles/global.css`: `--color-clay: #a94f4b`, `--color-blush: #f7eeea`.
- **Homepage hero** primary button → "Start the 90-Day Reset" (/protocol).
- **Event page** error fallback email → hello@wholehearted.live.

## Oct 4 (second machine)
- Repo now on GitHub (private `cbroadlnc/wholehearted-live`); clone lives at `C:\Users\cbroa\code\wholehearted-live` — not in iCloud.
- `/protocol`: new banner `public/protocol-banner.jpg` at top (tagline "Reversing Insulin Resistance" removed from the image — disease claim).
- `/protocol`: "Real People, Real Results" before/after grid, 10 people, photos cropped from their graphics into `public/results/`.
  Summaries deliberately trimmed to weight/inches/energy/sleep/cravings — the original graphics claim diabetes, AFib, depression,
  etc. reversed and people coming off meds; don't add those back. Dr. Kenny + Andrya marked as Unicity distributors (confirm others).
  Permission to use all graphics confirmed by Chris.
- DNS: metabolicmolly.com now points at Netlify (domain aliases added). molly@metabolicmolly.com is Google Workspace (MX smtp.google.com,
  SPF includes Google + LeadConnector + Mailgun, Google DKIM added). GHL sends from `health.metabolicmolly.com` — leave those records.

## Still to do
- [ ] Name for "Community member" (last results photo). Typical-results figure for the disclosure if Unicity provides one.
- [ ] Push netlify.toml redirect (metabolicmolly.com → wholehearted.live; decide home vs /protocol). Netlify HTTPS cert for metabolicmolly.com.
- [ ] Google DKIM: click "Start authentication" in Admin → Email setup status. Connect molly@ Gmail to GHL (2-way sync).
- [ ] Molly's photo → `public/team/molly.jpg`, then swap the "M" placeholders (index, about, protocol — search for `molly.jpg`).
- [ ] Molly's intro video → set `heroVideo` at top of `protocol.astro` (YouTube/Vimeo embed URL).
- [ ] Real testimonials → `testimonials` array in `protocol.astro` (section hidden until filled). Review Shop page testimonials are real.
- [ ] Health coach certification program name.
- [ ] Consider a more personal headline (e.g., "Molly's 90-Day Metabolic Reset"); header logo strip white or transparent logo.
- [ ] metabolicmolly.com → 301 redirect to wholehearted.live. Redirect rule is in `netlify.toml`; still needed: add
      domain alias in Netlify, then at Squarespace DNS change A `@` 162.159.140.166 → 75.2.60.5 and CNAME `www`
      sites.ludicrous.cloud → wholehearted-live.netlify.app. In GHL remove it only under Sites → Domains (NOT Email Services).
- [ ] Optional: drop FDA mark from banner (FDA logo policy); keep GMP seal.

## Email plan (decided Oct 3): molly@metabolicmolly.com = Google Workspace inbox + GHL tracking
Current state: root domain is GHL's sending domain (MX → Mailgun, SPF includes leadconnector + mailgun, DMARC p=none).
Order matters so no mail is lost:
1. [ ] Sign up for Google Workspace for metabolicmolly.com (mailbox molly@). Add Google's TXT verification record.
2. [ ] GHL → Settings → Email Services: add dedicated sending subdomain `mail.metabolicmolly.com`, add its DNS records, verify, make default.
3. [ ] Root MX → `smtp.google.com` (remove mxa/mxb.mailgun.org). Root SPF → `v=spf1 include:_spf.google.com ~all`. Add Google DKIM.
4. [ ] Remove old root-domain sending domain from GHL Email Services.
5. [ ] GHL: connect molly@ Google mailbox with 2-way email sync; set Molly's staff email to molly@metabolicmolly.com.
6. [ ] Test send/receive both ways; confirm emails appear on the GHL contact.
Also fix wholehearted.live: MX is split between Google and Mailgun (inbound mail to hello@ may be lost) and it has no DMARC.

## Run locally
npm install && npm run dev   →  http://localhost:4321/protocol
