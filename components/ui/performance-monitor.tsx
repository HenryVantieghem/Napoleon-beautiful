'use client'

import { useEffect, useState } from 'react'
import { trackExecutiveEvent } from '@/lib/analytics'

interface PerformanceMetrics {
  fcp: number | null // First Contentful Paint
  lcp: number | null // Largest Contentful Paint
  cls: number | null // Cumulative Layout Shift
  fid: number | null // First Input Delay
  ttfb: number | null // Time to First Byte
}

export function PerformanceMonitor() {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fcp: null,
    lcp: null,
    cls: null,
    fid: null,
    ttfb: null
  })

  useEffect(() => {
    if (typeof window === 'undefined') return

    // Track Core Web Vitals for executive experience optimization
    const measurePerformance = () => {
      // First Contentful Paint
      const fcpObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'paint' && entry.name === 'first-contentful-paint') {
            const fcpTime = entry.startTime
            setMetrics(prev => ({ ...prev, fcp: fcpTime }))
            
            // Track executive performance metrics
            trackExecutiveEvent('performance_fcp', {
              value: fcpTime,
              rating: fcpTime < 1800 ? 'good' : fcpTime < 3000 ? 'needs-improvement' : 'poor',
              target: '< 1800ms for executive experience'
            })
          }
        }
      })

      // Largest Contentful Paint
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        const lastEntry = entries[entries.length - 1] as PerformanceEntry & { startTime: number }
        const lcpTime = lastEntry.startTime
        
        setMetrics(prev => ({ ...prev, lcp: lcpTime }))
        
        trackExecutiveEvent('performance_lcp', {
          value: lcpTime,
          rating: lcpTime < 2500 ? 'good' : lcpTime < 4000 ? 'needs-improvement' : 'poor',
          target: '< 2500ms for executive experience'
        })
      })

      // Cumulative Layout Shift
      let clsValue = 0
      const clsObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const layoutShiftEntry = entry as any
          if (!layoutShiftEntry.hadRecentInput) {
            clsValue += layoutShiftEntry.value
          }
        }
        
        setMetrics(prev => ({ ...prev, cls: clsValue }))
        
        trackExecutiveEvent('performance_cls', {
          value: clsValue,
          rating: clsValue < 0.1 ? 'good' : clsValue < 0.25 ? 'needs-improvement' : 'poor',
          target: '< 0.1 for executive experience'
        })
      })

      // Time to First Byte
      const navigationEntries = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[]
      if (navigationEntries.length > 0) {
        const ttfbTime = navigationEntries[0].responseStart - navigationEntries[0].requestStart
        setMetrics(prev => ({ ...prev, ttfb: ttfbTime }))
        
        trackExecutiveEvent('performance_ttfb', {
          value: ttfbTime,
          rating: ttfbTime < 800 ? 'good' : ttfbTime < 1800 ? 'needs-improvement' : 'poor',
          target: '< 800ms for executive experience'
        })
      }

      // Start observing
      try {
        fcpObserver.observe({ entryTypes: ['paint'] })
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] })
        clsObserver.observe({ entryTypes: ['layout-shift'] })
      } catch (error) {
        console.warn('Performance monitoring not supported:', error)
      }

      // Cleanup observers
      return () => {
        fcpObserver.disconnect()
        lcpObserver.disconnect()
        clsObserver.disconnect()
      }
    }

    // Measure page load performance
    const measurePageLoad = () => {
      const loadTime = performance.now()
      
      trackExecutiveEvent('page_load_complete', {
        loadTime,
        rating: loadTime < 2500 ? 'excellent' : loadTime < 4000 ? 'good' : 'needs-improvement',
        target: '< 2500ms total load time',
        userAgent: navigator.userAgent,
        connection: (navigator as any).connection?.effectiveType || 'unknown'
      })
    }

    // Track executive session metrics
    const trackExecutiveSession = () => {
      const sessionStart = Date.now()
      const deviceMemory = (navigator as any).deviceMemory || 'unknown'
      const hardwareConcurrency = navigator.hardwareConcurrency || 'unknown'
      
      trackExecutiveEvent('executive_session_start', {
        sessionId: crypto.randomUUID(),
        deviceMemory,
        hardwareConcurrency,
        viewport: {
          width: window.innerWidth,
          height: window.innerHeight
        },
        timestamp: sessionStart
      })

      // Track session duration on page unload
      const handleUnload = () => {
        const sessionDuration = Date.now() - sessionStart
        trackExecutiveEvent('executive_session_end', {
          sessionDuration,
          engagementLevel: sessionDuration > 180000 ? 'high' : sessionDuration > 60000 ? 'medium' : 'low'
        })
      }

      window.addEventListener('beforeunload', handleUnload)
      return () => window.removeEventListener('beforeunload', handleUnload)
    }

    // Initialize monitoring
    const cleanupPerformance = measurePerformance()
    const cleanupSession = trackExecutiveSession()
    
    // Measure load time when page is fully loaded
    if (document.readyState === 'complete') {
      measurePageLoad()
    } else {
      window.addEventListener('load', measurePageLoad)
    }

    return () => {
      if (cleanupPerformance) cleanupPerformance()
      if (cleanupSession) cleanupSession()
      window.removeEventListener('load', measurePageLoad)
    }
  }, [])

  // Development mode: Show performance metrics in console
  useEffect(() => {
    if (process.env.NODE_ENV === 'development' && Object.values(metrics).some(m => m !== null)) {
      console.group('🚀 Executive Performance Metrics')
      console.log('FCP (First Contentful Paint):', metrics.fcp?.toFixed(2), 'ms')
      console.log('LCP (Largest Contentful Paint):', metrics.lcp?.toFixed(2), 'ms')
      console.log('CLS (Cumulative Layout Shift):', metrics.cls?.toFixed(4))
      console.log('TTFB (Time to First Byte):', metrics.ttfb?.toFixed(2), 'ms')
      console.log('Target: < 2500ms total load time for executive experience')
      console.groupEnd()
    }
  }, [metrics])

  // Track resource loading performance
  useEffect(() => {
    const trackResourcePerformance = () => {
      const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[]
      
      // Analyze critical resources
      const criticalResources = resources.filter(resource => 
        resource.name.includes('font') || 
        resource.name.includes('css') || 
        resource.name.includes('js') ||
        resource.name.includes('image')
      )

      const slowResources = criticalResources.filter(resource => 
        resource.duration > 1000
      )

      if (slowResources.length > 0) {
        trackExecutiveEvent('performance_slow_resources', {
          slowResourceCount: slowResources.length,
          slowResources: slowResources.map(r => ({
            name: r.name,
            duration: r.duration,
            size: r.transferSize
          })),
          recommendedAction: 'Optimize resource loading for executive experience'
        })
      }
    }

    // Track after initial load
    setTimeout(trackResourcePerformance, 3000)
  }, [])

  // Return null - this is a monitoring-only component
  return null
}

// Hook for component-level performance tracking
export function usePerformanceTracking(componentName: string) {
  useEffect(() => {
    const startTime = performance.now()
    
    return () => {
      const renderTime = performance.now() - startTime
      
      if (renderTime > 16) { // > 1 frame at 60fps
        trackExecutiveEvent('component_performance', {
          component: componentName,
          renderTime,
          rating: renderTime < 16 ? 'excellent' : renderTime < 50 ? 'good' : 'needs-optimization'
        })
      }
    }
  }, [componentName])
}