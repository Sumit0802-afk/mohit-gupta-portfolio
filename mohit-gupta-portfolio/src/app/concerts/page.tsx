import type { Metadata } from "next";
import GalleryPage from "@/components/gallery/GalleryPage";

export const metadata: Metadata = { title: "Concerts" };

export default function ConcertsPage() {
  return <GalleryPage slug="concerts" />;
}
