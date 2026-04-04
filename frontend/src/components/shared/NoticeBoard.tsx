import { BellRing } from 'lucide-react'
import { notices } from '../../services/muMockData'
import GlassCard from '../ui/GlassCard'

const tones: Record<string, string> = {
  Urgent: 'bg-red-500/15 text-red-200 ring-red-400/40',
  Academic: 'bg-amber-500/15 text-amber-100 ring-amber-300/40',
  General: 'bg-emerald-500/15 text-emerald-100 ring-emerald-300/40',
  Event: 'bg-sky-500/15 text-sky-100 ring-sky-300/40',
}

const NoticeBoard = () => {
  const marqueeItems = [...notices, ...notices]

  return (
    <GlassCard goldBorder className="overflow-hidden bg-[var(--surface-dark)] text-white">
      <div className="mb-4 flex items-center gap-3">
        <div className="rounded-full bg-[var(--accent)]/15 p-3 text-[var(--accent-light)]">
          <BellRing size={20} />
        </div>
        <div>
          <p className="font-accent text-xs uppercase tracking-[0.32em] text-[var(--accent-light)]">Notice Board</p>
          <h3 className="font-display text-2xl">Latest announcements</h3>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 py-4">
        <div className="animate-marquee flex min-w-max gap-4 px-4">
          {marqueeItems.map((notice, index) => (
            <div key={`${notice.id}-${index}`} className="flex min-w-[280px] items-center gap-3 rounded-2xl border border-white/10 bg-[rgba(255,255,255,0.04)] px-4 py-3">
              <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] ring-1 ${tones[notice.category]}`}>
                {notice.category}
              </span>
              <div>
                <p className="text-sm font-semibold text-white">{notice.title}</p>
                <p className="text-xs text-slate-300">{notice.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </GlassCard>
  )
}

export default NoticeBoard
