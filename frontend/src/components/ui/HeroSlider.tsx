import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const slides = [
  {
    badge: '🏛️ PERMANENTLY CHARTERED — OCTOBER 2024',
    title: ['Education.', 'Not Just a Degree.'],
    subtitle: "Metropolitan University — Sylhet's First Permanently Chartered Private University",
    primary: 'Explore Programmes',
    secondary: 'Apply Now',
    primaryTo: '/departments',
    secondaryTo: '/admission',
  },
  {
    badge: '🤝 CAMBRIDGE ENGLISH PARTNER',
    title: ['Global Partnerships', 'World-Class Programmes'],
    subtitle: 'Official Cambridge English Educational Partner & British Council IELTS Partner',
    primary: 'View Programmes',
    secondary: 'Learn More',
    primaryTo: '/departments',
    secondaryTo: '/about',
  },
  {
    badge: '🔬 NEWLY APPROVED PROGRAMME',
    title: ['BSc in', 'Data Science'],
    subtitle: 'UGC-approved new programme — enroll now for Spring 2026 semester',
    primary: 'Apply for Data Science',
    secondary: 'Programme Details',
    primaryTo: '/admission',
    secondaryTo: '/departments',
  },
  {
    badge: '🎉 CSE FEST 2025',
    title: ['Innovation', 'Meets Technology'],
    subtitle: 'Celebrating the colorful inauguration of CSE Fest-2025 at Metropolitan University',
    primary: 'View Gallery',
    secondary: 'Upcoming Events',
    primaryTo: '/gallery',
    secondaryTo: '/events',
  },
  {
    badge: '🎖️ PRIDE OF MU',
    title: ["Our Cadets'", 'Outstanding Achievements'],
    subtitle: 'Celebrating the remarkable achievements of Metropolitan University cadets',
    primary: 'Read More',
    secondary: 'About MU',
    primaryTo: '/news',
    secondaryTo: '/about',
  },
]

const HeroSlider = () => {
  const [activeSlide, setActiveSlide] = useState(0)

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length)
    }, 6000)

    return () => window.clearInterval(timer)
  }, [])

  const slide = slides[activeSlide]

  return (
    <section className="relative min-h-screen overflow-hidden bg-hero px-4 pb-16 pt-28 text-white md:px-6 lg:px-8">
      <div className="mesh-background absolute inset-0 opacity-80" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(201,168,76,0.12),transparent_24%)]" />
      {Array.from({ length: 20 }).map((_, index) => (
        <span
          key={index}
          className="floating-orb absolute rounded-full bg-[rgba(240,208,106,0.18)] blur-xl"
          style={{
            width: `${(index % 4) + 0.4}rem`,
            height: `${(index % 4) + 0.4}rem`,
            left: `${(index * 13) % 100}%`,
            top: `${(index * 17) % 100}%`,
            animationDelay: `${index * 0.3}s`,
          }}
          aria-hidden="true"
        />
      ))}

      <div className="relative mx-auto flex min-h-[82vh] max-w-7xl items-center justify-between gap-8">
        <div className="max-w-4xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.badge}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.45 }}
              className="space-y-6"
            >
              <span className="inline-flex rounded-full border border-[rgba(201,168,76,0.3)] bg-white/10 px-4 py-2 font-accent text-[11px] uppercase tracking-[0.32em] text-[var(--accent-light)]">
                {slide.badge}
              </span>

              <h1 className="max-w-4xl font-display text-5xl leading-[0.95] md:text-6xl lg:text-7xl xl:text-8xl">
                {slide.title.map((line, lineIndex) => (
                  <span key={line} className="block">
                    {line.split(' ').map((word, wordIndex) => (
                      <motion.span
                        key={`${word}-${wordIndex}`}
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: lineIndex * 0.12 + wordIndex * 0.08, duration: 0.7 }}
                        className={`mr-3 inline-block ${lineIndex === 1 ? 'text-[var(--accent-light)]' : ''}`}
                      >
                        {word}
                      </motion.span>
                    ))}
                  </span>
                ))}
              </h1>

              <p className="max-w-2xl text-lg text-slate-200 md:text-xl">{slide.subtitle}</p>

              <div className="flex flex-wrap gap-3">
                <Link to={slide.primaryTo} className="inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-6 py-3 font-semibold text-[var(--primary)] transition hover:-translate-y-0.5 hover:bg-[var(--accent-light)]">
                  {slide.primary} <ArrowRight size={18} />
                </Link>
                <Link to={slide.secondaryTo} className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 font-semibold text-white transition hover:border-[var(--accent)] hover:text-[var(--accent-light)]">
                  {slide.secondary}
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-10 flex items-center gap-3">
            <button type="button" onClick={() => setActiveSlide((current) => (current - 1 + slides.length) % slides.length)} className="rounded-full border border-white/15 bg-white/5 p-2 text-white transition hover:border-[var(--accent)]">
              <ArrowLeft size={18} />
            </button>
            {slides.map((item, index) => (
              <button
                key={item.badge}
                type="button"
                onClick={() => setActiveSlide(index)}
                aria-label={`Show slide ${index + 1}`}
                className={`h-2.5 rounded-full transition-all ${activeSlide === index ? 'w-10 bg-[var(--accent-light)]' : 'w-2.5 bg-white/35'}`}
              />
            ))}
            <button type="button" onClick={() => setActiveSlide((current) => (current + 1) % slides.length)} className="rounded-full border border-white/15 bg-white/5 p-2 text-white transition hover:border-[var(--accent)]">
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>

      <motion.div key={activeSlide} initial={{ width: '0%' }} animate={{ width: '100%' }} transition={{ duration: 5.8, ease: 'linear' }} className="absolute bottom-0 left-0 h-1 bg-[var(--accent)]" />

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[var(--accent-light)]">
        <div className="flex animate-bounce flex-col items-center gap-2 text-xs uppercase tracking-[0.35em]">
          Scroll <ArrowDown size={18} />
        </div>
      </div>
    </section>
  )
}

export default HeroSlider
