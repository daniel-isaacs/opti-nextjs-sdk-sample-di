# Optimizely CMS Sample Site

A Next.js sample site demonstrating integration with Optimizely CMS using the `@optimizely/cms-sdk`.

---

## Getting Started

### Prerequisites

- Node.js 18+
- An Optimizely CMS instance
- Access to your CMS API keys (Settings → API Keys)

### Environment Setup

Copy `.env.template` to `.env` and fill in your values:

```bash
cp .env.template .env
```

| Variable | Description |
|---|---|
| `OPTIMIZELY_CMS_URL` | Base URL of your CMS instance, e.g. `https://example.cms.optimizely.com/` |
| `OPTIMIZELY_GRAPH_GATEWAY` | Content Graph endpoint. Defaults to `https://cg.optimizely.com/content/v2` |
| `OPTIMIZELY_GRAPH_SINGLE_KEY` | Content Graph read-only key (Settings → API Keys) |
| `OPTIMIZELY_CMS_CLIENT_ID` | API client ID for the CLI (Settings → API Keys → Create API key) |
| `OPTIMIZELY_CMS_CLIENT_SECRET` | API client secret for the CLI |
| `APPLICATION_HOST` | Public URL of this app, used for CMS webhooks/preview |

### Install & Run

```bash
npm install
npm run dev
```

The site runs at [https://localhost:3000](https://localhost:3000) (HTTPS is enabled by default for CMS preview compatibility).

---

## Project Structure

```
src/
├── app/                        # Next.js App Router pages
│   ├── layout.tsx              # Root layout (header, footer)
│   ├── page.tsx                # Root route — loads CMS content for /
│   ├── [...slug]/page.tsx      # Dynamic route — loads CMS content by path
│   └── preview/page.tsx        # CMS visual editor preview mode
├── components/
│   ├── blocks/                 # CMS block components (CardBlock, HeroBlock, …)
│   ├── elements/               # CMS element components (TextElement, RichTextElement, …)
│   ├── experiences/            # CMS experience/section components
│   ├── pages/                  # CMS page-type components (ArticlePage, …)
│   └── layout/                 # Site chrome (SiteHeader, SiteFooter, …)
├── content-types/
│   ├── component/              # Content type + display template definitions
│   ├── experience/             # Experience content type definitions
│   ├── page/                   # Page content type definitions
│   ├── displayTemplates/       # Standalone display template files
│   └── registry.ts             # CLI-generated — registers every pulled content type + display template
├── lib/
│   ├── config.ts               # Graph gateway URL helper
│   └── graphClient.ts          # Shared GraphClient factory
└── optimizely.ts               # SDK registry initialization (imported by layout.tsx)
```

---

## Adding a New Content Type

### Automated workflow

1. **Create the content type** in your CMS instance under **Content Types**. Define its properties and (for components) where it can be used in Visual Builder.

2. **Pull to code:**
   ```bash
   npm run cms:pull
   ```
   Answer **`Y`** to the `Generate a registry file (registry.ts)?` prompt — `src/content-types/registry.ts` is how this app registers every content type and display template with the SDK. This script runs `npm run sync` afterward automatically, so `registry.ts` is already patched by the time it finishes.

3. **Generate a component shell:**
   ```bash
   npm run scaffold MyBlock
   ```
   Creates `src/components/blocks/MyBlock.tsx` with imports, typed props, and a placeholder that renders all properties — enough to verify it works before replacing it.

4. **Add a display template** *(optional — skip if the content type has no Visual Builder settings)*. Display templates are defined in code, not in the CMS UI. Add it to the same file the CLI generated:
   ```ts
   // src/content-types/component/MyBlock.ts
   export const MyBlockCT = contentType({ ... }); // CLI-managed — push before next pull

   export const MyBlockDisplayTemplateDT = displayTemplate({
     key: 'MyBlockDisplayTemplate',
     contentType: 'MyBlock',
     displayName: 'My Block Settings',
     isDefault: true,
     settings: { ... },
   });
   ```

5. **Wire up the component:**
   ```bash
   npm run sync
   ```
   Exports the component and adds it to the resolver. (The content type and display template are already registered — the pull itself regenerated `registry.ts` to include them.)

6. **Push to the CMS** *(required if you added or changed a display template)*:
   ```bash
   npm run cms:push
   ```

7. **Implement the component** — replace the scaffold in `src/components/blocks/MyBlock.tsx` with your real rendering logic. Use `CardBlock.tsx` or `HeroBlock.tsx` as a reference.

---

### Manual process (what's really happening)

The scripts above automate the repetitive parts. Here's what each step actually does, for cases where something needs to be done by hand.

#### Step 1 — Create the content type in the CMS UI

In your CMS instance, create the new content type under **Content Types**. Define its properties and (for blocks/components) where it can be used in Visual Builder.

#### Step 2 — Pull the content type to code

```bash
npx @optimizely/cms-cli config pull --output ./src/content-types --group
```

(`npm run cms:pull` runs this exact command, then `npm run sync`, in one step.)

Answer **`Y`** to the `Generate a registry file (registry.ts)?` prompt. This generates or updates files in `src/content-types/`. For a component named `MyBlock`, it creates:

```
src/content-types/component/MyBlock.ts
```

exporting the content type definition:

```ts
export const MyBlockCT = contentType({ ... });
```

...and adds `MyBlockCT` to `src/content-types/registry.ts`'s import list and `initContentTypeRegistry([...])` call — nothing to export by hand.

> **Note:** If you modify these files in code, push your changes to the CMS before the next pull — otherwise they will be overwritten:
> ```bash
> npx @optimizely/cms-cli config push ./optimizely.config.mjs
> ```
>
> `registry.ts` itself is fully regenerated on every pull too — never hand-edit it. `npm run sync` re-patches it afterward to fold in `BlankExperienceContentType`, an SDK-builtin content type that isn't sourced from the CMS.

#### Step 3 — Define the display template (if applicable)

Display templates are defined in code and co-located with their content type. Add the display template to the same file the CLI generated:

```ts
// src/content-types/component/MyBlock.ts
export const MyBlockCT = contentType({ ... }); // CLI-managed — push before next pull

export const MyBlockDisplayTemplateDT = displayTemplate({
  key: 'MyBlockDisplayTemplate',
  contentType: 'MyBlock',
  displayName: 'My Block Settings',
  isDefault: true,
  settings: {
    // define your settings here
  },
});
```

Nothing to export by hand — it isn't registered anywhere yet (it doesn't exist in the CMS until you push it), but the component below can already import it directly by path for its `displaySettings` type.

#### Step 4 — Push the display template to the CMS

```bash
npx @optimizely/cms-cli config push ./optimizely.config.mjs
```

This syncs your display template definition (and any content type changes) to the CMS so it appears in the Visual Builder settings panel. Pull again afterward to pick it up into `registry.ts`.

#### Step 5 — Create the React component

Create `src/components/blocks/MyBlock.tsx`. The component receives `content` and optionally `displaySettings`:

```tsx
import { ContentProps } from '@optimizely/cms-sdk';
import { getPreviewUtils } from '@optimizely/cms-sdk/react/server';
import { MyBlockCT } from '@/content-types/component/MyBlock';
import { MyBlockDisplayTemplateDT } from '@/content-types/component/MyBlock';

type Props = {
  content: ContentProps<typeof MyBlockCT>;
  displaySettings?: ContentProps<typeof MyBlockDisplayTemplateDT>;
};

export default function MyBlock({ content, displaySettings }: Props) {
  const { pa } = getPreviewUtils(content);
  // ...
}
```

> `npm run scaffold MyBlock` generates this shell automatically.

#### Step 6 — Export the component

In `src/components/index.ts`:

```ts
export { default as MyBlock } from './blocks/MyBlock';
```

> `npm run sync` handles this automatically.

#### Step 7 — Register the component

In `src/optimizely.ts`, add the component to the resolver:

```ts
initReactComponentRegistry({
  resolver: {
    // ...existing entries...
    MyBlock: components.MyBlock,
  },
});
```

> `npm run sync` handles this automatically.

The component is now fully wired up and will render wherever the CMS places a `MyBlock` instance.

---

## Component Scaffold Script

`scripts/scaffold-component.mjs` generates a React component shell for any content type that doesn't already have a matching `.tsx` file.

```bash
npm run scaffold              # scaffold all missing components
npm run scaffold MyBlock      # scaffold a specific content type
```

The generated component imports the content type (and display template if one is defined), types the props, and renders the content type name and each property — enough to verify it renders before replacing it with a real implementation:

```tsx
export default function MyBlock({ content, displaySettings }: Props) {
  const { pa } = getPreviewUtils(content);
  return (
    <div className="p-4 border border-dashed border-border rounded text-sm">
      <p className="font-mono text-xs text-muted-foreground mb-2">MyBlock</p>
      <ul className="space-y-1">
        <li {...pa('title')}><span className="font-medium">title:</span> {content.title}</li>
        {/* TODO: <RichText content={content.body?.json} /> */}
        <li {...pa('body')}><span className="font-medium">body:</span> <span className="text-muted-foreground">[richText]</span></li>
      </ul>
    </div>
  );
}
```

The output directory is inferred from the content type name: `*Block` → `blocks/`, `*Element` → `elements/`, `*Page` → `pages/`, `*Experience`/`*Section` → `experiences/`. The script never overwrites an existing file.

After scaffolding, run `npm run sync` to export the component and register it in the resolver.

---

## Registry Sync Script

`scripts/sync-registries.mjs` keeps things in sync with whatever the CLI deposited in `src/content-types/`. `npm run cms:pull` already runs it automatically (with the `registry.ts` prompt answered `Y`); run it by hand after scaffolding a component, or after any raw `config pull` invocation that bypassed the npm script:

```bash
npm run sync
```

The script is **additive only** — it never removes entries.

| File | What it adds |
|---|---|
| `src/content-types/registry.ts` | Folds `BlankExperienceContentType` into the import list and `initContentTypeRegistry([...])` call, if not already there. Everything else in this file is CLI-generated fresh on every pull — nothing else for the script to add. |
| `src/components/index.ts` | `export { default as MyBlock }` for each new `.tsx` found in `blocks/`, `elements/`, `pages/`, or `experiences/` |
| `src/optimizely.ts` | `MyBlock: components.MyBlock` resolver entry for each component that has a matching CT file |

> `registry.ts` is CLI-owned and fully rewritten on every pull — never hand-edit it. `BlankExperienceContentType` is an SDK-builtin content type, not something sourced from the CMS, which is why it needs this one patch step rather than a manual export.

> **Resolver entries:** The script only adds resolver entries for components whose filename matches a CT defined in code (e.g. `MyBlock.tsx` + `MyBlock.ts`). Components backed by SDK-provided content types — such as `BlankExperience` and `BlankSection` — are registered manually and are not touched.

---

## CMS Preview

The visual editor preview is handled by `src/app/preview/page.tsx`. It requires `OPTIMIZELY_CMS_URL` to be set and the app to be reachable from the CMS instance (use a tunnel like ngrok for local development).
