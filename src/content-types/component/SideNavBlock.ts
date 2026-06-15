import { contentType } from '@optimizely/cms-sdk';

/**
 * Side Nav
 */
export const SideNavBlockCT = contentType({
  key: 'SideNavBlock',
  displayName: 'Side Nav',
  baseType: '_component',
  compositionBehaviors: ['elementEnabled'],
  properties: {
    heading: { type: 'string', displayName: 'Heading', group: 'Content', sortOrder: 10, format: 'shortString' },
    autoGenerate: { type: 'boolean', displayName: 'Auto Generate', group: 'Content', sortOrder: 20 },
    rootPage: { type: 'contentReference', displayName: 'Root Page', group: 'Content', sortOrder: 30, allowedTypes: ['_page', '_experience'] },
    navLinks: {
      type: 'array',
      group: 'Content',
      sortOrder: 40,
      items: { type: 'link' },
    },
  },
});
