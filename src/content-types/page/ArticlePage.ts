import { contentType } from '@optimizely/cms-sdk';
import { SeoContract } from '../contract/SeoContract';

/**
 * Article Page
 */
export const ArticlePageCT = contentType({
  key: 'ArticlePage',
  displayName: 'Article Page',
  baseType: '_page',
  mayContainTypes: ['*'],
  extends: SeoContract,
  properties: {
    featuredImage: { type: 'contentReference', displayName: 'Featured Image', description: 'Image shown on the top of the page', group: 'Content', sortOrder: 10, allowedTypes: ['_image'] },
    heading: { type: 'string', displayName: 'Article Heading', isLocalized: true, group: 'Content', sortOrder: 20, indexingType: 'searchable', format: 'shortString' },
    body: { type: 'richText', displayName: 'Article Body', isLocalized: true, group: 'Content', sortOrder: 30, indexingType: 'searchable' },
  },
});
