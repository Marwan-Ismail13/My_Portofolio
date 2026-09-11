import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { usePortfolio } from '../data/PortfolioProvider';

export default function Hero() {
  const { content: { personal, socials } } = usePortfolio();
  const [showScroll, setShowScroll] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowScroll(false);
      } else {
        setShowScroll(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
  };

  return (
    <section id="home" className="relative min-h-[100dvh] w-full overflow-hidden pt-28 pb-20 px-5 sm:px-8 lg:pt-40 flex items-center">
      {/* Background gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-warm/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-blue/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-0 w-full h-px bg-gradient-to-l from-brand-gold/20 to-transparent" />
      </div>

      <div className="mx-auto w-full max-w-7xl relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
            className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center"
        >
          {/* Left column: Large typography */}
          <motion.div variants={itemVariants} className="flex min-w-0 flex-col gap-10 sm:gap-12">
            {/* Section label */}
            <div className="flex items-baseline gap-3">
              <span className="text-6xl sm:text-7xl lg:text-8xl font-black text-brand-gold/30 tracking-tighter">
                00
              </span>
              <span className="text-xs sm:text-sm font-mono text-brand-gold/70 uppercase tracking-widest">
                Introduction
              </span>
            </div>

            {/* Main typography */}
            <div className="flex flex-col gap-4">
              <motion.h1 
                variants={itemVariants}
                className="text-[clamp(3.25rem,10vw,6rem)] font-black text-brand-text tracking-tighter leading-none break-words"
              >
                MARWAN
              </motion.h1>
              <motion.h2 
                variants={itemVariants}
                className="text-[clamp(3.25rem,10vw,6rem)] font-black text-brand-gold-bright tracking-tighter leading-none break-words"
              >
                ZIDAN
              </motion.h2>
            </div>

            {/* Metadata */}
            <motion.div variants={itemVariants} className="flex flex-col gap-3 text-sm sm:text-base">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-brand-gold rounded-full" />
                <span className="text-brand-text-secondary">Computer Science Student</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-brand-gold rounded-full" />
                <span className="text-brand-text-secondary">Full-Stack Developer</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-brand-gold rounded-full" />
                <span className="text-brand-text-secondary">AI/ML Enthusiast</span>
              </div>
            </motion.div>

            {/* Location and availability */}
            <motion.div variants={itemVariants} className="space-y-3">
              <div className="text-xs sm:text-sm font-mono uppercase tracking-widest text-brand-gold/70">
                📍 {personal.location}
              </div>
              <p className="text-sm sm:text-base text-brand-text-secondary max-w-md">
                {personal.availability}
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 pt-4">
              <a
                href="#missions"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-brand-gold text-brand-black font-semibold hover:bg-brand-gold/90 transition rounded-lg"
              >
                VIEW MISSIONS
                <span className="text-lg">→</span>
              </a>
              <a
                href={socials.resume}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-brand-gold/50 text-brand-text hover:bg-brand-gold/10 transition rounded-lg"
              >
                DOWNLOAD CV
                <span className="text-lg">↓</span>
              </a>
            </motion.div>

            {/* Social Links */}
            <motion.div variants={itemVariants} className="flex gap-4 pt-4">
              <a
                href={socials.github}
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-lg border border-brand-gold/30 text-brand-text hover:bg-brand-surface hover:border-brand-gold/60 transition"
                aria-label="GitHub"
              >
                <FaGithub size={18} />
              </a>
              <a
                href={socials.linkedin}
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-lg border border-brand-gold/30 text-brand-text hover:bg-brand-surface hover:border-brand-gold/60 transition"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={18} />
              </a>
              <a
                href={socials.email}
                className="p-3 rounded-lg border border-brand-gold/30 text-brand-text hover:bg-brand-surface hover:border-brand-gold/60 transition"
                aria-label="Email"
              >
                <FaEnvelope size={18} />
              </a>
            </motion.div>
          </motion.div>

          {/* Right column: Portrait */}
          <motion.div 
            variants={itemVariants}
            className="relative h-[min(92vw,500px)] sm:h-[600px] lg:h-[700px] flex items-center justify-center"
          >
            {/* Portrait glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-brand-gold/20 via-transparent to-brand-blue/20 rounded-2xl blur-3xl" />

            {/* Portrait image */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="relative z-10 w-[90%] h-[90%] rounded-2xl overflow-hidden border border-brand-gold/30"
            >
              <img
                src="/MyImage.png"
                alt="Marwan Zidan"
                className="w-full h-full object-cover object-center"
              />
              {/* Subtle overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-brand-black/40 via-transparent to-transparent pointer-events-none" />
            </motion.div>

            {/* Diagonal accent lines */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-0 right-0 w-1 h-20 bg-gradient-to-b from-brand-gold to-transparent opacity-50" />
              <div className="absolute bottom-0 left-0 w-20 h-1 bg-gradient-to-r from-brand-blue to-transparent opacity-50" />
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <AnimatePresence>
        {showScroll && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
          >
            <span className="text-xs font-mono text-brand-text-secondary uppercase tracking-widest">
              Scroll to Explore
            </span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-6 h-10 border border-brand-gold/50 rounded-full flex items-start justify-center pt-2"
            >
              <span className="w-1 h-2 bg-brand-gold rounded-full" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
