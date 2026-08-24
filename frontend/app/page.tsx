import type {Metadata} from 'next'

import HeroSection from '@/app/components/HeroSection'
import PageBuilderPage from '@/app/components/PageBuilder'
// import {RunList} from '@/app/components/Runs'
import {sanityFetch} from '@/sanity/lib/live'
import {homePageQuery} from '@/sanity/lib/queries'
import {resolveOpenGraphImage} from '@/sanity/lib/utils'

type nextRunDateType = {
  date: string
}

/**
 * Generate metadata for the homepage.
 * Learn more: https://nextjs.org/docs/app/api-reference/functions/generate-metadata#generatemetadata-function
 */
export async function generateMetadata(): Promise<Metadata> {
  const {data: homePage} = await sanityFetch({
    query: homePageQuery,
    stega: false,
  })

  const ogImage = resolveOpenGraphImage(homePage?.ogImage)

  return {
    title: homePage?.title,
    description: homePage?.subtitle ?? undefined,
    openGraph: {
      images: ogImage ? [ogImage] : [],
    },
  } satisfies Metadata
}

export default async function Page() {
  const [{data: homePage}] = await Promise.all([sanityFetch({query: homePageQuery})])
  // @ts-expect-error - nextRunDate is not used in this file, but is passed to HeroSection
  const {data: date}: {data: nextRunDateType | null} = await sanityFetch({
    query: `*[_type == "run" && date >= now()] | order(date asc)[0]{
      date
    }`,
    // Next run date is used in the hero section, so it should be live but doesn't need stega
    stega: false,
  })

  if (!homePage?._id) {
    return <div>There went someting wrong</div>
  }

  // convert date to 2026-03-21 11:36 string
  const formatedDate = date
    ? new Date(date.date).toISOString().replace('T', ' ').slice(0, 16)
    : null

  return (
    <>
      <HeroSection nextRunDate={formatedDate} heroGallery={homePage?.heroGallery} />
      <PageBuilderPage page={homePage} />
    </>
  )
}
