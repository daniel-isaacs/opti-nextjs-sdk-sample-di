import { contentType } from '@optimizely/cms-sdk';
import { SeoContract } from '../contract/SeoContract';

/**
 * Standard Experience
 */
export const StandardExperienceCT = contentType({
  key: 'StandardExperience',
  displayName: 'Standard Experience',
  baseType: '_experience',
  mayContainTypes: ['*'],
  extends: SeoContract,
  properties: {
    leftRail: {
      type: 'array',
      displayName: 'Left Rail',
      group: 'Content',
      sortOrder: 0,
      items: { type: 'content', allowedTypes: ['_component'] },
    },
    rightRail: {
      type: 'array',
      displayName: 'Right Rail',
      group: 'Content',
      sortOrder: 0,
      items: { type: 'content', allowedTypes: ['_component'] },
    },
  },
});
