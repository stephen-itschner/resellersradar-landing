// scripts/generate-favicons.mjs
import { promises as fs } from "fs";
import path from "path";
import favicons from "favicons";

const SRC = path.resolve("public/lightModeLogo_trans.png"); // or .png
const OUT = path.resolve("public");

// Config kept simple and compatible with favicons v7.x
const config = {
  path: "/", // href prefix in generated markup
  appName: "Resellers Radar",
  appShortName: "ResellersRadar",
  appDescription:
    "Snap the pic. Nail the price. Instant AI appraisals for anything you photograph.",
  theme_color: "#102A43",
  background: "#ffffff",
  display: "standalone",
  start_url: "/",
  // Only the supported platforms — no safariPinnedTab key here
  icons: {
    android: true,
    appleIcon: true,
    appleStartup: false,
    favicons: true,
    windows: false,
    yandex: false
  }
};

async function fileExists(p) {
  try { await fs.access(p); return true; } catch { return false; }
}

async function main() {
  const response = await favicons(SRC, config);

  await fs.mkdir(OUT, { recursive: true });

  // Keep a straight SVG favicon for modern browsers (if your source is SVG)
  if (SRC.toLowerCase().endsWith(".svg")) {
    await fs.copyFile(SRC, path.join(OUT, "favicon.svg"));
  }

  // Write images (png/ico)
  for (const img of response.images) {
    await fs.writeFile(path.join(OUT, img.name), img.contents);
  }

  // Write files (manifest etc.)
  for (const file of response.files) {
    await fs.writeFile(path.join(OUT, file.name), file.contents);
  }

  // Save the suggested <head> markup for reference
  await fs.writeFile(path.join(OUT, "_favicons-head.html"), response.html.join("\n"));

  // Optional: if you place a **monochrome** SVG at public/safari-pinned-tab.src.svg,
  // copy it to the canonical filename Safari expects.
  const pinnedSrc = path.resolve("public/safari-pinned-tab.src.svg");
  if (await fileExists(pinnedSrc)) {
    await fs.copyFile(pinnedSrc, path.join(OUT, "safari-pinned-tab.svg"));
    console.log("Copied custom Safari pinned-tab icon to /public/safari-pinned-tab.svg");
  }

  console.log("Wrote favicon assets to /public:");
  console.log(response.images.map(i => "  " + i.name).join("\n"));
  console.log(response.files.map(f => "  " + f.name).join("\n"));
  console.log('\nSnippet saved to public/_favicons-head.html');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
