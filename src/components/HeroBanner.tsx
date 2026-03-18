import {
  CATEGORY_ICONS,
  CATEGORY_COLORS,
  CATEGORY_DISPLAY_NAMES,
  type SportCategory,
} from '@/lib/categories';

interface HeroBannerProps {
  category: string;
  size?: 'compact' | 'full';
  title?: string;
}

export default function HeroBanner({
  category,
  size = 'full',
  title,
}: HeroBannerProps) {
  const cat = category as SportCategory;
  const [colorFrom, colorTo] = CATEGORY_COLORS[cat] || ['#2563eb', '#1d4ed8'];
  const icon = CATEGORY_ICONS[cat] || '';
  const name = CATEGORY_DISPLAY_NAMES[cat] || category;

  return (
    <div
      className={`hero-banner hero-banner--${size}`}
      style={{
        background: `linear-gradient(135deg, ${colorFrom} 0%, ${colorTo} 100%)`,
      }}
    >
      <span className="hero-banner__icon" aria-hidden="true">
        {icon}
      </span>
      <span className="hero-banner__label">{title || name}</span>
    </div>
  );
}
