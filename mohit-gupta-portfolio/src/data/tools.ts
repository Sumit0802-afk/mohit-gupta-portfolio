export type Tool = {
  name: string;
  /** Two-letter monogram shown beside the name (not an official logo). */
  mark: string;
  /** Horizontal offset on wide screens, as a CSS length. */
  offset: string;
  /** Scroll parallax strength, see data-parallax. */
  depth: number;
  /** Seconds for one ambient drift loop. */
  drift: number;
  outline?: boolean;
};

export const tools: Tool[] = [
  { name: "Lightroom", mark: "Lr", offset: "0%", depth: 14, drift: 11 },
  { name: "Photoshop", mark: "Ps", offset: "34%", depth: -10, drift: 13, outline: true },
  { name: "Premiere Pro", mark: "Pr", offset: "10%", depth: 18, drift: 12 },
  { name: "DaVinci Resolve", mark: "Dr", offset: "26%", depth: -14, drift: 15, outline: true },
  { name: "Canva", mark: "Ca", offset: "4%", depth: 10, drift: 10 },
  { name: "CapCut", mark: "Cc", offset: "48%", depth: -18, drift: 14, outline: true },
];
