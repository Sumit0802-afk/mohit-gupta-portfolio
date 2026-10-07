import About from "@/components/about/About";
import Contact from "@/components/contact/Contact";
import Education from "@/components/education/Education";
import Experience from "@/components/experience/Experience";
import MasonryGallery from "@/components/gallery/MasonryGallery";
import Hero from "@/components/hero/Hero";
import Leadership from "@/components/leadership/Leadership";
import HorizontalShowcase from "@/components/portfolio/HorizontalShowcase";
import Portfolio from "@/components/portfolio/Portfolio";
import CinematicQuote from "@/components/quote/CinematicQuote";
import Services from "@/components/services/Services";
import Skills from "@/components/skills/Skills";
import Tools from "@/components/tools/Tools";
import ScrollEffects from "@/components/ui/ScrollEffects";
import SectionTitle from "@/components/ui/SectionTitle";
import { frames } from "@/data/portfolio";

export default function Home() {
  return (
    <ScrollEffects>
      <main id="main">
        <Hero />
        <About />
        <Portfolio />

        <section aria-label="Frames" className="shell section">
          <SectionTitle
            index="—"
            label="Frames"
            title="In frames"
            subtitle="People, places, moments."
            className="mb-14 md:mb-20"
          />
          <MasonryGallery photos={frames} />
        </section>

        <HorizontalShowcase />
        <Experience />
        <Leadership />
        <Skills />
        <Tools />
        <Education />
        <Services />
        <CinematicQuote />
        <Contact />
      </main>
    </ScrollEffects>
  );
}
