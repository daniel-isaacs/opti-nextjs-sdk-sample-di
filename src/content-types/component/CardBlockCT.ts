import { contentType } from '@optimizely/cms-sdk';

/**
 * Card Block
 */
export const CardBlockCT = contentType({
  key: 'CardBlock',
  displayName: 'Card Block',
  baseType: '_component',
  compositionBehaviors: [
    'sectionEnabled',
    'elementEnabled'
  ],
  properties: {
    title: {
      type: 'string',
      displayName: 'Title',
      isLocalized: true,
      isRequired: true,
      group: 'Content'
    },
    text: {
      type: 'richText',
      displayName: 'Text',
      isLocalized: true,
      group: 'Content'
    },
    linkText: {
      type: 'string',
      displayName: 'Link Text',
      isLocalized: true,
      group: 'Content'
    },
    linkUrl: {
      type: 'url',
      displayName: 'Link URL',
      group: 'Content'
    },
    image: {
      type: 'contentReference',
      displayName: 'Image',
      group: 'Content',
      allowedTypes: [
        '_image'
      ]
    }
  }
});
