"use client"

import React from 'react'

interface ErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="min-h-screen bg-gradient-to-br from-black via-purple-900 to-black flex items-center justify-center">
          <div className="text-center text-white p-8">
            <h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
            <p className="text-gray-300 mb-6">
              We're sorry, but something unexpected happened. Please refresh the page.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
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

// Shader fallback component for when shader background fails
export function ShaderFallback({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-900 to-black">
      {children}
    </div>
  )
}

// Loading fallback
export function LoadingFallback() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-900 to-black flex items-center justify-center">
      <div className="text-center text-white">
        <div className="w-8 h-8 border-4 border-purple-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p>Loading Napoleon AI...</p>
      </div>
    </div>
  )
}