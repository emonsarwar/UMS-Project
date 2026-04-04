import { useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { toast } from 'react-hot-toast'
import { motion } from 'framer-motion'
import GlassCard from '../../components/ui/GlassCard'
import { notices as initialNotices } from '../../services/muMockData'

const NoticeBoard = () => {
  const [items, setItems] = useState(initialNotices)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [category, setCategory] = useState('Urgent')
  const [audience, setAudience] = useState('All')
  const [published, setPublished] = useState(true)

  const publishNotice = () => {
    if (!title.trim() || content.replace(/<[^>]+>/g, '').trim().length < 10) {
      toast.error('Please provide a title and rich-text content.')
      return
    }

    setItems((current) => [
      {
        id: `N-${current.length + 1}`,
        title,
        content,
        category: category as 'Urgent' | 'Academic' | 'General' | 'Event',
        audience,
        date: new Date().toISOString().slice(0, 10),
      },
      ...current,
    ])
    toast.success(`Notice ${published ? 'published' : 'scheduled'} successfully.`)
    setTitle('')
    setContent('')
  }

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="grid gap-6 xl:grid-cols-[1fr_0.9fr]">
      <GlassCard className="bg-white">
        <h2 className="font-display text-3xl text-[var(--text-primary)]">Create notice</h2>
        <div className="mt-4 space-y-4">
          <input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Notice title" className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-[var(--accent)]" />
          <div className="grid gap-3 md:grid-cols-2">
            <select value={category} onChange={(event) => setCategory(event.target.value)} className="rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none">
              {['Urgent', 'Academic', 'General', 'Event'].map((item) => <option key={item}>{item}</option>)}
            </select>
            <select value={audience} onChange={(event) => setAudience(event.target.value)} className="rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none">
              {['All', 'Students', 'Teachers', 'Specific Dept'].map((item) => <option key={item}>{item}</option>)}
            </select>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-2">
            <ReactQuill theme="snow" value={content} onChange={setContent} />
          </div>
          <button type="button" onClick={() => setPublished((current) => !current)} className={`rounded-full px-4 py-2 text-sm font-semibold ${published ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-700'}`}>
            {published ? 'Published' : 'Scheduled'}
          </button>
          <button type="button" onClick={publishNotice} className="block rounded-full bg-[var(--primary)] px-5 py-3 font-semibold text-white">
            Save Notice
          </button>
        </div>
      </GlassCard>

      <GlassCard className="bg-white">
        <h2 className="font-display text-3xl text-[var(--text-primary)]">Notice list</h2>
        <div className="mt-4 space-y-3">
          {items.map((item) => (
            <div key={item.id} className="rounded-2xl border border-slate-200 p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="font-semibold text-[var(--text-primary)]">{item.title}</p>
                  <p className="text-xs text-slate-500">{item.category} • {item.audience}</p>
                </div>
                <button type="button" onClick={() => setItems((current) => current.filter((notice) => notice.id !== item.id))} className="rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-600">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
    </motion.div>
  )
}

export default NoticeBoard
