import { useEffect, useState } from 'react'
import api from '../services/api'
import { useAuth } from './useAuth'

export interface Notification {
  id: string
  title: string
  message: string
  type: string
  readAt: string | null
  createdAt: string
}

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()

  useEffect(() => {
    if (!user) return

    fetchNotifications()
    fetchUnreadCount()
  }, [user])

  const fetchNotifications = async () => {
    try {
      const { data } = await api.get('/notifications/my')
      setNotifications(data)
    } catch (error) {
      console.error('Failed to fetch notifications')
    } finally {
      setLoading(false)
    }
  }

  const fetchUnreadCount = async () => {
    try {
      const { data } = await api.get('/notifications/unread')
      setUnreadCount(data.count)
    } catch (error) {
      console.error('Failed to fetch unread count')
    }
  }

  const markAsRead = async (id: string) => {
    try {
      await api.patch(`/notifications/${id}/read`)
      setNotifications(nots => nots.map(n => n.id === id ? {...n, readAt: new Date().toISOString()} : n))
      setUnreadCount(count => count - 1)
    } catch (error) {
      console.error('Failed to mark read')
    }
  }

  return {
    notifications,
    unreadCount,
    loading,
    markAsRead,
    refetch: fetchNotifications,
  }
}

