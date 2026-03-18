import Link from 'next/link';
import { getAllPosts, getAllCategories } from '@/lib/posts';
import { CATEGORY_DISPLAY_NAMES, type SportCategory } from '@/lib/categories';

export default function HomePage() {
  const posts = getAllPosts();
  const categories = getAllCategories();

  return (
    <>
      <h1 className="page-title">Kids Sports Equipment Reviews</h1>
      <p className="page-subtitle">
        Weekly expert reviews to help your young athlete find the best training
        gear.
      </p>

      {categories.length > 0 && (
        <div className="category-bar">
          {categories.map((cat) => (
            <Link key={cat} href={`/category/${cat}`}>
              {CATEGORY_DISPLAY_NAMES[cat as SportCategory] || cat}
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
                {CATEGORY_DISPLAY_NAMES[post.category as SportCategory] ||
                  post.category}
              </span>
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
