# CatNote

CatNote is a free technical documentation site rebuilt with VitePress.

The project is now positioned as a content-first knowledge base. The old Next.js commercial structure, download pages, request-access flow, and download package validation logic have been removed.

## Development

```bash
npm install
npm run dev
```

Build the static site:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Vercel

Use these Vercel project settings:

```text
Build Command: npm run build
Output Directory: docs/.vitepress/dist
```

The same settings are also captured in `vercel.json`.

## Security Audit

`npm audit` currently reports 3 moderate advisories from the VitePress dependency chain:

```text
vitepress -> vite -> esbuild
```

The advisory concerns the development server and npm reports no available fix for the installed VitePress line. Do not run `npm audit fix --force` for this without checking compatibility first.

## Structure

```text
docs/
  index.md
  software-engineering/
    index.md
    introduction.md
    agile.md
    requirements.md
    object-oriented-design.md
  java/
    index.md
  mathematics/
    index.md
  .vitepress/
    config.ts
    theme/
      index.ts
      custom.css
```
