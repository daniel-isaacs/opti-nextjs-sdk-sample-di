import { contract } from '@optimizely/cms-sdk';

export const SeoContract = contract({
  key: 'SeoContract',
  displayName: 'SEO Properties',
  properties: {
    metaTitle:       { type: 'string', displayName: 'Meta Title',       isLocalized: true, group: 'seo', sortOrder: 10, format: 'shortString', indexingType: 'queryable' },
    metaDescription: { type: 'string', displayName: 'Meta Description', isLocalized: true, group: 'seo', sortOrder: 20, indexingType: 'queryable' },
    Schema:          { type: 'string', displayName: 'Schema',           isLocalized: true, group: 'seo', sortOrder: 30, indexingType: 'queryable' },
  },
});
