import { useMemo, useState, type ReactNode } from 'react'
import { ArrowUpDown, Search } from 'lucide-react'
import clsx from 'clsx'

export type DataTableAccessor<T> = keyof T | ((row: T) => string)

export interface DataTableColumn<T> {
  header: string
  accessor: DataTableAccessor<T>
  sortable?: boolean
  render?: (value: T[keyof T] | string, row: T) => ReactNode
}

interface DataTableProps<T extends object> {
  title?: string
  data: T[]
  columns: DataTableColumn<T>[]
  searchKeys?: Array<keyof T>
  rowKey: keyof T | ((row: T) => string)
  emptyMessage?: string
}

const DataTable = <T extends object>({
  title,
  data,
  columns,
  searchKeys = [],
  rowKey,
  emptyMessage = 'No records found.',
}: DataTableProps<T>) => {
  const [query, setQuery] = useState('')
  const [sortKey, setSortKey] = useState<keyof T | null>(null)
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')

  const filteredData = useMemo(() => {
    const loweredQuery = query.toLowerCase()

    const searched = data.filter((row) => {
      if (!loweredQuery) return true
      return searchKeys.some((key) => String(row[key as keyof T] ?? '').toLowerCase().includes(loweredQuery))
    })

    if (!sortKey) return searched

    return [...searched].sort((left, right) => {
      const leftValue = left[sortKey as keyof T]
      const rightValue = right[sortKey as keyof T]

      if (leftValue === rightValue) return 0
      const result = String(leftValue).localeCompare(String(rightValue), undefined, { numeric: true })
      return sortDirection === 'asc' ? result : -result
    })
  }, [data, query, searchKeys, sortDirection, sortKey])

  const toggleSort = (key: keyof T) => {
    if (sortKey === key) {
      setSortDirection((current) => (current === 'asc' ? 'desc' : 'asc'))
      return
    }
    setSortKey(key)
    setSortDirection('asc')
  }

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-[var(--surface-dark)]">
      <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        {title ? <h3 className="font-display text-2xl text-[var(--text-primary)] dark:text-white">{title}</h3> : <span />}
        <label className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 dark:border-white/10 dark:bg-white/5">
          <Search size={16} className="text-slate-500" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search records"
            className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
          />
        </label>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead>
            <tr className="border-b border-slate-200 text-slate-500 dark:border-white/10 dark:text-slate-300">
              {columns.map((column) => (
                <th key={String(column.accessor)} className="px-3 py-3 font-semibold">
                  <button
                    type="button"
                    onClick={() =>
                      column.sortable === false || typeof column.accessor === 'function'
                        ? undefined
                        : toggleSort(column.accessor)
                    }
                    className={clsx(
                      'inline-flex items-center gap-2',
                      column.sortable === false || typeof column.accessor === 'function' ? 'cursor-default' : 'cursor-pointer',
                    )}
                  >
                    {column.header}
                    {column.sortable === false ? null : <ArrowUpDown size={14} />}
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredData.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-3 py-8 text-center text-slate-500">
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              filteredData.map((row) => {
                const key = typeof rowKey === 'function' ? rowKey(row) : String(row[rowKey])
                return (
                  <tr key={key} className="border-b border-slate-100 last:border-0 dark:border-white/5">
                    {columns.map((column) => {
                      const value =
                        typeof column.accessor === 'function'
                          ? column.accessor(row)
                          : String(row[column.accessor] ?? '')

                      return (
                        <td key={String(column.accessor)} className="px-3 py-3 text-slate-700 dark:text-slate-200">
                          {column.render ? column.render(value, row) : value}
                        </td>
                      )
                    })}
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default DataTable
