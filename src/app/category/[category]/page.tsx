import Link from 'next/link';
import type { Metadata } from 'next';
import { getPostsByCategory } from '@/lib/posts';
import {
  SPORTS_CATEGORIES,
  CATEGORY_DISPLAY_NAMES,
  type SportCategory,
} from '@/lib/categories';

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
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const name =
    CATEGORY_DISPLAY_NAMES[category as SportCategory] || category;
  const posts = getPostsByCategory(category);

  return (
    <>
      <h1 className="page-title">Best {name} Equipment for Kids</h1>
      <p className="page-subtitle">
        All our {name.toLowerCase()} training equipment reviews.
      </p>

      <div className="category-bar">
        <Link href="/">All</Link>
        {SPORTS_CATEGORIES.map((cat) => (
          <Link
            key={cat}
            href={`/category/${cat}`}
            className={cat === category ? 'active' : ''}
          >
            {CATEGORY_DISPLAY_NAMES[cat]}
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
              <span className="post-card-category">{name}</span>
              <h2 className="post-card-title">
                <Link href={`/posts/${post.slug}`}>{post.title}</Link>
              </h2>
              <p className="post-card-date">{post.date}</p>
              <p className="post-card-excerpt">{post.excerpt}</p>
            </article>
          ))}
        </div>
      )}
    </>
  );
}
