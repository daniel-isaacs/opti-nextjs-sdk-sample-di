# SDK/CLI Upgrade Runbook — `@optimizely/cms-sdk` & `@optimizely/cms-cli`

Reference guide for upgrading the Optimizely CMS SDK and CLI packages.

---

## 1. Pin the new versions in `package.json`

Use pinned (exact) versions, not `^`, to avoid unintentional drift:

```json
"@optimizely/cms-sdk": "3.x.x",
"@optimizely/cms-cli": "3.x.x"
```

Run `npm install`.

---

## 2. Review the release notes

Read the GitHub releases for every version between your current and target. For each release, look for:

- **New required fields** on SDK types (e.g. `buildConfig.locale` became required in 2.1.0)
- **Renamed exports** (e.g. `PreviewComponent` → `NextPreviewComponent` in 2.2.0)
- **New features** worth adopting (e.g. `contract()`, `extends` on content types in 2.2.0)
- **Breaking changes** that affect query generation or type inference

> **The bundled docs lie about the target version.** `node_modules/@optimizely/cms-sdk/README.md`
> and its `docs/` reflect whatever version is *currently installed*, not the one you're
> upgrading to. Read the GitHub release notes (`gh release view "@optimizely/cms-sdk@X.Y.Z"
> --repo episerver/content-js-sdk"`) and the live `docs/*.md` on that repo's `main` branch
> for the target version instead — only re-read the local copy after `npm install` bumps it.

---

## 3. Fix breaking API changes (version-specific examples)

### `content`/`contentReference` properties must be constrained — since 3.0.0

`config push` now rejects (not just warns on) a `content` or `contentReference` property —
or array item — that has no `contentType`, or an empty `allowedTypes`/`restrictedTypes`.
Give every one a single form of constraint before pushing:

```ts
// Rejected
properties: {
  mainContent: { type: 'content' },                 // missing constraints
  gallery: { type: 'content', allowedTypes: [] },    // empty constraints
}

// Accepted
properties: {
  mainContent: { type: 'content', allowedTypes: [TeaserCT] },
  gallery: { type: 'content', restrictedTypes: [FolderCT] },
}
```

### `'standard'` RichText preset removed — since 3.0.0

`RICHTEXT_PRESET` is now `'default' | 'expanded' | 'minimal'`. Replace any
`editorSettings: { preset: 'standard' }` with `preset: 'default'`.

### RichText now fetches `json` only by default — since 3.0.0

Queries used to select both `html` and `json` for every RichText property; `html` now
comes back `undefined` unless you opt back in. Components using the SDK's `<RichText>`
need no change (it reads `json`). Anything reading `.html` directly (e.g.
`dangerouslySetInnerHTML`) needs `fragment.richTextFormat: 'html'` or `'both'` — see below.

### `GraphClient`/`config()` options regrouped into `fragment`/`query` — since 3.0.0

Options that used to sit flat on `new GraphClient(apiKey, options)` or `config(options)`
now live under `fragment` (fixed for the client's lifetime; shapes the generated query) or
`query` (per-request defaults, overridable per call). TypeScript flags anything left flat.

```ts
// Before
new GraphClient(apiKey, {
  richTextFormat: 'json',
  compositionDepth: 4,
  maxFragmentThreshold: 100,
  cache: true,
  slot: 'Current',
  host: process.env.APPLICATION_HOST,
});

// After
new GraphClient(apiKey, {
  fragment: {
    richTextFormat: 'json',
    compositionDepth: 4,
    maxThreshold: 100, // renamed from maxFragmentThreshold
  },
  query: {
    cache: true,
    slot: 'Current',
    host: process.env.APPLICATION_HOST,
  },
});
```

`dam` (DAM asset fragment inclusion) moves into `fragment` too, and is no longer overridable
per request — it shapes the generated query for the client's lifetime.

### `buildConfig.locale` — required since 2.1.0

Add the field to `optimizely.config.mjs`:

```js
export default buildConfig({
  components: [...],
  locale: ['en'],      // required — match your CMS instance locales
  propertyGroups: [...],
});
```

### `NextPreviewComponent` — replaces `PreviewComponent` in 2.2.0

In `src/app/preview/page.tsx`:

```tsx
// Before
import { PreviewComponent } from '@optimizely/cms-sdk/react/client';

// After
import { NextPreviewComponent } from '@optimizely/cms-sdk/react/nextjs';

<NextPreviewComponent />
```

`NextPreviewComponent` uses `router.refresh()` for same-URL saves and `router.push()` for URL changes.

---

## 4. Fix TypeScript errors from `InferFromDisplayTemplate`

The SDK's `EditorType = 'select' | 'checkbox' | string` causes display settings choice values to resolve to `never` when narrowed. Cast to avoid TS errors:

```tsx
// Before (TS2367 / TS2678)
const layout = displaySettings?.imageLayout ?? 'image_top';

// After
const layout = (displaySettings?.imageLayout ?? 'image_top') as string;
```

Apply this pattern wherever a display template setting is used in a `switch` or comparison.

---

## 5. Update `cms:push` / `cms:pull` scripts

Ensure `package.json` has these scripts:

```json
"cms:push":       "optimizely-cms-cli config push ./optimizely.config.mjs",
"cms:push:force": "optimizely-cms-cli config push ./optimizely.config.mjs --force",
"cms:pull":       "optimizely-cms-cli config pull --output ./src/content-types --group && npm run sync"
```

`--group` (added in 2.2.0) separates content types and display templates into individual files.
`cms:pull` chains `npm run sync` on afterward — it's fast, idempotent, and additive-only, and
skipping it silently breaks registration (see §12).

---

## 6. Pull updated content types from the CMS

```bash
npm run cms:pull
```

This generates:
- `src/content-types/component/ComponentNameCT.ts` — one file per content type
- `src/content-types/displayTemplates/ComponentNameDisplayTemplate.ts` — one file per display template

> **New interactive prompt since CLI 3.0.0:** `config pull` now asks
> `Generate a registry file (registry.ts) for the generated types?`. There's no flag to
> pre-answer it (pull is documented as interactive-only), so a scripted/CI pull will block
> on it. **Answer `Y`** — `src/content-types/registry.ts` is now the single source for
> content-type/display-template registration (`src/optimizely.ts` just calls its
> `initialize()`). It's fully rewritten on every pull, so `npm run sync` re-patches it to
> fold in `BlankExperienceContentType` (an SDK-builtin, not sourced from the CMS) — never
> hand-edit `registry.ts` itself, edits won't survive the next pull.

`npm run cms:pull` already runs `npm run sync` afterward — no separate step needed. Only run
`npm run sync` by hand after a raw `npx @optimizely/cms-cli config pull` that bypassed the
npm script, or after `npm run scaffold` creates a new component file.

---

## 7. After a pull — update component imports

The CLI separates content types and display templates that may have previously been co-located. Update component imports:

```tsx
// Before
import { CardBlockCT, CardBlockDisplayTemplateDT } from '@/content-types/component/CardBlock';

// After
import { CardBlockCT } from '@/content-types/component/CardBlockCT';
import { CardBlockDisplayTemplate } from '@/content-types/displayTemplates/CardBlockDisplayTemplate';
```

Update the `displaySettings` prop type accordingly:

```tsx
// Before
displaySettings?: ContentProps<typeof CardBlockDisplayTemplateDT>;

// After
displaySettings?: ContentProps<typeof CardBlockDisplayTemplate>;
```

---

## 8. Push the schema to the CMS

```bash
npm run cms:push
```

To check for violations (e.g. the new unconstrained-`content`/`contentReference` rule in
3.0.0 — see §3) without actually sending anything to the CMS:

```bash
npx optimizely-cms-cli config push ./optimizely.config.mjs --dryRun
```

If content type changes are **breaking** (field removed, localization changed, type changed):

```bash
npm run cms:push:force
```

> **Important:** After a breaking push, re-publish any content in the CMS editor that uses those fields. Content Graph does not re-index changed fields until the content is republished.

---

## 9. Check for platform-specific native dependencies (WSL2 / Linux)

If the build fails with a missing `.node` binary, add the Linux variants to `optionalDependencies` in `package.json`:

```json
"optionalDependencies": {
  "@tailwindcss/oxide-linux-x64-gnu": "^4.x.x",
  "lightningcss-linux-x64-gnu": "^1.x.x"
}
```

And in `next.config.ts`, tell Turbopack to treat them as external:

```ts
serverExternalPackages: ['lightningcss', '@tailwindcss/node'],
```

---

## 10. Verify multisite scoping

Ensure the graph client passes `APPLICATION_HOST` so Content Graph queries are scoped to the correct site's content:

```ts
// src/lib/graphClient.ts
return new GraphClient(process.env.OPTIMIZELY_GRAPH_SINGLE_KEY!, {
  graphUrl: getGraphGatewayUrl(),
  query: { host: process.env.APPLICATION_HOST }, // grouped under `query` since 3.0.0
});
```

Set `APPLICATION_HOST` in `.env` to the full origin (e.g. `https://localhost:3000`).

---

## 11. Don't chase phantom regressions from `npm run build`

Static generation talks to the live Content Graph endpoint. If `npm run build` stalls on a
page for 60s+ and Next retries it 2-3 times before failing, that looks exactly like a hung
request introduced by the new SDK — but rule out transient flakiness against the live demo
Graph endpoint first by simply running the build again before concluding it's a real
regression. A clean re-run with zero code changes is strong evidence it was the network,
not the upgrade.

---

## 12. `optimizely.config.mjs`'s `components` field must point at real definition files

`components` must glob files that *define or re-export* content types — not `registry.ts`.

`config push`'s `components` glob doesn't import a whole dependency tree — it scans each
matched file for a `contentType(...)`/`displayTemplate(...)` definition, or a named export
that re-exports one (which is how the old barrel-file setup worked). `registry.ts` does
neither: it privately imports every type just to pass them to `initContentTypeRegistry()`
inside a function body, and only exports `initialize`. Pointing `components` at it makes
`config push` silently find and push nothing — no error, just "Property Groups found" and
no content types in the output.

```js
// Wrong — registry.ts has no contentType()/displayTemplate() exports of its own
components: ['./src/content-types/registry.ts'],

// Right — glob the actual definition files, registry.ts matches too but has nothing to find
components: [
  './src/content-types/**/*.ts',
  '!./src/content-types/registry.ts',
],
```

Verify with `npx optimizely-cms-cli config push ./optimizely.config.mjs --dryRun` — it
should print a `Content Type`/`Display Template` line for every type before you trust a
real push.
