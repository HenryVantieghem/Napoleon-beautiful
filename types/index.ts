// Global type definitions for Napoleon AI Executive Landing Page

export interface ExecutiveUser {
  id: string
  email: string
  firstName: string
  lastName: string
  company: string
  role: string
  companySize: 'startup' | 'small' | 'medium' | 'enterprise' | 'fortune500'
  estimatedSalary: 'under100k' | '100k-250k' | '250k-500k' | '500k-1m' | 'over1m'
  executiveLevel: 'director' | 'vp' | 'svp' | 'cfo' | 'coo' | 'cto' | 'ceo'
  industryVertical: string
  source: string
  createdAt: string
  status: 'pending' | 'approved' | 'contacted' | 'converted'
}

export interface ExecutiveAnalytics {
  sessionId: string
  userId?: string
  pageUrl: string
  timeOnPage: number
  scrollDepth: number
  ctaClicks: number
  conversionEvent: boolean
  deviceType: 'mobile' | 'tablet' | 'desktop'
  trafficSource: string
  userAgent: string
  ipAddress: string
  referrer?: string
  utmSource?: string
  utmMedium?: string
  utmCampaign?: string
  createdAt: string
}

export interface FormEngagement {
  timeToStart: number // Seconds until form interaction
  completionTime: number // Time to complete form
  fieldInteractions: FieldInteraction[]
  abandonment: boolean
  formType: 'waitlist' | 'demo' | 'contact'
}

export interface FieldInteraction {
  fieldName: string
  timeSpent: number
  focusCount: number
  errorCount: number
  finalValue?: string
}

export interface ConversionEvent {
  eventType: 'page_view' | 'cta_click' | 'form_start' | 'form_complete' | 'scroll_milestone'
  timestamp: string
  value?: number | string
  metadata?: Record<string, any>
}

export interface ABTestVariant {
  testName: string
  variantName: string
  traffic: number // Percentage of traffic
  isControl: boolean
  config: Record<string, any>
}

export interface ExecutiveMetrics {
  conversionRate: number
  averageTimeToConversion: number
  formCompletionRate: number
  scrollDepthAverage: number
  mobileConversionRate: number
  desktopConversionRate: number
  topTrafficSources: string[]
  executiveLevelBreakdown: Record<string, number>
  industryBreakdown: Record<string, number>
}

// Component prop types
export interface ComponentProps {
  className?: string
  children?: React.ReactNode
}

export interface ButtonProps extends ComponentProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'small' | 'medium' | 'large'
  onClick?: () => void
  disabled?: boolean
  loading?: boolean
}

export interface CardProps extends ComponentProps {
  title?: string
  description?: string
  image?: string
  href?: string
}

export interface FormProps extends ComponentProps {
  onSubmit: (data: any) => void | Promise<void>
  loading?: boolean
  error?: string
  success?: string
}

// Executive persona types
export type ExecutivePersona = 'ceo' | 'cfo' | 'coo' | 'cto' | 'vp' | 'director' | 'founder'

export interface ExecutivePersonaData {
  persona: ExecutivePersona
  averageSalary: string
  primaryPainPoints: string[]
  decisionTriggers: string[]
  preferredMessaging: string
  timeToDecision: string
  riskProfile: 'conservative' | 'moderate' | 'aggressive'
}

// Animation and UI types
export interface AnimationConfig {
  duration: number
  delay?: number
  easing?: string
  repeat?: boolean
}

export interface ShaderConfig {
  colors: string[]
  speed: number
  backgroundColor: string
  wireframe?: boolean
}

export interface PerformanceMetrics {
  fcp: number // First Contentful Paint
  lcp: number // Largest Contentful Paint
  cls: number // Cumulative Layout Shift
  fid: number // First Input Delay
  ttfb: number // Time to First Byte
  lighthouse: number // Lighthouse score
}

export default {}