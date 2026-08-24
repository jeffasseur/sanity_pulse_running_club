'use client'

import * as React from 'react'
import {ExtractPageBuilderType} from '@/sanity/lib/types'

type IntroTextSectionProps = {
  block: ExtractPageBuilderType<'introTextSection'>
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

export default function IntroTextSection({block}: IntroTextSectionProps) {
  const {quote} = block

  const [quoteRef, quoteInView] = useInView<HTMLQuoteElement>()

  return (
    <section className="bg-white py-24 text-black lg:py-32">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-[115px_1fr]">
          <div className="hidden lg:block" />

          <div className="flex max-w-4xl flex-col items-start gap-6">
            <svg
              className="h-10 w-auto lg:h-14 "
              xmlns="http://www.w3.org/2000/svg"
              width="70"
              height="57"
              viewBox="0 0 70 57"
              fill="none"
            >
              <path
                d="M31.3892 6.91912L19.0698 29.8704L11.3069 32.0642C12.2069 30.3766 13.2195 29.0266 14.3445 28.014C15.4696 26.8889 16.7634 26.3264 18.226 26.3264C21.4887 26.3264 24.4138 27.6765 27.0015 30.3766C29.7016 32.9643 31.0517 36.3395 31.0517 40.5022C31.0517 44.8899 29.5328 48.6589 26.4952 51.809C23.57 54.9592 19.9136 56.5343 15.5258 56.5343C11.3631 56.5343 7.70667 55.0155 4.5565 51.9778C1.51883 48.8276 0 45.0024 0 40.5022C0 38.7021 0.337518 36.6207 1.01255 34.2581C1.8001 31.8955 3.20642 28.8016 5.23153 24.9764L18.7323 0L31.3892 6.91912ZM69.36 6.91912L57.0406 29.8704L49.4464 32.0642C50.234 30.3766 51.1903 29.0266 52.3153 28.014C53.5529 26.8889 54.8467 26.3264 56.1968 26.3264C59.4594 26.3264 62.4409 27.6765 65.141 30.3766C67.8412 32.9643 69.1912 36.3395 69.1912 40.5022C69.1912 44.8899 67.6724 48.6589 64.6347 51.809C61.7096 54.9592 58.0531 56.5343 53.6654 56.5343C49.5027 56.5343 45.8462 55.0155 42.696 51.9778C39.6584 48.8276 38.1396 45.0024 38.1396 40.5022C38.1396 38.7021 38.4771 36.6207 39.1521 34.2581C39.8271 31.8955 41.1772 28.8016 43.2023 24.9764L56.8718 0L69.36 6.91912Z"
                fill="#ff6b00"
              />
            </svg>

            <blockquote
              ref={quoteRef}
              style={{transitionDelay: '150ms'}}
              className={`text-3xl font-medium leading-[1.2] tracking-tight text-black sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl ${fadeUp(quoteInView)}`}
            >
              {quote}
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  )
}
