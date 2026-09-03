import * as React from 'react'
import Link from 'next/link'
import {RunQueryResult} from '@/sanity.types'

type SidebarDetail = {label: string; values: string[]}
type BodySection = {heading: string; paragraph?: string; items?: string[]}


const defaultBodySections: BodySection[] = [
  {
    heading: "Waarom je met ons moet meelopen",
    items: [
      'Onze runs zijn ontworpen om zowel beginners als ervaren hardlopers uit te dagen.',
      'We bieden een ondersteunende en motiverende omgeving die je helpt je doelen te bereiken.',
      'Onze runs zijn zorgvuldig gepland om je een unieke en onvergetelijke ervaring te bieden.',
    ],
  },
  {
    heading: 'Wat kan je verwachten tijdens een run',
    items: [
      'Een energieke en ondersteunende sfeer waar iedereen welkom is.',
      'Uitdagende routes die zowel je fysieke als mentale grenzen testen.',
      'Kansen om te netwerken en relaties op te bouwen met gelijkgestemde hardlopers.',
    ],
  },
  {
    heading: 'Klaar om met ons mee te doen?',
    paragraph:
      "Als je enthousiast bent over deze run en denkt dat je het in je hebt, horen we graag van je! Klik hiernaast om je aan te melden en deel uit te maken van onze groeiende hardloopgemeenschap.",
  },
]

const defaultDetails: SidebarDetail[] = [
  {label: 'Locatie', values: []},
  {label: 'Datum', values: []},
  {label: 'Afstand', values: []},
  {label: 'Pace', values: []},
]

export function CmsPageSection({
  run
}: { run: RunQueryResult }) {
  // map run data to defaultDetails
  const details: SidebarDetail[] = defaultDetails.map((detail) => {
    switch (detail.label) {
      case 'Locatie':
        return {...detail, values: [run?.location?.address || 'Onbekend']}
      case 'Datum':
        return {...detail, values: [run?.date || 'Onbekend']}
      case 'Afstand':
        return {...detail, values: [run?.distance + ' km' || 'Onbekend']}
      case 'Pace':
        return {...detail, values: [run?.pace + ' min/km' || 'Onbekend']}
      default:
        return detail
    }
  })

  return (
    <section className="bg-white py-24 text-black lg:py-40">
      <div className="container">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-start">
          {/* Left column: job header + body */}
          <div className="flex flex-col gap-16">
            <div className="flex flex-col items-start gap-8">
              <Link
                href="/runs"
                className="text-lg font-medium tracking-tight text-brand transition-colors hover:text-brand/70 lg:text-xl"
              >
                Terug naar alle runs
              </Link>
              <h2 className="text-4xl sm:text-5xl lg:text-7xl">{run?.title}</h2>
              <p className="text-lg text-black sm:text-xl">{run?.description}</p>
            </div>

            <div className="flex flex-col gap-10">
              {defaultBodySections.map((section) => (
                <div key={section.heading} className="flex flex-col gap-6">
                  <h3 className="text-2xl font-medium tracking-tight text-black">
                    {section.heading}
                  </h3>
                  {section.paragraph && (
                    <p className="text-lg text-black/70 sm:text-xl">{section.paragraph}</p>
                  )}
                  {section.items && (
                    <ul className="flex flex-col gap-4">
                      {section.items.map((item) => (
                        <li key={item} className="flex items-start gap-4">
                          <span className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-brand" />
                          <span className="text-lg text-black/70 sm:text-xl">{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right column: sticky detail card */}
          <div className="flex lg:justify-end">
            <div className="sticky top-24 flex w-full flex-col gap-10 rounded-3xl bg-gray-50 p-10 lg:w-105">
              <div className="flex flex-col gap-6">
                {details.map((detail) => (
                  <div key={detail.label} className="flex flex-col gap-2">
                    <div className="text-base tracking-tight text-black/70">{detail.label}</div>
                    <div className="flex flex-col">
                      {detail.values.map((value) => (
                        <div key={value} className="text-2xl font-medium tracking-tight text-black">
                          {value}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <Link
                href="https://www.strava.com/clubs/1778757/group_events/3528359338818449614/occurrences/FQIWnMOl4_yHoPdhHBTUHxQSFBgUFBQAFAAAHBaAkIvKkmgAAA=="
                target="_blank"
                rel="noopener noreferrer"
                className="w-full rounded-full bg-brand px-6 py-3 text-center font-mono text-sm uppercase tracking-wide text-white transition-colors duration-200 hover:bg-brand/70 focus:bg-brand/70"
              >
                Inschrijven
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CmsPageSection
