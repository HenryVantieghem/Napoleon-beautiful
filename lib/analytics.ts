import { analyticsOperations } from './supabase'
import { generateSessionId, getDeviceType } from './utils'
import type { ExecutiveProfile, ConversionEvent } from '@/types/analytics'

// Executive Analytics Manager
class ExecutiveAnalyticsManager {
  private sessionId: string
  private userId?: string
  private startTime: number
  private pageViews: number = 0
  private interactions: number = 0
  private scrollDepth: number = 0
  private ctaClicks: number = 0
  private lastScrollTime: number = 0
  private lastInteractionTime: number = 0

  constructor() {
    this.sessionId = generateSessionId()
    this.startTime = Date.now()
    
    if (typeof window !== 'undefined') {
      this.initializeTracking()
    }
  }

  // Initialize executive tracking
  private initializeTracking() {
    // Track initial page view
    this.trackPageView()

    // Track scroll depth
    let ticking = false
    const trackScrollDepth = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollTop = window.pageYOffset || document.documentElement.scrollTop
          const documentHeight = document.documentElement.scrollHeight - window.innerHeight
          const scrollPercent = Math.round((scrollTop / documentHeight) * 100)
          
          if (scrollPercent > this.scrollDepth) {
            this.scrollDepth = scrollPercent
            this.lastScrollTime = Date.now()

            // Track milestone scroll events
            if (scrollPercent >= 25 && scrollPercent < 50) {
              this.trackEvent('scroll_milestone', { depth: 25 })
            } else if (scrollPercent >= 50 && scrollPercent < 75) {
              this.trackEvent('scroll_milestone', { depth: 50 })
            } else if (scrollPercent >= 75) {
              this.trackEvent('scroll_milestone', { depth: 75 })
            }
          }
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', trackScrollDepth, { passive: true })

    // Track user interactions
    const trackInteraction = (eventType: string) => {
      this.interactions++
      this.lastInteractionTime = Date.now()
      this.trackEvent('user_interaction', { 
        type: eventType,
        timestamp: Date.now(),
        sessionDuration: Date.now() - this.startTime
      })
    }

    // Track CTA clicks specifically
    document.addEventListener('click', (e) => {
      const target = e.target as HTMLElement
      if (target.closest('[data-cta]') || 
          target.closest('button') || 
          target.textContent?.toLowerCase().includes('access') ||
          target.textContent?.toLowerCase().includes('demo') ||
          target.textContent?.toLowerCase().includes('join')) {
        this.ctaClicks++
        this.trackEvent('cta_click', {
          element: target.tagName,
          text: target.textContent?.substring(0, 50),
          position: { x: e.clientX, y: e.clientY }
        })
      }
    })

    // Track form interactions
    document.addEventListener('focus', (e) => {
      const target = e.target as HTMLElement
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.tagName === 'SELECT') {
        this.trackEvent('form_interaction', {
          action: 'focus',
          fieldName: target.getAttribute('name') || target.getAttribute('id'),
          fieldType: target.getAttribute('type')
        })
      }
    }, true)

    // Track page visibility changes
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.trackEvent('page_hidden', { 
          timeOnPage: Date.now() - this.startTime,
          scrollDepth: this.scrollDepth
        })
      } else {
        this.trackEvent('page_visible', { 
          returnTime: Date.now()
        })
      }
    })

    // Track page unload
    window.addEventListener('beforeunload', () => {
      this.trackEvent('page_exit', {
        timeOnPage: Date.now() - this.startTime,
        scrollDepth: this.scrollDepth,
        interactions: this.interactions,
        ctaClicks: this.ctaClicks
      })
    })

    // Track executive engagement patterns
    let engagementTimer: NodeJS.Timeout
    const resetEngagementTimer = () => {
      clearTimeout(engagementTimer)
      engagementTimer = setTimeout(() => {
        this.trackEvent('engagement_timeout', {
          lastActivity: Date.now() - this.lastInteractionTime,
          scrollDepth: this.scrollDepth
        })
      }, 30000) // 30 seconds of inactivity
    }

    document.addEventListener('mousemove', resetEngagementTimer, { passive: true })
    document.addEventListener('keydown', resetEngagementTimer, { passive: true })
    document.addEventListener('scroll', resetEngagementTimer, { passive: true })
    document.addEventListener('click', resetEngagementTimer, { passive: true })
  }

  // Track page view
  async trackPageView() {
    if (typeof window === 'undefined') return

    this.pageViews++
    
    const pageData = {
      sessionId: this.sessionId,
      userId: this.userId,
      pageUrl: window.location.href,
      pageTitle: document.title,
      userAgent: navigator.userAgent,
      deviceType: getDeviceType(),
      referrer: document.referrer,
      utmSource: this.getUtmParameter('utm_source'),
      utmMedium: this.getUtmParameter('utm_medium'),
      utmCampaign: this.getUtmParameter('utm_campaign')
    }

    await analyticsOperations.trackPageView(pageData)
  }

  // Track executive behavior event
  async trackEvent(eventType: string, eventData?: any) {
    const behaviorData = {
      sessionId: this.sessionId,
      eventType,
      eventData,
      timeOnPage: Date.now() - this.startTime,
      scrollDepth: this.scrollDepth,
      ctaClicks: this.ctaClicks,
      conversionEvent: this.isConversionEvent(eventType)
    }

    await analyticsOperations.trackExecutiveBehavior(behaviorData)

    // Track in Google Analytics if available
    if (typeof window !== 'undefined' && 'gtag' in window) {
      (window as any).gtag('event', eventType, {
        event_category: 'executive_behavior',
        event_label: this.sessionId,
        custom_parameters: eventData,
        session_id: this.sessionId,
        scroll_depth: this.scrollDepth,
        time_on_page: Math.round((Date.now() - this.startTime) / 1000)
      })
    }
  }

  // Check if event is a conversion event
  private isConversionEvent(eventType: string): boolean {
    const conversionEvents = [
      'waitlist_signup',
      'demo_request', 
      'contact_form_submit',
      'early_access_click',
      'form_complete'
    ]
    return conversionEvents.includes(eventType)
  }

  // Get UTM parameter from URL
  private getUtmParameter(param: string): string | undefined {
    if (typeof window === 'undefined') return undefined
    const urlParams = new URLSearchParams(window.location.search)
    return urlParams.get(param) || undefined
  }

  // Track conversion with detailed metrics
  async trackConversion(conversionType: string, conversionData?: any) {
    const conversionEvent: ConversionEvent = {
      eventType: 'conversion',
      conversionType,
      conversionValue: this.calculateConversionValue(conversionType),
      timeToConversion: Date.now() - this.startTime,
      touchpoints: this.getTouchpoints(),
      scrollDepth: this.scrollDepth,
      ctaClicks: this.ctaClicks,
      sessionDuration: Date.now() - this.startTime,
      pageViews: this.pageViews,
      interactions: this.interactions,
      deviceType: getDeviceType(),
      trafficSource: this.getUtmParameter('utm_source') || 'direct',
      ...conversionData
    }

    await this.trackEvent('conversion', conversionEvent)

    // Send high-value conversion alerts
    if (conversionType === 'waitlist_signup') {
      this.sendConversionAlert('Executive Waitlist Signup', conversionEvent)
    }
  }

  // Calculate conversion value based on type
  private calculateConversionValue(conversionType: string): number {
    const conversionValues = {
      'waitlist_signup': 500,
      'demo_request': 1000,
      'contact_form': 250,
      'newsletter_signup': 50
    }
    return conversionValues[conversionType as keyof typeof conversionValues] || 100
  }

  // Get touchpoint history
  private getTouchpoints(): string[] {
    const touchpoints = []
    if (this.getUtmParameter('utm_source')) touchpoints.push(this.getUtmParameter('utm_source')!)
    if (document.referrer) touchpoints.push('referral')
    touchpoints.push('landing_page')
    return touchpoints
  }

  // Send conversion alert (webhook or notification)
  private async sendConversionAlert(type: string, data: any) {
    // This would typically send to Slack, email, or webhook
    console.log(`🚨 High-Value Conversion Alert: ${type}`, data)
    
    // Example: Send to webhook
    // await fetch('/api/alerts/conversion', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ type, data })
    // })
  }

  // Track executive profile data
  async trackExecutiveProfile(profileData: Partial<ExecutiveProfile>) {
    await this.trackEvent('executive_profile', profileData)
  }

  // Get session analytics summary
  getSessionSummary() {
    return {
      sessionId: this.sessionId,
      duration: Date.now() - this.startTime,
      pageViews: this.pageViews,
      interactions: this.interactions,
      scrollDepth: this.scrollDepth,
      ctaClicks: this.ctaClicks,
      deviceType: getDeviceType(),
      trafficSource: this.getUtmParameter('utm_source') || 'direct'
    }
  }

  // Heat map data collection
  collectHeatmapData(element: HTMLElement, eventType: 'click' | 'hover' | 'scroll') {
    const rect = element.getBoundingClientRect()
    const heatmapData = {
      element: element.tagName.toLowerCase(),
      elementId: element.id,
      elementClass: element.className,
      eventType,
      position: {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
      },
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight
      },
      timestamp: Date.now()
    }

    this.trackEvent('heatmap_data', heatmapData)
  }

  // A/B testing integration
  async trackABTest(testName: string, variant: string) {
    await this.trackEvent('ab_test_view', {
      testName,
      variant,
      sessionId: this.sessionId
    })

    // Store variant in session storage for consistency
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(`ab_test_${testName}`, variant)
    }
  }

  // Track form abandonment
  trackFormAbandonment(formId: string, completedFields: string[], totalFields: number) {
    this.trackEvent('form_abandonment', {
      formId,
      completedFields,
      totalFields,
      completionRate: completedFields.length / totalFields,
      timeSpent: Date.now() - this.startTime
    })
  }

  // Update session with user ID after identification
  setUserId(userId: string) {
    this.userId = userId
  }
}

// Global analytics instance
let analyticsManager: ExecutiveAnalyticsManager | null = null

// Get or create analytics manager instance
export const getAnalyticsManager = (): ExecutiveAnalyticsManager => {
  if (!analyticsManager) {
    analyticsManager = new ExecutiveAnalyticsManager()
  }
  return analyticsManager
}

// Convenience functions for common tracking
export const trackExecutiveEvent = (eventType: string, data?: any) => {
  return getAnalyticsManager().trackEvent(eventType, data)
}

export const trackExecutiveConversion = (conversionType: string, data?: any) => {
  return getAnalyticsManager().trackConversion(conversionType, data)
}

export const trackExecutiveProfile = (profileData: Partial<ExecutiveProfile>) => {
  return getAnalyticsManager().trackExecutiveProfile(profileData)
}

export const trackABTest = (testName: string, variant: string) => {
  return getAnalyticsManager().trackABTest(testName, variant)
}

// Executive performance monitoring
export const performanceMonitoring = {
  // Track Core Web Vitals
  trackWebVitals() {
    if (typeof window === 'undefined') return

    // Track FCP (First Contentful Paint)
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'paint' && entry.name === 'first-contentful-paint') {
          trackExecutiveEvent('performance_fcp', {
            value: entry.startTime,
            rating: entry.startTime < 1200 ? 'good' : entry.startTime < 3000 ? 'needs-improvement' : 'poor'
          })
        }
      }
    })

    observer.observe({ entryTypes: ['paint'] })

    // Track LCP (Largest Contentful Paint)
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries()
      const lastEntry = entries[entries.length - 1]
      trackExecutiveEvent('performance_lcp', {
        value: lastEntry.startTime,
        rating: lastEntry.startTime < 2500 ? 'good' : lastEntry.startTime < 4000 ? 'needs-improvement' : 'poor'
      })
    })

    lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] })

    // Track CLS (Cumulative Layout Shift)
    let clsValue = 0
    const clsObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (!(entry as any).hadRecentInput) {
          clsValue += (entry as any).value
        }
      }
      
      trackExecutiveEvent('performance_cls', {
        value: clsValue,
        rating: clsValue < 0.1 ? 'good' : clsValue < 0.25 ? 'needs-improvement' : 'poor'
      })
    })

    clsObserver.observe({ entryTypes: ['layout-shift'] })
  },

  // Track loading performance
  trackLoadingPerformance() {
    if (typeof window === 'undefined') return

    window.addEventListener('load', () => {
      const perfData = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
      
      trackExecutiveEvent('performance_load', {
        domContentLoaded: perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart,
        loadComplete: perfData.loadEventEnd - perfData.loadEventStart,
        ttfb: perfData.responseStart - perfData.requestStart,
        domInteractive: perfData.domInteractive - perfData.fetchStart
      })
    })
  }
}

// Initialize performance monitoring
if (typeof window !== 'undefined') {
  performanceMonitoring.trackWebVitals()
  performanceMonitoring.trackLoadingPerformance()
}

export default {
  getAnalyticsManager,
  trackExecutiveEvent,
  trackExecutiveConversion,
  trackExecutiveProfile,
  trackABTest,
  performanceMonitoring
}