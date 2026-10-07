import type { Metadata } from "next";
import GalleryPage from "@/components/gallery/GalleryPage";

export const metadata: Metadata = { title: "Wildlife" };

export default function WildlifePage() {
  return <GalleryPage slug="wildlife" />;
}
