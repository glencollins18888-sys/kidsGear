import Link from 'next/link';
import type { Metadata } from 'next';
import { getPostsByCategory } from '@/lib/posts';
import {
  SPORTS_CATEGORIES,
  CATEGORY_DISPLAY_NAMES,
  CATEGORY_ICONS,
  type SportCategory,
} from '@/lib/categories';
import HeroBanner from '@/components/HeroBanner';

interface Props {
  params: Promise<{ category: string }>;
}

export function generateStaticParams() {
  return SPORTS_CATEGORIES.map((cat) => ({ category: cat }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const name =
    CATEGORY_DISPLAY_NAMES[category as SportCategory] || category;
  return {
    title: `Best ${name} Training Equipment for Kids`,
    description: `Expert reviews of the best ${name.toLowerCase()} training equipment for children.`,
    alternates: {
      canonical: `/category/${category}`,
    },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const name =
    CATEGORY_DISPLAY_NAMES[category as SportCategory] || category;
  const icon = CATEGORY_ICONS[category as SportCategory] || '';
  const posts = getPostsByCategory(category);

  return (
    <>
      <HeroBanner category={category} size="full" />

      <div className="category-bar">
        <Link href="/">All</Link>
        {SPORTS_CATEGORIES.map((cat) => (
          <Link
            key={cat}
            href={`/category/${cat}`}
            className={cat === category ? 'active' : ''}
          >
            <span aria-hidden="true">{CATEGORY_ICONS[cat]}</span> {CATEGORY_DISPLAY_NAMES[cat]}
          </Link>
        ))}
      </div>

      {posts.length === 0 ? (
        <div className="empty-state">
          <p>No {name.toLowerCase()} reviews yet. Check back soon!</p>
        </div>
      ) : (
        <div className="post-grid">
          {posts.map((post) => (
            <article key={post.slug} className="post-card">
              <Link href={`/posts/${post.slug}`} className="post-card-banner-link">
                <HeroBanner category={post.category} size="compact" />
              </Link>
              <div className="post-card-body">
                <span className="post-card-category">
                  <span aria-hidden="true">{icon}</span> {name}
                </span>
                <h2 className="post-card-title">
                  <Link href={`/posts/${post.slug}`}>{post.title}</Link>
                </h2>
                <p className="post-card-date">{post.date}</p>
                <p className="post-card-excerpt">{post.excerpt}</p>
                <Link href={`/posts/${post.slug}`} className="post-card-readmore">
                  Read Review &rarr;
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </>
  );
}
