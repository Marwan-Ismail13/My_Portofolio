export type CertificateItem = {
  title: string;
  issuer: string;
  date: string;
  logo: string;
  credentialURL: string;
  description: string;
  skillsLearned: string[];
  category: string;
};

export const certificates: CertificateItem[] = [];
