import { motion } from 'framer-motion';
import { usePortfolio } from '../data/PortfolioProvider';
import SectionHeader from './ui/SectionHeader';
import AchievementCard from './ui/AchievementCard';

export default function Certificates() {
  const { content: { certificates, education, achievements } } = usePortfolio();
  // Combine education and certificates for achievements
  const educationAchievements = education.map((edu) => ({
    type: 'education' as const,
    title: edu.degree,
    description: `${edu.university} • Expected ${edu.expectedGraduation}`,
    category: 'Education',
    year: edu.expectedGraduation,
    isHighlighted: false,
    order: 0
  }));

  const certificateAchievements = certificates.map((cert, index) => ({
    type: 'certificate' as const,
    title: cert.title,
    description: cert.issuer,
    category: 'Certification',
    year: cert.date,
    isHighlighted: index === 0, // First certificate is highlighted
    order: 1
  }));

  const allAchievements = [...educationAchievements, ...certificateAchievements];

  return (
    <section id="achievements" className="py-20 sm:py-32 px-6 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          number="05"
          subtitle="MILESTONES & RECOGNITION"
          title="Achievements"
          description="Academic credentials, professional certifications, and competitive programming accomplishments."
        />

        {allAchievements.length === 0 && achievements.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 p-8 sm:p-12 bg-brand-surface/50 border border-brand-gold/20 rounded-xl text-center"
          >
            <p className="text-lg sm:text-xl font-bold text-brand-text">
              Achievements pending verification...
            </p>
            <p className="mt-3 text-base text-brand-text-secondary max-w-2xl mx-auto">
              Education, certifications, and accomplishments will be populated from verified CV data.
            </p>
          </motion.div>
        ) : (
          <div>
            {/* Education Section */}
            {educationAchievements.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mb-16"
              >
                <h3 className="text-xl sm:text-2xl font-bold text-brand-text mb-6 flex items-center gap-3">
                  <span className="text-brand-gold">▪</span> Education
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {education.map((edu, index) => (
                    <AchievementCard
                      key={`${edu.university}-${edu.degree}`}
                      title={edu.degree}
                      description={edu.university}
                      year={`Expected ${edu.expectedGraduation}`}
                      category="Academic"
                      index={index}
                    />
                  ))}
                </div>

                {/* Coursework */}
                {education[0]?.coursework && education[0].coursework.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="mt-8 p-6 bg-brand-surface/30 border border-brand-gold/20 rounded-xl"
                  >
                    <p className="text-xs font-mono uppercase tracking-widest text-brand-gold mb-4">
                      Relevant Coursework
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {education[0].coursework.map((course) => (
                        <div
                          key={course}
                          className="px-3 py-2 bg-brand-surface border border-brand-gold/20 rounded text-sm text-brand-text-secondary"
                        >
                          {course}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}

            {/* Certifications Section */}
            {certificateAchievements.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <h3 className="text-xl sm:text-2xl font-bold text-brand-text mb-6 flex items-center gap-3">
                  <span className="text-brand-gold">▪</span> Certifications
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {certificates.map((cert, index) => (
                    <AchievementCard
                      key={`${cert.issuer}-${cert.title}`}
                      title={cert.title}
                      description={cert.issuer}
                      year={cert.date}
                      category={cert.category}
                      isHighlighted={index === 0}
                      index={index}
                    />
                  ))}
                </div>
              </motion.div>
            )}

            {achievements.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mt-16"
              >
                <h3 className="mb-6 flex items-center gap-3 text-xl font-bold text-brand-text sm:text-2xl">
                  <span className="text-brand-gold">▪</span> Competitive Achievements
                </h3>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  {achievements.map((achievement, index) => (
                    <AchievementCard
                      key={achievement.id}
                      title={achievement.title}
                      description={`${achievement.organization} - ${achievement.description}`}
                      year={achievement.date}
                      category="Achievement"
                      result={achievement.result}
                      url={achievement.url}
                      images={achievement.image.split(',').map((image) => image.trim()).filter(Boolean)}
                      isHighlighted={achievement.featured}
                      index={index}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        )}

        {/* Achievements Philosophy */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 sm:mt-20 p-6 sm:p-8 bg-brand-surface/30 border border-brand-gold/20 rounded-xl"
        >
          <p className="text-xs font-mono uppercase tracking-widest text-brand-gold mb-3">
            Continuous Learning
          </p>
          <p className="text-base sm:text-lg text-brand-text-secondary leading-relaxed max-w-3xl">
            Every certificate, course, and academic achievement represents a deliberate investment in technical growth. I prioritize learning technologies and methodologies that solve real-world problems.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
