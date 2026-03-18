import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getAllPosts, getPostBySlug } from '@/lib/posts';
import { CATEGORY_DISPLAY_NAMES, type SportCategory } from '@/lib/categories';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.metaDescription,
    openGraph: {
      title: post.title,
      description: post.metaDescription,
      type: 'article',
      publishedTime: post.date,
    },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  return (
    <article>
      <div className="article-header">
        <Link href="/" className="article-back">
          &larr; All Reviews
        </Link>
        <div>
          <span className="article-category">
            {CATEGORY_DISPLAY_NAMES[post.category as SportCategory] ||
              post.category}
          </span>
        </div>
        <h1 className="article-title">{post.title}</h1>
        <p className="article-date">{post.date}</p>
      </div>
      <div
        className="article-content"
        dangerouslySetInnerHTML={{ __html: post.contentHtml }}
      />
    </article>
  );
}
