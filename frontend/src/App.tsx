import React, { useEffect, useState, type ReactNode } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Loader from './components/ui/Loader'
import { AuthProvider } from './context/AuthContext'
import { ThemeProvider } from './context/ThemeContext'
import AppRouter from './routes/AppRouter'
import ErrorBoundary from './components/ui/ErrorBoundary'

const queryClient = new QueryClient()

function App() {
  const [booting, setBooting] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    try {
      // Reduced boot time for faster feedback
      const timer = window.setTimeout(() => {
        console.log('✅ Boot complete')
        setBooting(false)
      }, 800)
      console.log('⏱️ Boot timer started')
      return () => window.clearTimeout(timer)
    } catch (err) {
      console.error('❌ Boot error:', err)
      setError(String(err))
    }
  }, [])

  if (error) {
    return (
      <div style={{ padding: '20px', color: 'red', fontFamily: 'monospace', backgroundColor: 'white', minHeight: '100vh' }}>
        <h2>Error initializing app</h2>
        <pre>{error}</pre>
      </div>
    )
  }

  if (booting) {
    console.log('🔄 Still booting...')
    return <Loader />
  }

  console.log('📄 Rendering main app')

  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary>
        <BrowserRouter>
          <ThemeProvider>
            <AuthProvider>
              <AppRouter />
              <Toaster
                position="top-right"
                toastOptions={{
                  className:
                    '!rounded-2xl !border !border-slate-200 !bg-white !px-4 !py-3 !text-slate-800 !shadow-xl',
                }}
              />
            </AuthProvider>
          </ThemeProvider>
        </BrowserRouter>
      </ErrorBoundary>
    </QueryClientProvider>
  )
}

export default App
