'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { getAnalyticsManager } from '@/lib/analytics'

interface AnalyticsContextType {
  trackEvent: (eventType: string, data?: any) => Promise<void>
  trackConversion: (conversionType: string, data?: any) => Promise<void>
  trackPerformance: (metrics: any) => Promise<void>
  isInitialized: boolean
}

const AnalyticsContext = createContext<AnalyticsContextType | null>(null)

export function AnalyticsProvider({ children }: { children: ReactNode }) {
  const [isInitialized, setIsInitialized] = useState(false)
  const [analyticsManager, setAnalyticsManager] = useState<any>(null)

  useEffect(() => {
    // Initialize analytics with performance optimization
    if (typeof window !== 'undefined') {
      try {
        const manager = getAnalyticsManager()
        setAnalyticsManager(manager)
        setIsInitialized(true)
        
        // Track initial page load performance
        const perfObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.entryType === 'navigation') {
              const navTiming = entry as PerformanceNavigationTiming
              manager.trackEvent('page_load_performance', {
                loadTime: navTiming.loadEventEnd - navTiming.fetchStart,
                domContentLoaded: navTiming.domContentLoadedEventEnd - navTiming.fetchStart,
                firstPaint: navTiming.loadEventStart - navTiming.fetchStart,
                rating: (navTiming.loadEventEnd - navTiming.fetchStart) < 2500 ? 'excellent' : 'needs-improvement'
              })
            }
          }
        })
        
        perfObserver.observe({ entryTypes: ['navigation'] })
        
        return () => perfObserver.disconnect()
      } catch (error) {
        console.warn('Analytics initialization failed:', error)
      }
    }
  }, [])

  const trackEvent = async (eventType: string, data?: any) => {
    if (analyticsManager && isInitialized) {
      try {
        await analyticsManager.trackEvent(eventType, data)
      } catch (error) {
        console.warn('Event tracking failed:', error)
      }
    }
  }

  const trackConversion = async (conversionType: string, data?: any) => {
    if (analyticsManager && isInitialized) {
      try {
        await analyticsManager.trackConversion(conversionType, data)
      } catch (error) {
        console.warn('Conversion tracking failed:', error)
      }
    }
  }

  const trackPerformance = async (metrics: any) => {
    if (analyticsManager && isInitialized) {
      try {
        await analyticsManager.trackEvent('performance_metrics', metrics)
      } catch (error) {
        console.warn('Performance tracking failed:', error)
      }
    }
  }

  const value: AnalyticsContextType = {
    trackEvent,
    trackConversion,
    trackPerformance,
    isInitialized
  }

  return (
    <AnalyticsContext.Provider value={value}>
      {children}
    </AnalyticsContext.Provider>
  )
}

export function useAnalytics() {
  const context = useContext(AnalyticsContext)
  if (!context) {
    throw new Error('useAnalytics must be used within an AnalyticsProvider')
  }
  return context
}

// Performance-optimized hook for critical events
export function usePerformanceTracking() {
  const { trackPerformance, isInitialized } = useAnalytics()
  
  useEffect(() => {
    if (!isInitialized || typeof window === 'undefined') return

    // Track Core Web Vitals with minimal overhead
    const trackWebVitals = async () => {
      try {
        const { onCLS, onINP, onFCP, onLCP, onTTFB } = await import('web-vitals')
        
        onCLS((metric: any) => trackPerformance({ type: 'CLS', ...metric }))
        onINP((metric: any) => trackPerformance({ type: 'INP', ...metric }))
        onFCP((metric: any) => trackPerformance({ type: 'FCP', ...metric }))
        onLCP((metric: any) => trackPerformance({ type: 'LCP', ...metric }))
        onTTFB((metric: any) => trackPerformance({ type: 'TTFB', ...metric }))
      } catch (error) {
        console.warn('Web Vitals tracking unavailable:', error)
      }
    }

    // Delayed initialization to avoid blocking critical rendering
    const timer = setTimeout(trackWebVitals, 2000)
    return () => clearTimeout(timer)
  }, [isInitialized, trackPerformance])
}