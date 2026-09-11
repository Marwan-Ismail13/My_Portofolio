import { motion } from 'framer-motion';
import { usePortfolio } from '../data/PortfolioProvider';
import SectionHeader from './ui/SectionHeader';
import TimelineItem from './ui/TimelineItem';

export default function Experience() {
  const { content: { experience } } = usePortfolio();
  return (
    <section id="journey" className="py-20 sm:py-32 px-6 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          number="04"
          subtitle="PROGRESSION & GROWTH"
          title="Journey"
          description="A timeline of professional experiences, internships, and pivotal moments in my development career."
        />

        {experience.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 p-8 sm:p-12 bg-brand-surface/50 border border-brand-gold/20 rounded-xl text-center"
          >
            <p className="text-lg sm:text-xl font-bold text-brand-text">
              Journey details pending CV verification...
            </p>
            <p className="mt-3 text-base text-brand-text-secondary max-w-2xl mx-auto">
              Professional roles, internships, and achievements will be added from verified CV data.
            </p>
          </motion.div>
        ) : (
          <div className="mt-16 space-y-0">
            {experience.map((item, index) => (
              <TimelineItem
                key={`${item.company}-${item.position}`}
                year={item.duration}
                title={item.position}
                organization={item.company}
                description={item.description}
                technologies={item.technologies}
                index={index}
              />
            ))}
          </div>
        )}

        {/* Journey philosophy */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 sm:mt-20 p-6 sm:p-8 bg-brand-surface/30 border border-brand-gold/20 rounded-xl"
        >
          <p className="text-xs font-mono uppercase tracking-widest text-brand-gold mb-3">
            Career Philosophy
          </p>
          <p className="text-base sm:text-lg text-brand-text-secondary leading-relaxed max-w-3xl">
            Every role, project, and challenge has been instrumental in shaping my approach to software engineering. I'm driven by continuous growth, meaningful technical contributions, and building software that creates real impact.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
