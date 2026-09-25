export type Skill = {
  name: string;
  category: string;
  icon: string;
  experienceLevel: 'expert' | 'proficient' | 'learning' | 'familiar';
  display: boolean;
};

export const skills: Skill[] = [
  { name: 'React', category: 'Frontend', icon: 'react', experienceLevel: 'proficient', display: true },
  { name: 'TypeScript', category: 'Frontend', icon: 'typescript', experienceLevel: 'proficient', display: true },
  { name: 'JavaScript', category: 'Frontend', icon: 'javascript', experienceLevel: 'proficient', display: true },
  { name: 'Tailwind CSS', category: 'Frontend', icon: 'tailwind', experienceLevel: 'proficient', display: true },
  { name: 'PHP 8', category: 'Backend', icon: 'php', experienceLevel: 'proficient', display: true },
  { name: 'Node.js', category: 'Backend', icon: 'node', experienceLevel: 'familiar', display: true },
  { name: 'REST APIs', category: 'Backend', icon: 'api', experienceLevel: 'proficient', display: true },
  { name: 'JWT', category: 'Backend', icon: 'security', experienceLevel: 'proficient', display: true },
  { name: 'MySQL', category: 'Data and Tools', icon: 'mysql', experienceLevel: 'proficient', display: true },
  { name: 'Git', category: 'Data and Tools', icon: 'git', experienceLevel: 'proficient', display: true },
  { name: 'Competitive Programming', category: 'Problem Solving', icon: 'code', experienceLevel: 'proficient', display: true }
];
