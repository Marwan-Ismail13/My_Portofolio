import { motion } from 'framer-motion';
import SectionHeader from './ui/SectionHeader';
import { usePortfolio } from '../data/PortfolioProvider';

const defaultSkillCategories = [
  {
    name: 'LANGUAGES',
    skills: ['C++', 'C#', 'Python', 'JavaScript', 'PHP', 'SQL']
  },
  {
    name: 'BUILD',
    skills: ['React', 'Node.js', 'Express', 'HTML', 'CSS', 'Tailwind CSS', 'MySQL']
  },
  {
    name: 'INTELLIGENCE',
    skills: ['Machine Learning', 'NLP', 'Data Analysis', 'Image Processing']
  },
  {
    name: 'TOOLS',
    skills: ['Git', 'GitHub', 'VS Code', 'Google Colab']
  },
  {
    name: 'DESIGN',
    skills: ['Photoshop', 'Illustrator', 'Canva']
  },
  {
    name: 'LEARNING',
    skills: ['Advanced TypeScript', 'Rust', 'WebAssembly']
  }
];

export default function Skills() {
  const { content } = usePortfolio();
  const skillCategories = content.skills.length > 0
    ? Object.entries(content.skills.filter((skill) => skill.display).reduce<Record<string, string[]>>((groups, skill) => {
        groups[skill.category] = [...(groups[skill.category] ?? []), skill.name];
        return groups;
      }, {})).map(([name, skills]) => ({ name: name.toUpperCase(), skills }))
    : defaultSkillCategories;

  return (
    <section id="arsenal" className="py-20 sm:py-32 px-6 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          number="02"
          subtitle="TECHNICAL TOOLKIT"
          title="Arsenal"
          description="A comprehensive collection of technologies, frameworks, and tools that power my development work."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 mt-16">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              className="space-y-4"
            >
              <h3 className="text-lg sm:text-xl font-bold text-brand-gold uppercase tracking-widest">
                {category.name}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05, borderColor: '#F5B82E' }}
                    transition={{ duration: 0.3, delay: skillIndex * 0.05 }}
                    className={`px-3 sm:px-4 py-2 sm:py-3 rounded-lg border ${category.name === 'INTELLIGENCE' ? 'border-brand-blue/30 hover:border-brand-blue/60' : 'border-brand-warm/40 hover:border-brand-gold/60'} bg-brand-dark/80 backdrop-blur-sm hover:bg-brand-warm-dark hover:shadow-gold-glow transition-all text-center`}
                  >
                    <span className="text-xs sm:text-sm font-semibold text-brand-text">
                      {skill}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Arsenal Statement */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 sm:mt-20 p-6 sm:p-8 bg-brand-surface/30 border border-brand-gold/20 rounded-xl"
        >
          <p className="text-xs font-mono uppercase tracking-widest text-brand-gold mb-3">
            Arsenal Strategy
          </p>
          <p className="text-base sm:text-lg text-brand-text-secondary leading-relaxed max-w-3xl">
            This arsenal represents technologies I've actively used in production projects and academic work. I prioritize depth over breadth — mastering tools that solve real problems. Currently expanding into advanced TypeScript patterns, Rust, and WebAssembly for performance-critical applications.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
