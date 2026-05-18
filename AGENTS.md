<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Standalone solution

This is a standalone Next.js sample app — not part of a monorepo. All dependencies are resolved from npm. There are no local `file:` references or workspace packages.

# Optimizely CMS SDK

This app uses `@optimizely/cms-sdk` (public npm, `node_modules/@optimizely/cms-sdk`). The SDK APIs in your training data may be wrong — read `node_modules/@optimizely/cms-sdk/README.md` before writing any SDK code.

# Content types and registries

`src/content-types/` is managed by `@optimizely/cms-cli` via `npx @optimizely/cms-cli config pull`. Do not manually edit files the CLI owns without understanding the pull/push workflow (see README.md).

Four registry files are kept in sync by `npm run sync` — do not edit them by hand:
- `src/content-types/index.ts`
- `src/content-types/displayTemplates/index.ts`
- `src/components/index.ts`
- `src/optimizely.ts` (resolver entries only — the SDK init boilerplate is manual)
