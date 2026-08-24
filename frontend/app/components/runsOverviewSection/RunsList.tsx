import Link from 'next/link'
import DateComponent from '@/app/components/Date'
import Image from '@/app/components/SanityImage'
import {sanityFetch} from '@/sanity/lib/live'
import {pastRunsQuery, upcomingRunsQuery} from '@/sanity/lib/queries'
import {dataAttr} from '@/sanity/lib/utils'
import {UpcomingRunsQueryResult, PastRunsQueryResult} from '@/sanity.types'

type RunListItem = UpcomingRunsQueryResult[number] | PastRunsQueryResult[number]

function RunRow({run, index}: {run: RunListItem, index: number}) {
  const {_id, title, slug, description, image, location, date, distance, pace} = run

  const details = [distance && `${distance} km`, pace && `${pace} min/km`]
    .filter(Boolean)
    .join(' · ')

  return (
    <Link
      href={`/runs/${slug}`}
      data-sanity={dataAttr({id: _id, type: 'run', path: 'title'}).toString()}
      className={`group flex gap-6 border-b py-8 no-underline transition-opacity duration-300 hover:opacity-70 sm:items-center px-4 rounded-[.25em] ${index === 0 ? 'bg-brand border-brand' : 'border-white/10'}`}
    >
      {image?.asset?._ref && (
        <div className="aspect-3/2 w-full overflow-hidden bg-gray-900 max-w-40">
          <Image
            id={image.asset._ref}
            alt=""
            className="h-full w-full object-cover"
            width={480}
            height={320}
            mode="cover"
            hotspot={image.hotspot}
            crop={image.crop}
          />
        </div>
      )}

      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center gap-3 font-mono text-xs uppercase tracking-widest mb-2">
          {index === 0 && (
            <div className="flex items-center gap-3">
              <span className="bg-white rounded-[.25em] px-2 py-1 text-black">Volgende run</span>
              <span className="h-1 w-1 flex-none rounded-full bg-gray-200" />
            </div>
          )}
          {date && (
            <time dateTime={date} className="opacity-70">
              <DateComponent dateString={date} />
            </time>
          )}
          {location?.name && date && (
            <span
              className={`h-1 w-1 flex-none rounded-full ${index === 0 ? 'bg-gray-200' : 'bg-gray-400'}`}
            />
          )}
          {location?.name && <span className="opacity-70">{location.name}</span>}
        </div>

        <h3 className="text-2xl font-medium tracking-tight text-white md:text-3xl">{title}</h3>

        {(description || details) && (
          <p className="max-w-prose opacity-70">{description || details}</p>
        )}
      </div>
    </Link>
  )
}

enum RunsType {
  UP = 'upcomingRuns',
  PAST = 'pastRuns',
  ALL = 'allRuns',
}

async function getRuns(runType?: string): Promise<RunListItem[]> {
  switch (runType) {
    case RunsType.PAST: {
      const {data: pastRuns} = await sanityFetch({query: pastRunsQuery})
      return pastRuns ?? []
    }
    case RunsType.ALL: {
      const [{data: upcomingRuns}, {data: pastRuns}] = await Promise.all([
        sanityFetch({query: upcomingRunsQuery}),
        sanityFetch({query: pastRunsQuery}),
      ])

      return [...(upcomingRuns ?? []), ...(pastRuns ?? [])]
    }
    case RunsType.UP:
    default: {
      const {data: upcomingRuns} = await sanityFetch({query: upcomingRunsQuery})
      return upcomingRuns ?? []
    }
  }
}

const RunsList = async ({runType}: {runType?: string}) => {
  const runs = await getRuns(runType)

  return (
    <>
      {runs.length > 0 ? (
        runs.map((run, index) => (
          <RunRow key={run._id} run={run} index={index} />
        ))
      ) : (
        <p className="text-white/70">Er zijn momenteel geen runs gepland.</p>
      )}
    </>
  )
}

export default RunsList