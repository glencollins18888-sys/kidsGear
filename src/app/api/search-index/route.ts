import { NextResponse } from 'next/server';
import { getAllPosts } from '@/lib/posts';

export async function GET() {
  const posts = getAllPosts().map((post) => ({
    title: post.title,
    slug: post.slug,
    category: post.category,
    excerpt: post.excerpt,
  }));
  return NextResponse.json(posts);
}
