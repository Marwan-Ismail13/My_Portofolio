import { motion } from 'framer-motion';

interface AchievementCardProps {
  title: string;
  description: string;
  year?: string;
  category?: string;
  isHighlighted?: boolean;
  index?: number;
}

export default function AchievementCard({
  title,
  description,
  year,
  category,
  isHighlighted = false,
  index = 0
}: AchievementCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`p-6 sm:p-8 rounded-xl border backdrop-blur-sm transition-all ${
        isHighlighted
          ? 'border-brand-gold bg-brand-gold/10 shadow-gold-glow'
          : 'border-brand-gold/30 bg-brand-surface/50 hover:border-brand-gold/60'
      }`}
    >
      <div className="flex items-start justify-between gap-4 mb-3">
        <h3 className="text-lg sm:text-xl font-bold text-brand-text flex-1">
          {title}
        </h3>
        {isHighlighted && (
          <span className="px-2 py-1 text-xs font-semibold bg-brand-gold text-brand-black rounded uppercase tracking-widest whitespace-nowrap">
            Featured
          </span>
        )}
      </div>

      <p className="text-sm sm:text-base text-brand-text-secondary mb-4">
        {description}
      </p>

      <div className="flex items-center gap-3 text-xs sm:text-sm text-brand-text-secondary">
        {category && (
          <>
            <span className="px-2 py-1 bg-brand-surface rounded border border-brand-gold/20">
              {category}
            </span>
          </>
        )}
        {year && <span>{year}</span>}
      </div>
    </motion.div>
  );
}
