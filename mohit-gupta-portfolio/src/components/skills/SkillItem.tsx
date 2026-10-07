/** A single skill. Hovering one lifts it and dims its neighbours. */
export default function SkillItem({ name }: { name: string }) {
  return (
    <li className="group/skill flex items-center justify-between gap-4 border-b border-white/10 py-3.5 text-lg text-paper/85 transition-[opacity,padding,color] duration-500 ease-cine hover:!opacity-100 hover:pl-3 hover:text-paper group-hover/list:opacity-35">
      <span>{name}</span>
      <span
        aria-hidden
        className="h-1.5 w-1.5 shrink-0 scale-0 rounded-full bg-warm transition-transform duration-500 ease-cine group-hover/skill:scale-100"
      />
    </li>
  );
}
