import type { PropsWithChildren } from 'react'
import clsx from 'clsx'

interface GlassCardProps extends PropsWithChildren {
  className?: string
  glowOnHover?: boolean
  goldBorder?: boolean
}

const GlassCard = ({ children, className, glowOnHover = true, goldBorder = false }: GlassCardProps) => {
  return (
    <div
      className={clsx(
        'rounded-3xl border border-white/10 bg-white/5 p-6 shadow-glass backdrop-blur-xl transition-all duration-300',
        glowOnHover && 'hover:-translate-y-1 hover:border-[var(--accent)] hover:shadow-gold',
        goldBorder && 'border-[rgba(201,168,76,0.45)]',
        className,
      )}
    >
      {children}
    </div>
  )
}

export default GlassCard
