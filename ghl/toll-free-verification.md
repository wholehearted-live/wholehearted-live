# Toll-Free Verification: what to enter (Step 3/3, Messaging use case)

Pages go live after the site is deployed (push to GitHub, then Netlify builds).
Open each URL in a private window first. They must load with no login and no redirect.

| Field | Enter |
|---|---|
| Estimated Monthly Volume | 1,000 (fine) |
| Use Case Categories | **Customer Care, Marketing, Events**. Remove Delivery Notifications and Account Notifications: we don't send those, and categories that don't match the messages are a common rejection reason. |
| Opt-In Type | **Web Form**, if offered. Opt-in happens in a chat the person starts on our website or social pages. "Via Text" means texting a keyword to the number, which isn't how we collect consent. |
| Opt-In Workflow Image URLs | `https://metabolicmolly.com/sms-opt-in` |
| Privacy Policy URL | `https://metabolicmolly.com/privacy` |
| Terms & Conditions URL | `https://metabolicmolly.com/sms-terms` |

## Use Case Description (under 500 characters)

```
Metabolic Molly (WholeHearted) is a wellness educator. We text people who opt in during a chat they start on our website or Facebook, Instagram, or TikTok pages. Texts include replies to their questions, reminders, metabolic health tips, invitations to our weekly live Zoom call, product info and offers, and help getting started after an order. Consent is collected one-to-one with a full disclosure; we never use purchased lists. STOP and HELP are honored.
```

## Message Content (sample messages, under 1000 characters)

```
Metabolic Molly: Thanks for joining! You'll get up to 8 msgs/month with tips, reminders, and event invites. Msg & data rates may apply. Reply HELP for help, STOP to opt out.

Metabolic Molly: Hi Jane, here's the short video I promised: https://www.youtube.com/watch?v=uVgkgXNbbuo Reply with any questions! Reply STOP to opt out.

Metabolic Molly: Join me live tonight at 9 PM ET for our Science & Stories Zoom call. Reply YES and I'll send the link. Reply STOP to opt out.

Metabolic Molly: Congrats on your order, Jane! I'll help you get started. When does your box arrive? Reply STOP to opt out.
```

## Before submitting, make these match

- **Business name:** the pages say "WholeHearted, doing business as Metabolic Molly (Molly Broad), 1671 Big Bear Dr., Centerville, OH 45458". This must match the Business Profile in GoHighLevel. If the legal name is different, change it in `SRC/pages/privacy.astro` and `SRC/pages/sms-terms.astro`.
- **Bot consent wording:** the Metabolic Coach prompt (SMS COLLECTION section) still uses the old wording, which has no brand name, frequency, HELP or terms link. It needs to say exactly what `/sms-opt-in` shows:
  > Want me to text you quick reminders and tips too? If so, reply with your mobile number. By sharing it, you agree to receive recurring texts from Metabolic Molly (up to 8/month). Msg & data rates may apply. Reply STOP to opt out, HELP for help. Terms & privacy: metabolicmolly.com/sms-terms
- **Confirmation text:** `/sms-opt-in` says the first text confirms the sign-up. Once a number is active, add a workflow that sends that confirmation when a phone number is added to a contact.
