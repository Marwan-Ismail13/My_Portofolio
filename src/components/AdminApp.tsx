import { useEffect, useMemo, useRef, useState, type FormEvent } from 'react';
import { FiCheck, FiDownload, FiExternalLink, FiLogOut, FiMenu, FiPlus, FiSave, FiSettings, FiTrash2, FiUpload, FiX } from 'react-icons/fi';
import { usePortfolio } from '../data/PortfolioProvider';
import {
  exportPortfolio,
  importPortfolio,
  defaultPortfolio,
  type Achievement,
  type PortfolioContent,
  type Project,
  type Skill
} from '../data/portfolioStore';
import { getRecentTraffic, getTrafficAnalytics, getTrafficAnalyticsOnline, resetTrafficAnalytics } from '../data/trafficAnalytics';

type Section = 'overview' | 'personal' | 'socials' | 'skills' | 'experience' | 'projects' | 'education' | 'certificates' | 'achievements' | 'seo' | 'appearance' | 'settings';

const sections: { id: Section; label: string }[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'personal', label: 'Personal' },
  { id: 'socials', label: 'Social Links' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'education', label: 'Education' },
  { id: 'certificates', label: 'Certificates' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'seo', label: 'SEO' },
  { id: 'appearance', label: 'Appearance' },
  { id: 'settings', label: 'Settings' }
];

const adminPath = import.meta.env.VITE_ADMIN_PATH || '/mz-control';
const sessionKey = 'marwan-portfolio-admin-session';

function Field({ label, value, onChange, multiline = false, hint, type = 'text' }: { label: string; value: string; onChange: (value: string) => void; multiline?: boolean; hint?: string; type?: string }) {
  return (
    <label className="block space-y-2">
      <span className="text-sm font-medium text-slate-700">{label}</span>
      {multiline ? (
        <textarea value={value} onChange={(event) => onChange(event.target.value)} rows={4} className="admin-input resize-y" />
      ) : (
        <input type={type} value={value} onChange={(event) => onChange(event.target.value)} className="admin-input" />
      )}
      {hint && <span className="block text-xs text-slate-500">{hint}</span>}
    </label>
  );
}

function TagsField({ label, values, onChange }: { label: string; values: string[]; onChange: (values: string[]) => void }) {
  return (
    <Field
      label={label}
      value={values.join(', ')}
      onChange={(value) => onChange(value.split(',').map((item) => item.trim()).filter(Boolean))}
      hint="Separate items with commas."
    />
  );
}

function Login({ onAuthenticated }: { onAuthenticated: () => void }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const configuredPassword = import.meta.env.VITE_ADMIN_PASSWORD;

  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (!configuredPassword) {
      setError('Admin password is not configured. Add VITE_ADMIN_PASSWORD to your local .env file.');
      return;
    }
    if (password !== configuredPassword) {
      setError('Incorrect password.');
      return;
    }
    sessionStorage.setItem(sessionKey, 'authenticated');
    onAuthenticated();
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-5 py-10">
      <form onSubmit={submit} className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-xl">
        <div className="mb-8">
          <img src={`${import.meta.env.BASE_URL}admin-mark.svg`} alt="MZ Control" className="mb-5 h-14 w-14 rounded-2xl" />
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-700">Private workspace</p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-950">Portfolio control</h1>
          <p className="mt-2 text-sm leading-6 text-slate-500">Sign in to manage your portfolio content locally in this browser.</p>
        </div>
        <Field label="Password" type="password" value={password} onChange={setPassword} />
        {error && <p className="mt-3 rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}
        <button type="submit" className="admin-primary mt-6 w-full">ENTER DASHBOARD</button>
        <p className="mt-5 text-xs leading-5 text-slate-400">This static dashboard is a convenience layer, not server-grade authentication. Never publish sensitive credentials in a client build.</p>
      </form>
    </main>
  );
}

function Overview({ content, setSection }: { content: PortfolioContent; setSection: (section: Section) => void }) {
  const [traffic, setTraffic] = useState(getTrafficAnalytics);
  useEffect(() => {
    let active = true;
    getTrafficAnalyticsOnline().then((onlineTraffic) => { if (active) setTraffic(onlineTraffic); });
    return () => { active = false; };
  }, []);
  const recentTraffic = getRecentTraffic(traffic);
  const today = recentTraffic[recentTraffic.length - 1]?.visits ?? 0;
  const week = recentTraffic.reduce((total, day) => total + day.visits, 0);
  const allTime = traffic.days.reduce((total, day) => total + day.visits, 0);
  const maxVisits = Math.max(...recentTraffic.map((day) => day.visits), 1);
  const stats = [
    ['Projects', content.projects.length, 'projects'],
    ['Skills', content.skills.length, 'skills'],
    ['Experience', content.experience.length, 'experience'],
    ['Certificates', content.certificates.length, 'certificates'],
    ['Achievements', content.achievements.length, 'achievements']
  ] as const;
  return (
    <div className="space-y-6">
      <div className="admin-hero"><p className="text-sm font-semibold text-amber-800">Portfolio status</p><h2 className="mt-2 text-3xl font-bold text-slate-950">Your workspace is ready.</h2><p className="mt-2 max-w-2xl text-slate-600">Update content here, save locally, then open the public site to see the result.</p></div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">{stats.map(([label, count, section]) => <button key={label} onClick={() => setSection(section)} className="admin-stat text-left"><span>{label}</span><strong>{count}</strong></button>)}</div>
      <div className="admin-card">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div><h3 className="admin-card-title">Portfolio activity</h3><p className="admin-muted">Local visits recorded on this browser, once per session.</p></div>
          <button onClick={() => { resetTrafficAnalytics(); setTraffic({ days: [] }); }} className="admin-secondary text-xs">Reset analytics</button>
        </div>
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          {([['Today', today], ['Last 7 days', week], ['All time', allTime]] as const).map(([label, value]) => <div key={label} className="admin-analytics-stat"><span>{label}</span><strong>{value}</strong></div>)}
        </div>
        <div className="mt-6 flex h-32 items-end gap-2 border-b border-brand-warm/30 pb-1">
          {recentTraffic.map((day) => <div key={day.date} className="flex h-full flex-1 flex-col items-center justify-end gap-2"><div className="admin-analytics-bar" style={{ height: `${Math.max((day.visits / maxVisits) * 100, day.visits ? 8 : 2)}%` }} title={`${day.visits} visit${day.visits === 1 ? '' : 's'}`} /><span className="text-[10px] text-slate-500">{day.date.slice(5)}</span></div>)}
        </div>
      </div>
      <div className="admin-card"><div className="flex items-center justify-between gap-4"><div><h3 className="admin-card-title">Quick actions</h3><p className="admin-muted">Jump into the parts you update most often.</p></div><FiCheck className="text-emerald-600" /></div><div className="mt-5 flex flex-wrap gap-3">{[['Edit Personal Info', 'personal'], ['Add Project', 'projects'], ['Add Experience', 'experience'], ['Add Certificate', 'certificates']].map(([label, section]) => <button key={label} onClick={() => setSection(section as Section)} className="admin-secondary"><FiPlus />{label}</button>)}<a className="admin-secondary" href="/" target="_blank" rel="noreferrer"><FiExternalLink />Preview Website</a></div></div>
    </div>
  );
}

function PersonalEditor({ content, update }: { content: PortfolioContent; update: (next: PortfolioContent) => void }) {
  const personal = content.personal;
  const set = (key: keyof typeof personal, value: string | string[] | typeof personal.quickFacts) => update({ ...content, personal: { ...personal, [key]: value } });
  return <div className="admin-card space-y-6"><div><h2 className="admin-card-title">Personal information</h2><p className="admin-muted">These details power the public hero, identity, contact, and quick facts.</p></div><div className="grid gap-5 md:grid-cols-2"><Field label="Name" value={personal.name} onChange={(value) => set('name', value)} /><Field label="Title" value={personal.title} onChange={(value) => set('title', value)} /><Field label="Email" value={personal.email} onChange={(value) => set('email', value)} /><Field label="Phone" value={personal.phone} onChange={(value) => set('phone', value)} /><Field label="Location" value={personal.location} onChange={(value) => set('location', value)} /><Field label="Availability" value={personal.availability} onChange={(value) => set('availability', value)} /><Field label="University" value={personal.university} onChange={(value) => set('university', value)} /><Field label="Degree" value={personal.degree} onChange={(value) => set('degree', value)} /><Field label="Expected Graduation" value={personal.expectedGraduation} onChange={(value) => set('expectedGraduation', value)} /><Field label="GPA" value={personal.gpa} onChange={(value) => set('gpa', value)} /></div><TagsField label="Role Tags" values={personal.roleTags} onChange={(value) => set('roleTags', value)} /><TagsField label="Languages" values={personal.languages} onChange={(value) => set('languages', value)} /><Field label="Introduction" value={personal.introduction} onChange={(value) => set('introduction', value)} multiline /><Field label="Summary" value={personal.summary} onChange={(value) => set('summary', value)} multiline /><TagsField label="Career Highlights" values={personal.careerHighlights} onChange={(value) => set('careerHighlights', value)} /><TagsField label="Professional Interests" values={personal.professionalInterests} onChange={(value) => set('professionalInterests', value)} /><TagsField label="Personal Interests" values={personal.personalInterests} onChange={(value) => set('personalInterests', value)} /></div>;
}

function SocialEditor({ content, update }: { content: PortfolioContent; update: (next: PortfolioContent) => void }) {
  const socials = content.socials;
  return <div className="admin-card space-y-5"><div><h2 className="admin-card-title">Social links</h2><p className="admin-muted">Use complete URLs for web links. Email should remain a mailto link.</p></div>{(Object.keys(socials) as Array<keyof typeof socials>).map((key) => <Field key={key} label={key} value={socials[key]} onChange={(value) => update({ ...content, socials: { ...socials, [key]: value } })} />)}</div>;
}

function SkillsEditor({ content, update }: { content: PortfolioContent; update: (next: PortfolioContent) => void }) {
  const [draft, setDraft] = useState<Skill>({ name: '', category: 'Frontend', icon: '', experienceLevel: 'proficient', display: true });
  const add = () => { if (!draft.name.trim()) return; update({ ...content, skills: [...content.skills, { ...draft, name: draft.name.trim() }] }); setDraft({ ...draft, name: '' }); };
  return <div className="space-y-5"><div className="admin-card"><h2 className="admin-card-title">Skills</h2><p className="admin-muted">Manage the technical toolkit shown by the public portfolio.</p><div className="mt-5 grid gap-4 md:grid-cols-4"><Field label="Name" value={draft.name} onChange={(value) => setDraft({ ...draft, name: value })} /><Field label="Category" value={draft.category} onChange={(value) => setDraft({ ...draft, category: value })} /><label className="space-y-2"><span className="admin-label">Experience Level</span><select value={draft.experienceLevel} onChange={(event) => setDraft({ ...draft, experienceLevel: event.target.value as Skill['experienceLevel'] })} className="admin-input"><option value="expert">Expert</option><option value="proficient">Proficient</option><option value="familiar">Familiar</option><option value="learning">Learning</option></select></label><button onClick={add} className="admin-primary self-end"><FiPlus />Add Skill</button></div></div><div className="admin-card space-y-2">{content.skills.length === 0 ? <p className="admin-muted">No skills yet. Add your first skill above.</p> : content.skills.map((skill, index) => <div key={`${skill.name}-${index}`} className="flex flex-wrap items-center gap-3 rounded-lg border border-slate-200 p-3"><span className="flex-1 font-medium text-slate-800">{skill.name}</span><span className="text-xs text-slate-500">{skill.category} · {skill.experienceLevel}</span><button onClick={() => update({ ...content, skills: content.skills.filter((_, itemIndex) => itemIndex !== index) })} className="admin-icon danger" aria-label={`Delete ${skill.name}`}><FiTrash2 /></button></div>)}</div></div>;
}

function ProjectsEditor({ content, update }: { content: PortfolioContent; update: (next: PortfolioContent) => void }) {
  const blank: Project = { id: `project-${Date.now()}`, title: '', subtitle: '', description: '', overview: '', problem: '', solution: '', coverImage: '', gallery: [], technologies: [], features: [], challenges: [], lessonsLearned: [], github: '', liveDemo: '', category: 'Software', featured: false, status: 'Draft', year: new Date().getFullYear() };
  const [draft, setDraft] = useState<Project>(blank);
  const add = () => { if (!draft.title.trim()) return; update({ ...content, projects: [...content.projects, { ...draft, title: draft.title.trim() }] }); setDraft({ ...blank, id: `project-${Date.now()}` }); };
  const updateProject = (index: number, patch: Partial<Project>) => update({ ...content, projects: content.projects.map((project, itemIndex) => itemIndex === index ? { ...project, ...patch } : project) });
  return <div className="space-y-5"><div className="admin-card space-y-5"><div><h2 className="admin-card-title">Project editor</h2><p className="admin-muted">Image paths point to files inside the public folder, for example `/images/projects/cover.png`.</p></div><div className="grid gap-4 md:grid-cols-2"><Field label="Title" value={draft.title} onChange={(value) => setDraft({ ...draft, title: value })} /><Field label="Category" value={draft.category} onChange={(value) => setDraft({ ...draft, category: value })} /><Field label="Year" value={String(draft.year)} onChange={(value) => setDraft({ ...draft, year: Number(value) || new Date().getFullYear() })} /><Field label="Cover Image Path" value={draft.coverImage} onChange={(value) => setDraft({ ...draft, coverImage: value })} /><Field label="Description" value={draft.description} onChange={(value) => setDraft({ ...draft, description: value })} multiline /><TagsField label="Technologies" values={draft.technologies} onChange={(value) => setDraft({ ...draft, technologies: value })} /></div><button onClick={add} className="admin-primary"><FiPlus />Create Project</button></div><div className="space-y-4">{content.projects.map((project, index) => <div key={project.id} className="admin-card space-y-4"><div className="flex items-start gap-3"><div className="flex-1"><Field label="Title" value={project.title} onChange={(value) => updateProject(index, { title: value })} /></div><button onClick={() => update({ ...content, projects: content.projects.filter((_, itemIndex) => itemIndex !== index) })} className="admin-icon danger mt-7" aria-label={`Delete ${project.title}`}><FiTrash2 /></button></div><div className="grid gap-4 md:grid-cols-2"><Field label="Subtitle" value={project.subtitle} onChange={(value) => updateProject(index, { subtitle: value })} /><Field label="Status" value={project.status} onChange={(value) => updateProject(index, { status: value })} /><Field label="Overview" value={project.overview} onChange={(value) => updateProject(index, { overview: value })} multiline /><Field label="Problem" value={project.problem} onChange={(value) => updateProject(index, { problem: value })} multiline /><Field label="Solution" value={project.solution} onChange={(value) => updateProject(index, { solution: value })} multiline /><Field label="Cover Image Path" value={project.coverImage} onChange={(value) => updateProject(index, { coverImage: value })} /><TagsField label="Features" values={project.features} onChange={(value) => updateProject(index, { features: value })} /><TagsField label="Technologies" values={project.technologies} onChange={(value) => updateProject(index, { technologies: value })} /><Field label="GitHub URL" value={project.github} onChange={(value) => updateProject(index, { github: value })} /><Field label="Live Demo URL" value={project.liveDemo} onChange={(value) => updateProject(index, { liveDemo: value })} /></div><label className="flex items-center gap-2 text-sm text-slate-700"><input type="checkbox" checked={project.featured} onChange={(event) => updateProject(index, { featured: event.target.checked })} /> Featured project</label></div>)}</div></div>;
}

function CollectionEditor({ title, content, update, section }: { title: string; content: PortfolioContent; update: (next: PortfolioContent) => void; section: 'experience' | 'education' | 'certificates' | 'achievements' }) {
  const [draft, setDraft] = useState('');
  const items = content[section] as Array<Record<string, unknown>>;
  const labelKey = section === 'experience' ? 'position' : section === 'education' ? 'degree' : 'title';
  const add = () => { if (!draft.trim()) return; const item = section === 'experience' ? { company: '', position: draft, duration: '', description: '', technologies: [], achievements: [], links: [] } : section === 'education' ? { university: '', degree: draft, expectedGraduation: '', gpa: '', coursework: [], awards: [], activities: [] } : section === 'certificates' ? { title: draft, issuer: '', date: '', logo: '', credentialURL: '', description: '', skillsLearned: [], category: '' } : { id: `achievement-${Date.now()}`, title: draft, organization: '', date: '', description: '', result: '', url: '', image: '', featured: false }; update({ ...content, [section]: [...items, item] } as PortfolioContent); setDraft(''); };
  return <div className="space-y-5"><div className="admin-card"><h2 className="admin-card-title">{title}</h2><p className="admin-muted">Add, remove, and edit your {title.toLowerCase()} without touching source files.</p><div className="mt-5 flex gap-3"><input value={draft} onChange={(event) => setDraft(event.target.value)} placeholder={`New ${title.slice(0, -1)} title`} className="admin-input" /><button onClick={add} className="admin-primary whitespace-nowrap"><FiPlus />Add</button></div></div><div className="space-y-3">{items.length === 0 ? <div className="admin-card admin-muted">No {title.toLowerCase()} yet.</div> : items.map((item, index) => <div key={index} className="admin-card"><div className="flex gap-3"><div className="flex-1"><Field label={labelKey} value={String(item[labelKey] ?? '')} onChange={(value) => update({ ...content, [section]: items.map((current, itemIndex) => itemIndex === index ? { ...current, [labelKey]: value } : current) } as PortfolioContent)} /></div><button onClick={() => update({ ...content, [section]: items.filter((_, itemIndex) => itemIndex !== index) } as PortfolioContent)} className="admin-icon danger mt-7" aria-label="Delete item"><FiTrash2 /></button></div><div className="mt-4 grid gap-4 md:grid-cols-2">{Object.entries(item).filter(([key]) => key !== labelKey && key !== 'id').slice(0, 6).map(([key, value]) => <Field key={key} label={key} value={Array.isArray(value) ? value.join(', ') : String(value ?? '')} onChange={(next) => update({ ...content, [section]: items.map((current, itemIndex) => itemIndex === index ? { ...current, [key]: Array.isArray(value) ? next.split(',').map((part) => part.trim()).filter(Boolean) : next } : current) } as PortfolioContent)} multiline={['description', 'summary'].includes(key)} />)}</div></div>)}</div></div>;
}

function SeoEditor({ content, update }: { content: PortfolioContent; update: (next: PortfolioContent) => void }) { const seo = content.seo; const set = (key: keyof typeof seo, value: string | string[]) => update({ ...content, seo: { ...seo, [key]: value } }); return <div className="admin-card space-y-5"><div><h2 className="admin-card-title">SEO management</h2><p className="admin-muted">These values describe your public page to search engines and social previews.</p></div><Field label="Page Title" value={seo.pageTitle} onChange={(value) => set('pageTitle', value)} /><Field label="Meta Description" value={seo.metaDescription} onChange={(value) => set('metaDescription', value)} multiline /><TagsField label="Keywords" values={seo.keywords} onChange={(value) => set('keywords', value)} /><Field label="OG Title" value={seo.ogTitle} onChange={(value) => set('ogTitle', value)} /><Field label="OG Description" value={seo.ogDescription} onChange={(value) => set('ogDescription', value)} multiline /><Field label="OG Image" value={seo.ogImage} onChange={(value) => set('ogImage', value)} /><Field label="Twitter Title" value={seo.twitterTitle} onChange={(value) => set('twitterTitle', value)} /><Field label="Twitter Description" value={seo.twitterDescription} onChange={(value) => set('twitterDescription', value)} multiline /><Field label="Canonical URL" value={seo.canonicalUrl} onChange={(value) => set('canonicalUrl', value)} /></div>; }

function AppearanceEditor({ content, update }: { content: PortfolioContent; update: (next: PortfolioContent) => void }) { const appearance = content.appearance; const set = (key: keyof typeof appearance, value: string | number) => update({ ...content, appearance: { ...appearance, [key]: value } }); return <div className="admin-card space-y-5"><div><h2 className="admin-card-title">Appearance</h2><p className="admin-muted">Only safe visual variables are editable. The current warm Marwan identity remains the default.</p></div><div className="grid gap-5 md:grid-cols-2">{(['primaryGold', 'warmBrown', 'electricBlue', 'background', 'text'] as const).map((key) => <label key={key} className="flex items-center justify-between rounded-lg border border-slate-200 p-3"><span className="text-sm font-medium capitalize text-slate-700">{key.replace(/([A-Z])/g, ' $1')}</span><input type="color" value={appearance[key]} onChange={(event) => set(key, event.target.value)} className="h-10 w-14 cursor-pointer rounded" /></label>)}</div><label className="block space-y-2"><span className="admin-label">Accent intensity: {appearance.accentIntensity}%</span><input type="range" min="0" max="100" value={appearance.accentIntensity} onChange={(event) => set('accentIntensity', Number(event.target.value))} className="w-full accent-amber-600" /></label></div>; }

function Settings({ content, update, onLogout }: { content: PortfolioContent; update: (next: PortfolioContent) => void; onLogout: () => void }) { const fileRef = useRef<HTMLInputElement>(null); return <div className="space-y-5"><div className="admin-card"><h2 className="admin-card-title">Backup & settings</h2><p className="admin-muted">Local changes live in this browser. Export a JSON backup before changing devices or clearing site data.</p><div className="mt-5 flex flex-wrap gap-3"><button onClick={() => exportPortfolio(content)} className="admin-secondary"><FiDownload />Export Backup</button><button onClick={() => fileRef.current?.click()} className="admin-secondary"><FiUpload />Import Backup</button><input ref={fileRef} type="file" accept="application/json" className="hidden" onChange={async (event) => { const file = event.target.files?.[0]; if (file) { try { update(await importPortfolio(file)); } catch { window.alert('That backup is not valid JSON.'); } } }} /><button onClick={() => { if (window.confirm('Reset all portfolio content to defaults?')) update(structuredClone(defaultPortfolio)); }} className="admin-secondary danger"><FiTrash2 />Reset to Default</button></div></div><div className="admin-card"><h3 className="admin-card-title">Session</h3><p className="admin-muted">The dashboard session ends when this browser session ends.</p><button onClick={onLogout} className="admin-secondary mt-5"><FiLogOut />Log Out</button></div></div>; }

function Dashboard({ onLogout }: { onLogout: () => void }) {
  const { content, updateContent, saveChanges, resetChanges, dirty } = usePortfolio();
  const [section, setSection] = useState<Section>('overview');
  const [menuOpen, setMenuOpen] = useState(false);
  const title = sections.find((item) => item.id === section)?.label || 'Overview';
  useEffect(() => {
    const warnBeforeLeaving = (event: BeforeUnloadEvent) => {
      if (!dirty) return;
      event.preventDefault();
      event.returnValue = '';
    };
    window.addEventListener('beforeunload', warnBeforeLeaving);
    return () => window.removeEventListener('beforeunload', warnBeforeLeaving);
  }, [dirty]);
  const editor = useMemo(() => { switch (section) { case 'personal': return <PersonalEditor content={content} update={updateContent} />; case 'socials': return <SocialEditor content={content} update={updateContent} />; case 'skills': return <SkillsEditor content={content} update={updateContent} />; case 'projects': return <ProjectsEditor content={content} update={updateContent} />; case 'experience': return <CollectionEditor title="Experience" section="experience" content={content} update={updateContent} />; case 'education': return <CollectionEditor title="Education" section="education" content={content} update={updateContent} />; case 'certificates': return <CollectionEditor title="Certificates" section="certificates" content={content} update={updateContent} />; case 'achievements': return <CollectionEditor title="Achievements" section="achievements" content={content} update={updateContent} />; case 'seo': return <SeoEditor content={content} update={updateContent} />; case 'appearance': return <AppearanceEditor content={content} update={updateContent} />; case 'settings': return <Settings content={content} update={updateContent} onLogout={onLogout} />; default: return <Overview content={content} setSection={setSection} />; } }, [content, section, updateContent, onLogout]);
  return <div className="min-h-screen bg-slate-100 text-slate-900"><aside className={`fixed inset-y-0 left-0 z-30 w-64 border-r border-slate-200 bg-white p-5 transition-transform lg:translate-x-0 ${menuOpen ? 'translate-x-0' : '-translate-x-full'}`}><div className="flex items-center justify-between"><div><p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-700">MZ Control</p><p className="mt-1 font-semibold text-slate-900">Portfolio CMS</p></div><button onClick={() => setMenuOpen(false)} className="admin-icon lg:hidden" aria-label="Close menu"><FiX /></button></div><nav className="mt-8 space-y-1">{sections.map((item) => <button key={item.id} onClick={() => { setSection(item.id); setMenuOpen(false); }} className={`admin-nav ${section === item.id ? 'active' : ''}`}>{item.label}</button>)}<button onClick={onLogout} className="admin-nav mt-6 border-t border-slate-200 pt-4 text-red-600"><FiLogOut />Logout</button></nav></aside>{menuOpen && <button className="fixed inset-0 z-20 bg-slate-950/30 lg:hidden" onClick={() => setMenuOpen(false)} aria-label="Close navigation" />}<div className="lg:pl-64"><header className="sticky top-0 z-10 border-b border-slate-200 bg-white/90 px-5 py-4 backdrop-blur md:px-8"><div className="mx-auto flex max-w-6xl items-center justify-between gap-4"><div className="flex items-center gap-3"><button onClick={() => setMenuOpen(true)} className="admin-icon lg:hidden" aria-label="Open menu"><FiMenu /></button><div><p className="text-xs uppercase tracking-widest text-slate-400">Private workspace</p><h1 className="text-xl font-bold text-slate-950">{title}</h1></div></div><div className="flex items-center gap-2"><span className={`hidden items-center gap-1 text-xs font-medium sm:flex ${dirty ? 'text-amber-700' : 'text-emerald-700'}`}><FiCheck />{dirty ? 'Unsaved changes' : 'Saved'}</span><a href="/" target="_blank" rel="noreferrer" className="admin-icon" aria-label="Preview website"><FiExternalLink /></a><button onClick={saveChanges} className="admin-primary"><FiSave /><span className="hidden sm:inline">Save Changes</span></button></div></div></header><main className="mx-auto max-w-6xl p-5 md:p-8">{editor}<div className="mt-6 flex items-center justify-between border-t border-slate-200 pt-4 text-xs text-slate-500"><span>Last saved: {content.lastSaved ? new Date(content.lastSaved).toLocaleString() : 'Not saved yet'}</span>{dirty && <button onClick={resetChanges} className="font-semibold text-slate-700 hover:text-amber-700">Reset unsaved changes</button>}</div></main></div></div>;
}

export default function AdminApp() {
  const [authenticated, setAuthenticated] = useState(() => sessionStorage.getItem(sessionKey) === 'authenticated');
  const logout = () => { sessionStorage.removeItem(sessionKey); setAuthenticated(false); };
  if (!authenticated) return <Login onAuthenticated={() => setAuthenticated(true)} />;
  return <Dashboard onLogout={logout} />;
}

export { adminPath };
