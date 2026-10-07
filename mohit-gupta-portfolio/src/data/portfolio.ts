import { portfolioLinks, type PortfolioSlug } from "@/lib/portfolioLinks";
import driveMedia from "./driveMedia.json";

/* ---------------------------------------------------------------------------
   ALL IMAGERY FOR THE SITE IS CONFIGURED IN THIS FILE.

   The photographs and videos are Mohit's own, pulled from the three Google
   Drive folders by `node scripts/fetch-drive.mjs` into /public/images and
   /public/videos and indexed in ./driveMedia.json. Re-run that script after
   adding files to scripts/drive-manifest.json.

   Which frame is used where (hero, covers, home gallery) is chosen below by
   file name, so it is easy to swap.
--------------------------------------------------------------------------- */
export const PLACEHOLDER_IMAGERY = false;

export type Photo = {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Set when the frame is the poster of a video clip. */
  video?: string;
};

const SUBJECT: Record<PortfolioSlug, string> = {
  portraits: "Portrait",
  wildlife: "Nature and wildlife photograph",
  concerts: "Concert photograph",
};

type DriveItem = { src: string; width: number; height: number; source: string; video?: string };

function library(slug: PortfolioSlug): Photo[] {
  const items: DriveItem[] = driveMedia[slug];
  return items.map((item, index) => ({
    src: item.src,
    width: item.width,
    height: item.height,
    alt: `${SUBJECT[slug]} by Mohit Gupta, frame ${index + 1}${item.video ? " (video)" : ""}`,
    ...(item.video ? { video: item.video } : {}),
  }));
}

const media: Record<PortfolioSlug, Photo[]> = {
  portraits: library("portraits"),
  wildlife: library("wildlife"),
  concerts: library("concerts"),
};

/** Looks a frame up by its file name without extension, e.g. "img_0943". */
function frame(slug: PortfolioSlug, name: string): Photo {
  const found = media[slug].find((photo) => photo.src.endsWith(`/${name}.jpg`));
  if (!found) throw new Error(`No "${name}" in ${slug}. Check src/data/driveMedia.json.`);
  // Used as a still: covers and the hero never play video.
  return { src: found.src, alt: found.alt, width: found.width, height: found.height };
}

export const heroImage = frame("concerts", "img_7532");
export const aboutImage = frame("wildlife", "img_4738");
export const corporateImage = frame("wildlife", "img_0541");

export type Category = {
  slug: PortfolioSlug;
  name: string;
  description: string;
  driveUrl: string;
  /** Large card in "Selected work" and the gallery page header. */
  cover: Photo;
  /** Second landscape frame, used by the horizontal chapter reel. */
  feature: Photo;
  images: Photo[];
};

export const categories: Category[] = [
  {
    slug: "portraits",
    name: "Portraits",
    description: "People, expression and character, in the studio and outdoors.",
    driveUrl: portfolioLinks.portraits,
    cover: frame("portraits", "img_5030"),
    feature: frame("portraits", "img_0943"),
    images: media.portraits,
  },
  {
    slug: "wildlife",
    name: "Wildlife",
    description: "Patience, distance and light in the natural world.",
    driveUrl: portfolioLinks.wildlife,
    cover: frame("wildlife", "img_0918"),
    feature: frame("wildlife", "img_0921"),
    images: media.wildlife,
  },
  {
    slug: "concerts",
    name: "Concerts",
    description: "Stage, crowd and energy from live and event coverage.",
    driveUrl: portfolioLinks.concerts,
    cover: frame("concerts", "img_7603"),
    feature: frame("concerts", "file_005"),
    images: media.concerts,
  },
];

export function getCategory(slug: PortfolioSlug): Category {
  return categories.find((category) => category.slug === slug)!;
}

/** A mixed selection for the editorial gallery on the home page. */
export const frames: Photo[] = [
  frame("portraits", "img_0879"),
  frame("concerts", "img_7438"),
  frame("wildlife", "img_1176"),
  frame("wildlife", "img_0920"),
  frame("concerts", "img_7689"),
  frame("portraits", "img_0954"),
  frame("portraits", "img_5077"),
  frame("wildlife", "img_8751"),
  frame("concerts", "img_7740"),
];

/** Backdrops for the four "Beyond the camera" cards, in card order. */
export const leadershipImages: Photo[] = [
  frame("portraits", "img_0913"),
  frame("portraits", "img_0948"),
  frame("portraits", "img_5013"),
  frame("portraits", "img_5056"),
];

/** Chapters of the sticky horizontal section. Corporate has no gallery link. */
export const chapters = [
  ...categories.map((category) => ({
    name: category.name,
    image: category.feature,
    note: category.description,
    href: `/${category.slug}` as string | null,
  })),
  {
    name: "Corporate",
    image: corporateImage,
    note: "Product showcases, marketing campaigns and corporate events from the Netts Mobility internship.",
    href: null,
  },
];
