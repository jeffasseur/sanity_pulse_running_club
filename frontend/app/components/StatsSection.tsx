import {getClubStats} from '@/lib/strava'
import {ExtractPageBuilderType} from '@/sanity/lib/types'
import StatsAnimated, {StatItem} from '@/app/components/statsSection/StatsAnimated'

type StatsSectionProps = {
  block: ExtractPageBuilderType<'statsSection'>
  index: number
  pageId: string
  pageType: string
}

export default async function StatsSection({block}: StatsSectionProps) {
  const {eyebrow, heading} = block
  const {memberCount, recentDistanceKm} = await getClubStats()

  const stats: StatItem[] = [
    memberCount !== null && {value: String(memberCount), label: 'Runners in the club'},
    recentDistanceKm !== null && {value: `${recentDistanceKm} km`, label: 'Distance logged recently'},
  ].filter((stat): stat is StatItem => Boolean(stat))

  return <StatsAnimated eyebrow={eyebrow} heading={heading} stats={stats} />
}
