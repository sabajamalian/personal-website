# saba.codes — repository instructions for Copilot

This repo is a **static Astro + MDX blog** deployed on Netlify. It focuses on
GitHub, GitHub Copilot, AI, AI in software development, and the agentic SDLC.

## House style for posts

Posts should be **code-heavy, example-heavy, link-heavy, and visualization-heavy,
and light on prose.** Concretely:

- Lead with a short paragraph, then get to code/examples fast.
- Prefer a runnable snippet or a diagram over three paragraphs of explanation.
- Link to primary sources (official docs, specs, repos) instead of paraphrasing.
- Use diagrams (Mermaid) for any flow, architecture, or sequence.
- Keep sections short with descriptive `##` headings.

## How to add a new post

1. Copy `src/content/blog/_template.mdx` to a new file, e.g.
   `src/content/blog/my-post-slug.mdx`. The file name (minus extension) becomes
   the URL: `/blog/my-post-slug/`.
2. Fill in the frontmatter (schema is enforced at build time by
   `src/content.config.ts`):

   | Field         | Required | Notes                                             |
   | ------------- | -------- | ------------------------------------------------- |
   | `title`       | yes      | Post title                                        |
   | `description` | yes      | 1-2 sentences; used in cards, SEO, and RSS        |
   | `pubDate`     | yes      | `YYYY-MM-DD`                                       |
   | `updatedDate` | no       | `YYYY-MM-DD`                                       |
   | `tags`        | no       | Array of human strings, e.g. `['GitHub Copilot']` |
   | `heroImage`   | no       | Relative image import, optimized at build         |
   | `heroAlt`     | no       | Alt text for the hero image                       |
   | `draft`       | no       | `true` hides the post in production               |

3. Write the body in Markdown/MDX. Files starting with `_` are ignored.
4. Set `draft: false` when ready to publish.
5. Run `npm run build` to verify (this also type-checks the frontmatter).

## Components available in MDX

These are injected globally, so **no import is needed** inside a post:

- `<Callout type="note|tip|warning|important" title="...">...</Callout>`
- `<Figure src="/assets/x.png" alt="..." caption="..." />` — `src` is a
  `/public` path or external URL.
- `<Mermaid caption="..." code={` ... `} />` — pass the diagram as a template
  literal so arrows and indentation are preserved.

Fenced code blocks are syntax-highlighted automatically (Shiki, dual light/dark
themes). Add a language after the opening fence.

## Images

- Simple/static images: drop them in `public/assets/` and reference with a
  Figure using an absolute path (`/assets/name.png`).
- Optimized hero images: import relatively via frontmatter `heroImage`.

## Conventions and guardrails

- Do **not** edit anything in `dist/` (build output) or `.astro/` (generated).
- Site-wide constants (title, bio, socials) live in `src/consts.ts`.
- Tag URLs are slugified automatically; write tags as normal human strings.
- Always finish by running `npm run build`. A green build means content
  collections validated and every page compiled.

## Useful commands

```bash
npm run dev       # local dev server with hot reload
npm run build     # production build to dist/ (also validates content)
npm run preview   # serve the built site locally
```
