import type {Metadata, ResolvingMetadata} from 'next'
import {notFound} from 'next/navigation'

import DateComponent from '@/app/components/Date'
import Image from '@/app/components/SanityImage'
import {sanityFetch} from '@/sanity/lib/live'
import {runPagesSlugs, runQuery} from '@/sanity/lib/queries'
import {resolveOpenGraphImage} from '@/sanity/lib/utils'

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

  return (
    <div className="container my-12 lg:my-24 grid gap-12">
      <div className="max-w-3xl flex flex-col gap-6">
        <h1 className="text-4xl text-gray-900 sm:text-5xl lg:text-7xl">{run.title}</h1>
        <div className="flex flex-wrap gap-x-4 gap-y-2 text-gray-600">
          {run.date && (
            <time dateTime={run.date}>
              <DateComponent dateString={run.date} />
            </time>
          )}
          {details.map((detail) => (
            <span key={detail}>{detail}</span>
          ))}
        </div>
      </div>
      <article className="gap-6 grid max-w-4xl">
        {run.image?.asset?._ref && (
          <Image
            id={run.image.asset._ref}
            alt=""
            className="rounded-sm w-full"
            width={1024}
            height={538}
            mode="cover"
            hotspot={run.image.hotspot}
            crop={run.image.crop}
          />
        )}
        {run.description && (
          <p className="max-w-2xl text-gray-700 whitespace-pre-line">{run.description}</p>
        )}
      </article>
    </div>
  )
}
