import RunsOverview from '@/app/components/RunsOverviewSection'

const mockBlock = {
  _key: 'test-runs-overview',
  _type: 'runsOverviewSection',
  eyebrow: 'Opkomende runs',
  heading: 'Volgende runs op de planning',
  runs: 'upcomingRuns',
} as const

export default function TestRunsOverviewPage() {
  return <RunsOverview block={mockBlock} />
}
