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
- Fix for "sent link": Metabolic Coach now has a bot action "Trigger a Workflow: Tag sent link" → runs "A.I. Sent Link"
  (adds tag "sent link") every time the bot sends https://ufeelgreat.com/c/wholehearted. That re-enables PPP No Purchase
  Follow Up (DMs) and the email series' original trigger.
- Stage tags in Email Nurture: after each email an Add Tag step adds "nurture - email 1" … "nurture - email 8".
  Filter contacts by these tags to see where everyone is. The 184 bulk-added on Oct 4 already passed Email 1, so they
  start collecting tags at "nurture - email 2".
- Verified 6:10 PM PDT Oct 4: test contact "Test Nurture" (c.broad.1+test@hotmail.com) was created with no email, then had an
  email added. It entered Email Nurture through the "email added" trigger, got Email 1 and the stage tag, and is now on the 2-day wait.
  So anyone who gives the bot an email gets the info by email, even if the chat ends there.
  [ ] Remove the test contact from the workflow (or tag it "purchased feel great system").

## Oct 8–10, 2026 — GHL bot gating, prompt fixes, follow-ups (updated Oct 10)
Repo moved: now github.com/wholehearted-live/wholehearted-live (old cbroadlnc URL redirects). This PC's `git push` has no GitHub auth; edits were made through the GitHub web editor.
- **Chat widget:** GHL widget id swapped to `6ac80de00e60a54e32d925a1` in `SRC/layouts/BaseLayout.astro` and `ProtocolLayout.astro` (live on / and /protocol). Old id was `69dc1df59f3b6f8188df315e`.
- **Metabolic Coach prompt (edited in GHL, not in repo):** ask for email ONCE (optional); if given, say info is on its way to that email; if declined/skipped, send the VIDEO link https://www.youtube.com/watch?v=uVgkgXNbbuo in the next reply; order link https://ufeelgreat.com/c/wholehearted at buying signals / after video interest. Never re-ask email after a "yes". Inbound-link "do not respond" rule kept. Original sections saved only in a session scratchpad (lost) — the earlier prompt backup is `ghl/metabolic-coach-prompt-ORIGINAL-2026-10-04.txt`.
- **Agent settings:** "Reactivate bot after" 720 -> 60 minutes. Max messages per conversation still 20 (consider ~40). Actions: Tag sent link (order link -> A.I. Sent Link), Video follow-up (video link -> PPP Video Follow Up), plus Contact Info actions.
- **Channel gates (Deploy tab, Include tags):** Instagram = `ig comment lead`; Facebook = `fb comment lead`; TikTok = `tiktok dm lead` only. SMS, WhatsApp, Live chat, Chat widget are open (no tag filter). SMS is approved/authorized but not yet gated or used; WhatsApp: no action.
- **Gotcha:** a gate silences anyone without the tag. An incident Oct 8 11:29 PM–Oct 9 11:36 AM left typed-reply leads unanswered because the tag was added after the first DM. Fix: tag + activate bot BEFORE the first DM in the workflows. Contacts created before the tagging system are untagged and ignored if they message without commenting again.
- **Workflows (folder "1.0 PPP Automations"):**
  - `IG - PPP Comment -> DM -> AI`: trigger keyword filter (Contains phrase): PROTOCOL, INFO, START, LINK, CODE, RESET, ENERGY, WEIGHT, CRAVINGS, SUGAR, TEA, METABOLIC. Adds tag `ig comment lead` + Update Conversation AI bot (Metabolic Coach, Active) before the Instagram DM.
  - `FB - PPP Comment -> DM -> AI`: adds tag `fb comment lead` + activates bot after Create Opportunity, before the Messenger DM. Keyword filter NOT applied yet (editor showed blank filters; avoided overwriting). [ ] Add it.
  - `TikTok DM - Tag Lead` (new, published): trigger Customer replied, Reply channel = TikTok -> Add Tag `tiktok dm lead` -> activate Metabolic Coach. Re-entry OFF. Not yet tested with a live TikTok DM. Existing contact Metabolicreboot is untagged (first message read "undefined").
  - `PPP Video Follow Up` (new, published, no trigger; started by the bot's "Video follow-up" action): tag `sent video` -> wait 3h -> if purchased (`purchased feel great system`) stop; else IG or FB DM "what did you think of the video?" -> wait 17h -> DM with order link. Re-entry OFF, stop on response ON.
  - `PPP No Purchase Follow Up`: still published, but its NOT PURCHASED branch ends with no DMs; superseded by the video follow-up. Left as is.
- **Cleanup candidates:** empty draft "New Workflow 1785788185018"; test contact "Test Nurture" still in Email Nurture; junk addresses in the nurture list; PPP Loom Follow Up (draft, 269 enrolled); TikTok Comment Reminder (draft).
- **Open:** FB keyword filter; live TikTok test; SMS opt-in tag + gate + approved follow-up copy; bot on/off for leads Molly is answering by hand (Susan, Kent, Deborah); Alice Servina reply draft.

### Oct 10 (later) — bot prompt v2, do-not-contact, Zoom call
- **Prompt (live in GHL, 1774/2000 words):** standard ask once interest shows: "Would you like me to send you more info on what my family and I use? If so, what's the best email for me to send it to? (Totally optional!)" — never offer "here or email"; after an email: "on its way" + video, no choices. Then one optional SMS/phone ask with consent wording. Order: VIDEO first (explains the science), ORDER LINK last (after they react to the video or ask how to buy). Keywords CODE/PROTOCOL/LINK/RESET/INFO/START start email-then-video, not the order link. Added objection replies (doctor, already know, "just making money", fine), "many people use it as part of their routine" + "everyone's experience is different", and a STOP REQUESTS rule. Pre-trim backup: `ghl/metabolic-coach-prompt-2026-10-10-before-trim.txt`.
- **Do not contact:** workflow "Do Not Contact - Stop Request" (no trigger; adds tag `do not contact`, bot Inactive) runs from the agent action "Do not contact". Eugene S Roth set manually (tag + bot Inactive, auto-reactivate off). Caveat: IG/FB comment workflows set the bot Active again if he comments; fix = exclude `do not contact` in each Deploy-tab channel filter. [ ] Not done.
- **Science & Stories Zoom call:** live every **Tuesday 9 PM ET**. The Zoom link was removed from the bot prompt on purpose — it is for EMAIL only. [ ] Add a weekly "Join me live Tuesday 9 pm ET" line + link to the Email Nurture series (not checked whether current emails mention it).
- **Results/testimonials:** Chris has video testimonials (links to come). Plan: add approved testimonial links to the prompt with a matching rule (concern -> one testimonial, with the results-vary line, distributor flagged). Photos alternative: KB text file + picture-sending workflows (not built).
- **Still open:** third follow-up after the order link (ask email/phone if missing); FB comment keyword filter; live TikTok DM test; SMS gating.
