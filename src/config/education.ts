export type EducationItem = {
  university: string;
  degree: string;
  expectedGraduation: string;
  gpa: string;
  coursework: string[];
  awards: string[];
  activities: string[];
};

export const education: EducationItem[] = [
  {
    university: 'MSA University',
    degree: 'Bachelor of Computer Science',
    expectedGraduation: 'Expected 2027',
    gpa: '3.35 / 4.00',
    coursework: ['Software Engineering', 'Data Structures and Algorithms', 'Competitive Programming'],
    awards: [],
    activities: []
  }
];
