import type {Metadata, ResolvingMetadata} from 'next'
import {notFound} from 'next/navigation'

import DateComponent from '@/app/components/Date'
import {sanityFetch} from '@/sanity/lib/live'
import {runPagesSlugs, runQuery} from '@/sanity/lib/queries'
import {resolveOpenGraphImage} from '@/sanity/lib/utils'
import {CmsPageSection} from '@/app/components/CmsPageSection'

/**
 * Generate the static params for the page.
 * Learn more: https://nextjs.org/docs/app/api-reference/functions/generate-static-params
 */
export async function generateStaticParams() {
  const {data} = await sanityFetch({
    query: runPagesSlugs,
    perspective: 'published',
    stega: false,
  })
  return data
}

/**
 * Generate metadata for the page.
 * Learn more: https://nextjs.org/docs/app/api-reference/functions/generate-metadata#generatemetadata-function
 */
export async function generateMetadata(
  props: PageProps<'/runs/[slug]'>,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const params = await props.params
  const {data: run} = await sanityFetch({
    query: runQuery,
    params,
    stega: false,
  })
  const previousImages = (await parent).openGraph?.images || []
  const ogImage = resolveOpenGraphImage(run?.image)

  return {
    title: run?.title,
    description: run?.description,
    openGraph: {
      images: ogImage ? [ogImage, ...previousImages] : previousImages,
    },
  } satisfies Metadata
}

export default async function RunPage(props: PageProps<'/runs/[slug]'>) {
  const params = await props.params
  const {data: run} = await sanityFetch({query: runQuery, params})

  if (!run?._id) {
    return notFound()
  }

  const details = [
    run.location?.name,
    run.distance && `${run.distance} km`,
    run.pace && `${run.pace} min/km`,
  ].filter(Boolean)

  return <CmsPageSection run={run} />
}
