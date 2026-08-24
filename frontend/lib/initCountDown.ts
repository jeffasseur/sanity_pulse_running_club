type CountdownUnit = 'years' | 'months' | 'weeks' | 'days' | 'hours' | 'minutes' | 'seconds'

type CountdownParts = {
  years: number
  months: number
  weeks: number
  days: number
  hours: number
  minutes: number
  seconds: number
  done: boolean
}

type CountdownUpdateMap = Partial<Record<CountdownUnit, HTMLElement>>

type CountdownInstance = {
  root: HTMLElement
  tgt: number
  f: string
  u: CountdownUpdateMap
  st: ReturnType<typeof setInterval> | null
  done: boolean
  render: (ms: number) => void
  tickMin: (nowMs: number) => void
  startSec: () => void
  stopSec: () => void
}

type CountdownRegistry = {
  items: CountdownInstance[]
  timer: ReturnType<typeof setInterval> | null
}

export function initCountdown() {
  const reg: CountdownRegistry = {items: [], timer: null}

  function parseIso(root: HTMLElement) {
    const s = root.getAttribute('data-countdown-date') || ''
    const m = s.trim().match(/^(\d{4})-(\d{2})-(\d{2})\s(\d{1,2}):(\d{2})$/)
    if (!m) return null

    const y = +m[1]
    const mo = +m[2] - 1
    const d = +m[3]
    const h = +m[4]
    const mi = +m[5]

    let t = Date.UTC(y, mo, d, h, mi, 0, 0)
    const off = +(root.getAttribute('data-countdown-timezone-offset') || 0)
    if (off) t -= off * 3600000

    const dt = new Date(t)
    if (dt.getUTCFullYear() !== y || dt.getUTCMonth() !== mo || dt.getUTCDate() !== d) return null
    return t
  }

  function splitByUnits(ms: number, u: CountdownUpdateMap): CountdownParts {
    let secs = Math.max(0, Math.floor(ms / 1000))
    const out: CountdownParts = {
      years: 0,
      months: 0,
      weeks: 0,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      done: ms <= 0,
    }

    const seq: Array<[CountdownUnit, number]> = [
      ['years', 31536000],
      ['months', 2592000],
      ['weeks', 604800],
      ['days', 86400],
      ['hours', 3600],
      ['minutes', 60],
      ['seconds', 1],
    ]

    for (let i = 0; i < seq.length; i++) {
      const [k, len] = seq[i]
      if (u[k]) {
        out[k] = Math.floor(secs / len)
        secs %= len
      }
    }

    return out
  }

  const sing: Record<CountdownUnit, string> = {
    years: 'year',
    months: 'month',
    weeks: 'week',
    days: 'day',
    hours: 'hour',
    minutes: 'minute',
    seconds: 'second',
  }

  const abbr: Record<CountdownUnit, [string, string]> = {
    years: ['yr.', 'yrs.'],
    months: ['mo.', 'mos.'],
    weeks: ['wk.', 'wks.'],
    days: ['day', 'days'],
    hours: ['hr.', 'hrs.'],
    minutes: ['min.', 'mins.'],
    seconds: ['sec.', 'secs.'],
  }

  function lab(k: CountdownUnit, v: number, f: string) {
    if (f === 'plain') return '' + v
    if (f === 'short') return v + (k === 'months' ? 'mo' : k[0])
    if (f === 'abbr') {
      const a = abbr[k]
      return v + ' ' + a[v === 1 ? 0 : 1]
    }
    return v + ' ' + (v === 1 ? sing[k] : k)
  }

  function make(root: HTMLElement): CountdownInstance | null {
    const u: CountdownUpdateMap = {}
    const order: CountdownUnit[] = ['years', 'months', 'weeks', 'days', 'hours', 'minutes', 'seconds']

    root.querySelectorAll<HTMLElement>('[data-countdown-update]').forEach((n) => {
      const k = (n.getAttribute('data-countdown-update') || '').toLowerCase() as CountdownUnit
      if (order.includes(k)) u[k] = n
    })

    const tgt = parseIso(root)
    if (tgt == null) {
      root.setAttribute('data-countdown-status', 'error')

      let first: HTMLElement | null = null
      for (let i = 0; i < order.length; i++) {
        const candidate = u[order[i]]
        if (candidate) {
          first = candidate
          break
        }
      }

      if (first) first.textContent = 'Invalid Date, use: 2026-03-21 11:36'
      order.forEach((k) => {
        const n = u[k]
        if (n && n !== first) n.textContent = ''
      })
      return null
    }

    const f = (root.getAttribute('data-countdown-format') || 'plain').toLowerCase()

    const inst: CountdownInstance = {
      root,
      tgt,
      f,
      u,
      st: null,
      done: false,
      render(ms: number) {
        const d = splitByUnits(ms, this.u)
        this.done = d.done
        this.root.setAttribute('data-countdown-status', d.done ? 'finished' : 'active')

        if (this.u.years) this.u.years.textContent = lab('years', d.years, this.f)
        if (this.u.months) this.u.months.textContent = lab('months', d.months, this.f)
        if (this.u.weeks) this.u.weeks.textContent = lab('weeks', d.weeks, this.f)
        if (this.u.days) this.u.days.textContent = lab('days', d.days, this.f)
        if (this.u.hours) this.u.hours.textContent = lab('hours', d.hours, this.f)
        if (this.u.minutes) this.u.minutes.textContent = lab('minutes', d.minutes, this.f)
        if (this.u.seconds) this.u.seconds.textContent = lab('seconds', d.seconds, this.f)
      },
      tickMin(nowMs: number) {
        if (this.done) return
        this.render(this.tgt - nowMs)
        if (this.u.seconds && !this.done && !this.st) this.startSec()
        if (this.done) this.stopSec()
      },
      startSec() {
        const t = () => {
          if (this.done) return this.stopSec()
          const ms = this.tgt - Date.now()
          if (ms <= 0) {
            this.render(0)
            return this.stopSec()
          }
          this.render(ms)
        }

        t()
        this.st = setInterval(t, 1000)
      },
      stopSec() {
        if (this.st) {
          clearInterval(this.st)
          this.st = null
        }
      },
    }

    ;(root as HTMLElement & {__cd?: CountdownInstance}).__cd = inst
    return inst
  }

  function startMinTimer() {
    if (reg.timer) return

    reg.timer = setInterval(() => {
      const now = Date.now()
      for (let i = 0; i < reg.items.length; i++) reg.items[i].tickMin(now)
    }, 60000)

    const now = Date.now()
    for (let j = 0; j < reg.items.length; j++) reg.items[j].tickMin(now)
  }

  document.querySelectorAll<HTMLElement>('[data-countdown-date]').forEach((root) => {
    const inst = make(root)
    if (inst) reg.items.push(inst)
  })

  if (reg.items.length) startMinTimer()
}
