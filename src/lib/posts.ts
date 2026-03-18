import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeSlug from 'rehype-slug';
import rehypeStringify from 'rehype-stringify';

const postsDirectory = path.join(process.cwd(), 'content', 'posts');

export interface PostMeta {
  title: string;
  slug: string;
  date: string;
  category: string;
  metaDescription: string;
  excerpt: string;
}

export interface Post extends PostMeta {
  contentHtml: string;
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(postsDirectory)) return [];

  const files = fs.readdirSync(postsDirectory).filter((f) => f.endsWith('.md'));
  const posts: PostMeta[] = files.map((filename) => {
    const filePath = path.join(postsDirectory, filename);
    const fileContents = fs.readFileSync(filePath, 'utf-8');
    const { data } = matter(fileContents);
    return {
      title: data.title || '',
      slug: data.slug || filename.replace(/\.md$/, ''),
      date: data.date || '',
      category: data.category || '',
      metaDescription: data.metaDescription || '',
      excerpt: data.excerpt || '',
    };
  });

  return posts.sort((a, b) => (a.date > b.date ? -1 : 1));
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const allFiles = fs.existsSync(postsDirectory)
    ? fs.readdirSync(postsDirectory).filter((f) => f.endsWith('.md'))
    : [];

  for (const filename of allFiles) {
    const filePath = path.join(postsDirectory, filename);
    const fileContents = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(fileContents);
    const postSlug = data.slug || filename.replace(/\.md$/, '');

    if (postSlug === slug) {
      const result = await unified()
        .use(remarkParse)
        .use(remarkGfm)
        .use(remarkRehype, { allowDangerousHtml: true })
        .use(rehypeSlug)
        .use(rehypeStringify, { allowDangerousHtml: true })
        .process(content);

      return {
        title: data.title || '',
        slug: postSlug,
        date: data.date || '',
        category: data.category || '',
        metaDescription: data.metaDescription || '',
        excerpt: data.excerpt || '',
        contentHtml: result.toString(),
      };
    }
  }
  return null;
}

export function getPostsByCategory(category: string): PostMeta[] {
  return getAllPosts().filter((p) => p.category === category);
}

export function getAllCategories(): string[] {
  const cats = new Set(getAllPosts().map((p) => p.category));
  return Array.from(cats).sort();
}
