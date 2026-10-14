const MAGNIFIC_PAGE = "https://www.magnific.com/photos/malaysian-doctor";

function extractOgImage(html) {
  const match =
    html.match(/property="og:image"\s+content="([^"]+)"/i) ||
    html.match(/content="([^"]+)"\s+property="og:image"/i);
  return match?.[1] || "";
}

export default async function handler(req, res) {
  try {
    const pageRes = await fetch(MAGNIFIC_PAGE, {
      headers: {
        Accept: "text/html,application/xhtml+xml",
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
      },
    });
    const html = await pageRes.text();
    const imageUrl = extractOgImage(html);

    if (imageUrl) {
      const imageRes = await fetch(imageUrl);
      if (imageRes.ok) {
        const buffer = Buffer.from(await imageRes.arrayBuffer());
        res.setHeader("Content-Type", imageRes.headers.get("content-type") || "image/jpeg");
        res.setHeader("Cache-Control", "public, max-age=86400, stale-while-revalidate=604800");
        res.status(200).send(buffer);
        return;
      }
    }
  } catch {
    // fall through to bundled asset
  }

  res.redirect(302, "/assets/doctor-magnific.jpg");
}
