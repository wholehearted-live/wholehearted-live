# GHL Inbound Webhook — Field Mapping Reference

**Webhook URL:** `https://services.leadconnectorhq.com/hooks/7N69JUsYpwGuiYRdR7Me/webhook-trigger/dd030c5c-556a-4a0c-839a-911f79f58b0a`

Both the **Registration form** and the **Quiz form** on `/event` POST to this webhook as JSON. Use the `lead_type` field in GHL to branch the workflow into two paths (registration vs. quiz).

---

## How to map fields in GHL

In your GHL workflow, add an action **Create/Update Contact** (matching on **Email**), then click each GHL field's dropdown and select the corresponding webhook field from the list. GHL will show the available fields after you send at least one test submission through.

For **custom** fields (the ones below marked "Custom"), first create them under **Settings → Custom Fields → Contact**, then they'll appear in the mapping dropdown.

---

## Core contact fields (both forms send these)

| Webhook field | Example | GHL destination | Notes |
|---|---|---|---|
| `lead_type` | `registration` or `quiz` | **Custom — Lead Type** (text) | Use this to branch the workflow into different follow-up sequences |
| `first_name` | `Jane` | Standard: **First Name** | |
| `last_name` | `Smith` | Standard: **Last Name** | |
| `email` | `jane@email.com` | Standard: **Email** | Use as the unique identifier for matching |
| `phone` | `(555) 000-0000` | Standard: **Phone** | Required on registration, optional on quiz |

---

## Registration-form-only fields

| Webhook field | Example | GHL destination | Notes |
|---|---|---|---|
| `how_heard` | `facebook`, `instagram`, `tiktok`, `friend`, `other`, or `""` | **Custom — How Heard About** (dropdown or text) | Self-reported source |
| `seats_requested` | `1`, `2`, `3`, `4` | **Custom — Seats Requested** (number) | |
| `event_name` | `Metabolic Reset — Dr. Kenny` | **Custom — Event Name** (text) | Useful when you run more events in the future |
| `event_date` | `2026-04-29` | **Custom — Event Date** (date) | |
| `event_location` | `Holiday Inn Express, 7701 Washington Village Dr, Dayton, OH 45459` | **Custom — Event Location** (text) | |

---

## Quiz-form-only fields

| Webhook field | Example | GHL destination | Notes |
|---|---|---|---|
| `quiz_q1` | `a`, `b`, or `c` | **Custom — Quiz Q1 Answer** (text) | See question legend below |
| `quiz_q2` | `a`, `b`, or `c` | **Custom — Quiz Q2 Answer** (text) | |
| `quiz_q3` | `a`, `b`, or `c` | **Custom — Quiz Q3 Answer** (text) | |
| `quiz_q4` | `a`, `b`, or `c` | **Custom — Quiz Q4 Answer** (text) | |
| `quiz_score` | `4` – `12` | **Custom — Quiz Score** (number) | Sum of answers: a=3, b=2, c=1 |
| `quiz_category` | `high`, `moderate`, `low` | **Custom — Quiz Category** (dropdown or text) | Auto-calculated: 9–12 = high, 6–8 = moderate, 4–5 = low |

### Quiz question legend (for your reference — for building personalized follow-ups)

**Q1 — "How's your energy throughout the day?"**
- `a` = I crash after meals or in the afternoon
- `b` = I feel tired most of the time regardless
- `c` = My energy is generally stable

**Q2 — "Has a doctor mentioned any of these?"**
- `a` = Pre-diabetes, insulin resistance, or Type 2 diabetes
- `b` = High BP, high cholesterol, or fatty liver
- `c` = None of the above

**Q3 — "What's your current weight situation?"**
- `a` = I'm gaining weight without changing my diet
- `b` = I can't lose weight no matter what I try
- `c` = My weight has been stable and healthy

**Q4 — "Do you experience brain fog, poor sleep, or sugar cravings?"**
- `a` = Yes — all the time
- `b` = Sometimes — comes and goes
- `c` = Rarely or never

---

## Attribution fields (both forms send these)

These tell you exactly where the lead came from. Create each as a **Custom text field** in GHL so they show up in contact records and can drive reporting.

| Webhook field | Example | GHL destination | Notes |
|---|---|---|---|
| `utm_source` | `facebook`, `newsletter`, `flyer-qr` | **Custom — UTM Source** | From the URL `?utm_source=...` parameter |
| `utm_medium` | `cpc`, `email`, `social` | **Custom — UTM Medium** | |
| `utm_campaign` | `april29-event`, `easter-promo` | **Custom — UTM Campaign** | |
| `utm_term` | (keyword if used) | **Custom — UTM Term** | Optional |
| `utm_content` | (ad variant if used) | **Custom — UTM Content** | Optional |
| `fbclid` | (long string) | **Custom — Facebook Click ID** | Passed automatically by Facebook when someone clicks your ad |
| `ttclid` | (long string) | **Custom — TikTok Click ID** | Passed automatically by TikTok |
| `gclid` | (long string) | **Custom — Google Click ID** | For future Google Ads |
| `referrer` | `https://www.facebook.com/` | **Custom — Referrer URL** | The page they came from |
| `landing_url` | `https://wholehearted.live/event?utm_source=facebook` | **Custom — Landing URL** | Full URL including query string |
| `landing_path` | `/event` | **Custom — Landing Path** | Just the path (useful for filtering) |
| `submitted_at` | `2026-04-21T15:32:10.123Z` | **Custom — Submitted At** (date/text) | ISO timestamp |
| `user_agent` | `Mozilla/5.0 ...` | **Custom — User Agent** | Tells you device/browser; useful for debugging |

---

## Suggested workflow branches in GHL

Once the fields are mapped, build these out using **If/Else** conditions on `lead_type` and `quiz_category`:

### Branch A — `lead_type = registration`
1. Create/Update Contact → tag `Event-April-29-Registered`
2. Send instant confirmation email (address, parking, what to bring)
3. SMS confirmation with calendar link
4. 48-hour reminder email
5. Day-of SMS at 10am
6. Post-event follow-up (day after): "How was it?" + next step CTA

### Branch B — `lead_type = quiz`
1. Create/Update Contact → tag `Quiz-Completed`
2. Send quiz-result email branching on `quiz_category`:
   - **high** → "Your results suggest significant metabolic dysfunction" + strong CTA to register for event
   - **moderate** → "You're in the early-warning zone" + event invite
   - **low** → "You're doing great" + prevention-focused nurture
3. If `quiz_category = high` AND no registration within 24h → internal notification to Chris for personal follow-up

### Optional: UTM-based routing
If `utm_source = facebook` → tag `Source-Facebook` and enroll in Facebook-attributed campaign
If `utm_source = flyer-qr` → tag `Source-Flyer` and enroll in print-attributed campaign

---

## Testing the webhook

1. Make sure your GHL workflow is **Published** (not Draft).
2. Go to your live site `/event` page.
3. Fill out either form with a test email (e.g., `test+ghl@yourdomain.com`).
4. Submit.
5. Within a few seconds the contact should appear in GHL → Contacts.
6. If mapping the custom fields, GHL will show you every field that arrived — select each one from the dropdown and save.

If nothing appears: check the browser DevTools → Network tab → find the POST to `services.leadconnectorhq.com` and verify status 200. If it's 4xx/5xx, the webhook URL or workflow status needs checking.
