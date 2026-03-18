import Anthropic from '@anthropic-ai/sdk';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const SPORTS_CATEGORIES = [
  'soccer',
  'basketball',
  'baseball',
  'swimming',
  'gymnastics',
  'tennis',
  'football',
  'track-and-field',
  'volleyball',
  'martial-arts',
] as const;

const CATEGORY_DISPLAY_NAMES: Record<string, string> = {
  soccer: 'Soccer',
  basketball: 'Basketball',
  baseball: 'Baseball',
  swimming: 'Swimming',
  gymnastics: 'Gymnastics',
  tennis: 'Tennis',
  football: 'Football',
  'track-and-field': 'Track & Field',
  volleyball: 'Volleyball',
  'martial-arts': 'Martial Arts',
};

const AFFILIATE_TAG = 'kidsgear0c-20';
const postsDir = path.join(process.cwd(), 'content', 'posts');

function getNextCategory(): string {
  const files = fs.existsSync(postsDir)
    ? fs.readdirSync(postsDir).filter((f) => f.endsWith('.md'))
    : [];

  if (files.length === 0) return SPORTS_CATEGORIES[0];

  // Find the most recent post's category
  let latestDate = '';
  let latestCategory = '';

  for (const file of files) {
    const content = fs.readFileSync(path.join(postsDir, file), 'utf-8');
    const { data } = matter(content);
    if (data.date && data.date > latestDate) {
      latestDate = data.date;
      latestCategory = data.category;
    }
  }

  const index = SPORTS_CATEGORIES.indexOf(
    latestCategory as (typeof SPORTS_CATEGORIES)[number]
  );
  if (index === -1) return SPORTS_CATEGORIES[0];
  return SPORTS_CATEGORIES[(index + 1) % SPORTS_CATEGORIES.length];
}

async function generatePost() {
  const category = getNextCategory();
  const displayName = CATEGORY_DISPLAY_NAMES[category];
  const today = new Date().toISOString().split('T')[0];

  const client = new Anthropic();

  const systemPrompt = `You are a friendly, knowledgeable children's sports equipment reviewer. You write helpful, parent-friendly product reviews that help families choose the best training equipment for their kids.

Your reviews are:
- Practical and honest, highlighting both pros and cons
- Age-appropriate with clear age recommendations
- Focused on safety, durability, and value for money
- SEO-optimized with proper heading hierarchy (H2 for product names, H3 for subsections)

IMPORTANT: Output ONLY the markdown content. Start with the frontmatter delimiters (---).`;

  const userPrompt = `Write a product review article about the best ${displayName} training equipment for kids.

The article must follow this EXACT format:

---
title: "Best ${displayName} Training Equipment for Kids in ${today.slice(0, 4)}"
slug: "best-${category}-training-equipment-kids-${today.slice(0, 4)}"
date: "${today}"
category: "${category}"
metaDescription: "Discover the top ${displayName.toLowerCase()} training tools for children. Expert reviews with pros, cons, and age recommendations."
excerpt: "A comprehensive guide to the best ${displayName.toLowerCase()} training equipment for young athletes, with detailed reviews and buying advice."
---

## Introduction
[2-3 paragraphs introducing why good ${displayName.toLowerCase()} equipment matters for kids]

Then review 4 products. For each product use this format:

## [Product Name]

**Best for:** [age range, e.g., Ages 6-12]

[2-3 sentence description of the product and what makes it good for kids]

**Pros:**
- [pro 1]
- [pro 2]
- [pro 3]

**Cons:**
- [con 1]
- [con 2]

[Check Price on Amazon](https://www.amazon.com/s?k=[URL-encoded+product+name]&tag=${AFFILIATE_TAG})

---

After all products, add:

## Buying Guide

[3-4 paragraphs with tips on what to look for when buying ${displayName.toLowerCase()} equipment for kids - size, safety, quality, age-appropriateness]

## Final Verdict

[1-2 paragraphs summarizing the best picks and who each product is best for]

Make the product names realistic and specific. Write naturally and helpfully.

IMPORTANT: For each Amazon link, replace [URL-encoded+product+name] with the actual product name URL-encoded with + signs (e.g., "SKLZ+Star-Kick+Solo+Trainer"). This creates a working Amazon search link for the product.`;

  console.log(`Generating ${displayName} review for ${today}...`);

  const response = await client.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 4000,
    system: systemPrompt,
    messages: [{ role: 'user', content: userPrompt }],
  });

  const text =
    response.content[0].type === 'text' ? response.content[0].text : '';

  if (!text.trim()) {
    console.error('Empty response from API');
    process.exit(1);
  }

  // Ensure the content starts with frontmatter
  const markdown = text.trim().startsWith('---') ? text.trim() : `---\n${text.trim()}`;

  // Validate frontmatter parses correctly
  const { data } = matter(markdown);
  if (!data.title || !data.slug) {
    console.error('Invalid frontmatter in generated content');
    console.error('Generated content:', markdown.slice(0, 500));
    process.exit(1);
  }

  const filename = `${today}-${data.slug}.md`;
  const filePath = path.join(postsDir, filename);

  fs.mkdirSync(postsDir, { recursive: true });
  fs.writeFileSync(filePath, markdown, 'utf-8');

  console.log(`Created: ${filename}`);
  console.log(`Category: ${displayName}`);
  console.log(`Title: ${data.title}`);
}

generatePost().catch((err) => {
  console.error('Failed to generate post:', err.message);
  process.exit(1);
});
