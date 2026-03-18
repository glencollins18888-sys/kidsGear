import Link from 'next/link';
import { getPostsByCategory, type PostMeta } from '@/lib/posts';
import { CATEGORY_ICONS, type SportCategory } from '@/lib/categories';

interface RelatedPostsProps {
  currentSlug: string;
  category: string;
}

export default function RelatedPosts({ currentSlug, category }: RelatedPostsProps) {
  const posts = getPostsByCategory(category).filter(
    (p: PostMeta) => p.slug !== currentSlug
  );

  if (posts.length === 0) return null;

  const icon = CATEGORY_ICONS[category as SportCategory] || '';

  return (
    <div className="related-posts">
      <h2 className="related-posts__title">More {icon} Reviews You Might Like</h2>
      <div className="related-posts__grid">
        {posts.slice(0, 3).map((post: PostMeta) => (
          <Link
            key={post.slug}
            href={`/posts/${post.slug}`}
            className="related-posts__card"
          >
            <span className="related-posts__card-title">{post.title}</span>
            <span className="related-posts__card-date">{post.date}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
