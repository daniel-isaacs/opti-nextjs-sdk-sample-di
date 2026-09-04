import { displayTemplate } from '@optimizely/cms-sdk';

/**
 * Button Style
 */
export const ButtonBlockDisplayTemplate = displayTemplate({
  key: 'ButtonBlockDisplayTemplate',
  isDefault: true,
  displayName: 'Button Style',
  contentType: 'ButtonBlock',
  settings: {
    variant: {
      displayName: 'Color',
      editor: 'select',
      sortOrder: 0,
      choices: {
        primary: {
          displayName: 'Primary',
          sortOrder: 0
        },
        secondary: {
          displayName: 'Secondary',
          sortOrder: 1
        },
        accent: {
          displayName: 'Accent',
          sortOrder: 2
        },
        ghost: {
          displayName: 'Ghost',
          sortOrder: 3
        }
      }
    },
    style: {
      displayName: 'Style',
      editor: 'select',
      sortOrder: 1,
      choices: {
        solid: {
          displayName: 'Solid',
          sortOrder: 0
        },
        outline: {
          displayName: 'Outline',
          sortOrder: 1
        }
      }
    },
    width: {
      displayName: 'Width',
      editor: 'select',
      sortOrder: 2,
      choices: {
        auto: {
          displayName: 'Auto (fit label)',
          sortOrder: 0
        },
        full: {
          displayName: 'Full width',
          sortOrder: 1
        },
        half: {
          displayName: 'Half width',
          sortOrder: 2
        },
        quarter: {
          displayName: 'Quarter width',
          sortOrder: 3
        }
      }
    }
  }
});
