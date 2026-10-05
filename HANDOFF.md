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

## Oct 4 launch prep (second machine)
- SEO: search indexing ON (robots.txt allows all + sitemap; home/about/live/shop/protocol index, /app noindex).
  Protocol title/description, 1200x630 share images (og-default.jpg, og-protocol.jpg), Organization + founder schema with sameAs.
- Social links real: facebook.com/MetabolicMolly, instagram.com/metabolicmolly, tiktok.com/@metabolic_molly (footer hides empty links).
- Results data shared in SRC/data/results.ts — used by /protocol and /shop. Shop's sample testimonials (Lisa M., David R., etc.) removed.
- Event page + EventLayout deleted; /event 301s to /protocol/. metabolicmolly.com root 301s to /protocol/, other paths to same path.
- Molly's photo: public/team/molly.jpg (home, about, protocol). Protocol header is now the Metabolic Molly banner.

## Still to do
- [ ] Name for "Community member" (last results photo). Typical-results figure for the disclosure if Unicity provides one.
- [ ] Confirm Netlify HTTPS certificate for metabolicmolly.com is issued.
- [ ] Google DKIM: click "Start authentication" in Admin → Email setup status. Connect molly@ Gmail to GHL (2-way sync).
- [ ] Molly's intro video → set `heroVideo` at top of `protocol.astro` (YouTube/Vimeo embed URL).
- [ ] Health coach certification program name.
- [ ] Consider a more personal headline (e.g., "Molly's 90-Day Metabolic Reset").
- [ ] Submit sitemap in Google Search Console (wholehearted.live/sitemap.xml) after launch.
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

## GoHighLevel — Metabolic Coach AI (updated Oct 4, 2026)
Existing setup (built with A.I.M.): FB/IG comment → public reply → DM → "Metabolic Coach" Conversation AI (auto-pilot);
"PPP No Purchase Follow Up" sends 3 DMs over ~21h after the "sent link" tag. No email follow-up exists yet.
Changes made Oct 4 (saved + tested in the agent's practice chat):
- Prompt replaced with `ghl/metabolic-coach-prompt.txt` (backup of the old one: `ghl/metabolic-coach-prompt-ORIGINAL-2026-10-04.txt`).
  Honest if sincerely asked "real person or bot?"; answers price immediately ($159/mo subscription, $169 one-time);
  SMS consent wording; stricter health rules; no income talk; only Molly's order link https://ufeelgreat.com/c/wholehearted.
- Knowledge Base Trigger added: "Metabolic Molly" KB (was not connected before; bot had invented $179).
- Contact Info actions added: Primary Metabolic Concern, How long struggling. (Name/email/phone are saved natively.)
Still to do:
- [ ] Upload `ghl/approved-answers.txt` to the Metabolic Molly KB. Confirm Balance timing (10–15 min before largest meal).
- [ ] Remove "Great Prompts to build your Unicity business.pdf" from the KB; drop one GLP-1 duplicate; review doctor-leave-behind.
- [ ] Build an email nurture series for "sent link" + not purchased (emails are collected but never used).
- [ ] A2P 10DLC registration before any marketing texts. Fill in agent "Business Name".

## GoHighLevel — Email Nurture (built Oct 4, 2026, DRAFT — not published)
Workflow "Email Nurture - Sent Link, Not Purchased" (folder 1.0 PPP Automations).
Trigger: tag added "sent link". Steps: Email 1 → 2d → Email 2 → 2d → Email 3 → 2d → Email 4 → 3d → Email 5 → 3d → Email 6 → 4d → Email 7 → 5d → Email 8 → Goal.
Goal event: tag added "purchased feel great system" — contact jumps to the goal and stops getting emails.
From: Molly Broad <molly@metabolicmolly.com>. Click tracking on. Copy: `ghl/email-nurture-series.md`; HTML per email: `ghl/emails/` (regenerate with `node ghl/build-email-html.cjs`).
- [x] Test email sent to c.broad.1@hotmail.com and approved.
- Settings: Stop on response ON; send window 8 AM–7 PM in each CONTACT's timezone (audience is worldwide; GHL falls back to account tz = Pacific if unknown), all 7 days. Bot (Conversation AI) is NOT on the Email channel — replies go to Molly (molly@ → Gmail).
- [ ] Reply test: reply to the test email and see whether it lands in Gmail, GHL Conversations, or both.
- [ ] Confirm the bot saves emails to contacts (only 1 of 487 "sent link" contacts had an email as of Oct 4).
- [x] Published Oct 4. Full test passed on c.broad.1@hotmail.com: enrolled → Email 1 sent → purchased tag → goal → removed.
- Replies to these emails land ONLY in GHL Conversations (not molly@ Gmail). Molly should use the LeadConnector app and/or a Gmail alert workflow.
- Backlog: only ~48 engaged contacts have an email (incl. some buyers); ~20k FB/IG contacts have no email and can only be reached via comments/lives or a custom-audience ad (Meta 24h messaging rule).

## Oct 4 evening — follow-up gap found and fixed
- "A.I. Sent Link" workflow has NO trigger and no runs in 60+ days → nothing has tagged "sent link" since ~early Sept, so
  "PPP No Purchase Follow Up" (3 DMs) and the email series never fired. Tell A.I.M.; DM follow-up still depends on that tag.
- Email Nurture now has a 2nd trigger: Contact changed → Email has changed (fires when the bot captures an email).
  Allow re-entry OFF (prevents double enrollment). Timezone = contact timezone. Stop on response ON.
- Chris bulk-added the 184 non-buyer contacts with email (5:41 PM PDT Oct 4). Email 1 executed for all; 0 skipped.
  A few are junk addresses (e.g., squarespace / Google no-reply) — remove from workflow/contacts.
- Note: buyer exclusion on the new trigger isn't possible in the trigger filter; buyers who get tagged later exit via the Goal.
