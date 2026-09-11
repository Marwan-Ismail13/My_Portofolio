import { motion } from 'framer-motion';
import { FaEnvelope, FaMapMarkerAlt, FaPhone, FaLinkedin, FaGithub } from 'react-icons/fa';
import { usePortfolio } from '../data/PortfolioProvider';

export default function Contact() {
  const { content: { personal, socials } } = usePortfolio();
  return (
    <section id="contact" className="relative overflow-hidden py-20 sm:py-32 px-5 sm:px-8">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(90,64,40,0.18),transparent_55%)]" />
      <div className="relative mx-auto max-w-7xl">
        <div className="mb-16">
          <p className="text-xs sm:text-sm uppercase tracking-widest text-brand-text-secondary mb-4">Contact</p>
          <h2 className="max-w-4xl text-[clamp(2.25rem,6vw,4.5rem)] font-black text-brand-text tracking-tighter leading-tight mb-6">Let's start your next software journey together.</h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55 }}
          className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]"
        >
          <div className="rounded-xl border border-brand-surface bg-brand-surface/20 p-8">
          <p className="text-xs sm:text-sm uppercase tracking-widest text-brand-gold mb-6">Contact details</p>
          <div className="mt-8 space-y-4 text-sm text-brand-text-secondary">
            <div className="flex items-center gap-4 rounded-lg border border-brand-surface bg-brand-surface/30 p-4 hover:border-brand-gold/50 hover:bg-brand-surface/50 transition">
              <FaPhone className="text-brand-gold text-lg flex-shrink-0" />
              <span className="text-brand-text">{personal.phone}</span>
            </div>
            <div className="flex items-center gap-4 rounded-lg border border-brand-surface bg-brand-surface/30 p-4 hover:border-brand-gold/50 hover:bg-brand-surface/50 transition">
              <FaEnvelope className="text-brand-gold text-lg flex-shrink-0" />
              <a href={`mailto:${personal.email}`} className="min-w-0 break-words text-brand-text hover:text-brand-gold transition">
                {personal.email}
              </a>
            </div>
            <div className="flex items-center gap-4 rounded-lg border border-brand-surface bg-brand-surface/30 p-4 hover:border-brand-gold/50 hover:bg-brand-surface/50 transition">
              <FaLinkedin className="text-brand-gold text-lg flex-shrink-0" />
              <a href={socials.linkedin} className="min-w-0 break-words text-brand-text hover:text-brand-gold transition" target="_blank" rel="noreferrer">
                linkedin.com/in/marwan-ismail
              </a>
            </div>
            <div className="flex items-center gap-4 rounded-lg border border-brand-surface bg-brand-surface/30 p-4 hover:border-brand-gold/50 hover:bg-brand-surface/50 transition">
              <FaGithub className="text-brand-gold text-lg flex-shrink-0" />
              <a href={socials.github} className="min-w-0 break-words text-brand-text hover:text-brand-gold transition" target="_blank" rel="noreferrer">
                github.com/Marwan-Ismail13
              </a>
            </div>
            <div className="flex items-center gap-4 rounded-lg border border-brand-surface bg-brand-surface/30 p-4">
              <FaMapMarkerAlt className="text-brand-gold text-lg flex-shrink-0" />
              <span className="text-brand-text">{personal.location}</span>
            </div>
          </div>
          <div className="mt-8 rounded-lg border border-brand-surface bg-brand-surface/30 p-6">
            <p className="text-xs uppercase tracking-widest text-brand-gold mb-2">Download CV</p>
            <p className="text-sm leading-6 text-brand-text-secondary mb-6">A professional resume ready to share with recruiters and hiring managers.</p>
            <a
              href={socials.resume}
              target="_blank"
              rel="noreferrer"
              className="inline-flex rounded-lg bg-brand-gold px-6 py-3 text-sm font-semibold text-brand-black hover:bg-brand-gold/90 transition"
            >
              Download CV →
            </a>
          </div>
        </div>

          <div className="rounded-xl border border-brand-surface bg-brand-surface/20 p-8">
          <p className="text-xs sm:text-sm uppercase tracking-widest text-brand-gold mb-6">Send a message</p>
          <form className="mt-8 space-y-5">
            <div>
              <label className="text-sm text-brand-text-secondary uppercase tracking-wide" htmlFor="name">
                Name
              </label>
              <input
                id="name"
                type="text"
                className="mt-3 w-full rounded-lg border border-brand-surface bg-brand-surface/30 px-4 py-3 text-brand-text outline-none focus:border-brand-gold/70 focus:bg-brand-surface/50 transition"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="text-sm text-brand-text-secondary uppercase tracking-wide" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                className="mt-3 w-full rounded-lg border border-brand-surface bg-brand-surface/30 px-4 py-3 text-brand-text outline-none focus:border-brand-gold/70 focus:bg-brand-surface/50 transition"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="text-sm text-brand-text-secondary uppercase tracking-wide" htmlFor="message">
                Message
              </label>
              <textarea
                id="message"
                className="mt-3 h-36 w-full rounded-lg border border-brand-surface bg-brand-surface/30 px-4 py-3 text-brand-text outline-none focus:border-brand-gold/70 focus:bg-brand-surface/50 transition"
                placeholder="Tell me about your opportunity"
              />
            </div>
            <button type="submit" className="inline-flex rounded-full bg-brand-gold px-6 py-3 text-sm font-semibold text-brand-black shadow-glow hover:bg-brand-gold/90 transition">
              Send Message
            </button>
          </form>
        </div>
      </motion.div>
      </div>
    </section>
  );
}
