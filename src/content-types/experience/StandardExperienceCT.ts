import { contentType } from '@optimizely/cms-sdk';
import { SeoContract } from '../contract/SeoContract';

/**
 * Standard Experience
 */
export const StandardExperienceCT = contentType({
  key: 'StandardExperience',
  displayName: 'Standard Experience',
  baseType: '_experience',
  mayContainTypes: [
    '*'
  ],
  extends: [
    SeoContract
  ],
  properties: {
    leftRail: {
      type: 'array',
      displayName: 'Left Rail',
      group: 'Content',
      items: {
        type: 'content',
        allowedTypes: [
          '_component'
        ]
      }
    },
    rightRail: {
      type: 'array',
      displayName: 'Right Rail',
      group: 'Content',
      items: {
        type: 'content',
        allowedTypes: [
          '_component'
        ]
      }
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
    metaDescription: {
      type: 'string',
      displayName: 'Meta Description',
      isLocalized: true,
      group: 'seo',
      sortOrder: 20,
      indexingType: 'queryable'
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
