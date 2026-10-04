// Turns ghl/email-nurture-series.md into one HTML body per email (ghl/emails/email-N.html)
// for pasting into GoHighLevel's Send Email "Source code" box.
// Handles the small markdown subset the series uses: paragraphs, **bold**, "- " lists, and bare URLs.
const fs = require("fs");
const path = require("path");

const md = fs.readFileSync(path.join(__dirname, "email-nurture-series.md"), "utf8");
const outDir = path.join(__dirname, "emails");
fs.mkdirSync(outDir, { recursive: true });

const SMALL = 'style="font-size:12px;color:#777;"';
// GHL's quick-compose editor forces margin:0 on every <p>, so spacing comes from empty paragraphs.
const GAP = "\n<p><br></p>\n";

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const inline = (s) =>
  esc(s)
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/(https?:\/\/[^\s<]+[^\s<.,)])/g, `<a href="$1">$1</a>`);

function blocksToHtml(text) {
  return text
    .trim()
    .split(/\n\s*\n/)
    .map((block) => {
      const lines = block.split("\n");
      if (lines.every((l) => l.startsWith("- "))) {
        const items = lines.map((l) => `<li>${inline(l.slice(2))}</li>`).join("");
        return `<ul>${items}</ul>`;
      }
      return `<p>${lines.map(inline).join("<br>")}</p>`;
    })
    .join(GAP);
}

// Signature: first part normal size, disclaimer paragraph small.
const sigSection = md.split("## Signature block (bottom of every email)")[1].split("\n---")[0].trim();
const sigParts = sigSection.split(/\n\s*\n/);
const disclaimer = sigParts.pop();
const signatureHtml =
  blocksToHtml(sigParts.join("\n\n")) + `${GAP}<p ${SMALL}>${inline(disclaimer)}</p>`;

const emailRe = /## Email (\d) — ([^\n]+)\n\*\*Subject:\*\* ([^\n]+)\n\*\*Preview:\*\* ([^\n]+)\n([\s\S]*?)(?=\n---|\n## Email|\s*$)/g;
const index = [];
let m;
while ((m = emailRe.exec(md))) {
  const [, num, when, subject, preview, body] = m;
  const html = `${blocksToHtml(body)}${GAP}${signatureHtml}`;
  fs.writeFileSync(path.join(outDir, `email-${num}.html`), html);
  index.push({ num, when, subject, preview });
}
fs.writeFileSync(path.join(outDir, "index.json"), JSON.stringify(index, null, 2));
console.log(index.map((e) => `${e.num} | ${e.when} | ${e.subject}`).join("\n"));
