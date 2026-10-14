import { chromium } from "playwright";
import fs from "fs";
import path from "path";

const pageUrl = "https://www.magnific.com/photos/malaysian-doctor";
const outPath = path.join("public", "assets", "doctor-magnific.jpg");

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
await page.goto(pageUrl, { waitUntil: "domcontentloaded", timeout: 120000 });
await page.waitForTimeout(4000);

const imageUrl = await page.evaluate(() => {
  const og = document.querySelector('meta[property="og:image"]')?.content;
  if (og) return og;
  const candidates = [...document.querySelectorAll("img")];
  const match = candidates.find((img) => {
    const src = img.currentSrc || img.src || "";
    return /freepik|magnific|doctor|photo/i.test(src) && !/favicon|logo|icon/i.test(src);
  });
  return match?.currentSrc || match?.src || "";
});

if (!imageUrl) {
  console.error("No image URL found on Magnific page.");
  await browser.close();
  process.exit(1);
}

const response = await page.request.get(imageUrl);
const body = await response.body();
if (body.length < 5000) {
  console.error("Downloaded file too small:", body.length);
  await browser.close();
  process.exit(1);
}

fs.writeFileSync(outPath, body);
console.log("Saved", outPath, body.length, "from", imageUrl);
await browser.close();
