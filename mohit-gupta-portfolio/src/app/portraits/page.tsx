import type { Metadata } from "next";
import GalleryPage from "@/components/gallery/GalleryPage";

export const metadata: Metadata = { title: "Portraits" };

export default function PortraitsPage() {
  return <GalleryPage slug="portraits" />;
}
