import { buildConfig } from '@optimizely/cms-sdk';

export default buildConfig({
  components: [
    './src/content-types/**/*.ts',
    '!./src/content-types/registry.ts', // generated — re-imports types, defines none itself
  ],
  locale: ['en'],
  propertyGroups: [
    {
      key: 'layout',
      displayName: 'Layout',
      sortOrder: 15,
    },
    {
      key: 'meta',
      displayName: 'Meta',
      sortOrder: 20,
    },
    {
      key: 'seo',
      displayName: 'SEO',
      sortOrder: 25,
    },
  ],
});