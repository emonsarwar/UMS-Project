import { useState } from 'react'
import { motion } from 'framer-motion'
import GlassCard from '../../components/ui/GlassCard'
import { galleryItems as initialGallery } from '../../services/muMockData'

const Gallery = () => {
  const [items, setItems] = useState(initialGallery)

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <GlassCard className="bg-white">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="font-display text-3xl text-[var(--text-primary)]">Gallery management</h2>
            <p className="text-sm text-slate-500">Upload and curate Cloudinary-backed media assets.</p>
          </div>
          <label className="rounded-full bg-[var(--primary)] px-5 py-3 text-sm font-semibold text-white">Upload Image</label>
        </div>
      </GlassCard>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {items.map((item) => (
          <div key={item.id} className={`rounded-3xl bg-gradient-to-br ${item.gradient} p-5 text-white`}>
            <p className="text-xs uppercase tracking-[0.3em] text-white/75">{item.category}</p>
            <h3 className="mt-2 font-display text-3xl">{item.title}</h3>
            <button type="button" onClick={() => setItems((current) => current.filter((entry) => entry.id !== item.id))} className="mt-5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold">
              Delete
            </button>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

export default Gallery
