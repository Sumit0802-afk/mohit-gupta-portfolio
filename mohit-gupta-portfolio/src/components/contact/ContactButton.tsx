import type { ReactNode } from "react";
import MagneticButton from "@/components/ui/MagneticButton";
import RollText from "@/components/ui/RollText";

type Props = {
  href: string;
  icon: ReactNode;
  children: string;
  /** Text revealed on hover, e.g. the address itself. */
  hover?: string;
  /** Opens in a new tab, for links that leave the site. */
  external?: boolean;
};

/** Magnetic pill that opens the mail client, the dialler or a social profile. */
export default function ContactButton({ href, icon, children, hover, external }: Props) {
  return (
    <MagneticButton>
      <a
        href={href}
        className="btn roll-host label !px-8 !py-5"
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        <span className="btn-arrow" aria-hidden>
          {icon}
        </span>
        <RollText hover={hover}>{children}</RollText>
      </a>
    </MagneticButton>
  );
}
