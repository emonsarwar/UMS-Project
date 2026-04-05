import { Bell, BellOff } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { useNotifications } from '../../hooks/useNotifications'
import { Notification } from '../../hooks/useNotifications'
import Modal from '../ui/Modal'

const NotificationBell = () => {
  const { notifications, unreadCount, markAsRead, loading } = useNotifications()
  const [open, setOpen] = useState(false)

  return (
    <>
      <motion.button
        whileTap={{ scale: 0.95 }}
        className="relative p-2 text-slate-600 hover:text-[var(--accent)]"
        onClick={() => setOpen(true)}
      >
        {unreadCount > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white"
          >
            {unreadCount}
          </motion.span>
        )}
        <Bell size={24} />
      </motion.button>

      <Modal open={open} onClose={() => setOpen(false)} title="Notifications">
        <div className="max-h-96 overflow-auto">
          {loading ? (
            <div className="p-8 text-center">Loading...</div>
          ) : notifications.length === 0 ? (
            <div className="p-8 text-center text-slate-500">No notifications</div>
          ) : (
            notifications.map((notification) => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className={`flex gap-3 rounded-xl p-4 ${notification.readAt ? 'bg-slate-50' : 'bg-gradient-to-r from-[var(--accent)]/10 to-transparent border-r-4 border-[var(--accent)]'}`}
              >
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--accent-dark)] flex items-center justify-center flex-shrink-0">
                  <Bell size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-[var(--text-primary)] truncate">{notification.title}</h4>
                  <p className="text-sm text-slate-600 mt-1 line-clamp-2">{notification.message}</p>
                  <p className="text-xs text-slate-500 mt-2">
                    {new Date(notification.createdAt).toLocaleString()}
                  </p>
                </div>
                {!notification.readAt && (
                  <button
                    onClick={() => markAsRead(notification.id)}
                    className="ml-auto flex items-center gap-1 text-xs font-semibold text-[var(--accent)] hover:text-[var(--accent-dark)]"
                  >
                    Mark read
                  </button>
                )}
              </motion.div>
            ))
          )}
        </div>
      </Modal>
    </>
  )
}

export default NotificationBell

