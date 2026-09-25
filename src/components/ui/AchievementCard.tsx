import { motion } from 'framer-motion';

interface AchievementCardProps {
  title: string;
  description: string;
  year?: string;
  category?: string;
  result?: string;
  url?: string;
  images?: string[];
  isHighlighted?: boolean;
  index?: number;
}

function assetPath(path: string) {
  const normalizedPath = path.replace(/^\//, '');
  const correctedPath = normalizedPath.startsWith('images/ECPC_')
    ? normalizedPath.replace('images/ECPC_', 'images/ECPC/ECPC_')
    : normalizedPath;
  return `${import.meta.env.BASE_URL}${correctedPath}`;
}

export default function AchievementCard({
  title,
  description,
  year,
  category,
  result,
  url,
  images = [],
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
      {images.length > 0 && (
        <div className="mb-6 grid grid-cols-2 gap-2 overflow-hidden rounded-lg">
          {images.map((image) => (
            <img key={image} src={assetPath(image)} alt="" className="aspect-[4/3] w-full object-cover" loading="lazy" />
          ))}
        </div>
      )}
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

      {result && <p className="mb-4 text-sm font-semibold text-brand-gold">{result}</p>}

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
      {url && url !== '#' && (
        <a href={url} target="_blank" rel="noreferrer" className="mt-5 inline-flex text-sm font-semibold text-brand-gold hover:text-brand-gold-bright">
          View achievement post →
        </a>
      )}
    </motion.div>
  );
}
