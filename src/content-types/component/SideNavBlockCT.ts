import { contentType } from '@optimizely/cms-sdk';

/**
 * Side Nav
 */
export const SideNavBlockCT = contentType({
  key: 'SideNavBlock',
  displayName: 'Side Nav',
  baseType: '_component',
  compositionBehaviors: [
    'elementEnabled'
  ],
  properties: {
    heading: {
      type: 'string',
      format: 'shortString',
      displayName: 'Heading',
      group: 'Content',
      sortOrder: 10,
      allowedTypes: []
    },
    autoGenerate: {
      type: 'boolean',
      displayName: 'Auto Generate',
      group: 'Content',
      sortOrder: 20,
      allowedTypes: []
    },
    rootPage: {
      type: 'contentReference',
      displayName: 'Root Page',
      group: 'Content',
      sortOrder: 30,
      allowedTypes: [
        '_page',
        '_experience'
      ]
    },
    navLinks: {
      type: 'array',
      format: 'LinkCollection',
      group: 'Content',
      sortOrder: 40,
      allowedTypes: [],
      items: {
        type: 'link',
        allowedTypes: []
      }
    }
  }
});
