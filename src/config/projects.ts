export type Project = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  overview: string;
  problem: string;
  solution: string;
  coverImage: string;
  gallery: string[];
  technologies: string[];
  features: string[];
  challenges: string[];
  lessonsLearned: string[];
  github: string;
  liveDemo: string;
  category: string;
  featured: boolean;
  status: string;
  year: number;
};

export const projects: Project[] = [];
