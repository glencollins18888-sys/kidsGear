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

// --- Amazon Link Validation ---

const USER_AGENT =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

interface LinkValidation {
  url: string;
  productName: string;
  valid: boolean;
  fallbackUrl?: string;
}

async function validateAmazonLink(url: string): Promise<boolean> {
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: { 'User-Agent': USER_AGENT },
      redirect: 'follow',
    });

    // If we got redirected to a search page, the product doesn't exist
    const finalUrl = response.url;
    if (finalUrl.includes('/s?') || finalUrl.includes('/s/')) {
      return false;
    }

    // Check for 404 or other error status
    if (!response.ok) {
      return false;
    }

    // Read a portion of the body to check for "currently unavailable" signals
    const text = await response.text();
    if (
      text.includes('currently unavailable') &&
      text.includes('We don')
    ) {
      return false;
    }

    // Check for Amazon's dog page (404)
    if (text.includes('SORRY') && text.includes('we couldn')) {
      return false;
    }

    return true;
  } catch {
    return false;
  }
}

function buildSearchUrl(productName: string): string {
  const encoded = productName.replace(/\s+/g, '+').replace(/[()]/g, '');
  return `https://www.amazon.com/s?k=${encoded}&tag=${AFFILIATE_TAG}`;
}

function extractProductNameFromContext(
  markdown: string,
  linkIndex: number
): string {
  // Look backwards from the link position to find the nearest ## heading
  const before = markdown.slice(0, linkIndex);
  const allHeadings = [...before.matchAll(/^## (.+)$/gm)];
  if (allHeadings.length > 0) {
    const lastHeading = allHeadings[allHeadings.length - 1];
    return lastHeading[1].trim();
  }
  return 'kids training equipment';
}

async function validateAndFixLinks(
  markdown: string
): Promise<{ fixed: string; results: LinkValidation[] }> {
  const linkRegex =
    /\[Check Price on Amazon\]\((https:\/\/www\.amazon\.com\/dp\/[^\s)]+)\)/g;
  const results: LinkValidation[] = [];
  let fixed = markdown;

  // Collect all links with their positions
  const links: { url: string; fullMatch: string; index: number }[] = [];
  let match;
  while ((match = linkRegex.exec(markdown)) !== null) {
    links.push({
      url: match[1],
      fullMatch: match[0],
      index: match.index,
    });
  }

  if (links.length === 0) {
    console.log('  No /dp/ Amazon links found to validate.');
    return { fixed, results };
  }

  console.log(`  Validating ${links.length} Amazon link(s)...`);

  for (const link of links) {
    const productName = extractProductNameFromContext(markdown, link.index);

    // Rate limit: wait between requests
    await sleep(1500);

    const isValid = await validateAmazonLink(link.url);

    if (isValid) {
      console.log(`  ✓ Valid: ${productName}`);
      results.push({ url: link.url, productName, valid: true });
    } else {
      const fallbackUrl = buildSearchUrl(productName);
      console.log(
        `  ✗ Broken: ${productName} → falling back to search URL`
      );
      results.push({
        url: link.url,
        productName,
        valid: false,
        fallbackUrl,
      });

      // Replace the /dp/ link with a search URL
      const newLink = `[Check Price on Amazon](${fallbackUrl})`;
      fixed = fixed.replace(link.fullMatch, newLink);
    }
  }

  return { fixed, results };
}

// Also handle search-style links (validate they at least have a proper search term)
function validateSearchLinks(markdown: string): string {
  // Ensure search links have proper encoding
  const searchLinkRegex =
    /\[Check Price on Amazon\]\((https:\/\/www\.amazon\.com\/s\?k=[^\s)]+)\)/g;
  let match;
  while ((match = searchLinkRegex.exec(markdown)) !== null) {
    const url = match[1];
    // Make sure affiliate tag is present
    if (!url.includes(`tag=${AFFILIATE_TAG}`)) {
      const separator = url.includes('?') ? '&' : '?';
      const newUrl = `${url}${separator}tag=${AFFILIATE_TAG}`;
      markdown = markdown.replace(url, newUrl);
    }
  }
  return markdown;
}

// --- Validate Existing Posts ---

async function validateExistingPosts(fix: boolean): Promise<void> {
  if (!fs.existsSync(postsDir)) {
    console.log('No posts directory found.');
    return;
  }

  const files = fs.readdirSync(postsDir).filter((f) => f.endsWith('.md'));
  if (files.length === 0) {
    console.log('No posts found.');
    return;
  }

  console.log(`\nScanning ${files.length} post(s) for broken Amazon links...\n`);

  let totalBroken = 0;
  let totalFixed = 0;

  for (const file of files) {
    const filePath = path.join(postsDir, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    console.log(`📄 ${file}`);

    const { fixed, results } = await validateAndFixLinks(content);

    const broken = results.filter((r) => !r.valid);
    totalBroken += broken.length;

    if (broken.length === 0 && results.length > 0) {
      console.log(`  All ${results.length} link(s) valid ✓\n`);
    } else if (results.length === 0) {
      // Check for search-style links
      const searchLinks = content.match(
        /\[Check Price on Amazon\]\(https:\/\/www\.amazon\.com\/s\?/g
      );
      if (searchLinks) {
        console.log(
          `  ${searchLinks.length} search-style link(s) (always valid) ✓\n`
        );
      } else {
        console.log('  No Amazon links found.\n');
      }
    } else {
      console.log(
        `  ${broken.length}/${results.length} link(s) broken\n`
      );
    }

    if (fix && broken.length > 0) {
      const ensuredFixed = validateSearchLinks(fixed);
      fs.writeFileSync(filePath, ensuredFixed, 'utf-8');
      totalFixed += broken.length;
      console.log(`  → Fixed ${broken.length} link(s) in ${file}\n`);
    }
  }

  console.log('─'.repeat(50));
  console.log(
    `Summary: ${totalBroken} broken link(s) found across ${files.length} post(s).`
  );
  if (fix && totalFixed > 0) {
    console.log(`Fixed: ${totalFixed} link(s) updated to search URLs.`);
  } else if (totalBroken > 0 && !fix) {
    console.log('Run with --fix to automatically repair broken links.');
  }
}

// --- Post Generation ---

function getNextCategory(): string {
  const files = fs.existsSync(postsDir)
    ? fs.readdirSync(postsDir).filter((f) => f.endsWith('.md'))
    : [];

  if (files.length === 0) return SPORTS_CATEGORIES[0];

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
  let markdown = text.trim().startsWith('---') ? text.trim() : `---\n${text.trim()}`;

  // Validate frontmatter parses correctly
  const { data } = matter(markdown);
  if (!data.title || !data.slug) {
    console.error('Invalid frontmatter in generated content');
    console.error('Generated content:', markdown.slice(0, 500));
    process.exit(1);
  }

  // Validate Amazon links before saving
  console.log('\nValidating Amazon links...');
  const { fixed, results } = await validateAndFixLinks(markdown);
  markdown = validateSearchLinks(fixed);

  const validCount = results.filter((r) => r.valid).length;
  const brokenCount = results.filter((r) => !r.valid).length;
  if (results.length > 0) {
    console.log(
      `\n  Links: ${validCount} valid, ${brokenCount} replaced with search URLs`
    );
  }

  const filename = `${today}-${data.slug}.md`;
  const filePath = path.join(postsDir, filename);

  fs.mkdirSync(postsDir, { recursive: true });
  fs.writeFileSync(filePath, markdown, 'utf-8');

  console.log(`\nCreated: ${filename}`);
  console.log(`Category: ${displayName}`);
  console.log(`Title: ${data.title}`);
}

// --- CLI Entry Point ---

const args = process.argv.slice(2);

if (args.includes('--validate-existing')) {
  const fix = args.includes('--fix');
  validateExistingPosts(fix).catch((err) => {
    console.error('Validation failed:', err.message);
    process.exit(1);
  });
} else {
  generatePost().catch((err) => {
    console.error('Failed to generate post:', err.message);
    process.exit(1);
  });
}
