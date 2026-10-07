type Props = { children: string; hover?: string; className?: string };

/**
 * Text that rolls upward to reveal `hover` (or itself again) when the nearest
 * `.roll-host` ancestor is hovered or focused.
 */
export default function RollText({ children, hover, className }: Props) {
  return (
    <span className={`roll ${className ?? ""}`}>
      <span>{children}</span>
      <span aria-hidden>{hover ?? children}</span>
    </span>
  );
}
