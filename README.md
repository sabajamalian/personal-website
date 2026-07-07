# personal-website

The code behind [saba.codes](https://saba.codes) — a professional blog on
GitHub, GitHub Copilot, AI, AI in software development, and the agentic SDLC.

Built with [Astro](https://astro.build) + MDX and deployed on Netlify. Posts are
designed to be code-heavy, example-heavy, link-heavy, and visualization-heavy.

## Tech stack

- **Astro** (static output) with **MDX** content
- **Content collections** with a typed frontmatter schema (`src/content.config.ts`)
- **Shiki** syntax highlighting (dual light/dark themes)
- **Mermaid** diagrams (rendered client-side, theme-aware)
- RSS feed, sitemap, and SEO/Open Graph tags
- Light/dark theme toggle

## Local development

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # production build to dist/
npm run preview   # preview the production build
```

Requires Node 22 (see `.nvmrc`).

## Project structure

```
src/
  content/blog/       # posts (*.mdx) — one file per post; _template.mdx to start
  content.config.ts   # blog collection + frontmatter schema
  components/          # UI + MDX components (Callout, Figure, Mermaid, ...)
  layouts/            # BaseLayout, PostLayout
  pages/              # index, blog/[...slug], tags/, rss.xml, 404
  lib/                # helpers + remark plugins
  styles/global.css   # theme variables + typography
  consts.ts           # site title, bio, social links
public/               # static assets copied as-is (images, favicon, robots.txt)
```

## Writing a post

Copy `src/content/blog/_template.mdx`, fill in the frontmatter, write the body,
and set `draft: false`. Full conventions (frontmatter fields, available MDX
components, image handling) are documented for both humans and Copilot in
[`.github/copilot-instructions.md`](.github/copilot-instructions.md).

## Deployment

Netlify builds with `npm run build` and publishes `dist/` (configured in
`netlify.toml`).
