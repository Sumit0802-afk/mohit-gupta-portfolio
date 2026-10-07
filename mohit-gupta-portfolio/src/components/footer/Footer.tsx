import { navigation } from "@/data/navigation";
import { personal } from "@/data/personal";
import { PLACEHOLDER_IMAGERY } from "@/data/portfolio";
import NavigationLink from "@/components/navigation/NavigationLink";
import BackToTop from "@/components/ui/BackToTop";
import RollText from "@/components/ui/RollText";

export default function Footer() {
  return (
    <footer className="shell border-t border-line bg-black pb-8 pt-14">
      <div className="grid gap-10 md:grid-cols-3">
        <p className="label leading-loose">
          <span className="font-bold tracking-[0.3em]">{personal.name}</span>
          <br />
          <span className="text-mute">Photographer</span>
          <br />
          <span className="text-mute">Videographer</span>
        </p>

        <nav aria-label="Footer" className="md:justify-self-center">
          <ul className="flex flex-col gap-2">
            {navigation.map((item) => (
              <li key={item.id}>
                <NavigationLink
                  id={item.id}
                  className="roll-host label text-mute transition-colors duration-500 hover:text-paper"
                >
                  <RollText>{item.label}</RollText>
                </NavigationLink>
              </li>
            ))}
          </ul>
        </nav>

        <p className="label leading-loose text-mute md:justify-self-end md:text-right">
          {personal.region}
          <br />
          {personal.country}
        </p>
      </div>

      <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="label text-mute">
          &copy; 2026 {personal.name}
          {PLACEHOLDER_IMAGERY && <span className="ml-3 normal-case tracking-normal">Sample imagery via Unsplash.</span>}
        </p>
        <BackToTop />
      </div>
    </footer>
  );
}
