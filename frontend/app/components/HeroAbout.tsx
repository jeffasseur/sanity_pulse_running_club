'use client'

import * as React from 'react'

import Image from '@/app/components/SanityImage'
import {ExtractPageBuilderType} from '@/sanity/lib/types'

type HeroAboutProps = {
  block: ExtractPageBuilderType<'heroAbout'>
  index: number
  // Needed if you want to createDataAttributes to do non-text overlays in Presentation (Visual Editing)
  pageId: string
  pageType: string
}

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

function Stat({value, label, delay}: {value: string; label: string; delay: number}) {
  const [ref, inView] = useInView<HTMLDivElement>()

  return (
    <div
      ref={ref}
      style={{transitionDelay: `${delay}ms`}}
      className={`flex flex-col items-center gap-2 py-8 text-center lg:px-6 lg:py-0 ${fadeUp(inView)}`}
    >
      <div className="font-mono text-4xl font-medium tracking-tight lg:text-5xl">{value}</div>
      <div className="text-sm text-gray-400">{label}</div>
    </div>
  )
}

export default function HeroAbout({block}: HeroAboutProps) {
  const {heading, subheading, images = [], stats = []} = block

  const [headingRef, headingInView] = useInView<HTMLHeadingElement>()
  const [subheadingRef, subheadingInView] = useInView<HTMLDivElement>()
  const [galleryRef, galleryInView] = useInView<HTMLDivElement>()

  const galleryImages = images.filter((image) => image?.asset?._ref)

  return (
    <section className="bg-black py-24 text-white lg:py-32">
      <div className="container">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
          {heading && (
            <h2
              ref={headingRef}
              className={`font-mono text-4xl font-medium uppercase tracking-tight md:text-5xl lg:text-6xl ${fadeUp(headingInView)}`}
            >
              {heading}
            </h2>
          )}
          {subheading && (
            <div
              ref={subheadingRef}
              style={{transitionDelay: '150ms'}}
              className={`max-w-2xl text-lg text-gray-400 lg:text-xl ${fadeUp(subheadingInView)}`}
            >
              {subheading}
            </div>
          )}
        </div>
      </div>

      {galleryImages.length > 0 && (
        <div
          ref={galleryRef}
          style={{transitionDelay: '300ms'}}
          className={`relative left-1/2 right-1/2 my-16 -mx-[50vw] flex h-[280px] w-screen gap-4 lg:h-[420px] lg:gap-6 ${fadeUp(galleryInView)}`}
        >
          {galleryImages.map((image) => (
            <div key={image._key} className="flex-1 overflow-hidden">
              <Image
                id={image.asset!._ref}
                alt=""
                className="h-full w-full object-cover"
                width={640}
                height={800}
                mode="cover"
                hotspot={image.hotspot}
                crop={image.crop}
              />
            </div>
          ))}
        </div>
      )}

      {stats.length > 0 && (
        <div className="container">
          <div className="mx-auto flex max-w-4xl flex-col divide-y divide-white/10 lg:flex-row lg:divide-x lg:divide-y-0">
            {stats.map((stat, i) => (
              <div key={stat._key} className="flex-1">
                <Stat value={stat.value} label={stat.label} delay={i * 100} />
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
