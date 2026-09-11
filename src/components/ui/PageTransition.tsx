import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface PageTransitionProps {
  children: ReactNode;
  sectionNumber: string;
  delay?: number;
}

export default function PageTransition({
  children,
  sectionNumber,
  delay = 0
}: PageTransitionProps) {
  return (
    <>
      {/* Section transition overlay */}
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        exit={{ opacity: 0, scaleX: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5, delay, ease: 'easeInOut' }}
        className="absolute -left-full top-1/2 h-px w-full bg-gradient-to-r from-transparent via-brand-gold/50 to-transparent"
      />

      {/* Section number transition */}
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6, delay: delay + 0.1, ease: 'easeOut' }}
        className="absolute -left-24 top-1/2 -translate-y-1/2 text-6xl font-bold text-brand-gold/20 pointer-events-none"
      >
        {sectionNumber}
      </motion.div>

      {/* Section content */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: delay + 0.2 }}
      >
        {children}
      </motion.div>
    </>
  );
}
