import type {Metadata} from 'next'

import {RunList} from '@/app/components/Runs'
import {sanityFetch} from '@/sanity/lib/live'
import {upcomingRunsQuery, pastRunsQuery} from '@/sanity/lib/queries'

export const metadata: Metadata = {
  title: 'Runs',
}

export default async function RunsPage() {
  const [{data: upcomingRuns}, {data: pastRuns}] = await Promise.all([
    sanityFetch({query: upcomingRunsQuery}),
    sanityFetch({query: pastRunsQuery}),
  ])

  return (
    <div className="container my-12 lg:my-24 grid gap-16">
      <RunList heading="Upcoming Runs" runs={upcomingRuns} />
      <RunList heading="Past Runs" runs={pastRuns} />
    </div>
  )
}
