export interface PortfolioConfig {
  personal: {
    name: string;
    title: string;
    bio: string;
    email: string;
    location: string;
    image: string;
  };
  about: {
    summary: string;
    highlights: string[];
  };
  skills: {
    category: string;
    items: string[];
  }[];
  experience: {
    company: string;
    position: string;
    period: string;
    description: string;
    technologies: string[];
  }[];
  education: {
    school: string;
    degree: string;
    field: string;
    year: string;
    gpa: string;
    highlights: string[];
  }[];
  projects: {
    title: string;
    description: string;
    technologies: string[];
    link?: string;
    github?: string;
    image?: string;
    highlights: string[];
  }[];
  social: {
    github: string;
    linkedin: string;
    email: string;
  };
}

export const portfolioData: PortfolioConfig = {
  personal: {
    name: 'Marwan Zidan',
    title: 'Full-Stack Software Engineer',
    bio: 'Full-Stack Engineer at VenturePoint Egypt and Computer Science student at MSA University, focused on building reliable web applications and practical software solutions.',
    email: 'marwanizidan@gmail.com',
    location: 'Giza, Egypt',
    image: '/MyImage.png'
  },
  about: {
    summary: 'I am a Full-Stack Engineer at VenturePoint Egypt and a Computer Science student at MSA University. I build maintainable web applications across the frontend and backend, with hands-on experience in PHP 8, MySQL, JavaScript, REST APIs, and authentication workflows. I enjoy turning product requirements into clear, dependable experiences and strengthening my engineering judgment through competitive programming and collaborative projects.',
    highlights: [
      'Full-Stack Engineer at VenturePoint Egypt',
      'Contributor to the EDGE Discover edge-platform project',
      'Computer Science student at MSA University, graduating in 2027',
      'Experienced with PHP 8, MySQL, JavaScript, REST APIs, and JWT',
      'Active interest in competitive programming and software architecture'
    ]
  },
  skills: [
    { category: 'Frontend', items: ['React', 'TypeScript', 'JavaScript', 'Tailwind CSS'] },
    { category: 'Backend', items: ['PHP 8', 'Node.js', 'REST APIs', 'JWT'] },
    { category: 'Data and Tools', items: ['MySQL', 'Git'] },
    { category: 'Problem Solving', items: ['Competitive Programming'] }
  ],
  experience: [
    {
      company: 'VenturePoint Egypt',
      position: 'Contract Full-Stack Engineer',
      period: 'Current',
      description: 'Develop and maintain full-stack web features, working across PHP 8 and MySQL while integrating frontend interactions, REST APIs, and secure authentication workflows.',
      technologies: ['PHP 8', 'MySQL', 'JavaScript', 'REST APIs', 'JWT']
    }
  ],
  education: [
    {
      school: 'MSA University',
      degree: 'Bachelor of Computer Science',
      field: 'Computer Science',
      year: 'Expected 2027',
      gpa: '3.35 / 4.00',
      highlights: ['Software engineering', 'Data structures and algorithms', 'Competitive programming']
    }
  ],
  projects: [
    {
      title: 'EDGE Discover',
      description: 'A contribution to the edge-platform ecosystem focused on building practical discovery and platform experiences with a full-stack engineering mindset.',
      technologies: ['React', 'TypeScript', 'Node.js', 'REST APIs'],
      github: 'https://github.com/Marwan-Ismail13',
      highlights: ['Contributor to the edge-platform project', 'Combines frontend product work with backend integration', 'Built with maintainability and clear user flows in mind']
    }
  ],
  social: {
    github: 'https://github.com/Marwan-Ismail13',
    linkedin: 'https://www.linkedin.com/in/marwan-ismail-542b16288',
    email: 'mailto:marwanizidan@gmail.com'
  }
};

export default portfolioData;
