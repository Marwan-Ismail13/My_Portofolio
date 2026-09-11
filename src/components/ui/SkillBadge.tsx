import { motion } from 'framer-motion';

interface SkillBadgeProps {
  skill: string;
  category: string;
  className?: string;
}

export default function SkillBadge({ skill, category, className = '' }: SkillBadgeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.05, borderColor: '#F5B82E' }}
      transition={{ duration: 0.3 }}
      className={`px-4 py-2 rounded-lg border border-brand-gold/30 bg-brand-surface/50 backdrop-blur-sm hover:bg-brand-surface hover:shadow-gold-glow transition-all cursor-default ${className}`}
    >
      <div className="text-sm font-medium text-brand-text">{skill}</div>
      <div className="text-xs text-brand-text-secondary uppercase tracking-widest mt-1">{category}</div>
    </motion.div>
  );
}
