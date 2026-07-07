import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

// Blog posts live in src/content/blog as Markdown/MDX files.
// Files whose name starts with "_" (e.g. _template.mdx) are ignored.
const blog = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/blog' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      tags: z.array(z.string()).default([]),
      heroImage: image().optional(),
      heroAlt: z.string().optional(),
      draft: z.boolean().default(false),
    }),
});

export const collections = { blog };
