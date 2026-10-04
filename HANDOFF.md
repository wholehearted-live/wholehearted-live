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

## Still to do
- [ ] Molly's photo → `public/team/molly.jpg`, then swap the "M" placeholders (index, about, protocol — search for `molly.jpg`).
- [ ] Molly's intro video → set `heroVideo` at top of `protocol.astro` (YouTube/Vimeo embed URL).
- [ ] Real testimonials → `testimonials` array in `protocol.astro` (section hidden until filled). Review Shop page testimonials are real.
- [ ] Health coach certification program name.
- [ ] Consider a more personal headline (e.g., "Molly's 90-Day Metabolic Reset"); header logo strip white or transparent logo.
- [ ] metabolicmolly.com → 301 redirect to wholehearted.live (Netlify domain alias + redirect rule in `netlify.toml`).
- [ ] Optional: drop FDA mark from banner (FDA logo policy); keep GMP seal.
- [ ] Commit & push (nothing from this session is committed yet).

## Run locally
npm install && npm run dev   →  http://localhost:4321/protocol
