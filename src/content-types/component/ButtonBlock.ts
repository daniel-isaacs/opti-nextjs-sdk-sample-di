import { contentType } from '@optimizely/cms-sdk';

/**
 * Button Block
 */
export const ButtonBlockCT = contentType({
  key: 'ButtonBlock',
  displayName: 'Button Block',
  baseType: '_component',
  compositionBehaviors: ['elementEnabled'],
  properties: {
    Label: { type: 'string', displayName: 'Button Label', localized: true, group: 'Information', sortOrder: 10, format: 'shortString' },
    Link: { type: 'url', displayName: 'Button Link', group: 'Information', sortOrder: 20 },
  },
});
