import type { PropsWithChildren } from 'react'
import { motion } from 'framer-motion'
import clsx from 'clsx'

interface SectionRevealProps extends PropsWithChildren {
  className?: string
  delay?: number
  id?: string
}

const SectionReveal = ({ children, className, delay = 0, id }: SectionRevealProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, delay }}
      className={clsx(className)}
      id={id}
    >
      {children}
    </motion.div>
  )
}

export default SectionReveal
