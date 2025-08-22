import { createClient } from '@supabase/supabase-js'

// Supabase configuration for Napoleon AI Executive Landing Page
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://your-project.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'your-anon-key'

// Create Supabase client with executive-grade configuration
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
  realtime: {
    params: {
      eventsPerSecond: 10,
    },
  },
  global: {
    headers: {
      'X-Client-Info': 'napoleon-ai-executive-landing@1.0.0',
    },
  },
})

// Executive Waitlist Operations
export const waitlistOperations = {
  // Add executive to waitlist
  async addExecutive(data: {
    email: string
    firstName: string
    lastName: string
    company: string
    role: string
    companySize: string
    source?: string
    utmSource?: string
    utmMedium?: string
    utmCampaign?: string
    deviceType?: string
    conversionTime?: number
    scrollDepth?: number
    ctaClicked?: string
    ipAddress?: string
    userAgent?: string
    referrer?: string
  }) {
    try {
      const { data: result, error } = await supabase
        .from('executive_waitlist')
        .insert([{
          ...data,
          created_at: new Date().toISOString(),
          status: 'pending',
          priority: this.calculateExecutivePriority(data),
          executive_level: this.determineExecutiveLevel(data.role),
          estimated_value: this.calculateExecutiveValue(data)
        }])
        .select()
        .single()

      if (error) throw error

      // Track successful signup
      await this.trackAnalyticsEvent('waitlist_signup', {
        executive_id: result.id,
        ...data
      })

      return { success: true, data: result }
    } catch (error) {
      console.error('Executive waitlist signup error:', error)
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error occurred' }
    }
  },

  // Calculate executive priority based on profile
  calculateExecutivePriority(data: any): 'low' | 'medium' | 'high' | 'critical' {
    let score = 0
    
    // Executive level scoring
    const executiveLevel = this.determineExecutiveLevel(data.role)
    const levelScores = {
      'ceo': 10, 'cfo': 9, 'coo': 9, 'cto': 8, 'president': 10,
      'founder': 9, 'evp': 7, 'svp': 6, 'vp': 5, 'director': 3, 'other': 1
    }
    score += levelScores[executiveLevel as keyof typeof levelScores] || 1

    // Company size scoring
    const companySizeScores = {
      'fortune500': 10, 'enterprise': 8, 'large': 6, 'medium': 4, 'small': 2, 'startup': 3
    }
    score += companySizeScores[data.companySize as keyof typeof companySizeScores] || 1

    // Business email scoring
    if (this.isBusinessEmail(data.email)) score += 3

    // Source scoring
    if (data.source === 'referral' || data.utmSource?.includes('linkedin')) score += 2

    if (score >= 15) return 'critical'
    if (score >= 10) return 'high'  
    if (score >= 6) return 'medium'
    return 'low'
  },

  // Determine executive level from job title
  determineExecutiveLevel(title: string): string {
    const titleLower = title.toLowerCase()
    
    if (titleLower.includes('ceo') || titleLower.includes('chief executive')) return 'ceo'
    if (titleLower.includes('cfo') || titleLower.includes('chief financial')) return 'cfo'
    if (titleLower.includes('coo') || titleLower.includes('chief operating')) return 'coo'
    if (titleLower.includes('cto') || titleLower.includes('chief technology')) return 'cto'
    if (titleLower.includes('president')) return 'president'
    if (titleLower.includes('founder')) return 'founder'
    if (titleLower.includes('evp') || titleLower.includes('executive vp')) return 'evp'
    if (titleLower.includes('svp') || titleLower.includes('senior vp')) return 'svp'
    if (titleLower.includes('vp') || titleLower.includes('vice president')) return 'vp'
    if (titleLower.includes('director')) return 'director'
    return 'other'
  },

  // Calculate estimated executive value
  calculateExecutiveValue(data: any): number {
    const baseMultipliers = {
      'ceo': 10000, 'cfo': 8000, 'coo': 8000, 'cto': 7000, 'president': 9000,
      'founder': 8500, 'evp': 6000, 'svp': 5000, 'vp': 4000, 'director': 2000, 'other': 1000
    }
    
    const companySizeMultipliers = {
      'fortune500': 2.5, 'enterprise': 2.0, 'large': 1.5, 'medium': 1.2, 'small': 1.0, 'startup': 0.8
    }
    
    const executiveLevel = this.determineExecutiveLevel(data.role)
    const baseValue = baseMultipliers[executiveLevel as keyof typeof baseMultipliers] || 1000
    const sizeMultiplier = companySizeMultipliers[data.companySize as keyof typeof companySizeMultipliers] || 1.0
    
    return Math.round(baseValue * sizeMultiplier)
  },

  // Check if email is business email
  isBusinessEmail(email: string): boolean {
    const consumerDomains = [
      'gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'aol.com',
      'icloud.com', 'live.com', 'msn.com', 'ymail.com', 'protonmail.com'
    ]
    const domain = email.split('@')[1]?.toLowerCase()
    return domain ? !consumerDomains.includes(domain) : false
  },

  // Track analytics event
  async trackAnalyticsEvent(eventType: string, data: any) {
    try {
      await supabase
        .from('executive_analytics')
        .insert([{
          event_type: eventType,
          event_data: data,
          created_at: new Date().toISOString()
        }])
    } catch (error) {
      console.error('Analytics tracking error:', error)
    }
  },

  // Get waitlist stats
  async getWaitlistStats() {
    try {
      const { data, error } = await supabase
        .rpc('get_executive_waitlist_stats')

      if (error) throw error
      return { success: true, data }
    } catch (error) {
      console.error('Waitlist stats error:', error)
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error occurred' }
    }
  },

  // Get real-time executive count
  async getExecutiveCount() {
    try {
      const { count, error } = await supabase
        .from('executive_waitlist')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'pending')

      if (error) throw error
      return { success: true, count: count || 0 }
    } catch (error) {
      console.error('Executive count error:', error)
      return { success: false, count: 847 } // Fallback count
    }
  }
}

// Executive Analytics Operations
export const analyticsOperations = {
  // Track page view
  async trackPageView(data: {
    sessionId: string
    userId?: string
    pageUrl: string
    pageTitle: string
    userAgent: string
    deviceType: string
    referrer?: string
    utmSource?: string
    utmMedium?: string
    utmCampaign?: string
  }) {
    try {
      await supabase
        .from('executive_analytics')
        .insert([{
          session_id: data.sessionId,
          user_id: data.userId,
          event_type: 'page_view',
          page_url: data.pageUrl,
          time_on_page: 0,
          device_type: data.deviceType,
          traffic_source: data.utmSource || 'direct',
          user_agent: data.userAgent,
          referrer: data.referrer,
          utm_source: data.utmSource,
          utm_medium: data.utmMedium,
          utm_campaign: data.utmCampaign,
          created_at: new Date().toISOString()
        }])
    } catch (error) {
      console.error('Page view tracking error:', error)
    }
  },

  // Track executive behavior
  async trackExecutiveBehavior(data: {
    sessionId: string
    eventType: string
    eventData?: any
    timeOnPage?: number
    scrollDepth?: number
    ctaClicks?: number
    conversionEvent?: boolean
  }) {
    try {
      await supabase
        .from('executive_analytics')
        .insert([{
          session_id: data.sessionId,
          event_type: data.eventType,
          time_on_page: data.timeOnPage || 0,
          scroll_depth: data.scrollDepth || 0,
          cta_clicks: data.ctaClicks || 0,
          conversion_event: data.conversionEvent || false,
          event_data: data.eventData,
          created_at: new Date().toISOString()
        }])
    } catch (error) {
      console.error('Executive behavior tracking error:', error)
    }
  },

  // Get executive analytics dashboard data
  async getExecutiveAnalytics(timeframe: 'day' | 'week' | 'month' = 'week') {
    try {
      const { data, error } = await supabase
        .rpc('get_executive_analytics_dashboard', { timeframe })

      if (error) throw error
      return { success: true, data }
    } catch (error) {
      console.error('Executive analytics error:', error)
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error occurred' }
    }
  },

  // Real-time executive activity subscription
  subscribeToExecutiveActivity(callback: (payload: any) => void) {
    return supabase
      .channel('executive_activity')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'executive_waitlist'
      }, callback)
      .subscribe()
  }
}

// A/B Testing Operations
export const abTestingOperations = {
  // Track A/B test variant
  async trackVariant(data: {
    testName: string
    variantName: string
    sessionId: string
    userId?: string
  }) {
    try {
      await supabase
        .from('ab_test_results')
        .insert([{
          test_name: data.testName,
          variant: data.variantName,
          session_id: data.sessionId,
          user_id: data.userId,
          created_at: new Date().toISOString()
        }])
    } catch (error) {
      console.error('A/B test tracking error:', error)
    }
  },

  // Record conversion
  async recordConversion(data: {
    testName: string
    variantName: string
    sessionId: string
    conversionTime?: number
  }) {
    try {
      await supabase
        .from('ab_test_results')
        .update({
          converted: true,
          conversion_time: data.conversionTime || 0
        })
        .eq('test_name', data.testName)
        .eq('session_id', data.sessionId)
    } catch (error) {
      console.error('A/B conversion tracking error:', error)
    }
  },

  // Get A/B test results
  async getTestResults(testName: string) {
    try {
      const { data, error } = await supabase
        .rpc('get_ab_test_results', { test_name: testName })

      if (error) throw error
      return { success: true, data }
    } catch (error) {
      console.error('A/B test results error:', error)
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error occurred' }
    }
  }
}

export default supabase