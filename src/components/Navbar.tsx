import { useEffect, useMemo, useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import { motion } from 'framer-motion';

const navItems = [
  { number: '01', label: 'IDENTITY', href: '#identity' },
  { number: '02', label: 'ARSENAL', href: '#arsenal' },
  { number: '03', label: 'MISSIONS', href: '#missions' },
  { number: '04', label: 'JOURNEY', href: '#journey' },
  { number: '05', label: 'ACHIEVEMENTS', href: '#achievements' },
  { number: '06', label: 'CONTACT', href: '#contact' }
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('identity');

  useEffect(() => {
    const sections = navItems.map((item) => document.querySelector(item.href));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-50% 0px -50% 0px', threshold: 0.1 }
    );

    sections.forEach((section) => section && observer.observe(section));
    return () => sections.forEach((section) => section && observer.unobserve(section));
  }, []);

  const navLinks = useMemo(
    () =>
      navItems.map((item) => (
        <a
          key={item.href}
          href={item.href}
          className={`group flex items-baseline gap-2 text-sm transition ${
            activeSection === item.href.slice(1)
              ? 'text-brand-gold'
              : 'text-brand-text-secondary hover:text-brand-text'
          }`}
        >
          <span className="font-mono text-xs font-bold opacity-70 group-hover:opacity-100">
            {item.number}
          </span>
          <span className="uppercase tracking-wider font-semibold">{item.label}</span>
          {activeSection === item.href.slice(1) && (
            <motion.div
              layoutId="activeIndicator"
              className="h-px w-4 bg-brand-gold"
              transition={{ duration: 0.3 }}
            />
          )}
        </a>
      )),
    [activeSection]
  );

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-brand-warm/30 bg-brand-warm-dark/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-8">
        {/* Logo */}
        <a
          href="#home"
          className="text-lg font-bold tracking-tight text-brand-text transition hover:text-brand-gold group"
        >
          <span className="text-brand-gold">M</span>
          <span className="text-brand-gold group-hover:text-brand-blue transition">Z</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 lg:flex">{navLinks}</nav>

        {/* Resume Button */}
        <a
          href="#contact"
          className="hidden items-center gap-2 px-4 py-2 text-sm font-semibold text-brand-black bg-brand-gold hover:bg-brand-gold/90 rounded transition-colors lg:inline-flex"
        >
          CV
          <span>→</span>
        </a>

        {/* Mobile Menu Button */}
        <button
          className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-brand-gold/20 bg-brand-surface/50 text-brand-text transition hover:bg-brand-surface lg:hidden"
          onClick={() => setOpen((prev) => !prev)}
          aria-label="Toggle navigation menu"
          aria-expanded={open}
        >
          {open ? <FiX size={20} /> : <FiMenu size={20} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="border-t border-brand-gold/20 bg-brand-black/95 backdrop-blur-xl px-6 py-8 lg:hidden"
        >
          <div className="flex flex-col gap-6">
            {navItems.map((item, index) => (
              <a
                key={item.href}
                href={item.href}
                className="group flex items-baseline gap-3 transition"
                onClick={() => setOpen(false)}
              >
                <span className="text-xl font-bold text-brand-gold">{item.number}</span>
                <span className="text-base font-semibold text-brand-text uppercase tracking-widest group-hover:text-brand-gold transition">
                  {item.label}
                </span>
              </a>
            ))}
            <a
              href="#contact"
              className="inline-flex w-full items-center justify-center gap-2 px-4 py-3 text-base font-semibold text-brand-black bg-brand-gold hover:bg-brand-gold/90 rounded transition-colors mt-4"
              onClick={() => setOpen(false)}
            >
              DOWNLOAD CV
              <span>→</span>
            </a>
          </div>
        </motion.div>
      )}
    </header>
  );
}
