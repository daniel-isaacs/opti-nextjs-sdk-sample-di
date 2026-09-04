import { contentType } from '@optimizely/cms-sdk';

/**
 * Text Element
 */
export const TextElementCT = contentType({
  key: 'TextElement',
  displayName: 'Text Element',
  baseType: '_component',
  compositionBehaviors: [
    'elementEnabled'
  ],
  properties: {
    text: {
      type: 'string',
      format: 'shortString',
      displayName: 'Text',
      isLocalized: true,
      group: 'Content',
      sortOrder: 10
    }
  }
});
