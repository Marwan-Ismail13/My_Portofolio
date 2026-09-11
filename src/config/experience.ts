export type ExperienceItem = {
  company: string;
  position: string;
  duration: string;
  description: string;
  technologies: string[];
  achievements: string[];
  links?: { label: string; url: string }[];
};

export const experience: ExperienceItem[] = [];
