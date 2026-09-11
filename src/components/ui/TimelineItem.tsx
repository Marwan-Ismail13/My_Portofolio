import { motion } from 'framer-motion';

interface TimelineItemProps {
  year: string;
  title: string;
  organization: string;
  description: string;
  technologies?: string[];
  isLeft?: boolean;
  index?: number;
}

export default function TimelineItem({
  year,
  title,
  organization,
  description,
  technologies,
  isLeft = false,
  index = 0
}: TimelineItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative pb-12 lg:pb-16"
    >
      <div className="flex gap-6">
        {/* Timeline dot */}
        <div className="flex flex-col items-center">
          <div className="w-4 h-4 bg-brand-gold rounded-full mt-2 relative z-10" />
          <div className="w-px h-16 lg:h-20 bg-gradient-to-b from-brand-gold/50 to-transparent" />
        </div>

        {/* Content */}
        <div className="pb-8">
          <span className="text-xs sm:text-sm font-mono text-brand-gold uppercase tracking-widest">
            {year}
          </span>
          <h3 className="text-xl sm:text-2xl font-bold text-brand-text mt-2">
            {title}
          </h3>
          <p className="text-sm sm:text-base text-brand-gold/80 mt-1">
            {organization}
          </p>
          <p className="text-sm sm:text-base text-brand-text-secondary mt-3 max-w-md">
            {description}
          </p>
          {technologies && technologies.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {technologies.map((tech, i) => (
                <span
                  key={i}
                  className="px-2 py-1 text-xs bg-brand-surface border border-brand-gold/30 text-brand-text-secondary rounded"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
