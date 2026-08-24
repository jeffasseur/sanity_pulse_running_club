import {initCountdown} from '@/lib/initCountDown'

type CountdownProps = {
  nextRunDate?: string | null | undefined
}

export default function Countdown({nextRunDate}: CountdownProps) {
  if (!nextRunDate) {
    return null
  }

  return (
    <div
      ref={(el) => {
        if (el) {
          initCountdown()
        }
      }}
      data-countdown-timezone-offset="2"
      data-countdown-date={nextRunDate}
      data-countdown-status="active"
      data-countdown-format="long"
      className="flex gap-[0.75em] flex-wrap justify-left items-center max-w-full text-lg md:text-xl"
    >
      <p className="text-lg font-semibold ml-1 md:text-xl bg-transparent rounded-[0.125em] py-1 px-3 m-0 border border-[#2A2727]">
        Next run
      </p>
      <p
        data-countdown-update="days"
        className="bg-[#2A2727] rounded-[3em] py-1 px-3 m-0 border border-transparent"
      >
        D
      </p>
      <p
        data-countdown-update="hours"
        className="bg-transparent rounded-[0.125em] py-1 px-3 m-0 border border-[#2A2727]"
      >
        Hrs
      </p>
      <p
        data-countdown-update="minutes"
        className="bg-[#2A2727] rounded-[3em] py-1 px-3 m-0 border border-transparent"
      >
        Min
      </p>
      <p
        data-countdown-update="seconds"
        className="bg-brand rounded-[0.125em] py-1 px-3 m-0 border border-transparent"
      >
        Sec
      </p>
    </div>
  )
}
