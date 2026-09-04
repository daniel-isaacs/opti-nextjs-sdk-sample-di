import { displayTemplate } from '@optimizely/cms-sdk';

/**
 * Card Layout
 */
export const CardBlockDisplayTemplate = displayTemplate({
  key: 'CardBlockDisplayTemplate',
  isDefault: true,
  displayName: 'Card Layout',
  contentType: 'CardBlock',
  settings: {
    imageLayout: {
      displayName: 'Image Layout',
      editor: 'select',
      sortOrder: 0,
      choices: {
        image_top: {
          displayName: 'Image top, text bottom (default)',
          sortOrder: 0
        },
        image_bottom: {
          displayName: 'Image bottom, text top',
          sortOrder: 1
        },
        image_left: {
          displayName: 'Image left, text right',
          sortOrder: 2
        },
        image_right: {
          displayName: 'Image right, text left',
          sortOrder: 3
        }
      }
    }
  }
});
