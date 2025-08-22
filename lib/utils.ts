import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

// Utility function for conditional class names
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Format currency for executive pricing display
export function formatCurrency(amount: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

// Format large numbers for executive metrics (e.g., 1.2K, 1.5M)
export function formatNumber(num: number): string {
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(1) + 'B'
  } else if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M'
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K'
  }
  return num.toString()
}

// Format time duration for executive time savings
export function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  
  if (hours > 0) {
    return `${hours}h ${minutes}m`
  } else if (minutes > 0) {
    return `${minutes}m`
  } else {
    return `${seconds}s`
  }
}

// Format percentage for conversion rates and metrics
export function formatPercentage(decimal: number, precision: number = 1): string {
  return `${(decimal * 100).toFixed(precision)}%`
}

// Validate executive email domains
export function isBusinessEmail(email: string): boolean {
  const businessDomains = [
    // Exclude common consumer domains
    'gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'aol.com',
    'icloud.com', 'live.com', 'msn.com', 'ymail.com', 'protonmail.com'
  ]
  
  const domain = email.split('@')[1]?.toLowerCase()
  return domain ? !businessDomains.includes(domain) : false
}

// Extract company name from email domain
export function getCompanyFromEmail(email: string): string {
  const domain = email.split('@')[1]?.toLowerCase()
  if (!domain) return ''
  
  // Remove common TLDs and format company name
  const companyName = domain
    .replace(/\.(com|org|net|edu|gov|co\.uk|co|io)$/, '')
    .replace(/\./g, ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
    
  return companyName
}

// Determine executive level from job title
export function getExecutiveLevel(title: string): string {
  const titleLower = title.toLowerCase()
  
  if (titleLower.includes('ceo') || titleLower.includes('chief executive')) {
    return 'ceo'
  } else if (titleLower.includes('cfo') || titleLower.includes('chief financial')) {
    return 'cfo'
  } else if (titleLower.includes('coo') || titleLower.includes('chief operating')) {
    return 'coo'
  } else if (titleLower.includes('cto') || titleLower.includes('chief technology')) {
    return 'cto'
  } else if (titleLower.includes('president')) {
    return 'president'
  } else if (titleLower.includes('founder')) {
    return 'founder'
  } else if (titleLower.includes('evp') || titleLower.includes('executive vp')) {
    return 'evp'
  } else if (titleLower.includes('svp') || titleLower.includes('senior vp')) {
    return 'svp'
  } else if (titleLower.includes('vp') || titleLower.includes('vice president')) {
    return 'vp'
  } else if (titleLower.includes('director')) {
    return 'director'
  } else {
    return 'other'
  }
}

// Calculate estimated executive value based on profile
export function calculateExecutiveValue(profile: {
  executiveLevel: string
  companySize: string
  industry: string
}): number {
  const baseMulipliers = {
    ceo: 10000,
    cfo: 8000,
    coo: 8000,
    cto: 7000,
    president: 9000,
    founder: 8500,
    evp: 6000,
    svp: 5000,
    vp: 4000,
    director: 2000,
    other: 1000
  }
  
  const companySizeMultipliers = {
    'fortune500': 2.5,
    'enterprise': 2.0,
    'large': 1.5,
    'medium': 1.2,
    'small': 1.0,
    'startup': 0.8
  }
  
  const industryMultipliers = {
    'technology': 1.5,
    'financial-services': 1.4,
    'healthcare': 1.3,
    'consulting': 1.3,
    'manufacturing': 1.2,
    'energy': 1.2,
    'telecommunications': 1.1,
    'retail': 1.0,
    'education': 0.9,
    'non-profit': 0.8,
    'government': 0.8,
    'other': 1.0
  }
  
  const baseValue = baseMulipliers[profile.executiveLevel as keyof typeof baseMulipliers] || 1000
  const sizeMultiplier = companySizeMultipliers[profile.companySize as keyof typeof companySizeMultipliers] || 1.0
  const industryMultiplier = industryMultipliers[profile.industry as keyof typeof industryMultipliers] || 1.0
  
  return Math.round(baseValue * sizeMultiplier * industryMultiplier)
}

// Generate unique session ID for analytics
export function generateSessionId(): string {
  return 'exec_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now().toString(36)
}

// Get device type from user agent
export function getDeviceType(userAgent?: string): 'mobile' | 'tablet' | 'desktop' {
  if (!userAgent) {
    if (typeof window !== 'undefined') {
      userAgent = window.navigator.userAgent
    } else {
      return 'desktop'
    }
  }
  
  const ua = userAgent.toLowerCase()
  
  if (ua.includes('iphone') || ua.includes('android') && !ua.includes('tablet')) {
    return 'mobile'
  } else if (ua.includes('ipad') || ua.includes('tablet') || ua.includes('kindle')) {
    return 'tablet'
  } else {
    return 'desktop'
  }
}

// Track executive behavior events
export function trackExecutiveEvent(eventName: string, properties?: Record<string, any>) {
  if (typeof window === 'undefined') return
  
  // Add analytics tracking here (Google Analytics, Mixpanel, etc.)
  console.log('Executive Event:', eventName, properties)
  
  // Example: Google Analytics 4
  if ('gtag' in window) {
    (window as any).gtag('event', eventName, {
      event_category: 'executive_behavior',
      custom_parameters: properties
    })
  }
}

// Debounce function for performance optimization
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

// Throttle function for scroll events
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}

// Sleep utility for async operations
export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

// Format date for executive communications
export function formatDate(date: Date | string, options?: Intl.DateTimeFormatOptions): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...options
  }
  
  return dateObj.toLocaleDateString('en-US', defaultOptions)
}

// Generate executive-appropriate avatar/placeholder
export function getExecutiveAvatar(name: string): string {
  const initials = name
    .split(' ')
    .map(part => part.charAt(0).toUpperCase())
    .join('')
    .slice(0, 2)
    
  // Return initials for placeholder or generate avatar URL
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=8b5cf6&color=ffffff&size=128&font-size=0.5`
}

// Validate executive form data
export function validateExecutiveForm(data: Record<string, any>): {
  isValid: boolean
  errors: Record<string, string>
} {
  const errors: Record<string, string> = {}
  
  if (!data.email) {
    errors.email = 'Email is required'
  } else if (!/\S+@\S+\.\S+/.test(data.email)) {
    errors.email = 'Please enter a valid email address'
  } else if (!isBusinessEmail(data.email)) {
    errors.email = 'Please use your business email address'
  }
  
  if (!data.firstName) {
    errors.firstName = 'First name is required'
  }
  
  if (!data.lastName) {
    errors.lastName = 'Last name is required'
  }
  
  if (!data.company) {
    errors.company = 'Company name is required'
  }
  
  if (!data.role) {
    errors.role = 'Job title is required'
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  }
}

export default {
  cn,
  formatCurrency,
  formatNumber,
  formatDuration,
  formatPercentage,
  isBusinessEmail,
  getCompanyFromEmail,
  getExecutiveLevel,
  calculateExecutiveValue,
  generateSessionId,
  getDeviceType,
  trackExecutiveEvent,
  debounce,
  throttle,
  sleep,
  formatDate,
  getExecutiveAvatar,
  validateExecutiveForm
}