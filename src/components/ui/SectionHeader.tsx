import { motion } from 'framer-motion';

interface SectionHeaderProps {
  number: string;
  title: string;
  subtitle?: string;
  description?: string;
  className?: string;
}

export default function SectionHeader({
  number,
  title,
  subtitle,
  description,
  className = ''
}: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`mb-12 sm:mb-16 ${className}`}
    >
      <div className="flex items-baseline gap-3 mb-6">
        <span className="text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-gold tracking-tighter">
          {number}
        </span>
        {subtitle && (
          <span className="text-sm sm:text-base font-semibold text-brand-gold/70 uppercase tracking-widest">
            {subtitle}
          </span>
        )}
      </div>
      
      <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-text mb-4 leading-tight tracking-tight">
        {title}
      </h2>
      
      {description && (
        <p className="text-base sm:text-lg text-brand-text-secondary max-w-2xl">
          {description}
        </p>
      )}
    </motion.div>
  );
}
