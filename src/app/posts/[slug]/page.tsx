import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getAllPosts, getPostBySlug } from '@/lib/posts';
import { CATEGORY_DISPLAY_NAMES, CATEGORY_ICONS, type SportCategory } from '@/lib/categories';

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
    alternates: {
      canonical: `/posts/${slug}`,
    },
  };
}

function ArticleJsonLd({ post }: { post: { title: string; date: string; metaDescription: string; slug: string } }) {
  const siteUrl = process.env.SITE_URL || 'https://kids-gear.vercel.app';
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.metaDescription,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Organization',
      name: 'KidGear Reviews',
    },
    publisher: {
      '@type': 'Organization',
      name: 'KidGear Reviews',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteUrl}/posts/${post.slug}`,
    },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  return (
    <article>
      <ArticleJsonLd post={post} />
      <div className="article-header">
        <Link href="/" className="article-back">
          &larr; &#127968; All Reviews
        </Link>
        <div>
          <span className="article-category">
            <span aria-hidden="true">{CATEGORY_ICONS[post.category as SportCategory]}</span>{' '}
            {CATEGORY_DISPLAY_NAMES[post.category as SportCategory] ||
              post.category}
          </span>
        </div>
        <h1 className="article-title">{post.title}</h1>
        <p className="article-date">&#128197; {post.date}</p>
      </div>
      <div
        className="article-content"
        dangerouslySetInnerHTML={{ __html: post.contentHtml }}
      />
    </article>
  );
}
