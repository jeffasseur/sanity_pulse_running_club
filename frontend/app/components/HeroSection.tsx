'use client'

import * as React from 'react'
import {initCountdown} from '@/lib/initCountDown'
import Button from '@/app/components/elements/Button'
import Countdown from './HeroSection/Countdown'
import SanityImage from '@/app/components/SanityImage'

function sortHeroGalleryImages(heroGallery?: {asset: {_ref: string}; position: string}[]) {
  const imagePositions = [
    {
      position: 'top-[8%] right-[70%]',
    },
    {
      position: 'top-[7%] right-[3%]',
    },
    {
      position: 'top-[66%] right-[10%]',
    },
    {
      position: 'bottom-[9%] right-[45%]',
    },
    {
      position: 'top-[25%] right-[30%]',
    },
  ]
  if (!heroGallery) {
    return
  }

  // merge positions from imagePositions into heroGallery based on index
  heroGallery.forEach((image, index) => {
    if (imagePositions[index]) {
      image.position = imagePositions[index].position
    }
  })

  return heroGallery
}

function HeadlineLine({
  visible,
  delayMs,
  children,
}: {
  visible: boolean
  delayMs: number
  children: React.ReactNode
}) {
  return (
    <div className="overflow-hidden">
      <div
        className="text-[15vw] font-bold leading-[1.15] tracking-tight text-white transition-transform duration-700 ease-out sm:text-7xl md:text-8xl lg:text-[100px] xl:text-[130px]"
        style={{
          transform: visible ? 'translate3d(0, 0%, 0)' : 'translate3d(0, 200%, 0)',
          transitionDelay: `${delayMs}ms`,
        }}
      >
        {children}
      </div>
    </div>
  )
}

export default function HeroSection({
  nextRunDate,
  heroGallery,
}: {
  nextRunDate?: string | null | undefined
  heroGallery?: {asset: {_ref: string}; position: string}[]
}) {
  const [line1Visible, setLine1Visible] = React.useState(false)
  const [line2Visible, setLine2Visible] = React.useState(false)

  React.useEffect(() => {
    const timer1 = setTimeout(() => setLine1Visible(true), 100)
    const timer2 = setTimeout(() => setLine2Visible(true), 250)
    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
    }
  }, [])

  initCountdown()
  const heroImages = sortHeroGalleryImages(heroGallery)

  return (
    <section className="relative flex h-screen flex-col items-start justify-end overflow-hidden bg-black text-white">
      <div className="container relative z-10 pb-16 md:pb-20">
        <HeadlineLine visible={line1Visible} delayMs={0}>
          Pulse <span className="italic">Running</span>
        </HeadlineLine>
        <HeadlineLine visible={line2Visible} delayMs={150}>
          Club
        </HeadlineLine>
        <Countdown nextRunDate={nextRunDate} />
        <div className="mt-6 flex justify-start">
          <Button text="Join the club" />
        </div>
      </div>

      <div className="absolute inset-0">
        {heroImages &&
          heroImages.map((image, i) => (
            <SanityImage
              id={image.asset._ref || ''}
              key={i}
              role="presentation"
              loading="lazy"
              className={`absolute opacity-70 h-35 w-35 rounded-sm object-cover transition-all duration-700 ease-out sm:h-47.5 sm:w-47.5 lg:h-64 lg:w-64 ${image.position && image.position}`}
              style={{
                transitionDelay: `${i * 120 + 300}ms`,
              }}
            />
          ))}
      </div>
    </section>
  )
}
