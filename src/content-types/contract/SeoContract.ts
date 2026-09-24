import { contract } from '@optimizely/cms-sdk';

/**
 * SEO Properties
 */
export const SeoContract = contract({
  key: 'SeoContract',
  displayName: 'SEO Properties',
  properties: {
    metaTitle: {
      type: 'string',
      format: 'shortString',
      displayName: 'Meta Title',
      isLocalized: true,
      group: 'seo',
      sortOrder: 10,
      indexingType: 'queryable',
      allowedTypes: []
    },
    metaDescription: {
      type: 'string',
      displayName: 'Meta Description',
      isLocalized: true,
      group: 'seo',
      sortOrder: 20,
      indexingType: 'queryable',
      allowedTypes: []
    },
    Schema: {
      type: 'string',
      displayName: 'Schema',
      isLocalized: true,
      group: 'seo',
      sortOrder: 30,
      indexingType: 'queryable',
      allowedTypes: []
    }
  }
});
