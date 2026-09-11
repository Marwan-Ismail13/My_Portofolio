import { motion } from 'framer-motion';
import { usePortfolio } from '../data/PortfolioProvider';
import SectionHeader from './ui/SectionHeader';

function InfoBadge({ label, value }: { label: string; value: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="p-4 bg-brand-surface/50 border border-brand-gold/30 rounded-lg hover:border-brand-gold/60 transition"
    >
      <p className="text-xs font-mono uppercase tracking-widest text-brand-gold">{label}</p>
      <p className="mt-2 text-base font-semibold text-brand-text">{value}</p>
    </motion.div>
  );
}

export default function About() {
  const { content: { personal } } = usePortfolio();
  return (
    <section id="identity" className="py-20 sm:py-32 px-6 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          number="01"
          subtitle="WHO AM I?"
          title="Identity"
          description="A Computer Science student passionate about building meaningful software and exploring AI/ML solutions."
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-16">
          {/* Left column: Main content */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 space-y-8"
          >
            {/* Introduction */}
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold text-brand-text mb-4">
                Professional Journey
              </h3>
              <p className="text-base sm:text-lg text-brand-text-secondary leading-relaxed max-w-2xl">
                {personal.introduction}
              </p>
            </div>

            {/* Career Highlights */}
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold text-brand-text mb-6">
                Career Highlights
              </h3>
              <div className="space-y-3">
                {personal.careerHighlights.map((highlight, index) => (
                  <motion.div
                    key={highlight}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <span className="text-brand-gold mt-1">▸</span>
                    <span className="text-brand-text-secondary">{highlight}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Summary */}
            <div className="p-6 sm:p-8 bg-brand-warm-dark/70 border border-brand-gold/20 rounded-xl shadow-brown-glow">
              <p className="text-xs font-mono uppercase tracking-widest text-brand-gold mb-4">
                Summary
              </p>
              <p className="text-base text-brand-text-secondary leading-relaxed">
                {personal.summary}
              </p>
            </div>
          </motion.div>

          {/* Right column: Quick facts */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1"
          >
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-brand-text mb-6">
                Quick Facts
              </h3>

              {/* Education info */}
              <InfoBadge label="University" value={personal.university} />
              <InfoBadge label="Degree" value={personal.degree} />
              <InfoBadge label="Expected Graduation" value={personal.expectedGraduation} />
              <InfoBadge label="GPA" value={personal.gpa} />
              <InfoBadge label="Location" value={personal.location} />
              <InfoBadge label="Languages" value={personal.languages.join(', ')} />
            </div>
          </motion.div>
        </div>

        {/* Professional & Personal Interests */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-16 pt-16 border-t border-brand-gold/20"
        >
          <div>
            <h4 className="text-lg sm:text-xl font-bold text-brand-text mb-6">
              Professional Focus
            </h4>
            <div className="flex flex-wrap gap-2">
              {personal.professionalInterests.map((interest) => (
                <motion.span
                  key={interest}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                  className="px-3 py-2 bg-brand-surface border border-brand-gold/30 text-brand-text text-sm rounded-lg cursor-default hover:border-brand-gold/60 transition"
                >
                  {interest}
                </motion.span>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-lg sm:text-xl font-bold text-brand-text mb-6">
              Personal Interests
            </h4>
            <div className="flex flex-wrap gap-2">
              {personal.personalInterests.map((interest) => (
                <motion.span
                  key={interest}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                  className="px-3 py-2 bg-brand-surface border border-brand-gold/30 text-brand-text text-sm rounded-lg cursor-default hover:border-brand-gold/60 transition"
                >
                  {interest}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
