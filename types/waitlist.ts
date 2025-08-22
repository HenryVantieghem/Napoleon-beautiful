// Waitlist-specific type definitions for executive signup optimization

export interface WaitlistEntry {
  id: string
  email: string
  firstName: string
  lastName: string
  company: string
  role: string
  companySize: string
  source: string
  ipAddress?: string
  userAgent?: string
  referrer?: string
  utmSource?: string
  utmMedium?: string
  utmCampaign?: string
  deviceType: 'mobile' | 'tablet' | 'desktop'
  conversionTime: number // Seconds to complete signup
  scrollDepth: number // Percentage scrolled before signup
  formCompletionTime: number // Time to complete form
  ctaClicked: string // Which CTA led to signup
  abTestVariant?: string // A/B test variant
  priority: 'low' | 'medium' | 'high' | 'critical'
  executiveLevel: string
  estimatedValue: number // Potential customer value
  createdAt: string
  status: WaitlistStatus
  tags?: string[]
  notes?: string
}

export type WaitlistStatus = 
  | 'pending' // Just signed up
  | 'verified' // Email verified
  | 'qualified' // Meets executive criteria
  | 'contacted' // Initial outreach sent
  | 'engaged' // Responding to communications
  | 'demo-scheduled' // Demo booked
  | 'converted' // Became paying customer
  | 'nurturing' // Long-term follow-up
  | 'unsubscribed' // Opted out
  | 'bounced' // Invalid email

export interface WaitlistFormData {
  email: string
  firstName: string
  lastName: string
  company: string
  role: string
  companySize: string
  phoneNumber?: string
  linkedinProfile?: string
  currentTools?: string[]
  primaryPainPoint?: string
  budgetRange?: string
  timeFrame?: string
  hearAboutUs?: string
  newsletterOptIn?: boolean
  termsAccepted: boolean
  privacyAccepted: boolean
}

export interface WaitlistValidation {
  field: keyof WaitlistFormData
  isValid: boolean
  errorMessage?: string
  suggestion?: string
}

export interface WaitlistFormState {
  data: Partial<WaitlistFormData>
  errors: Record<string, string>
  isSubmitting: boolean
  isSuccess: boolean
  submitError?: string
  validationErrors: WaitlistValidation[]
  currentStep: number
  totalSteps: number
}

export interface WaitlistSubmissionResult {
  success: boolean
  data?: {
    id: string
    estimatedPosition: number
    estimatedWaitTime: string
    priority: string
    nextSteps: string[]
  }
  error?: {
    code: string
    message: string
    details?: Record<string, any>
  }
}

export interface WaitlistMetrics {
  totalSignups: number
  dailySignups: number
  weeklySignups: number
  monthlySignups: number
  conversionRate: number
  averageTimeToSignup: number
  formCompletionRate: number
  emailVerificationRate: number
  qualificationRate: number
  topSources: Array<{ source: string; count: number; conversionRate: number }>
  topCompanySizes: Array<{ size: string; count: number; averageValue: number }>
  topExecutiveLevels: Array<{ level: string; count: number; conversionRate: number }>
  topIndustries: Array<{ industry: string; count: number; averageValue: number }>
  deviceBreakdown: Record<string, number>
  geographicDistribution: Array<{ country: string; count: number }>
  abTestResults: Array<{ variant: string; conversionRate: number; signups: number }>
}

export interface WaitlistConfiguration {
  isOpen: boolean
  maxCapacity?: number
  autoApproval: boolean
  requireEmailVerification: boolean
  requirePhoneVerification: boolean
  enablePriorityQueue: boolean
  qualificationCriteria: QualificationCriteria
  notifications: NotificationSettings
  abTests: ABTestConfiguration[]
}

export interface QualificationCriteria {
  requiredExecutiveLevels?: string[]
  requiredCompanySizes?: string[]
  requiredIndustries?: string[]
  minimumBudget?: number
  blacklistedCompanies?: string[]
  blacklistedDomains?: string[]
  requiredFields?: (keyof WaitlistFormData)[]
}

export interface NotificationSettings {
  sendWelcomeEmail: boolean
  sendPositionUpdates: boolean
  sendInvitationEmail: boolean
  slackAlerts: boolean
  emailAlerts: boolean
  webhookUrl?: string
  alertThresholds: {
    highValueSignup: number // Alert for signups above this estimated value
    dailyGoal: number // Alert when daily signups reach goal
    qualifiedSignup: boolean // Alert for qualified executives
  }
}

export interface ABTestConfiguration {
  testName: string
  isActive: boolean
  trafficSplit: Record<string, number> // variant name -> percentage
  variants: Array<{
    name: string
    headline: string
    subheadline?: string
    ctaText: string
    formFields?: (keyof WaitlistFormData)[]
    styling?: Record<string, any>
  }>
  startDate: string
  endDate?: string
  minSampleSize: number
  successMetric: 'conversion_rate' | 'form_completion' | 'qualified_signups'
}

export interface WaitlistExport {
  format: 'csv' | 'json' | 'xlsx'
  filters: {
    dateRange?: { start: string; end: string }
    status?: WaitlistStatus[]
    executiveLevels?: string[]
    companySizes?: string[]
    sources?: string[]
    priority?: ('low' | 'medium' | 'high' | 'critical')[]
  }
  fields: (keyof WaitlistEntry)[]
  sortBy?: keyof WaitlistEntry
  sortOrder?: 'asc' | 'desc'
  includeAnalytics?: boolean
}

export default {}