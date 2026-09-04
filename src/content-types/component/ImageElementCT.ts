import { contentType } from '@optimizely/cms-sdk';

/**
 * Image Element
 */
export const ImageElementCT = contentType({
  key: 'ImageElement',
  displayName: 'Image Element',
  baseType: '_component',
  compositionBehaviors: [
    'elementEnabled'
  ],
  properties: {
    image: {
      type: 'contentReference',
      displayName: 'Image',
      isRequired: true,
      group: 'Content',
      allowedTypes: [
        '_image'
      ]
    },
    altText: {
      type: 'string',
      displayName: 'Alt Text',
      isLocalized: true,
      isRequired: true,
      group: 'Content'
    },
    caption: {
      type: 'string',
      displayName: 'Caption',
      isLocalized: true,
      group: 'Content'
    }
  }
});
