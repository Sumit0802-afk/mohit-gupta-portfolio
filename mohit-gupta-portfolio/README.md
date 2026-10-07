# Mohit Gupta — Photographer & Videographer Portfolio

Cinematic, animation-led portfolio built with Next.js (App Router), TypeScript,
Tailwind CSS v4, GSAP + ScrollTrigger, Framer Motion, Lenis and Lucide icons.

## Run

```bash
npm install
npm run dev
```

Then open the local URL shown by Next.js.

## Photos and videos

All media is Mohit's own work, pulled from the three Google Drive folders:

```bash
node scripts/fetch-drive.mjs
```

The script reads `scripts/drive-manifest.json` (Drive file id + name per
gallery), saves photos as web-size JPEGs in `public/images/<gallery>/`, saves
videos in `public/videos/<gallery>/` and writes the index the site reads,
`src/data/driveMedia.json`. Existing files are skipped, so it is safe to re-run.
Pass `--no-video` to skip the large video files.

To add new work: upload it to the Drive folder, add its id and file name to the
manifest, and run the script again.

Which frame is used for the hero, the about picture, the gallery covers and the
home-page gallery is set by file name in `src/data/portfolio.ts`.

## Where things live

| Folder | Contents |
| --- | --- |
| `src/data` | All copy and image config (resume is the source of truth) |
| `src/lib/portfolioLinks.ts` | The three Google Drive folders |
| `src/animations` | GSAP timelines and Framer Motion variants |
| `scripts` | Drive download script and file manifest |
| `src/components` | One folder per section |
| `src/styles` | Design tokens, type, animation and layout CSS |
