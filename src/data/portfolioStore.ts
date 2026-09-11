import { personal as defaultPersonal } from '../config/personal';
import { socials as defaultSocials } from '../config/socials';
import { projects as defaultProjects, type Project } from '../config/projects';
import { skills as defaultSkills, type Skill } from '../config/skills';
import { experience as defaultExperience, type ExperienceItem } from '../config/experience';
import { education as defaultEducation, type EducationItem } from '../config/education';
import { certificates as defaultCertificates, type CertificateItem } from '../config/certificates';

export type Personal = typeof defaultPersonal;
export type Socials = typeof defaultSocials;
export type { Project, Skill };
export type Achievement = {
  id: string;
  title: string;
  organization: string;
  date: string;
  description: string;
  result: string;
  url: string;
  image: string;
  featured: boolean;
};
export type SeoSettings = {
  pageTitle: string;
  metaDescription: string;
  keywords: string[];
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  twitterTitle: string;
  twitterDescription: string;
  canonicalUrl: string;
};
export type AppearanceSettings = {
  primaryGold: string;
  warmBrown: string;
  electricBlue: string;
  background: string;
  text: string;
  accentIntensity: number;
};
export type PortfolioContent = {
  personal: Personal;
  socials: Socials;
  projects: Project[];
  skills: Skill[];
  experience: ExperienceItem[];
  education: EducationItem[];
  certificates: CertificateItem[];
  achievements: Achievement[];
  seo: SeoSettings;
  appearance: AppearanceSettings;
  lastSaved: string | null;
};

export const defaultPortfolio: PortfolioContent = {
  personal: structuredClone(defaultPersonal),
  socials: structuredClone(defaultSocials),
  projects: structuredClone(defaultProjects),
  skills: structuredClone(defaultSkills),
  experience: structuredClone(defaultExperience),
  education: structuredClone(defaultEducation),
  certificates: structuredClone(defaultCertificates),
  achievements: [],
  seo: {
    pageTitle: 'Marwan Zidan | Software Engineer',
    metaDescription: 'Portfolio of Marwan Zidan, software engineer based in Giza, Egypt.',
    keywords: ['Marwan Zidan', 'software engineer', 'portfolio'],
    ogTitle: 'Marwan Zidan | Software Engineer',
    ogDescription: 'Portfolio of Marwan Zidan, software engineer based in Giza, Egypt.',
    ogImage: '/MyImage.png',
    twitterTitle: 'Marwan Zidan | Software Engineer',
    twitterDescription: 'Portfolio of Marwan Zidan, software engineer based in Giza, Egypt.',
    canonicalUrl: 'https://your-domain.com'
  },
  appearance: {
    primaryGold: '#D6A73A',
    warmBrown: '#5A4028',
    electricBlue: '#2563FF',
    background: '#080808',
    text: '#F5F5F5',
    accentIntensity: 50
  },
  lastSaved: null
};

const STORAGE_KEY = 'marwan-portfolio-content-v1';

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function mergeContent(value: unknown): PortfolioContent {
  if (!isRecord(value)) return structuredClone(defaultPortfolio);
  return {
    ...structuredClone(defaultPortfolio),
    ...value,
    personal: { ...defaultPortfolio.personal, ...(isRecord(value.personal) ? value.personal : {}) },
    socials: { ...defaultPortfolio.socials, ...(isRecord(value.socials) ? value.socials : {}) },
    seo: { ...defaultPortfolio.seo, ...(isRecord(value.seo) ? value.seo : {}) },
    appearance: { ...defaultPortfolio.appearance, ...(isRecord(value.appearance) ? value.appearance : {}) },
    projects: Array.isArray(value.projects) ? value.projects as Project[] : [],
    skills: Array.isArray(value.skills) ? value.skills as Skill[] : [],
    experience: Array.isArray(value.experience) ? value.experience as ExperienceItem[] : [],
    education: Array.isArray(value.education) ? value.education as EducationItem[] : [],
    certificates: Array.isArray(value.certificates) ? value.certificates as CertificateItem[] : [],
    achievements: Array.isArray(value.achievements) ? value.achievements as Achievement[] : []
  };
}

export function getPortfolio(): PortfolioContent {
  if (typeof window === 'undefined') return structuredClone(defaultPortfolio);
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return stored ? mergeContent(JSON.parse(stored)) : structuredClone(defaultPortfolio);
}

export function savePortfolio(content: PortfolioContent): PortfolioContent {
  const saved = { ...content, lastSaved: new Date().toISOString() };
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
  return saved;
}

export function resetPortfolio(): PortfolioContent {
  window.localStorage.removeItem(STORAGE_KEY);
  return structuredClone(defaultPortfolio);
}

export function exportPortfolio(content: PortfolioContent): void {
  const blob = new Blob([JSON.stringify(content, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `portfolio-backup-${new Date().toISOString().slice(0, 10)}.json`;
  link.click();
  URL.revokeObjectURL(url);
}

export function importPortfolio(file: File): Promise<PortfolioContent> {
  return file.text().then((text) => mergeContent(JSON.parse(text)));
}

export const updatePersonal = (content: PortfolioContent, personal: Personal) => ({ ...content, personal });
export const updateProjects = (content: PortfolioContent, projects: Project[]) => ({ ...content, projects });
export const updateSkills = (content: PortfolioContent, skills: Skill[]) => ({ ...content, skills });
export const updateExperience = (content: PortfolioContent, experience: ExperienceItem[]) => ({ ...content, experience });
export const updateEducation = (content: PortfolioContent, education: EducationItem[]) => ({ ...content, education });
export const updateCertificates = (content: PortfolioContent, certificates: CertificateItem[]) => ({ ...content, certificates });
export const updateAchievements = (content: PortfolioContent, achievements: Achievement[]) => ({ ...content, achievements });

export { STORAGE_KEY };
