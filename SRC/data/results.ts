// Real before/after results, shared by /protocol and /shop. Photos live in public/results/.
// Used with each person's permission. Keep summaries to weight, inches, energy, sleep,
// cravings — no disease, cure, or medication claims (FTC/FDA + Unicity policy).
// Mark distributors so the material connection is disclosed.
export type Result = { name: string; photo: string; summary: string; distributor?: boolean };

export const RESULTS: Result[] = [
  { name: "Michael Smith", photo: "michael-smith.jpg", summary: "80 lbs down and waist from 46\" to 32\". More energy, sleeping through the night, and no more brain fog." },
  { name: "Jimmy", photo: "jimmy.jpg", summary: "Down 88 lbs. \"I have my life back.\"" },
  { name: "Jennifer Baydo", photo: "jennifer-baydo.jpg", summary: "161 → 144 lbs in 45 days. Energy is high and the menopausal belly fat is gone." },
  { name: "Laurie", photo: "laurie.jpg", summary: "Down 25 lbs in 3 months. Energy and mood are back, and she's sleeping again." },
  { name: "Dr. Kenny Harless", photo: "dr-kenny.jpg", summary: "Down 50 lbs and rebuilding muscle.", distributor: true },
  { name: "Andrya Martin", photo: "andrya-martin.jpg", summary: "Down 30 lbs and 15 inches. Sleeping better and focusing better.", distributor: true },
  { name: "Kimberly", photo: "kimberly.jpg", summary: "Down 16 lbs and able to build muscle again after years of trying." },
  { name: "George", photo: "george.jpg", summary: "A 28-inch waist and gaining lean muscle. Cravings for sweets and soda are gone." },
  { name: "Sheradon", photo: "sheradon.jpg", summary: "More energy and feeling like herself again." },
  { name: "Community member", photo: "community-member.jpg", summary: "31 lbs down in about two months. More energy and no more \"food noise.\"" },
];

export const RESULTS_DISCLAIMER =
  "These are individual experiences shared with permission, not typical results — your results will vary with diet, activity, and health history. " +
  "Some people shown are independent Unicity distributors. These products are not intended to diagnose, treat, cure, or prevent any disease.";
