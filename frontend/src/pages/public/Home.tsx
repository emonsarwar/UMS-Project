import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { ArrowRight, BookOpenText, Building2, ChevronRight, Cpu, FlaskConical, Globe2, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import HeroSlider from '../../components/ui/HeroSlider'
import GlassCard from '../../components/ui/GlassCard'
import SectionReveal from '../../components/ui/SectionReveal'
import StatsBar from '../../components/shared/StatsBar'
import NoticeBoard from '../../components/shared/NoticeBoard'
import api from '../../services/api'
import { clubs, departments, events, facilities, galleryItems, leadership, newsItems, partnerships, schools, teachers, tickerItems, universityInfo } from '../../services/muMockData'

const featureCards = [
  {
    title: 'Academic Excellence',
    description: 'UGC-approved programmes with outcome-based teaching, advising, and career guidance.',
    icon: BookOpenText,
  },
  {
    title: 'Research & Innovation',
    description: 'Research cell, publication support, colloquiums, and interdisciplinary innovation culture.',
    icon: FlaskConical,
  },
  {
    title: 'Digital Future Readiness',
    description: 'Smart classrooms, labs, LMS-ready workflows, and industry-aligned technology education.',
    icon: Cpu,
  },
]

const Home = () => {
  const [activeSchool, setActiveSchool] = useState(schools[0]?.key ?? 'science')

  const currentSchool = schools.find((item) => item.key === activeSchool) ?? schools[0]

  const { data: latestNews = newsItems } = useQuery({
    queryKey: ['mu-home-news'],
    staleTime: 60_000,
    queryFn: async () => {
      try {
        const { data } = await api.get('/news')
        const payload = data?.data?.articles ?? data?.data ?? data
        return Array.isArray(payload) && payload.length ? payload : newsItems
      } catch {
        return newsItems
      }
    },
  })

  const { data: upcomingEvents = events } = useQuery({
    queryKey: ['mu-home-events'],
    staleTime: 60_000,
    queryFn: async () => {
      try {
        const { data } = await api.get('/events')
        const payload = data?.data?.events ?? data?.data ?? data
        return Array.isArray(payload) && payload.length ? payload : events
      } catch {
        return events
      }
    },
  })

  return (
    <div className="overflow-hidden">
      <HeroSlider />

      <section className="border-y border-[rgba(201,168,76,0.18)] bg-[var(--mu-navy)] px-4 py-3 text-white md:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 md:flex-row md:items-center">
          <span className="inline-flex rounded-full bg-[var(--accent)]/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-[var(--accent-light)]">Latest Updates</span>
          <div className="hide-scrollbar flex gap-6 overflow-x-auto text-sm text-slate-200">
            {tickerItems.map((item) => (
              <span key={item} className="whitespace-nowrap">• {item}</span>
            ))}
          </div>
        </div>
      </section>

      <StatsBar />

      <section className="bg-hero px-4 py-16 text-white md:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionReveal className="mb-8 text-center">
            <p className="font-accent text-xs uppercase tracking-[0.35em] text-[var(--accent-light)]">Why Metropolitan University</p>
            <h2 className="mt-3 font-display text-4xl">A premium academic ecosystem for Sylhet and beyond</h2>
          </SectionReveal>
          <div className="grid gap-6 lg:grid-cols-3">
            {featureCards.map(({ title, description, icon: Icon }, index) => (
              <SectionReveal key={title} delay={index * 0.08}>
                <GlassCard className="h-full bg-white/5 text-white">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--accent)]/15 text-[var(--accent-light)]">
                    <Icon size={24} />
                  </div>
                  <h3 className="font-display text-2xl">{title}</h3>
                  <p className="mt-3 text-slate-300">{description}</p>
                  <Link to="/about" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent-light)]">
                    Learn More <ArrowRight size={16} />
                  </Link>
                </GlassCard>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--surface)] px-4 py-16 md:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <SectionReveal>
            <p className="font-accent text-xs uppercase tracking-[0.35em] text-[var(--accent)]">About MU</p>
            <h2 className="mt-3 font-display text-4xl text-[var(--text-primary)]">Sylhet's first permanently chartered private university</h2>
            <p className="mt-4 max-w-2xl text-slate-600">
              Established in {universityInfo.founded}, {universityInfo.name} continues to expand its academic reputation through quality teaching, student support, and international partnerships.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="rounded-3xl border border-slate-200 bg-white p-4">
                <p className="text-xs uppercase tracking-[0.22em] text-slate-500">Charter</p>
                <p className="mt-2 font-semibold text-[var(--text-primary)]">{universityInfo.charter}</p>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-white p-4">
                <p className="text-xs uppercase tracking-[0.22em] text-slate-500">Accreditation</p>
                <p className="mt-2 font-semibold text-[var(--text-primary)]">{universityInfo.accreditation}</p>
              </div>
            </div>
            <blockquote className="mt-6 border-l-2 border-[var(--accent)] pl-4 font-display text-2xl text-[var(--secondary)]">
              “{universityInfo.tagline}”
            </blockquote>
            <Link to="/about" className="mt-6 inline-flex rounded-full bg-[var(--primary)] px-5 py-3 font-semibold text-white transition hover:bg-[var(--secondary)]">
              Read Full Story
            </Link>
          </SectionReveal>

          <SectionReveal>
            <div className="grid gap-4 sm:grid-cols-2">
              {leadership.map((item, index) => (
                <div key={item.id} className={`rounded-3xl p-5 shadow-sm ${index === 0 ? 'bg-[var(--mu-navy)] text-white sm:col-span-2' : 'bg-white text-[var(--text-primary)] border border-slate-200'}`}>
                  <p className={`text-xs uppercase tracking-[0.25em] ${index === 0 ? 'text-[var(--accent-light)]' : 'text-slate-500'}`}>{item.title}</p>
                  <h3 className="mt-2 font-display text-2xl">{item.name}</h3>
                  <p className={`mt-2 text-sm ${index === 0 ? 'text-slate-200' : 'text-slate-600'}`}>{item.summary}</p>
                </div>
              ))}
            </div>
          </SectionReveal>
        </div>
      </section>

      <section className="bg-white px-4 py-16 md:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionReveal className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="font-accent text-xs uppercase tracking-[0.35em] text-[var(--accent)]">Academic Schools</p>
              <h2 className="mt-3 font-display text-4xl text-[var(--text-primary)]">Explore our schools and programmes</h2>
            </div>
            <Link to="/departments" className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--secondary)]">
              View all departments <ArrowRight size={16} />
            </Link>
          </SectionReveal>

          <div className="mb-6 flex flex-wrap gap-2">
            {schools.map((school) => (
              <button key={school.key} type="button" onClick={() => setActiveSchool(school.key)} className={`rounded-full px-4 py-2 text-sm font-semibold transition ${activeSchool === school.key ? 'bg-[var(--mu-navy)] text-white' : 'bg-[var(--surface)] text-slate-700 hover:bg-slate-200'}`}>
                {school.icon} {school.name}
              </button>
            ))}
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <GlassCard className="bg-[var(--surface)]">
              <p className="text-xs uppercase tracking-[0.22em] text-[var(--accent)]">Focused learning</p>
              <h3 className="mt-2 font-display text-3xl text-[var(--text-primary)]">{currentSchool?.name}</h3>
              <p className="mt-3 text-slate-600">{currentSchool?.description}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {currentSchool?.departments.map((dept) => (
                  <span key={dept} className="rounded-full bg-white px-3 py-1 text-sm text-slate-700 ring-1 ring-slate-200">
                    {dept}
                  </span>
                ))}
              </div>
            </GlassCard>

            <div className="grid gap-4 sm:grid-cols-2">
              {departments.slice(0, 4).map((department, index) => (
                <SectionReveal key={department.id} delay={index * 0.03}>
                  <div className="group rounded-3xl border border-slate-200 bg-[var(--surface)] p-5 transition duration-300 hover:-translate-y-1 hover:border-[var(--accent)] hover:shadow-gold">
                    <div className="mb-4 flex items-center justify-between">
                      <span className="text-3xl">{department.icon}</span>
                      <span className="rounded-full bg-[var(--primary)] px-3 py-1 text-xs text-white">{department.students}+ students</span>
                    </div>
                    <h3 className="font-display text-xl text-[var(--text-primary)]">{department.name}</h3>
                    <p className="mt-2 text-sm text-slate-600">{department.shortDesc}</p>
                  </div>
                </SectionReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[var(--surface)] px-4 py-16 md:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-[28px] bg-[var(--mu-navy)] p-8 text-white shadow-glass">
          <SectionReveal>
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="font-accent text-xs uppercase tracking-[0.35em] text-[var(--accent-light)]">Global Partnerships</p>
                <h2 className="mt-2 font-display text-4xl">Industry, accreditation, and international connection</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {partnerships.map((item) => (
                  <span key={item} className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-100">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>

      <section className="bg-white px-4 py-16 md:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionReveal className="mb-8">
            <p className="font-accent text-xs uppercase tracking-[0.35em] text-[var(--accent)]">Research & Faculty</p>
            <h2 className="mt-3 font-display text-4xl text-[var(--text-primary)]">Mentors and centres shaping knowledge</h2>
          </SectionReveal>

          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <GlassCard className="bg-[var(--surface)]">
              <div className="flex items-center gap-3 text-[var(--secondary)]">
                <FlaskConical size={22} />
                <p className="font-semibold">Research Cell • Publication • Colloquium</p>
              </div>
              <p className="mt-3 text-slate-600">Faculty members and students engage in applied research, academic publishing, conference participation, and collaborative innovation initiatives.</p>
              <div className="mt-5 space-y-2 text-sm text-slate-700">
                <div className="flex items-center gap-2"><ChevronRight size={16} /> Applied Machine Learning & Data Systems</div>
                <div className="flex items-center gap-2"><ChevronRight size={16} /> Software Engineering & Cyber Security</div>
                <div className="flex items-center gap-2"><ChevronRight size={16} /> Business, Law, Media & Society</div>
              </div>
              <Link to="/research" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[var(--secondary)]">
                Explore research <ArrowRight size={16} />
              </Link>
            </GlassCard>

            <div className="hide-scrollbar flex gap-4 overflow-x-auto pb-4">
              {teachers.slice(0, 6).map((teacher) => (
                <GlassCard key={teacher.id} className="min-w-[280px] bg-white">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-hero text-xl text-[var(--accent-light)]">
                    {teacher.name.split(' ').map((part) => part[0]).join('').slice(0, 2)}
                  </div>
                  <h3 className="mt-4 font-display text-2xl text-[var(--text-primary)]">{teacher.name}</h3>
                  <p className="text-sm font-semibold text-[var(--secondary)]">{teacher.designation}</p>
                  <p className="mt-2 text-sm text-slate-600">{teacher.department}</p>
                  <p className="mt-1 text-sm text-slate-500">Research: {teacher.researchArea}</p>
                </GlassCard>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[var(--surface)] px-4 py-16 md:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-2">
          <SectionReveal>
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="font-accent text-xs uppercase tracking-[0.35em] text-[var(--accent)]">Campus Life</p>
                <h2 className="mt-2 font-display text-3xl text-[var(--text-primary)]">Clubs, support, and student services</h2>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {clubs.slice(0, 8).map((club) => (
                <div key={club} className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700">
                  <span className="mr-2 text-[var(--accent)]">●</span>{club}
                </div>
              ))}
            </div>
          </SectionReveal>

          <SectionReveal>
            <GlassCard className="bg-[var(--mu-navy)] text-white">
              <div className="mb-4 flex items-center gap-3 text-[var(--accent-light)]">
                <Building2 size={20} />
                <p className="font-semibold">Campus Facilities & Services</p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {facilities.slice(0, 8).map((item) => (
                  <div key={item} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-100">{item}</div>
                ))}
              </div>
              <Link to="/campus-life" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent-light)]">
                Discover student life <ArrowRight size={16} />
              </Link>
            </GlassCard>
          </SectionReveal>
        </div>
      </section>

      <section className="bg-white px-4 py-16 md:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <SectionReveal>
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="font-accent text-xs uppercase tracking-[0.35em] text-[var(--accent)]">Newsroom</p>
                <h2 className="mt-2 font-display text-3xl text-[var(--text-primary)]">Latest news & achievements</h2>
              </div>
            </div>
            <div className="space-y-4">
              {latestNews.slice(0, 3).map((item) => (
                <GlassCard key={item.id} className="bg-white">
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--accent)]">{item.date} • {item.category}</p>
                  <h3 className="mt-2 font-display text-2xl text-[var(--text-primary)]">{item.title}</h3>
                  <p className="mt-2 text-sm text-slate-600">{'excerpt' in item ? item.excerpt : 'Visit the newsroom for the complete update.'}</p>
                  <Link to="/news" className="mt-4 inline-flex text-sm font-semibold text-[var(--secondary)]">Read More</Link>
                </GlassCard>
              ))}
            </div>
          </SectionReveal>

          <SectionReveal>
            <GlassCard className="bg-[var(--surface-dark)] text-white">
              <p className="font-accent text-xs uppercase tracking-[0.35em] text-[var(--accent-light)]">Upcoming events</p>
              <div className="mt-5 space-y-5">
                {upcomingEvents.slice(0, 4).map((event) => (
                  <div key={event.id} className="flex gap-4 border-b border-white/10 pb-4 last:border-0">
                    <div className="min-w-[72px] rounded-2xl bg-[var(--accent)]/15 px-3 py-2 text-center text-[var(--accent-light)]">
                      <p className="text-lg font-bold">{event.date.split(' ')[0]}</p>
                      <p className="text-xs uppercase">{event.date.split(' ')[1]}</p>
                    </div>
                    <div>
                      <h3 className="font-display text-xl">{event.title}</h3>
                      <p className="text-sm text-slate-300">{event.location}</p>
                      <p className="mt-1 text-sm text-slate-400">{event.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </SectionReveal>
        </div>
      </section>

      <section className="bg-[var(--surface)] px-4 py-16 md:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionReveal className="mb-8 flex items-center justify-between gap-4">
            <div>
              <p className="font-accent text-xs uppercase tracking-[0.35em] text-[var(--accent)]">Gallery</p>
              <h2 className="mt-3 font-display text-4xl text-[var(--text-primary)]">A glimpse of life at MU</h2>
            </div>
            <Link to="/gallery" className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--secondary)]">
              View Full Gallery <ArrowRight size={16} />
            </Link>
          </SectionReveal>
          <div className="grid gap-4 md:grid-cols-3">
            {galleryItems.slice(0, 6).map((item, index) => (
              <SectionReveal key={item.id} delay={index * 0.04}>
                <div className={`group flex min-h-[220px] items-end rounded-3xl bg-gradient-to-br ${item.gradient} p-5 text-white`}>
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-white/80">{item.category}</p>
                    <h3 className="mt-2 font-display text-2xl">{item.title}</h3>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--mu-navy)] px-4 py-16 md:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl space-y-6">
          <NoticeBoard />
          <SectionReveal>
            <div className="rounded-[28px] border border-[rgba(201,168,76,0.25)] bg-[linear-gradient(135deg,rgba(13,19,51,0.96),rgba(27,42,107,0.92))] p-8 text-white shadow-glass">
              <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="font-accent text-xs uppercase tracking-[0.35em] text-[var(--accent-light)]">Admissions Open</p>
                  <h2 className="mt-2 font-display text-4xl">Join Metropolitan University</h2>
                  <p className="mt-2 max-w-2xl text-slate-300">Apply for Spring 2026 and become part of a university focused on academic quality, innovation, and impact.</p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Link to="/admission" className="rounded-full bg-[var(--accent)] px-5 py-3 font-semibold text-[var(--primary)] transition hover:bg-[var(--accent-light)]">
                    Apply Now
                  </Link>
                  <Link to="/contact" className="rounded-full border border-white/15 px-5 py-3 font-semibold text-white transition hover:border-[var(--accent)] hover:text-[var(--accent-light)]">
                    Contact Admission
                  </Link>
                </div>
              </div>
            </div>
          </SectionReveal>

          <SectionReveal>
            <div className="grid gap-4 md:grid-cols-3">
              <GlassCard className="bg-white/5 text-white">
                <div className="flex items-center gap-3 text-[var(--accent-light)]"><Globe2 size={18} /> International outlook</div>
                <p className="mt-3 text-sm text-slate-300">Partnership-led learning, English readiness, and career-focused student support.</p>
              </GlassCard>
              <GlassCard className="bg-white/5 text-white">
                <div className="flex items-center gap-3 text-[var(--accent-light)]"><Sparkles size={18} /> Student growth</div>
                <p className="mt-3 text-sm text-slate-300">Clubs, mentoring, transport, advising, and campus engagement for holistic development.</p>
              </GlassCard>
              <GlassCard className="bg-white/5 text-white">
                <div className="flex items-center gap-3 text-[var(--accent-light)]"><Building2 size={18} /> Quality assurance</div>
                <p className="mt-3 text-sm text-slate-300">Continuous improvement through IQAC, academic oversight, and performance measurement.</p>
              </GlassCard>
            </div>
          </SectionReveal>
        </div>
      </section>
    </div>
  )
}

export default Home
