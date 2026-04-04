import { useEffect, useRef } from 'react'
import { useAnimation, useInView } from 'framer-motion'

export const useScrollAnimation = (amount = 0.2) => {
  const ref = useRef<HTMLDivElement | null>(null)
  const controls = useAnimation()
  const inView = useInView(ref, { once: true, amount })

  useEffect(() => {
    if (inView) {
      controls.start('visible')
    }
  }, [controls, inView])

  return {
    ref,
    controls,
    variants: {
      hidden: { opacity: 0, y: 32 },
      visible: { opacity: 1, y: 0 },
    },
  }
}
