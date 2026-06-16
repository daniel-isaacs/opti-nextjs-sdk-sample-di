import { ContentProps } from '@optimizely/cms-sdk';
import { blockId } from '@/lib/editUtils';
import { RichText } from '@optimizely/cms-sdk/react/richText';
import { getPreviewUtils } from '@optimizely/cms-sdk/react/server';
import { RichTextElementCT } from '@/content-types/component/RichTextElement';

type Props = {
  content: ContentProps<typeof RichTextElementCT>;
};

export default function RichTextElement({ content }: Props) {
  const { pa } = getPreviewUtils(content);

  return (
    <div className="prose prose-lg max-w-none" data-epi-block-id={blockId(content)} {...pa('content')}>
      <RichText content={content.content?.json} />
    </div>
  );
}