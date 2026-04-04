import { useState } from 'react'
import { toast } from 'react-hot-toast'
import PageHero from '../../components/shared/PageHero'
import GlassCard from '../../components/ui/GlassCard'
import SectionReveal from '../../components/ui/SectionReveal'

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({})

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const nextErrors: typeof errors = {}

    if (!form.name.trim()) nextErrors.name = 'Name is required.'
    if (!/\S+@\S+\.\S+/.test(form.email)) nextErrors.email = 'Enter a valid email address.'
    if (form.message.trim().length < 10) nextErrors.message = 'Please enter at least 10 characters.'

    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    toast.success('Message sent successfully.')
    setForm({ name: '', email: '', message: '' })
  }

  return (
    <div>
      <PageHero title="Contact" subtitle="Connect with our admissions, academic, and campus support teams." />
      <section className="bg-[var(--surface)] px-4 py-16 md:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionReveal>
            <GlassCard className="h-full bg-hero text-white">
              <h2 className="font-display text-3xl">Visit Metropolitan University</h2>
              <p className="mt-3 text-sm text-slate-200">Bateshwar, Sylhet-3104, Bangladesh</p>
              <p className="mt-2 text-sm text-slate-200">info@metrouni.edu.bd • +88 01313 050044,

+88 01313 050066</p>
            </GlassCard>
          </SectionReveal>

          <SectionReveal>
            <GlassCard className="bg-white">
              <h2 className="font-display text-3xl text-[var(--text-primary)]">Send us a message</h2>
              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div>
                  <input
                    value={form.name}
                    onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
                    placeholder="Your name"
                    className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-[var(--accent)]"
                  />
                  {errors.name ? <p className="mt-1 text-xs text-red-500">{errors.name}</p> : null}
                </div>
                <div>
                  <input
                    value={form.email}
                    onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
                    placeholder="Email address"
                    className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-[var(--accent)]"
                  />
                  {errors.email ? <p className="mt-1 text-xs text-red-500">{errors.email}</p> : null}
                </div>
                <div>
                  <textarea
                    rows={5}
                    value={form.message}
                    onChange={(event) => setForm((current) => ({ ...current, message: event.target.value }))}
                    placeholder="How can we help?"
                    className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-[var(--accent)]"
                  />
                  {errors.message ? <p className="mt-1 text-xs text-red-500">{errors.message}</p> : null}
                </div>
                <button type="submit" className="rounded-full bg-[var(--primary)] px-5 py-3 font-semibold text-white transition hover:bg-[var(--secondary)]">
                  Send Message
                </button>
              </form>
            </GlassCard>
          </SectionReveal>
        </div>
      </section>
    </div>
  )
}

export default Contact
