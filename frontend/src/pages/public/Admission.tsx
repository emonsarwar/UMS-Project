import { CheckCircle2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import PageHero from '../../components/shared/PageHero'
import GlassCard from '../../components/ui/GlassCard'
import SectionReveal from '../../components/ui/SectionReveal'

const steps = [
  'Choose your program and review eligibility criteria.',
  'Submit the online application with academic documents.',
  'Attend interview or aptitude assessment if required.',
  'Receive your offer letter and secure enrollment.',
]

const Admission = () => {
  return (
    <div>
      <PageHero title="Admission" subtitle="Begin your application to a university built for excellence and impact." />
      <section className="bg-white px-4 py-16 md:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1fr_0.9fr]">
          <SectionReveal>
            <GlassCard className="bg-white">
              <p className="font-accent text-xs uppercase tracking-[0.32em] text-[var(--accent)]">Application Path</p>
              <h2 className="mt-3 font-display text-4xl text-[var(--text-primary)]">A refined admissions journey</h2>
              <div className="mt-6 space-y-4">
                {steps.map((step) => (
                  <div key={step} className="flex gap-3 rounded-2xl bg-[var(--surface)] p-4 text-sm text-slate-600">
                    <CheckCircle2 className="mt-0.5 text-[var(--accent)]" size={18} />
                    {step}
                  </div>
                ))}
              </div>
            </GlassCard>
          </SectionReveal>

          <SectionReveal>
            <GlassCard className="bg-hero text-white">
              <p className="font-accent text-xs uppercase tracking-[0.32em] text-[var(--accent-light)]">Scholarships</p>
              <h2 className="mt-3 font-display text-4xl">Support for exceptional promise</h2>
              <p className="mt-4 text-sm text-slate-200">
                Merit awards, research fellowships, and leadership grants are available across select programs.
              </p>
              <Link to="/contact" className="mt-6 inline-flex rounded-full bg-[var(--accent)] px-5 py-3 font-semibold text-[var(--primary)]">
                Speak to Admissions
              </Link>
            </GlassCard>
          </SectionReveal>
        </div>
      </section>
    </div>
  )
}

export default Admission
