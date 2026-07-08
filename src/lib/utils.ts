import type { CollectionEntry } from 'astro:content';

/** Convert a human tag ("GitHub Copilot") into a URL slug ("github-copilot"). */
export function slugifyTag(tag: string): string {
  return tag
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/** Canonical URL path for a blog post. */
export function postUrl(id: string): string {
  return `/blog/${id}/`;
}

/** Published, non-draft posts sorted newest-first. Drafts are hidden in production. */
export function sortPosts(
  posts: CollectionEntry<'blog'>[]
): CollectionEntry<'blog'>[] {
  return posts
    .filter((p) => import.meta.env.DEV || !p.data.draft)
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

/** Unique tags across posts with their post counts, sorted by frequency. */
export function collectTags(
  posts: CollectionEntry<'blog'>[]
): { tag: string; slug: string; count: number }[] {
  const map = new Map<string, { tag: string; slug: string; count: number }>();
  for (const post of posts) {
    for (const tag of post.data.tags ?? []) {
      const slug = slugifyTag(tag);
      const existing = map.get(slug);
      if (existing) existing.count += 1;
      else map.set(slug, { tag, slug, count: 1 });
    }
  }
  return [...map.values()].sort((a, b) => b.count - a.count);
}
