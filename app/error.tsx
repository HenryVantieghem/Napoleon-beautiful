'use client'

import { useEffect } from 'react'
import { ExecutiveButton } from '@/components/ui/executive-button'
import { AlertTriangle, RefreshCw, ArrowLeft } from 'lucide-react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log error for executive-grade monitoring
    console.error('Executive Platform Error:', error)
    
    // Report to analytics for continuous improvement
    if (typeof window !== 'undefined' && 'gtag' in window) {
      (window as any).gtag('event', 'exception', {
        description: error.message,
        fatal: false,
        custom_parameters: {
          error_boundary: 'app_level',
          digest: error.digest,
          timestamp: new Date().toISOString()
        }
      })
    }
  }, [error])

  return (
    <div className="min-h-screen bg-executive-dark flex items-center justify-center p-6">
      <div className="max-w-2xl w-full">
        <div className="bg-executive-card border border-white/10 rounded-2xl p-8 text-center space-y-8">
          {/* Error icon with executive styling */}
          <div className="flex justify-center">
            <div className="w-20 h-20 bg-gradient-to-br from-amber-urgency/20 to-red-500/20 rounded-full flex items-center justify-center border border-amber-urgency/30">
              <AlertTriangle className="w-10 h-10 text-amber-urgency" />
            </div>
          </div>
          
          {/* Executive error messaging */}
          <div className="space-y-4">
            <h1 className="text-3xl font-bold text-white">
              Executive Platform Temporarily Unavailable
            </h1>
            <p className="text-white/80 text-lg leading-relaxed">
              We apologize for the inconvenience. Our engineering team has been automatically notified 
              and is working to restore full functionality to your executive AI experience.
            </p>
            
            {/* Error details for technical teams */}
            {process.env.NODE_ENV === 'development' && (
              <details className="mt-6 text-left">
                <summary className="text-white/60 cursor-pointer hover:text-white/80 transition-colors">
                  Technical Details (Development Mode)
                </summary>
                <div className="mt-4 p-4 bg-executive-dark/50 rounded-lg border border-white/5">
                  <pre className="text-sm text-white/70 overflow-auto">
                    {error.message}
                  </pre>
                  {error.digest && (
                    <p className="text-xs text-white/50 mt-2">
                      Error ID: {error.digest}
                    </p>
                  )}
                </div>
              </details>
            )}
          </div>
          
          {/* Recovery actions with executive-grade UX */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <ExecutiveButton
              onClick={reset}
              variant="primary"
              size="large"
              className="flex items-center justify-center space-x-2"
            >
              <RefreshCw className="w-5 h-5" />
              <span>Retry Platform</span>
            </ExecutiveButton>
            
            <ExecutiveButton
              onClick={() => window.location.href = '/'}
              variant="secondary"
              size="large"
              className="flex items-center justify-center space-x-2"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Return Home</span>
            </ExecutiveButton>
          </div>
          
          {/* Executive support information */}
          <div className="pt-6 border-t border-white/10">
            <p className="text-white/60 text-sm">
              For immediate executive support, contact our dedicated team at{' '}
              <a 
                href="mailto:executive-support@napoleonai.app" 
                className="text-electric-blue hover:text-electric-blue/80 transition-colors underline"
              >
                executive-support@napoleonai.app
              </a>
            </p>
            <p className="text-white/50 text-xs mt-2">
              Response time: &lt;15 minutes for C-suite executives
            </p>
          </div>
        </div>
      </div>
      
      {/* Background enhancement */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-urgency/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-500/5 rounded-full blur-3xl" />
      </div>
    </div>
  )
}