import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaTimes } from 'react-icons/fa';
import { usePortfolio } from '../data/PortfolioProvider';
import type { Project } from '../data/portfolioStore';
import SectionHeader from './ui/SectionHeader';

function MissionModal({ project, projects, onClose }: { project: Project; projects: Project[]; onClose: () => void }) {
  const missionNumber = String((projects.indexOf(project) + 1).toString().padStart(2, '0'));

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 flex items-center justify-center bg-brand-black/80 backdrop-blur-sm p-6"
      >
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.95 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          onClick={(e) => e.stopPropagation()}
          className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-xl border border-brand-gold/30 bg-brand-dark shadow-soft"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 z-10 p-2 rounded-lg border border-brand-gold/30 bg-brand-surface hover:bg-brand-surface/80 transition"
            aria-label="Close"
          >
            <FaTimes size={18} className="text-brand-text" />
          </button>

          {/* Modal content */}
          <div className="p-8 sm:p-12">
            {/* Mission header */}
            <div className="mb-8">
              <div className="flex items-baseline gap-4 mb-4">
                <span className="text-5xl sm:text-6xl font-bold text-brand-gold">
                  {missionNumber}
                </span>
                <span className="text-xs font-mono text-brand-gold/70 uppercase tracking-widest">
                  Mission
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-brand-text mb-2">
                {project.title}
              </h2>
              <p className="text-base text-brand-text-secondary">
                {project.category} • {project.year}
              </p>
            </div>

            {/* Mission sections */}
            <div className="space-y-8">
              {project.overview && (
                <div>
                  <h3 className="text-lg font-bold text-brand-gold mb-3 uppercase tracking-widest">
                    Overview
                  </h3>
                  <p className="text-base text-brand-text-secondary leading-relaxed">
                    {project.overview}
                  </p>
                </div>
              )}

              {project.problem && (
                <div>
                  <h3 className="text-lg font-bold text-brand-gold mb-3 uppercase tracking-widest">
                    Problem
                  </h3>
                  <p className="text-base text-brand-text-secondary leading-relaxed">
                    {project.problem}
                  </p>
                </div>
              )}

              {project.solution && (
                <div>
                  <h3 className="text-lg font-bold text-brand-gold mb-3 uppercase tracking-widest">
                    Solution
                  </h3>
                  <p className="text-base text-brand-text-secondary leading-relaxed">
                    {project.solution}
                  </p>
                </div>
              )}

              {project.features.length > 0 && (
                <div>
                  <h3 className="text-lg font-bold text-brand-gold mb-3 uppercase tracking-widest">
                    Features
                  </h3>
                  <ul className="space-y-2">
                    {project.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <span className="text-brand-gold mt-1">▸</span>
                        <span className="text-base text-brand-text-secondary">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {project.technologies.length > 0 && (
                <div>
                  <h3 className="text-lg font-bold text-brand-gold mb-3 uppercase tracking-widest">
                    Technology Stack
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-brand-surface border border-brand-gold/30 rounded text-sm text-brand-text"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Links */}
              <div className="pt-6 border-t border-brand-gold/20 flex flex-wrap gap-4">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 px-4 py-2 border border-brand-gold/50 rounded-lg hover:bg-brand-surface transition"
                  >
                    <FaGithub /> GitHub
                  </a>
                )}
                {project.liveDemo && (
                  <a
                    href={project.liveDemo}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-brand-gold text-brand-black font-semibold rounded-lg hover:bg-brand-gold/90 transition"
                  >
                    <FaExternalLinkAlt /> Live Demo
                  </a>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function Projects() {
  const { content: { projects } } = usePortfolio();
  const [activeProject, setActiveProject] = useState<string | null>(null);
  const orderedProjects = useMemo(() => [...projects].sort((left, right) => Number(right.featured) - Number(left.featured)), [projects]);
  const projectImage = (path: string) => {
    const basePath = import.meta.env.BASE_URL.replace(/\/$/, '');
    let normalizedPath = path.split(',')[0].trim().replace(/^['"]|['"]$/g, '');
    if (normalizedPath.startsWith(basePath)) normalizedPath = normalizedPath.slice(basePath.length);
    normalizedPath = normalizedPath.replace(/^\/+/, '');
    const correctedPath = normalizedPath.startsWith('images/ECPC_')
      ? normalizedPath.replace('images/ECPC_', 'images/ECPC/ECPC_')
      : normalizedPath;
    return `${basePath}/${correctedPath}`;
  };

  const selectedProject = useMemo(
    () => orderedProjects.find((project) => project.id === activeProject) ?? null,
    [activeProject, orderedProjects]
  );

  return (
    <section id="missions" className="py-20 sm:py-32 px-6 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          number="03"
          subtitle="PROJECTS & CASE STUDIES"
          title="Missions"
          description="A portfolio of meaningful projects where I've tackled real problems and shipped production software."
        />

        {orderedProjects.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 p-8 sm:p-12 bg-brand-surface/50 border border-brand-gold/20 rounded-xl text-center"
          >
            <p className="text-lg sm:text-xl font-bold text-brand-text">
              Missions are being documented...
            </p>
            <p className="mt-3 text-base text-brand-text-secondary max-w-2xl mx-auto">
              Project details will be populated as verified work is completed and documented.
            </p>
            <a
              href="https://github.com/Marwan-Ismail13"
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex gap-2 px-6 py-3 bg-brand-gold text-brand-black font-semibold rounded-lg hover:bg-brand-gold/90 transition"
            >
              View GitHub Profile →
            </a>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mt-16">
            {orderedProjects.map((project, index) => (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group cursor-pointer"
                onClick={() => setActiveProject(project.id)}
              >
                {/* Project cover */}
                <div className="relative h-48 sm:h-56 mb-6 rounded-xl bg-gradient-to-br from-brand-warm/30 via-brand-dark to-brand-blue/5 border border-brand-warm/30 overflow-hidden group-hover:border-brand-gold/60 transition">
                  {project.coverImage ? <img src={projectImage(project.coverImage)} alt={`${project.title} cover`} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" loading="lazy" onError={(event) => { event.currentTarget.style.display = 'none'; }} /> : <div className="absolute inset-0 flex items-center justify-center"><span className="text-6xl font-bold text-brand-gold/20">{String((orderedProjects.indexOf(project) + 1).toString().padStart(2, '0'))}</span></div>}
                </div>

                {/* Content */}
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <span className="text-sm font-mono text-brand-gold/70 uppercase tracking-widest">
                        {project.category} • {project.year}
                      </span>
                      <h3 className="text-xl sm:text-2xl font-bold text-brand-text mt-2 group-hover:text-brand-gold transition">
                        {project.title}
                      </h3>
                    </div>
                  </div>

                  <p className="text-sm sm:text-base text-brand-text-secondary leading-relaxed">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  {project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-2">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 text-xs bg-brand-surface border border-brand-gold/20 text-brand-text-secondary rounded"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="px-2 py-1 text-xs text-brand-text-secondary">
                          +{project.technologies.length - 3} more
                        </span>
                      )}
                    </div>
                  )}

                  {/* CTA */}
                  <div className="pt-4 border-t border-brand-gold/20">
                    <button
                      type="button"
                      className="flex items-center gap-2 text-brand-gold font-semibold text-sm group-hover:text-brand-gold/80 transition"
                    >
                      VIEW MISSION →
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>

      {selectedProject && (
        <MissionModal project={selectedProject} projects={orderedProjects} onClose={() => setActiveProject(null)} />
      )}
    </section>
  );
}