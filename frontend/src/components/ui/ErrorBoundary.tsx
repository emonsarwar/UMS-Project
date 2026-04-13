import React, { Component, type ErrorInfo, type ReactNode } from 'react'
import type { ReactElement } from 'react'

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
}

interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactElement
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('💥 ErrorBoundary caught:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="flex min-h-screen flex-col items-center justify-center bg-[var(--surface)] px-4 py-12 text-center">
          <div className="max-w-md rounded-2xl bg-white/70 p-8 backdrop-blur-sm shadow-xl dark:bg-slate-900/70">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-red-100 text-2xl text-red-600 dark:bg-red-900/50 dark:text-red-400">
              ⚠️
            </div>
            <h1 className="mb-3 font-display text-2xl font-bold text-[var(--text-primary)]">
              Something went wrong
            </h1>
            <p className="mb-6 text-slate-600 dark:text-slate-400">
              Refresh the page or try again later.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="rounded-xl bg-[var(--primary)] px-6 py-3 font-semibold text-white transition hover:bg-[var(--secondary)]"
            >
              Refresh Page
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary

