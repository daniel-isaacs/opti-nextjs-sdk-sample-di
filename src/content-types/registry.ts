import { initContentTypeRegistry, initDisplayTemplateRegistry, BlankExperienceContentType } from '@optimizely/cms-sdk';
import { ArticlePageCT } from './page/ArticlePageCT';
import { ButtonBlockCT } from './component/ButtonBlockCT';
import { CardBlockCT } from './component/CardBlockCT';
import { GenericMediaCT } from './media/GenericMediaCT';
import { HeroBlockCT } from './component/HeroBlockCT';
import { ImageElementCT } from './component/ImageElementCT';
import { ImageMediaCT } from './image/ImageMediaCT';
import { RichTextElementCT } from './component/RichTextElementCT';
import { SeoContract } from './contract/SeoContract';
import { SideNavBlockCT } from './component/SideNavBlockCT';
import { StandardExperienceCT } from './experience/StandardExperienceCT';
import { TextElementCT } from './component/TextElementCT';
import { VideoMediaCT } from './video/VideoMediaCT';
import { ButtonBlockDisplayTemplate } from './displayTemplates/ButtonBlockDisplayTemplate';
import { CardBlockDisplayTemplate } from './displayTemplates/CardBlockDisplayTemplate';
import { ColumnDisplayTemplate } from './displayTemplates/ColumnDisplayTemplate';
import { HeroBlockDisplayTemplate } from './displayTemplates/HeroBlockDisplayTemplate';
import { ImageElementDisplayTemplate } from './displayTemplates/ImageElementDisplayTemplate';
import { RowDisplayTemplate } from './displayTemplates/RowDisplayTemplate';
import { BlankSectionDisplayTemplate } from './displayTemplates/BlankSectionDisplayTemplate';
import { TextElementDisplayTemplate } from './displayTemplates/TextElementDisplayTemplate';
/**
 * Registers the generated content types and display templates with the SDK.
 *
 * Call this once from the application entry point, before rendering content.
 *
 * To render content with React, register the components that implement each
 * content type:
 *
 *   import { initReactComponentRegistry } from '@optimizely/cms-sdk/react/server';
 *
 *   initReactComponentRegistry({ resolver: { ArticlePage: ArticlePageComponent } });
 */
export function initialize() {
  initContentTypeRegistry([
    ArticlePageCT,
    ButtonBlockCT,
    CardBlockCT,
    GenericMediaCT,
    HeroBlockCT,
    ImageElementCT,
    ImageMediaCT,
    RichTextElementCT,
    SeoContract,
    SideNavBlockCT,
    StandardExperienceCT,
    TextElementCT,
    VideoMediaCT,
    BlankExperienceContentType,
  ]);

  initDisplayTemplateRegistry([
    ButtonBlockDisplayTemplate,
    CardBlockDisplayTemplate,
    ColumnDisplayTemplate,
    HeroBlockDisplayTemplate,
    ImageElementDisplayTemplate,
    RowDisplayTemplate,
    BlankSectionDisplayTemplate,
    TextElementDisplayTemplate,
  ]);
}
