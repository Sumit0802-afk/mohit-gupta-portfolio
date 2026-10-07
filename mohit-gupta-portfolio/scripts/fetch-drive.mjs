// Pulls the portfolio media out of the three public Google Drive folders.
//
//   node scripts/fetch-drive.mjs            photos + video posters + videos
//   node scripts/fetch-drive.mjs --no-video photos and posters only
//
// Photos (JPG / HEIC / DNG / PNG) are saved as web-size JPEGs in
// public/images/<category>/, videos as-is in public/videos/<category>/.
// The result is indexed in src/data/driveMedia.json, which the site reads.
// Files that already exist are skipped, so the script is safe to re-run.
import { createWriteStream, existsSync } from "node:fs";
import { mkdir, readFile, rename, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { Readable } from "node:stream";
import { pipeline } from "node:stream/promises";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const manifest = JSON.parse(await readFile(path.join(root, "scripts/drive-manifest.json"), "utf8"));
const withVideo = !process.argv.includes("--no-video");
const PHOTO_WIDTH = 2000;
const VIDEO = /\.(mov|mp4|m4v)$/i;

const photoUrl = (id) => `https://drive.google.com/thumbnail?id=${id}&sz=w${PHOTO_WIDTH}`;
const fileUrl = (id) =>
  `https://drive.usercontent.google.com/download?id=${id}&export=download&confirm=t`;

async function download(url, target, expectedType) {
  if (existsSync(target)) return;
  await mkdir(path.dirname(target), { recursive: true });
  const partial = `${target}.part`;

  for (let attempt = 1; ; attempt++) {
    try {
      const response = await fetch(url, { redirect: "follow" });
      const type = response.headers.get("content-type") ?? "";
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      if (expectedType && !type.startsWith(expectedType)) throw new Error(`got ${type}`);
      if (type.startsWith("text/html")) throw new Error("got an HTML page, not the file");
      await pipeline(Readable.fromWeb(response.body), createWriteStream(partial));
      await rename(partial, target);
      return;
    } catch (error) {
      await rm(partial, { force: true });
      if (attempt === 4) throw new Error(`${path.basename(target)}: ${error.message}`);
      await new Promise((resolve) => setTimeout(resolve, attempt * 2000));
    }
  }
}

async function inBatches(items, size, work) {
  for (let index = 0; index < items.length; index += size) {
    await Promise.all(items.slice(index, index + size).map(work));
  }
}

const media = {};
const failures = [];

for (const [category, files] of Object.entries(manifest)) {
  media[category] = [];
  const entries = files.map(([id, name]) => {
    const base = path.parse(name).name.toLowerCase();
    const isVideo = VIDEO.test(name);
    return {
      id,
      name,
      image: `/images/${category}/${base}.jpg`,
      video: isVideo ? `/videos/${category}/${base}${path.extname(name).toLowerCase()}` : null,
    };
  });

  await inBatches(entries, 4, async (entry) => {
    try {
      await download(photoUrl(entry.id), path.join(root, "public", entry.image), "image/");
      if (entry.video && withVideo) {
        await download(fileUrl(entry.id), path.join(root, "public", entry.video));
      }
    } catch (error) {
      failures.push(error.message);
      entry.failed = true;
    }
  });

  for (const entry of entries) {
    if (entry.failed) continue;
    const { width, height } = await sharp(path.join(root, "public", entry.image)).metadata();
    const hasVideo = entry.video && existsSync(path.join(root, "public", entry.video));
    media[category].push({
      src: entry.image,
      width,
      height,
      source: entry.name,
      ...(hasVideo ? { video: entry.video } : {}),
    });
  }
  console.log(`${category}: ${media[category].length}/${files.length}`);
}

await writeFile(path.join(root, "src/data/driveMedia.json"), `${JSON.stringify(media, null, 2)}\n`);
if (failures.length) {
  console.error(`\n${failures.length} failed:\n  ${failures.join("\n  ")}`);
  process.exitCode = 1;
}
