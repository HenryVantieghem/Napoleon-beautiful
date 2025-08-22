// Analytics and tracking type definitions for executive behavior analysis

export interface AnalyticsEvent {
  eventId: string
  sessionId: string
  userId?: string
  eventType: EventType
  eventName: string
  eventValue?: number | string
  eventMetadata?: Record<string, any>
  timestamp: string
  userAgent: string
  ipAddress?: string
  deviceType: 'mobile' | 'tablet' | 'desktop'
  browserType: string
  operatingSystem: string
  screenResolution: string
  viewportSize: string
  connectionType?: string
  referrer?: string
  utmSource?: string
  utmMedium?: string
  utmCampaign?: string
  utmTerm?: string
  utmContent?: string
}

export type EventType = 
  | 'page_view'
  | 'user_interaction'
  | 'form_event'
  | 'conversion'
  | 'performance'
  | 'error'
  | 'engagement'
  | 'business'

export interface PageViewEvent extends AnalyticsEvent {
  eventType: 'page_view'
  pageUrl: string
  pageTitle: string
  previousPageUrl?: string
  timeOnPage?: number
  scrollDepth?: number
  exitIntent?: boolean
}

export interface UserInteractionEvent extends AnalyticsEvent {
  eventType: 'user_interaction'
  elementId: string
  elementType: 'button' | 'link' | 'form' | 'image' | 'video' | 'text'
  elementText?: string
  position: { x: number; y: number }
  ctaType?: string
  abTestVariant?: string
}

export interface FormEvent extends AnalyticsEvent {
  eventType: 'form_event'
  formId: string
  formType: 'waitlist' | 'demo' | 'contact' | 'newsletter'
  fieldName?: string
  action: 'start' | 'field_focus' | 'field_blur' | 'field_error' | 'submit' | 'abandon'
  completionTime?: number
  errorCount?: number
  fieldValues?: Record<string, any>
}

export interface ConversionEvent extends AnalyticsEvent {
  eventType: 'conversion'
  conversionType: 'waitlist_signup' | 'demo_request' | 'contact_form' | 'newsletter_signup'
  conversionValue: number
  funnelStep: string
  timeToConversion: number
  touchpoints: string[]
  attributionModel?: AttributionModel
}

export interface PerformanceEvent extends AnalyticsEvent {
  eventType: 'performance'
  metricType: 'core_web_vitals' | 'custom'
  metrics: PerformanceMetrics
}

export interface PerformanceMetrics {
  fcp?: number // First Contentful Paint
  lcp?: number // Largest Contentful Paint
  cls?: number // Cumulative Layout Shift
  fid?: number // First Input Delay
  ttfb?: number // Time to First Byte
  domContentLoaded?: number
  windowLoaded?: number
  resourceLoadTime?: Record<string, number>
  memoryUsage?: number
  connectionSpeed?: string
}

export interface ErrorEvent extends AnalyticsEvent {
  eventType: 'error'
  errorType: 'javascript' | 'network' | 'form_validation' | 'api' | 'performance'
  errorMessage: string
  errorStack?: string
  errorCode?: string
  context?: Record<string, any>
  severity: 'low' | 'medium' | 'high' | 'critical'
}

export interface EngagementEvent extends AnalyticsEvent {
  eventType: 'engagement'
  engagementType: 'scroll' | 'time' | 'interaction' | 'social_share' | 'content_consumption'
  engagementValue: number
  threshold?: number
  milestone?: string
}

export interface BusinessEvent extends AnalyticsEvent {
  eventType: 'business'
  businessMetric: 'revenue' | 'lead_quality' | 'customer_value' | 'churn' | 'retention'
  value: number
  segment?: string
  cohort?: string
}

export interface AnalyticsSession {
  sessionId: string
  userId?: string
  startTime: string
  endTime?: string
  duration?: number
  pageViews: number
  interactions: number
  conversions: number
  revenue?: number
  deviceInfo: DeviceInfo
  trafficInfo: TrafficInfo
  behaviorPattern: BehaviorPattern
  executiveProfile?: ExecutiveProfile
}

export interface DeviceInfo {
  type: 'mobile' | 'tablet' | 'desktop'
  brand?: string
  model?: string
  os: string
  osVersion: string
  browser: string
  browserVersion: string
  screenWidth: number
  screenHeight: number
  viewportWidth: number
  viewportHeight: number
  devicePixelRatio: number
  connectionType?: 'wifi' | '3g' | '4g' | '5g' | 'ethernet'
  batteryLevel?: number
  isOnline: boolean
}

export interface TrafficInfo {
  source: string
  medium: string
  campaign?: string
  term?: string
  content?: string
  referrer?: string
  landingPage: string
  entryTime: string
  exitPage?: string
  exitTime?: string
  internalReferrer?: string
  externalReferrer?: string
}

export interface BehaviorPattern {
  sessionType: 'new' | 'returning' | 'frequent'
  engagementLevel: 'low' | 'medium' | 'high'
  intentSignals: IntentSignal[]
  navigationPattern: NavigationStep[]
  interactionPattern: InteractionPattern
  conversionProbability: number
  executiveIndicators: ExecutiveIndicator[]
}

export interface IntentSignal {
  signal: 'high_scroll' | 'long_time' | 'multiple_pages' | 'cta_hover' | 'form_start' | 'demo_interest'
  strength: number // 0-1
  timestamp: string
}

export interface NavigationStep {
  pageUrl: string
  timeOnPage: number
  scrollDepth: number
  interactions: number
  exitIntent?: boolean
  timestamp: string
}

export interface InteractionPattern {
  clicksPerMinute: number
  scrollVelocity: number
  mouseMovementPattern: 'deliberate' | 'scanning' | 'erratic' | 'focused'
  keyboardUsage: boolean
  mobileGestures?: string[]
  dwellTime: Record<string, number> // element -> time spent
}

export interface ExecutiveIndicator {
  indicator: 'business_email' | 'executive_title' | 'company_domain' | 'high_salary_zip' | 'premium_device' | 'business_hours'
  confidence: number // 0-1
  evidence?: Record<string, any>
}

export interface ExecutiveProfile {
  estimatedLevel: 'director' | 'vp' | 'svp' | 'c-suite' | 'founder'
  estimatedSalary: string
  companySize: string
  industry: string
  decisionMaker: boolean
  influencer: boolean
  budgetHolder: boolean
  urgency: 'low' | 'medium' | 'high'
  fitScore: number // 0-100
}

export interface AttributionModel {
  model: 'first_touch' | 'last_touch' | 'linear' | 'time_decay' | 'position_based' | 'data_driven'
  touchpoints: AttributionTouchpoint[]
  weights?: Record<string, number>
}

export interface AttributionTouchpoint {
  channel: string
  campaign?: string
  medium: string
  source: string
  timestamp: string
  attribution: number // 0-1
  cost?: number
  revenue?: number
}

export interface AnalyticsDashboard {
  timeRange: { start: string; end: string }
  metrics: DashboardMetrics
  segments: DashboardSegment[]
  charts: DashboardChart[]
  alerts: DashboardAlert[]
  filters: AnalyticsFilters
}

export interface DashboardMetrics {
  totalSessions: number
  totalUsers: number
  executiveUsers: number
  conversionRate: number
  averageSessionDuration: number
  bounceRate: number
  pagesPerSession: number
  newUserRate: number
  returningUserRate: number
  mobileTrafficPercent: number
  topTrafficSources: Array<{ source: string; sessions: number; conversionRate: number }>
  executiveConversionRate: number
  revenuePerSession: number
  customerAcquisitionCost: number
  lifetimeValue: number
}

export interface DashboardSegment {
  segmentName: string
  userCount: number
  conversionRate: number
  averageValue: number
  growth: number // percentage change
  topCharacteristics: string[]
}

export interface DashboardChart {
  chartId: string
  chartType: 'line' | 'bar' | 'pie' | 'area' | 'scatter' | 'heatmap'
  title: string
  data: any[]
  xAxis: string
  yAxis: string
  filters?: Record<string, any>
  timeGranularity?: 'hour' | 'day' | 'week' | 'month'
}

export interface DashboardAlert {
  alertId: string
  alertType: 'threshold' | 'anomaly' | 'goal' | 'error'
  metric: string
  condition: string
  threshold: number
  currentValue: number
  severity: 'low' | 'medium' | 'high' | 'critical'
  message: string
  timestamp: string
  acknowledged: boolean
}

export interface AnalyticsFilters {
  dateRange: { start: string; end: string }
  deviceTypes?: ('mobile' | 'tablet' | 'desktop')[]
  trafficSources?: string[]
  userTypes?: ('new' | 'returning')[]
  executiveLevels?: string[]
  companySizes?: string[]
  industries?: string[]
  geographies?: string[]
  abTestVariants?: string[]
  conversionFunnels?: string[]
}

export default {}