import { cache } from 'react';
import type { Metadata } from 'next';
import { OptimizelyComponent, withAppContext } from '@optimizely/cms-sdk/react/server';
import { notFound } from 'next/navigation';
import { getGraphClient } from '@/lib/graphClient';

type Props = {
  params: Promise<{
    slug: string[];
  }>;
};

const getContent = cache(async (slug: string[]) => {
  const client = getGraphClient();
  const content = await client.getContentByPath(`/${slug.join('/')}/`);
  return content?.[0] ?? null;
});

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const content = await getContent(slug);
  if (!content) return {};

  // Both ArticlePage and StandardExperience extend SeoContract.
  // `heading` is ArticlePage-specific and used as a title fallback.
  const c = content as { metaTitle?: string | null; metaDescription?: string | null; heading?: string | null };
const title = c.metaTitle || c.heading || undefined;
  const description = c.metaDescription || undefined;

  return {
    title,
    description,
    openGraph: {
      title: title ?? undefined,
      description: description ?? undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: title ?? undefined,
      description: description ?? undefined,
    },
  };
}

export async function Page({ params }: Props) {
  const { slug } = await params;
  const content = await getContent(slug);

  if (!content) {
    notFound();
  }

  return <OptimizelyComponent content={content} />;
}

export default withAppContext(Page);
