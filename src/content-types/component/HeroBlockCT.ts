import { contentType } from '@optimizely/cms-sdk';

/**
 * Hero Block
 */
export const HeroBlockCT = contentType({
  key: 'HeroBlock',
  displayName: 'Hero Block',
  baseType: '_component',
  compositionBehaviors: [
    'sectionEnabled',
    'elementEnabled'
  ],
  properties: {
    heading: {
      type: 'string',
      format: 'shortString',
      displayName: 'Heading',
      isLocalized: true,
      group: 'Content',
      sortOrder: 10,
      allowedTypes: []
    },
    subHeading: {
      type: 'string',
      format: 'shortString',
      displayName: 'Sub-Heading',
      isLocalized: true,
      group: 'Content',
      sortOrder: 20,
      allowedTypes: []
    },
    heroImage: {
      type: 'contentReference',
      displayName: 'Hero Image',
      group: 'Content',
      sortOrder: 30,
      allowedTypes: [
        '_image'
      ]
    }
  }
});
