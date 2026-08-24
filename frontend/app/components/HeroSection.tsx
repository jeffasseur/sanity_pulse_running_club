'use client'

import Image from 'next/image'
import * as React from 'react'
import {initCountdown} from '@/lib/initCountDown'
import Button from '@/app/components/elements/Button'
import Countdown from './HeroSection/Countdown'

type HeroImage = {
  src: string
  position: string
}

const images: HeroImage[] = [
  {
    src: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=400&q=80',
    position: 'top-[8%] right-[70%]',
  },
  {
    src: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=400&q=80',
    position: 'top-[2%] right-[30%]',
  },
  {
    src: 'https://images.unsplash.com/photo-1571008887538-b36bb32f4571?auto=format&fit=crop&w=400&q=80',
    position: 'top-[46%] right-[10%]',
  },
  {
    src: 'https://images.unsplash.com/photo-1486218119243-13883505764c?auto=format&fit=crop&w=400&q=80',
    position: 'bottom-[33%] right-[60%]',
  },
  {
    src: 'https://images.unsplash.com/photo-1517931524326-bdd55a541177?auto=format&fit=crop&w=400&q=80',
    position: 'top-[54%] right-[35%]',
  },
]

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

export default function HeroSection({nextRunDate}: {nextRunDate?: string | null | undefined}) {
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
        {images.map((image, i) => (
          <Image
            key={image.src}
            src={image.src}
            width={400}
            height={400}
            alt=""
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
