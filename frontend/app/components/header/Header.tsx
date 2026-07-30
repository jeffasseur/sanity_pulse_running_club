'use client'

import Link from 'next/link'
import './style.css'
import initCenteredScalingNavigationBar from '.'
import { useEffect } from 'react'
import {NavigationQueryResult} from '@/sanity.types'
import ResolvedLink from '../ResolvedLink'

export default function Header({navigation}: {navigation: NavigationQueryResult}) {
  useEffect(() => {
    initCenteredScalingNavigationBar()
  }, [])

  return (
    <nav data-navigation-status="not-active" className="navigation">
      <div data-navigation-toggle="close" className="navigation__dark-bg"></div>
      <div className="centered-nav">
        <div className="centered-nav__bg"></div>
        <div className="centered-nav__header">
          <a href="#" className="centered-nav__logo">
            <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 663 208" fill="none">
              <g clipPath="url(#clip0_1_14)">
                <path
                  d="M179.1 59.08C182.25 59.08 183.83 60.43 183.83 63.13C183.83 64.37 183.43 65.72 182.65 67.18L140.45 140.1C139.21 142.35 137.33 144.26 134.79 145.84C132.26 147.42 129.87 148.2 127.62 148.2H70.9C68.76 148.2 66.43 148.99 63.91 150.57C61.38 152.15 59.5 154.06 58.27 156.32L31.41 202.9C29.72 205.82 27.92 207.29 26.01 207.29C25 207.29 24.15 206.73 23.48 205.6L1.18 167.62C0.39 166.38 0 164.81 0 162.89C0 160.08 0.68 157.54 2.03 155.29L53.01 67.18C54.25 64.93 56.1 63.02 58.58 61.44C61.05 59.87 63.42 59.08 65.67 59.08H179.1ZM121.17 75.27C121.97 73.81 122.38 72.46 122.38 71.22C122.38 68.53 120.86 67.18 117.82 67.18C115.57 67.18 113.18 67.97 110.64 69.54C108.11 71.12 106.22 73.03 104.99 75.28L72.27 132.01C71.35 133.47 70.89 134.82 70.89 136.05C70.89 138.75 72.47 140.09 75.62 140.09C77.87 140.09 80.24 139.3 82.71 137.73C85.18 136.16 87.1 134.24 88.45 131.99L121.16 75.26L121.17 75.27Z"
                  fill="currentColor"
                ></path>
                <path
                  d="M316.84 59.08C319.88 59.08 321.4 60.43 321.4 63.13C321.4 64.37 321 65.72 320.22 67.18L278.02 140.1C276.78 142.35 274.9 144.26 272.36 145.84C269.83 147.42 267.49 148.2 265.36 148.2H151.93C148.78 148.2 147.2 146.85 147.2 144.15C147.2 142.91 147.59 141.56 148.38 140.1L190.58 67.18C191.82 64.93 193.7 63.02 196.24 61.44C198.77 59.87 201.16 59.08 203.41 59.08H243.92C246.96 59.08 248.48 60.43 248.48 63.14C248.48 64.38 248.09 65.73 247.31 67.2L209.84 132.02C209.04 133.48 208.64 134.83 208.64 136.07C208.64 138.77 210.16 140.12 213.2 140.12C215.45 140.12 217.84 139.33 220.37 137.76C222.9 136.18 224.79 134.27 226.03 132.02L263.5 67.2C264.74 64.95 266.62 63.04 269.16 61.46C271.69 59.89 274.08 59.1 276.33 59.1H316.84V59.08Z"
                  fill="currentColor"
                ></path>
                <path
                  d="M396 39.67C396.68 40.8 397.01 42.32 397.01 44.23C397.01 47.04 396.33 49.63 394.98 51.99L344 140.1C342.76 142.35 340.88 144.26 338.35 145.84C335.82 147.42 333.48 148.2 331.35 148.2H290.84C287.69 148.2 286.11 146.85 286.11 144.15C286.11 142.91 286.5 141.56 287.29 140.1L338.77 50.97L365.78 4.37999C367.47 1.45999 369.21 -0.0100098 371.01 -0.0100098C372.02 -0.0100098 372.87 0.49999 373.54 1.50999L395.99 39.66L396 39.67Z"
                  fill="currentColor"
                ></path>
                <path
                  d="M462.84 91.49C459.69 91.49 458.11 90.14 458.11 87.44C458.11 86.2 458.5 84.85 459.29 83.39L464.02 75.29C464.81 73.83 465.2 72.48 465.2 71.24C465.2 68.54 463.68 67.19 460.64 67.19C458.39 67.19 456.02 67.98 453.55 69.55C451.07 71.12 449.16 73.04 447.81 75.28L438.4 91.41C437.59 92.89 437.19 94.25 437.19 95.5C437.19 98.23 438.76 99.59 441.92 99.59H498.64C501.79 99.59 503.37 100.94 503.37 103.64C503.37 104.88 502.92 106.23 502.02 107.69L483.28 140.1C482.04 142.35 480.16 144.26 477.62 145.84C475.09 147.42 472.75 148.2 470.62 148.2H357.19C354.04 148.2 352.46 146.85 352.46 144.15C352.46 142.91 352.85 141.56 353.64 140.1L363.09 123.9C364.33 121.65 366.21 119.74 368.74 118.16C371.27 116.58 373.66 115.8 375.91 115.8H416.42C419.46 115.8 420.98 117.15 420.98 119.85C420.98 121.09 420.58 122.44 419.8 123.9L415.07 132C414.28 133.46 413.89 134.81 413.89 136.05C413.89 138.75 415.41 140.1 418.45 140.1C420.7 140.1 423.1 139.31 425.63 137.74C428.16 136.17 430.05 134.26 431.29 132.01L440.74 115.8C441.52 114.34 441.91 112.98 441.91 111.74C441.91 109.04 440.33 107.69 437.18 107.69H380.46C377.42 107.69 375.9 106.34 375.9 103.64C375.9 102.4 376.29 101.05 377.08 99.59L395.82 67.18C397.06 64.93 398.94 63.02 401.48 61.44C404.01 59.87 406.4 59.08 408.65 59.08H522.08C525.12 59.08 526.64 60.43 526.64 63.13C526.64 64.37 526.24 65.72 525.46 67.18L516.01 83.39C514.77 85.64 512.89 87.55 510.36 89.13C507.83 90.71 505.49 91.49 503.36 91.49H462.85H462.84Z"
                  fill="currentColor"
                ></path>
                <path
                  d="M566.18 110.05C563.7 111.62 561.78 113.52 560.43 115.77L551.13 131.91C550.33 133.39 549.94 134.76 549.94 136.01C549.94 138.74 551.52 140.11 554.67 140.11C556.92 140.11 559.28 139.32 561.76 137.75C564.23 136.17 566.15 134.26 567.5 132.01L572.23 123.91C573.47 121.66 575.32 119.75 577.8 118.17C580.27 116.59 582.64 115.81 584.89 115.81H625.4C628.55 115.81 630.13 117.16 630.13 119.86C630.13 121.1 629.73 122.45 628.95 123.91L619.5 140.11C618.26 142.36 616.38 144.27 613.85 145.85C611.32 147.43 608.93 148.21 606.68 148.21H493.25C490.21 148.21 488.69 146.86 488.69 144.16C488.69 142.92 489.08 141.57 489.87 140.11L532.07 67.19C533.31 64.94 535.16 63.03 537.64 61.45C540.11 59.88 542.48 59.09 544.73 59.09H658.16C661.31 59.09 662.89 60.44 662.89 63.14C662.89 64.38 662.49 65.73 661.71 67.19L642.95 99.6C641.6 101.85 639.68 103.76 637.2 105.34C634.72 106.92 632.35 107.7 630.1 107.7H573.3C571.05 107.7 568.68 108.49 566.2 110.06L566.18 110.05ZM574.54 91.46C573.79 92.93 573.41 94.28 573.41 95.53C573.41 98.24 574.99 99.6 578.14 99.6C580.28 99.6 582.61 98.81 585.14 97.24C587.67 95.67 589.56 93.75 590.79 91.5L600.24 75.29C601.03 73.83 601.42 72.48 601.42 71.24C601.42 68.54 599.9 67.19 596.85 67.19C594.59 67.19 592.19 67.98 589.65 69.55C587.11 71.12 585.22 73.02 583.98 75.27L574.53 91.47L574.54 91.46Z"
                  fill="currentColor"
                ></path>
              </g>
              <defs>
                <clipPath id="clip0_1_14">
                  <rect width="662.87" height="207.28" fill="currentColor"></rect>
                </clipPath>
              </defs>
            </svg>
          </a>
          <button data-navigation-toggle="toggle" data-hover="" className="centered-nav__toggle">
            <div className="centered-nav__toggle-bar"></div>
            <div className="centered-nav__toggle-bar"></div>
          </button>
        </div>
        <div className="centered-nav__content">
          <div className="centered-nav__inner">
            <ul className="centered-nav__ul">
              {navigation?.items?.map((item) => (
                <li key={item._key} className="centered-nav__li" data-nav-toggle="close">
                  <ResolvedLink
                    link={item?.link}
                    className="hamburger-nav__a w-inline-block"
                    data-nav-toggle="close"
                  >
                    <span className="hamburger-nav__p">{item.label}</span>
                  </ResolvedLink>
                </li>
              ))}
            </ul>
            <div data-navigation-item="" className="centered-nav__banner-w">
              <Link href="mailto:sayhi@pulserunning.be" className="centered-nav__banner">
                <div className="centered-nav__banner-row">
                  <div data-css-marquee-list="" className="centered-nav__banner-item">
                    <div className="centered-nav__banner-inner">
                      <p className="centered-nav__banner-text">Contact us</p>
                    </div>
                    <div className="centered-nav__banner-inner">
                      <p className="centered-nav__banner-text">Contact us</p>
                    </div>
                    <div className="centered-nav__banner-inner">
                      <p className="centered-nav__banner-text">Contact us</p>
                    </div>
                    <div className="centered-nav__banner-inner">
                      <p className="centered-nav__banner-text">Contact us</p>
                    </div>
                    <div className="centered-nav__banner-inner">
                      <p className="centered-nav__banner-text">Contact us</p>
                    </div>
                  </div>
                  <div data-css-marquee-list="" className="centered-nav__banner-item">
                    <div className="centered-nav__banner-inner">
                      <p className="centered-nav__banner-text">Contact us</p>
                    </div>
                    <div className="centered-nav__banner-inner">
                      <p className="centered-nav__banner-text">Contact us</p>
                    </div>
                    <div className="centered-nav__banner-inner">
                      <p className="centered-nav__banner-text">Contact us</p>
                    </div>
                    <div className="centered-nav__banner-inner">
                      <p className="centered-nav__banner-text">Contact us</p>
                    </div>
                    <div className="centered-nav__banner-inner">
                      <p className="centered-nav__banner-text">Contact us</p>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
