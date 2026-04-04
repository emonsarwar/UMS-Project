import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import GlassCard from '../../components/ui/GlassCard'
import DataTable from '../../components/ui/DataTable'
import Modal from '../../components/ui/Modal'
// import useAuth from '../../hooks/useAuth' // unused
import { adminService } from '../../services/adminService'
import api from '../../services/api'
import type { Book, BookCategory } from '../../types'

interface NewBook {
  title: string
  isbn: string
  totalQuantity: number
  availableQuantity: number
  categoryId: string
  authors: string
  edition?: string
  publicationYear?: number
  description?: string
  coverImage?: string
}

const ManageLibrary = () => {
  const [books, setBooks] = useState<Book[]>([])
  const [categories, setCategories] = useState<BookCategory[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [creating, setCreating] = useState(false)
  const [newBook, setNewBook] = useState<NewBook>({
    title: '',
    isbn: '',
    totalQuantity: 1,
    availableQuantity: 1,
    categoryId: '',
    authors: '',
  })

  useEffect(() => {
    fetchBooks()
    fetchCategories()
  }, [])

  const fetchBooks = async () => {
    try {
      const { data } = await api.get('/library/books')
      setBooks(data.data || [])
    } catch {
      console.error('Failed to fetch books')
    }
  }

  const fetchCategories = async () => {
    try {
      const { data } = await api.get('/library/categories')
      setCategories(data.data || [])
    } catch {
      console.error('Failed to fetch categories')
    }
  }

  const handleCreateBook = async (e: React.FormEvent) => {
    e.preventDefault()
    setCreating(true)
    try {
      await adminService.createBook(newBook)
      setIsModalOpen(false)
      setNewBook({ title: '', isbn: '', totalQuantity: 1, availableQuantity: 1, categoryId: '', authors: '' })
      fetchBooks()
    } catch {
      console.error('Failed to create book')
    } finally {
      setCreating(false)
    }
  }

  const columns: import('../../components/ui/DataTable').DataTableColumn<Book>[] = [
    { header: 'Title', accessor: 'title' },
    { header: 'ISBN', accessor: 'isbn' },
    { header: 'Year', accessor: 'publicationYear' },
    { header: 'Total', accessor: 'totalQuantity' },
    {
      header: 'Available',
      accessor: 'availableQuantity',
      sortable: false,
      render: (_value, row: Book) => `${row.availableQuantity}/${row.totalQuantity}`,
    },
    {
      header: 'Category',
      accessor: (row: Book) => row.category.name,
      sortable: false,
    },
    {
      header: 'Authors',
      accessor: (row: Book) => row.authorBooks.map((a) => a.author.name).join(', '),
      sortable: false,
    },
  ]

  return (
    <motion.div 
      initial={{ opacity: 0, y: 12 }} 
      animate={{ opacity: 1, y: 0 }} 
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <h1 className="font-display text-4xl text-[var(--text-primary)]">Library Management</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="rounded-full bg-[var(--primary)] px-6 py-3 text-white shadow-xl hover:bg-[var(--primary-dark)]"
        >
          + Add Book
        </button>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_0.8fr]">
        <GlassCard className="bg-white">
          <DataTable
            title="Books Inventory"
            data={books}
            rowKey="id"
          columns={columns}
          searchKeys={[]}
        />
        </GlassCard>

        <GlassCard className="bg-white">
          <h3 className="font-display text-xl mb-4 text-[var(--text-primary)]">Categories ({categories.length})</h3>
          <div className="space-y-2">
            {categories.map((cat) => (
              <div key={cat.id} className="flex justify-between text-sm">
                <span>{cat.name}</span>
                <span className="text-[var(--accent)] font-medium">{cat.books?.length || 0} books</span>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

<Modal open={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Book">
        <h2 className="text-2xl font-display mb-6">Add New Book</h2>
        <form onSubmit={handleCreateBook} className="space-y-4">
          <div>
            <label>Title *</label>
            <input
              type="text"
              value={newBook.title}
              onChange={(e) => setNewBook({...newBook, title: e.target.value})}
              className="mt-1 w-full rounded-lg border border-slate-200 p-3"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label>ISBN *</label>
              <input
                type="text"
                value={newBook.isbn}
                onChange={(e) => setNewBook({...newBook, isbn: e.target.value})}
                className="mt-1 w-full rounded-lg border border-slate-200 p-3"
                required
              />
            </div>
            <div>
              <label>Total Quantity *</label>
              <input
                type="number"
                value={newBook.totalQuantity}
                onChange={(e) => setNewBook({...newBook, totalQuantity: Number(e.target.value)})}
                className="mt-1 w-full rounded-lg border border-slate-200 p-3"
                required
                min="1"
              />
            </div>
          </div>
          <div>
            <label>Category *</label>
            <select
              value={newBook.categoryId}
              onChange={(e) => setNewBook({...newBook, categoryId: e.target.value})}
              className="mt-1 w-full rounded-lg border border-slate-200 p-3"
              required
            >
              <option value="">Select Category</option>
              {categories.map((cat: BookCategory) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label>Authors (comma separated)</label>
            <input
              type="text"
              value={newBook.authors}
              onChange={(e) => setNewBook({...newBook, authors: e.target.value})}
              className="mt-1 w-full rounded-lg border border-slate-200 p-3"
              placeholder="e.g. John Doe, Jane Smith"
            />
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="flex-1 rounded-lg bg-slate-200 px-4 py-3 text-slate-700 hover:bg-slate-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={creating}
              className="flex-1 rounded-lg bg-[var(--primary)] px-4 py-3 text-white hover:bg-[var(--primary-dark)] disabled:opacity-50"
            >
              {creating ? 'Creating...' : 'Create Book'}
            </button>
          </div>
        </form>
      </Modal>
    </motion.div>
  )
}

export default ManageLibrary

