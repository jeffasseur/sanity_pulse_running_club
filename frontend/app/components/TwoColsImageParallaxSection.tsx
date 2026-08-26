'use client'

import Image from 'next/image'
import {useEffect, useRef, useState} from 'react'

const TwoColsImageParallaxSection = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [offset1, setOffset1] = useState(0)
  const [offset2, setOffset2] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return

      const rect = containerRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight
      
      // Calculate how much of the element is visible
      const elementMiddle = rect.top + rect.height / 2
      const screenMiddle = windowHeight / 2
      const distanceFromCenter = (elementMiddle - screenMiddle) / windowHeight
      
      // Apply parallax effect with different speeds for each image
      const parallaxSpeed1 = -30
      const parallaxSpeed2 = -30
      
      setOffset1(distanceFromCenter * parallaxSpeed1)
      setOffset2(distanceFromCenter * parallaxSpeed2)
    }

    handleScroll() // Initial calculation
    window.addEventListener('scroll', handleScroll, {passive: true})
    window.addEventListener('resize', handleScroll, {passive: true})

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [])

  return (
    <div ref={containerRef} className="parallax-demo-row gap-[1.25em] bg-black relative flex flex-wrap md:flex-nowrap items-center justify-center p-[1.25em] md:p-[2em] w-full">
        <div className="parallax-demo-row__half aspect-square rounded-[.75em] w-full relative overflow-hidden">
          <div 
            className="parallax-demo-bg z-0 w-full h-[120%] absolute" 
            style={{
              transform: `translateY(${offset1}%) translateZ(0)`,
              willChange: 'transform',
            }}
          >
            <Image 
              sizes="(max-width: 2000px) 100vw, 2000px" 
              alt="Pulse Running Club group running" 
              src="https://res.cloudinary.com/dfi4sldbm/image/upload/v1781854628/Pulse%20Running%20Club/JEF-F-pulse-rc-first-run-3_uzjuec.jpg" 
              loading="lazy" 
              className="parallax-demo-img object-cover w-full h-full"
              width={2000}
              height={1333}
            />
          </div>
        </div>
        <div className="parallax-demo-row__half aspect-square rounded-[.75em] w-full relative overflow-hidden">
          <div 
            className="parallax-demo-bg z-0 w-full h-[120%] absolute" 
            style={{
              transform: `translateY(${offset2}%) translateZ(0)`,
              willChange: 'transform',
            }}
          >
            <Image 
              sizes="(max-width: 2000px) 100vw, 2000px" 
              alt="Pulse Running Club group running" 
              src="https://res.cloudinary.com/dfi4sldbm/image/upload/v1781855307/Pulse%20Running%20Club/JEF-F-pulse-rc-first-run-25_ydh22s.jpg" 
              loading="lazy" 
              className="parallax-demo-img object-cover w-full h-full"
              width={2000}
              height={1333}
            />
          </div>
        </div>
      </div>
  )
}

export default TwoColsImageParallaxSection