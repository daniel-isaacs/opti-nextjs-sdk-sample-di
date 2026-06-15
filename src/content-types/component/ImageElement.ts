import { contentType, displayTemplate } from '@optimizely/cms-sdk';

/**
 * Image Element
 */
export const ImageElementCT = contentType({
  key: 'ImageElement',
  displayName: 'Image Element',
  baseType: '_component',
  compositionBehaviors: ['elementEnabled'],
  properties: {
    image: { type: 'contentReference', displayName: 'Image', isRequired: true, group: 'Content', sortOrder: 0, allowedTypes: ['_image'] },
    altText: { type: 'string', displayName: 'Alt Text', isRequired: true, isLocalized: true, group: 'Content', sortOrder: 0 },
    caption: { type: 'string', displayName: 'Caption', isLocalized: true, group: 'Content', sortOrder: 0 },
  },
});


/**
 * Image Formatting
 */
export const ImageElementDisplayTemplateDT = displayTemplate({
  key: 'ImageElementDisplayTemplate',
  contentType: 'ImageElement',
  displayName: 'Image Formatting',
  isDefault: true,
  settings: {
      alignment: {
        displayName: 'Alignment',
        editor: 'select',
        sortOrder: 0,
        choices: {
          left: {
            displayName: 'Left',
            sortOrder: 1,
          },
          center: {
            displayName: 'Center',
            sortOrder: 2,
          },
          right: {
            displayName: 'Right',
            sortOrder: 3,
          },
          full: {
            displayName: 'Full Width',
            sortOrder: 4,
          },
        },
      },
      size: {
        displayName: 'Size',
        editor: 'select',
        sortOrder: 1,
        choices: {
          small: {
            displayName: 'Small (300px)',
            sortOrder: 1,
          },
          medium: {
            displayName: 'Medium (500px)',
            sortOrder: 2,
          },
          large: {
            displayName: 'Large (800px)',
            sortOrder: 3,
          },
          full: {
            displayName: 'Full Width',
            sortOrder: 4,
          },
        },
      },
      aspectRatio: {
        displayName: 'Aspect Ratio',
        editor: 'select',
        sortOrder: 2,
        choices: {
          auto: {
            displayName: 'Original',
            sortOrder: 1,
          },
          square: {
            displayName: 'Square (1:1)',
            sortOrder: 2,
          },
          video: {
            displayName: 'Video (16:9)',
            sortOrder: 3,
          },
          standard: {
            displayName: 'Standard (4:3)',
            sortOrder: 4,
          },
          classic: {
            displayName: 'Classic (3:2)',
            sortOrder: 5,
          },
          ultrawide: {
            displayName: 'Ultrawide (21:9)',
            sortOrder: 6,
          },
        },
      },
      borderRadius: {
        displayName: 'Border Radius',
        editor: 'select',
        sortOrder: 3,
        choices: {
          none: {
            displayName: 'None',
            sortOrder: 1,
          },
          small: {
            displayName: 'Small',
            sortOrder: 2,
          },
          medium: {
            displayName: 'Medium',
            sortOrder: 3,
          },
          large: {
            displayName: 'Large',
            sortOrder: 4,
          },
          full: {
            displayName: 'Full (Circle/Pill)',
            sortOrder: 5,
          },
        },
      },
      shadow: {
        displayName: 'Shadow',
        editor: 'select',
        sortOrder: 4,
        choices: {
          none: {
            displayName: 'None',
            sortOrder: 1,
          },
          small: {
            displayName: 'Small',
            sortOrder: 2,
          },
          medium: {
            displayName: 'Medium',
            sortOrder: 3,
          },
          large: {
            displayName: 'Large',
            sortOrder: 4,
          },
        },
      },
      verticalAlignment: {
        displayName: 'Vertical Alignment',
        editor: 'select',
        sortOrder: 5,
        choices: {
          top: {
            displayName: 'Top',
            sortOrder: 1,
          },
          center: {
            displayName: 'Center',
            sortOrder: 2,
          },
          bottom: {
            displayName: 'Bottom',
            sortOrder: 3,
          },
        },
      },
      spacing: {
        displayName: 'Spacing',
        editor: 'select',
        sortOrder: 6,
        choices: {
          none: {
            displayName: 'None',
            sortOrder: 1,
          },
          small: {
            displayName: 'Small',
            sortOrder: 2,
          },
          medium: {
            displayName: 'Medium',
            sortOrder: 3,
          },
          large: {
            displayName: 'Large',
            sortOrder: 4,
          },
          xlarge: {
            displayName: 'Extra Large',
            sortOrder: 5,
          },
        },
      },
    },
});
