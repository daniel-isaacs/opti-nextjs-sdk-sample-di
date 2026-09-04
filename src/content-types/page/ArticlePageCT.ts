import { contentType } from '@optimizely/cms-sdk';
import { SeoContract } from '../contract/SeoContract';

/**
 * Article Page
 */
export const ArticlePageCT = contentType({
  key: 'ArticlePage',
  displayName: 'Article Page',
  baseType: '_page',
  mayContainTypes: [
    '*'
  ],
  extends: [
    SeoContract
  ],
  properties: {
    featuredImage: {
      type: 'contentReference',
      displayName: 'Featured Image',
      description: 'Image shown on the top of the page',
      group: 'Content',
      sortOrder: 10,
      allowedTypes: [
        '_image'
      ]
    },
    metaTitle: {
      type: 'string',
      format: 'shortString',
      displayName: 'Meta Title',
      isLocalized: true,
      group: 'seo',
      sortOrder: 10,
      indexingType: 'queryable'
    },
    heading: {
      type: 'string',
      format: 'shortString',
      displayName: 'Article Heading',
      isLocalized: true,
      group: 'Content',
      sortOrder: 20,
      indexingType: 'searchable'
    },
    metaDescription: {
      type: 'string',
      displayName: 'Meta Description',
      isLocalized: true,
      group: 'seo',
      sortOrder: 20,
      indexingType: 'queryable'
    },
    body: {
      type: 'richText',
      displayName: 'Article Body',
      isLocalized: true,
      group: 'Content',
      sortOrder: 30,
      indexingType: 'searchable'
    },
    Schema: {
      type: 'string',
      displayName: 'Schema',
      isLocalized: true,
      group: 'seo',
      sortOrder: 30,
      indexingType: 'queryable'
    }
  }
});
