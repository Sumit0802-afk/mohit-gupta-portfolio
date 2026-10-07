import type { ReactNode } from "react";
import MagneticButton from "@/components/ui/MagneticButton";
import RollText from "@/components/ui/RollText";

type Props = {
  href: string;
  icon: ReactNode;
  children: string;
  /** Text revealed on hover, e.g. the address itself. */
  hover?: string;
};

/** Magnetic pill that opens the mail client or dialler. */
export default function ContactButton({ href, icon, children, hover }: Props) {
  return (
    <MagneticButton>
      <a href={href} className="btn roll-host label !px-8 !py-5">
        <span className="btn-arrow" aria-hidden>
          {icon}
        </span>
        <RollText hover={hover}>{children}</RollText>
      </a>
    </MagneticButton>
  );
}
