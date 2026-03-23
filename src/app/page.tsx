import Link from 'next/link';
import { getAllPosts } from '@/lib/posts';
import { CATEGORY_DISPLAY_NAMES, CATEGORY_ICONS, type SportCategory } from '@/lib/categories';
import HeroBanner from '@/components/HeroBanner';

export default function HomePage() {
  const posts = getAllPosts();

  return (
    <>
      <h1 className="page-title">Kids Sports Equipment Reviews</h1>
      <p className="page-subtitle">
        Weekly expert reviews to help your young athlete find the best training
        gear.
      </p>

      {posts.length === 0 ? (
        <div className="empty-state">
          <p>No reviews yet. Check back soon!</p>
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
                  <span aria-hidden="true">{CATEGORY_ICONS[post.category as SportCategory]}</span>{' '}
                  {CATEGORY_DISPLAY_NAMES[post.category as SportCategory] ||
                    post.category}
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
