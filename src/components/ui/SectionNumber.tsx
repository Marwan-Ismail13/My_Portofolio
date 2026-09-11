import { motion } from 'framer-motion';

interface SectionNumberProps {
  number: string;
  label?: string;
  className?: string;
}

export default function SectionNumber({ number, label, className = '' }: SectionNumberProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`flex items-baseline gap-3 ${className}`}
    >
      <span className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-brand-gold tracking-tighter">
        {number}
      </span>
      {label && (
        <span className="text-lg sm:text-xl font-semibold text-brand-text uppercase tracking-wider">
          {label}
        </span>
      )}
    </motion.div>
  );
}
