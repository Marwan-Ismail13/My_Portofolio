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

export const projects: Project[] = [
  {
    id: 'edge-discover',
    title: 'EDGE Discover',
    subtitle: 'Edge-platform contribution',
    description: 'A contribution to the edge-platform ecosystem focused on practical discovery and platform experiences.',
    overview: 'EDGE Discover combines product-focused frontend work with backend integration to create clear, maintainable discovery flows.',
    problem: 'Users need a focused way to discover and interact with platform capabilities without unnecessary friction.',
    solution: 'Contributed full-stack implementation work with clear user flows, reusable interfaces, and API-driven integration.',
    coverImage: '',
    gallery: [],
    technologies: ['React', 'TypeScript', 'Node.js', 'REST APIs'],
    features: ['Discovery-focused user flows', 'Frontend and backend integration', 'Maintainable component structure'],
    challenges: [],
    lessonsLearned: [],
    github: 'https://github.com/Marwan-Ismail13',
    liveDemo: '',
    category: 'Software',
    featured: true,
    status: 'Active',
    year: 2026
  }
];
