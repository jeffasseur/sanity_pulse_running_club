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
  const getClubStatsResult = await getClubStats()

  if (!getClubStatsResult) {
    return null
  }
  const {memberCount, recentDistanceKm} = getClubStatsResult

  const stats: StatItem[] = [
    memberCount !== null && {value: String(memberCount), label: 'Runners in the club'},
    recentDistanceKm !== null && {value: `${recentDistanceKm} km`, label: 'Distance logged recently'},
  ].filter((stat): stat is StatItem => Boolean(stat))

  return <StatsAnimated eyebrow={eyebrow} heading={heading} stats={stats} />
}
