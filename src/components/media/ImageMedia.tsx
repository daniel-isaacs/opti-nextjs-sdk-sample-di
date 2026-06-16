import { ContentProps } from '@optimizely/cms-sdk';
import { blockId } from '@/lib/editUtils';
import { getPreviewUtils } from '@optimizely/cms-sdk/react/server';
import { ImageMediaCT } from '@/content-types/media/ImageMedia';

type Props = {
  content: ContentProps<typeof ImageMediaCT>;
};

export default function ImageMedia({ content }: Props) {
  const { pa } = getPreviewUtils(content);
  const url = content._metadata?.url?.default ?? content._metadata?.url?.hierarchical;

  if (!url) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background" data-epi-block-id={blockId(content)} {...pa()}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={url}
        alt={content._metadata?.displayName ?? ''}
        className="max-w-full max-h-full object-contain"
      />
    </div>
  );
}
