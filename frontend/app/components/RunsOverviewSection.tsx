import Button from './elements/Button'
import {ExtractPageBuilderType} from '@/sanity/lib/types'
import RunsList from './runsOverviewSection/RunsList'

enum RunsType {
  UP = 'upcomingRuns',
  PAST = 'pastRuns',
  ALL = 'allRuns',
}

export default async function RunsOverviewSection({block}: {block: ExtractPageBuilderType<'runsOverviewSection'>}) {
  const titleArray = block?.heading?.split(' ') || []
  const firstWord = titleArray.shift() || ''
  const remainingWords = titleArray.join(' ')

  return (
    <section className="bg-black py-24 text-white lg:py-32">
      <div className="container">
        <div className="grid gap-16 lg:grid-cols-[1.5fr_2fr]">
          <aside className="flex flex-col items-start gap-8 self-start lg:sticky lg:top-12">
            {block?.eyebrow && (
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 flex-none rounded-sm bg-brand" />
                <span className="font-mono text-xs uppercase tracking-widest text-white">
                  {block.eyebrow}
                </span>
              </div>
            )}

            <h2 className="text-4xl font-medium tracking-tight mb-4 text-white/70 lg:text-6xl">
              <span className="text-white">{firstWord}</span> {remainingWords}
            </h2>

            {block?.button?.text && block?.button?.link && (
              <Button text={block.button.text} variant="white" />
            )}
          </aside>

          <div className="flex flex-col">
            <RunsList runType={block?.runs || RunsType.UP} />
          </div>
        </div>
      </div>
    </section>
  )
}
