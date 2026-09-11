export type Skill = {
  name: string;
  category: string;
  icon: string;
  experienceLevel: 'expert' | 'proficient' | 'learning' | 'familiar';
  display: boolean;
};

export const skills: Skill[] = [];
