// Executive-specific type definitions for Fortune 500 targeting

export interface ExecutiveProfile {
  id: string
  email: string
  firstName: string
  lastName: string
  company: string
  role: string
  department?: string
  companySize: CompanySize
  estimatedRevenue?: string
  executiveLevel: ExecutiveLevel
  industryVertical: IndustryVertical
  decisionMakingAuthority: boolean
  budgetRange?: BudgetRange
  currentTools?: string[]
  painPoints: PainPoint[]
  source: TrafficSource
  linkedinProfile?: string
  companyWebsite?: string
  timezone?: string
  preferredContactMethod?: ContactMethod
  createdAt: string
  updatedAt: string
  status: ExecutiveStatus
  priority: Priority
}

export type CompanySize = 
  | 'startup' // <50 employees
  | 'small' // 50-200 employees  
  | 'medium' // 200-1000 employees
  | 'large' // 1000-5000 employees
  | 'enterprise' // 5000-10000 employees
  | 'fortune500' // >10000 employees

export type ExecutiveLevel = 
  | 'director'
  | 'senior-director'
  | 'vp'
  | 'svp'
  | 'evp'
  | 'cfo'
  | 'coo'
  | 'cto' 
  | 'cmo'
  | 'chro'
  | 'ceo'
  | 'president'
  | 'chairman'
  | 'founder'
  | 'managing-director'

export type IndustryVertical = 
  | 'technology'
  | 'financial-services'
  | 'healthcare'
  | 'manufacturing'
  | 'retail'
  | 'consulting'
  | 'media'
  | 'education'
  | 'real-estate'
  | 'energy'
  | 'telecommunications'
  | 'transportation'
  | 'government'
  | 'non-profit'
  | 'other'

export type BudgetRange = 
  | 'under-10k'
  | '10k-50k'
  | '50k-100k'
  | '100k-500k'
  | '500k-1m'
  | 'over-1m'

export type TrafficSource = 
  | 'direct'
  | 'google-search'
  | 'linkedin'
  | 'twitter'
  | 'email'
  | 'referral'
  | 'paid-social'
  | 'paid-search'
  | 'conference'
  | 'pr'
  | 'word-of-mouth'

export type ContactMethod = 
  | 'email'
  | 'phone'
  | 'linkedin'
  | 'calendar'
  | 'demo'

export type ExecutiveStatus = 
  | 'pending'
  | 'qualified'
  | 'contacted'
  | 'demo-scheduled'
  | 'demo-completed'
  | 'proposal-sent'
  | 'negotiation'
  | 'closed-won'
  | 'closed-lost'
  | 'nurturing'

export type Priority = 
  | 'low'
  | 'medium'
  | 'high'
  | 'critical'

export interface PainPoint {
  category: PainPointCategory
  description: string
  severity: 'low' | 'medium' | 'high' | 'critical'
  impactOnBusiness: string
  currentSolution?: string
}

export type PainPointCategory = 
  | 'communication-overload'
  | 'time-management'
  | 'decision-making'
  | 'team-coordination'
  | 'information-access'
  | 'productivity'
  | 'cost-management'
  | 'competitive-advantage'
  | 'scalability'
  | 'security'

export interface ExecutiveBehavior {
  sessionId: string
  executiveId?: string
  deviceType: 'mobile' | 'tablet' | 'desktop'
  browserType: string
  operatingSystem: string
  screenResolution: string
  timeOnPage: number
  scrollDepth: number
  ctaClicks: CtaClick[]
  formInteractions: FormInteraction[]
  heatmapData?: HeatmapData
  exitIntent?: boolean
  returningVisitor: boolean
  sessionDuration: number
  pageViews: number
  conversionEvents: ConversionEvent[]
  timestamp: string
}

export interface CtaClick {
  ctaId: string
  ctaText: string
  position: { x: number; y: number }
  timestamp: string
  variant?: string // For A/B testing
}

export interface FormInteraction {
  formId: string
  fieldName: string
  action: 'focus' | 'blur' | 'input' | 'submit' | 'abandon'
  value?: string
  timeSpent: number
  errorMessages?: string[]
  timestamp: string
}

export interface HeatmapData {
  clicks: Array<{ x: number; y: number; count: number }>
  scrollDepth: number[]
  timeSpent: Array<{ element: string; duration: number }>
}

export interface ConversionEvent {
  eventType: 'page_view' | 'cta_click' | 'form_start' | 'form_complete' | 'demo_request' | 'contact_request'
  eventValue?: number
  eventMetadata?: Record<string, any>
  timestamp: string
}

export interface ExecutiveSegment {
  segmentName: string
  criteria: SegmentCriteria
  executiveCount: number
  conversionRate: number
  averageValue: number
  messaging: SegmentMessaging
}

export interface SegmentCriteria {
  executiveLevels?: ExecutiveLevel[]
  companySizes?: CompanySize[]
  industries?: IndustryVertical[]
  budgetRanges?: BudgetRange[]
  painPoints?: PainPointCategory[]
  trafficSources?: TrafficSource[]
}

export interface SegmentMessaging {
  headline: string
  subheadline: string
  valueProposition: string
  ctaText: string
  socialProof: string
  painPointFocus: PainPointCategory[]
}

export default {}