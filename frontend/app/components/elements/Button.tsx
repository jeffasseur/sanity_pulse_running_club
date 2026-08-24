import Link from 'next/link'

type ButtonVariant = 'white' | 'black' | 'brand'

const variantStyles: Record<ButtonVariant, { background: string; text: string; border: string }> = {
  white: {
    background: 'bg-white',
    text: 'text-black',
    border: 'border border-black/10',
  },
  black: {
    background: 'bg-black',
    text: 'text-white',
    border: 'border border-black',
  },
  brand: {
    background: 'bg-brand',
    text: 'text-white',
    border: 'border border-brand',
  },
}

const Button = ({
  text,
  variant = 'brand',
}: {
  text: string
  variant?: ButtonVariant
}) => {
  const { background, text: textColor, border } = variantStyles[variant]

  return (
    <Link
      href="#"
      className={`group relative flex cursor-pointer items-center justify-center rounded-[.25em] py-[.75em] px-[1.5em] font-[1em] no-underline transition-colors duration-200 hover:outline-0 ${border}`}
      aria-label={`${variant} button`}
      data-button="btn-animate-chars"
      data-variant={variant}
    >
      <div
        className={`${background} absolute inset-0 rounded-[.25em] group-hover:inset-[0.125em]`}
        style={{ transition: 'inset 0.6s cubic-bezier(0.625, 0.05, 0, 1)' }}
      />
      <span className={`relative z-10 ${textColor}`}>{text}</span>
    </Link>
  )
}

export default Button