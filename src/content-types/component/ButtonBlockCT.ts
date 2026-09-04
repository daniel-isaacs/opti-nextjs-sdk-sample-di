import { contentType } from '@optimizely/cms-sdk';

/**
 * Button Block
 */
export const ButtonBlockCT = contentType({
  key: 'ButtonBlock',
  displayName: 'Button Block',
  baseType: '_component',
  compositionBehaviors: [
    'elementEnabled'
  ],
  properties: {
    buttonLabel: {
      type: 'string',
      format: 'shortString',
      displayName: 'Button Label',
      group: 'Content',
      sortOrder: 10
    },
    buttonLink: {
      type: 'url',
      displayName: 'Button Link',
      group: 'Content',
      sortOrder: 20
    }
  }
});
