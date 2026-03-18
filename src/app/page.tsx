import Link from 'next/link';
import { getAllPosts, getAllCategories } from '@/lib/posts';
import { CATEGORY_DISPLAY_NAMES, CATEGORY_ICONS, type SportCategory } from '@/lib/categories';

export default function HomePage() {
  const posts = getAllPosts();
  const categories = getAllCategories();

  return (
    <>
      <h1 className="page-title">&#127941; Kids Sports Equipment Reviews</h1>
      <p className="page-subtitle">
        &#128221; Weekly expert reviews to help your young athlete find the best training
        gear.
      </p>

      {categories.length > 0 && (
        <div className="category-bar">
          {categories.map((cat) => (
            <Link key={cat} href={`/category/${cat}`}>
              <span aria-hidden="true">{CATEGORY_ICONS[cat as SportCategory]}</span> {CATEGORY_DISPLAY_NAMES[cat as SportCategory] || cat}
            </Link>
          ))}
        </div>
      )}

      {posts.length === 0 ? (
        <div className="empty-state">
          <p>No reviews yet. Check back soon!</p>
        </div>
      ) : (
        <div className="post-grid">
          {posts.map((post) => (
            <article key={post.slug} className="post-card">
              <span className="post-card-category">
                <span aria-hidden="true">{CATEGORY_ICONS[post.category as SportCategory]}</span>{' '}
                {CATEGORY_DISPLAY_NAMES[post.category as SportCategory] ||
                  post.category}
              </span>
              <h2 className="post-card-title">
                <Link href={`/posts/${post.slug}`}>{post.title}</Link>
              </h2>
              <p className="post-card-date">&#128197; {post.date}</p>
              <p className="post-card-excerpt">{post.excerpt}</p>
            </article>
          ))}
        </div>
      )}
    </>
  );
}
