'use client'

import * as React from 'react'

import Image from '@/app/components/SanityImage'
import ResolvedLink from '@/app/components/ResolvedLink'
import {ExtractPageBuilderType} from '@/sanity/lib/types'

type FeaturesGridSectionProps = {
  block: ExtractPageBuilderType<'featuresGridSection'>
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

type FeatureCard = NonNullable<FeaturesGridSectionProps['block']['cards']>[number]

function ParallaxImage({image}: {image: FeatureCard['image']}) {
  const wrapperRef = React.useRef<HTMLDivElement>(null)
  const imageRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const onScroll = () => {
      const wrapper = wrapperRef.current
      const image = imageRef.current
      if (!wrapper || !image) return
      const rect = wrapper.getBoundingClientRect()
      const progress = -rect.top / window.innerHeight
      image.style.transform = `translateY(${progress * 40}px)`
    }
    window.addEventListener('scroll', onScroll, {passive: true})
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div ref={wrapperRef} className="absolute inset-0 h-full w-full overflow-hidden">
      <div ref={imageRef} className="absolute inset-0 h-full w-full" style={{willChange: 'transform'}}>
        <Image
          id={image!.asset!._ref}
          alt=""
          className="h-full w-full object-cover"
          width={800}
          height={1120}
          mode="cover"
          hotspot={image?.hotspot}
          crop={image?.crop}
        />
      </div>
    </div>
  )
}

function FeatureCardTile({card, delay}: {card: FeatureCard; delay: number}) {
  const [ref, inView] = useInView<HTMLDivElement>()

  return (
    <div
      ref={ref}
      style={{transitionDelay: `${delay}ms`}}
      className={`relative overflow-hidden rounded-sm aspect-square ${fadeUp(inView)}`}
    >
      {card.image?.asset?._ref && <ParallaxImage image={card.image} />}

      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-black to-transparent" />

      <div className="relative flex h-full flex-col justify-end gap-3 p-6">
        {card.heading && (
          <h3 className="text-3xl font-semibold uppercase text-white">{card.heading}</h3>
        )}
        {card.body && <p className="text-base text-white/70">{card.body}</p>}
      </div>
    </div>
  )
}

export default function FeaturesGridSection({block}: FeaturesGridSectionProps) {
  const {heading, cards = [], cta} = block

  const [headingRef, headingInView] = useInView<HTMLHeadingElement>()
  const [ctaRef, ctaInView] = useInView<HTMLDivElement>()

  return (
    <section className="bg-black py-24 text-white lg:py-32">
      <div className="container">
        {heading && (
          <h2
            ref={headingRef}
            className={`mx-auto mb-16 max-w-3xl text-center text-4xl font-medium tracking-tight md:text-5xl lg:mb-20 lg:text-6xl ${fadeUp(headingInView)}`}
          >
            {heading}
          </h2>
        )}

        {cards.length > 0 && (
          <div className="mb-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mb-20 lg:grid-cols-3">
            {cards.map((card, i) => (
              <FeatureCardTile key={card._key} card={card} delay={i * 120} />
            ))}
          </div>
        )}

        {cta && (cta.boldText || cta.bodyText || cta.button?.buttonText) && (
          <div ref={ctaRef} className={`flex justify-center ${fadeUp(ctaInView)}`}>
            <div className="flex w-full max-w-xl flex-wrap items-center justify-between gap-6 rounded-3xl border border-black/10 bg-white/70 p-4 backdrop-blur-md">
              <div className="flex flex-col">
                {cta.boldText && <span className="font-medium text-black">{cta.boldText}</span>}
                {cta.bodyText && <span className="text-black/60">{cta.bodyText}</span>}
              </div>

              {cta.button?.buttonText && cta.button?.link && (
                <ResolvedLink
                  link={cta.button.link}
                  className="rounded-full bg-black px-6 py-3 font-mono text-sm whitespace-nowrap uppercase tracking-wide text-white transition-colors duration-200 hover:bg-blue focus:bg-blue"
                >
                  {cta.button.buttonText}
                </ResolvedLink>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
