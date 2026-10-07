export type SkillGroup = { title: string; skills: string[] };

export const skillGroups: SkillGroup[] = [
  {
    title: "Photography",
    skills: [
      "Portrait Photography",
      "Wildlife Photography",
      "Concert & Event Photography",
      "Corporate Photography",
      "Studio & Outdoor Shooting",
      "Composition",
      "Lighting",
    ],
  },
  {
    title: "Videography",
    skills: [
      "Event Videography",
      "Promotional Video Production",
      "Reels & Short-Form Content",
      "Video Editing",
      "Color Grading",
      "Shoot Direction",
    ],
  },
  {
    title: "Tools & Software",
    skills: [
      "Adobe Lightroom",
      "Adobe Photoshop",
      "Adobe Premiere Pro",
      "DaVinci Resolve",
      "Canva",
      "CapCut",
    ],
  },
  {
    title: "Soft Skills",
    skills: [
      "Team Leadership",
      "Event Management",
      "Creative Direction",
      "Visual Storytelling",
      "Client Coordination",
      "Communication",
    ],
  },
];

export type Service = { title: string; detail: string };

// Skill areas documented on the resume, not a commercial price list.
export const services: Service[] = [
  { title: "Portrait", detail: "Photography" },
  { title: "Wildlife", detail: "Photography" },
  { title: "Event", detail: "Photography & Videography" },
  { title: "Visual Stories", detail: "Short-form Video & Creative Content" },
];
