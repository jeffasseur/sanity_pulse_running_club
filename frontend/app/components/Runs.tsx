import Link from 'next/link'

import DateComponent from '@/app/components/Date'
import Image from '@/app/components/SanityImage'
import {UpcomingRunsQueryResult, PastRunsQueryResult} from '@/sanity.types'
import {dataAttr} from '@/sanity/lib/utils'

type RunListItem = UpcomingRunsQueryResult[number] | PastRunsQueryResult[number]

const Run = ({run}: {run: RunListItem}) => {
  const {_id, title, slug, date, distance, pace, location, image} = run

  return (
    <article
      data-sanity={dataAttr({id: _id, type: 'run', path: 'title'}).toString()}
      key={_id}
      className="border border-gray-200 rounded-sm p-6 bg-gray-50 flex flex-col justify-between transition-colors hover:bg-white relative"
    >
      <Link className="hover:text-brand underline transition-colors" href={`/runs/${slug}`}>
        <span className="absolute inset-0 z-10" />
      </Link>
      <div>
        {image?.asset?._ref && (
          <div className="mb-4">
            <Image
              id={image.asset._ref}
              alt=""
              className="rounded-sm w-full"
              width={640}
              height={360}
              mode="cover"
              hotspot={image.hotspot}
              crop={image.crop}
            />
          </div>
        )}
        <h3 className="text-2xl mb-2">{title}</h3>
        <p className="text-sm text-gray-600">
          {[location?.name, distance && `${distance} km`, pace && `${pace} min/km`]
            .filter(Boolean)
            .join(' · ')}
        </p>
      </div>
      <div className="mt-6 pt-4 border-t border-gray-100">
        <time className="text-gray-500 text-xs font-mono" dateTime={date ?? undefined}>
          <DateComponent dateString={date ?? undefined} />
        </time>
      </div>
    </article>
  )
}

const Runs = ({
  children,
  heading,
  subHeading,
}: {
  children: React.ReactNode
  heading?: string
  subHeading?: string
}) => (
  <div>
    {heading && <h2 className="text-3xl text-gray-900 sm:text-4xl lg:text-5xl">{heading}</h2>}
    {subHeading && <p className="mt-2 text-lg leading-8 text-gray-600">{subHeading}</p>}
    <div className="pt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{children}</div>
  </div>
)

export const RunList = ({heading, runs}: {heading: string; runs: RunListItem[]}) => {
  if (!runs.length) {
    return null
  }

  return (
    <Runs heading={heading}>
      {runs.map((run) => (
        <Run key={run._id} run={run} />
      ))}
    </Runs>
  )
}
