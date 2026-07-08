// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { unified } from '@astrojs/markdown-remark';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { remarkReadingTime } from './src/lib/remark-reading-time.mjs';
import { SITE_URL } from './src/consts.ts';

// https://astro.build/config
export default defineConfig({
  site: SITE_URL,
  integrations: [mdx(), sitemap()],
  markdown: {
    // Custom remark/rehype plugins run on the classic unified processor.
    // @astrojs/mdx reads these same plugins from the processor for .mdx files.
    processor: unified({
      remarkPlugins: [remarkReadingTime],
      rehypePlugins: [
        rehypeSlug,
        [
          rehypeAutolinkHeadings,
          {
            behavior: 'append',
            properties: {
              className: ['heading-anchor'],
              ariaHidden: 'true',
              tabIndex: -1,
            },
            content: { type: 'text', value: '#' },
          },
        ],
      ],
    }),
    shikiConfig: {
      // Dual themes: light is applied inline, dark is exposed as CSS variables
      // and switched on via [data-theme='dark'] in global.css.
      themes: {
        light: 'github-light',
        dark: 'github-dark',
      },
    },
  },
});
