export type ExperienceItem = {
  company: string;
  position: string;
  duration: string;
  description: string;
  technologies: string[];
  achievements: string[];
  links?: { label: string; url: string }[];
};

export const experience: ExperienceItem[] = [
  {
    company: 'VenturePoint Egypt',
    position: 'Contract Full-Stack Engineer',
    duration: 'Current',
    description: 'Develop and maintain full-stack web features across PHP 8 and MySQL, integrating frontend interactions, REST APIs, and secure authentication workflows.',
    technologies: ['PHP 8', 'MySQL', 'JavaScript', 'REST APIs', 'JWT'],
    achievements: []
  }
];
