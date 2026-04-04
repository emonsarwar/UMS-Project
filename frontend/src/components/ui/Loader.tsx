import { motion } from 'framer-motion'

const Loader = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--mu-navy)] px-4 text-white">
      <div className="w-full max-w-md text-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.8, ease: 'linear' }}
          className="mx-auto mb-5 flex h-24 w-24 items-center justify-center rounded-full border-2 border-[var(--mu-gold-light)] border-t-transparent"
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/10 font-display text-2xl text-[var(--mu-gold-light)]">
            MU
          </div>
        </motion.div>
        <p className="font-display text-3xl text-white">Metropolitan University</p>
        <p className="mt-1 font-accent text-xs uppercase tracking-[0.35em] text-[var(--mu-gold-light)]">
          Education. Not Just a Degree.
        </p>
        <div className="mt-6 h-1.5 overflow-hidden rounded-full bg-white/10">
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5, ease: 'easeInOut' }}
            className="h-full w-1/2 rounded-full bg-[var(--mu-gold)]"
          />
        </div>
      </div>
    </div>
  )
}

export default Loader
