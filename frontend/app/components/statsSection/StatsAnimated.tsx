'use client'

import * as React from 'react'
import Button from '../elements/Button'

function useInView<T extends HTMLElement>() {
  const ref = React.useRef<T>(null)
  const [inView, setInView] = React.useState(false)

  React.useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      {threshold: 0.1},
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return [ref, inView] as const
}

function fadeUp(inView: boolean) {
  return `transition-all duration-700 ease-out ${
    inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
  }`
}

const barHeights: Record<number, number> = {
  1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 8, 8: 10, 9: 12, 10: 14,
  11: 16, 12: 18, 13: 20, 14: 23, 15: 25, 16: 27, 17: 29, 18: 33,
  19: 36, 20: 40, 21: 43, 22: 47, 23: 50, 24: 55, 25: 60, 26: 65,
  27: 70, 28: 75, 29: 80, 30: 85, 31: 90, 32: 95, 33: 100,
}

const hiddenOnMobile = new Set([2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32])

const barNumbers = Array.from({length: 33}, (_, i) => i + 1)

function BarsSection() {
  const [ref, inView] = useInView<HTMLDivElement>()

  return (
    <div
      ref={ref}
      className="flex h-80 flex-row items-end justify-between gap-1.5 sm:gap-2 sm:-mt-25 md:mt-0 md:gap-3 lg:h-100 lg:-mt-32 lg:gap-4 xl:gap-6"
    >
      {barNumbers.map((num) => (
        <div
          key={num}
          className={`h-full w-2 shrink-0 rounded-xl ${hiddenOnMobile.has(num) ? 'hidden md:block' : ''}`}
          style={{
            maxHeight: inView ? `${barHeights[num]}%` : '0%',
            transition: `max-height 700ms cubic-bezier(0.4, 0, 0.2, 1) ${num * 30}ms`,
            backgroundImage:
              'linear-gradient(180deg, var(--color-brand), rgba(255, 255, 255, 0.3) 85%, var(--color-black))',
          }}
        />
      ))}
    </div>
  )
}

export type StatItem = {
  value: string
  label: string
}

function StatTile({value, label, accent, delay}: {value: string; label: string; accent: string; delay: number}) {
  const [ref, inView] = useInView<HTMLDivElement>()

  return (
    <div
      ref={ref}
      style={{transitionDelay: `${delay}ms`}}
      className={`flex flex-col gap-4 ${fadeUp(inView)}`}
    >
      <div className={`font-mono text-6xl font-medium tracking-tight lg:text-[5vw] ${accent}`}>
        {value}
      </div>
      <div className="text-base md:text-lg text-white/80">{label}</div>
    </div>
  )
}

export default function StatsAnimated({
  eyebrow,
  heading,
  stats,
}: {
  eyebrow?: string | null
  heading?: string | null
  stats: StatItem[]
}) {
  const [labelRef, labelInView] = useInView<HTMLDivElement>()
  const [headingRef, headingInView] = useInView<HTMLHeadingElement>()

  const statsDup = [
    {
      label: 'Runners in de club',
      value: '166+',
      accent: 'text-white',
    },
    {
      label: 'Distance logged recently',
      value: '123.4km',
      accent: 'text-brand',
    },
  ]

  return (
    <section className="bg-black py-24 text-white lg:py-32">
      <div className="container">
        <div className="flex max-w-170 flex-col gap-12 lg:gap-16">
          <div className="flex flex-col gap-6 lg:gap-8">
            {eyebrow && (
              <div ref={labelRef} className={`w-fit ${fadeUp(labelInView)}`}>
                <div className="inline-flex items-center gap-2">
                  <span className="h-2 w-2 flex-none rounded-sm bg-brand" />
                  <span className="font-mono text-xs uppercase tracking-widest text-white">
                    {eyebrow}
                  </span>
                </div>
              </div>
            )}

            {heading && (
              <h2
                ref={headingRef}
                style={{transitionDelay: '100ms'}}
                className={`text-4xl md:text-5xl lg:text-6xl ${fadeUp(headingInView)}`}
              >
                {heading}
              </h2>
            )}
          </div>

          {statsDup.length > 0 && (
            <div className="flex flex-col gap-8 sm:flex-row sm:gap-16 lg:gap-24">
              {statsDup.map((stat, i) => (
                <StatTile
                  key={stat.label}
                  value={stat.value}
                  label={stat.label}
                  accent={stat.accent}
                  delay={200 + i * 100}
                />
              ))}
            </div>
          )}

          <div className="flex justify-start">
            <Button
              href="https://strava.com/clubs/1778757"
              text="Join our Strava club"
              target="_blank"
            />
          </div>
        </div>

        <BarsSection />
      </div>
    </section>
  )
}
