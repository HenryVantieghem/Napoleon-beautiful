import type { WaitlistFormData, WaitlistValidation } from '@/types/waitlist'

// Executive form validation schemas and utilities
export class ExecutiveFormValidator {
  
  // Validate executive email
  static validateEmail(email: string): WaitlistValidation {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    
    if (!email) {
      return { field: 'email', isValid: false, errorMessage: 'Email address is required' }
    }
    
    if (!emailRegex.test(email)) {
      return { field: 'email', isValid: false, errorMessage: 'Please enter a valid email address' }
    }
    
    // Check for business email
    if (!this.isBusinessEmail(email)) {
      return { 
        field: 'email', 
        isValid: false, 
        errorMessage: 'Please use your business email address',
        suggestion: 'Personal email addresses are not accepted for executive access'
      }
    }
    
    return { field: 'email', isValid: true }
  }

  // Validate executive first name
  static validateFirstName(firstName: string): WaitlistValidation {
    if (!firstName) {
      return { field: 'firstName', isValid: false, errorMessage: 'First name is required' }
    }
    
    if (firstName.length < 2) {
      return { field: 'firstName', isValid: false, errorMessage: 'First name must be at least 2 characters' }
    }
    
    if (firstName.length > 50) {
      return { field: 'firstName', isValid: false, errorMessage: 'First name must be less than 50 characters' }
    }
    
    const nameRegex = /^[a-zA-Z\s'-]+$/
    if (!nameRegex.test(firstName)) {
      return { field: 'firstName', isValid: false, errorMessage: 'First name contains invalid characters' }
    }
    
    return { field: 'firstName', isValid: true }
  }

  // Validate executive last name
  static validateLastName(lastName: string): WaitlistValidation {
    if (!lastName) {
      return { field: 'lastName', isValid: false, errorMessage: 'Last name is required' }
    }
    
    if (lastName.length < 2) {
      return { field: 'lastName', isValid: false, errorMessage: 'Last name must be at least 2 characters' }
    }
    
    if (lastName.length > 50) {
      return { field: 'lastName', isValid: false, errorMessage: 'Last name must be less than 50 characters' }
    }
    
    const nameRegex = /^[a-zA-Z\s'-]+$/
    if (!nameRegex.test(lastName)) {
      return { field: 'lastName', isValid: false, errorMessage: 'Last name contains invalid characters' }
    }
    
    return { field: 'lastName', isValid: true }
  }

  // Validate company name
  static validateCompany(company: string): WaitlistValidation {
    if (!company) {
      return { field: 'company', isValid: false, errorMessage: 'Company name is required' }
    }
    
    if (company.length < 2) {
      return { field: 'company', isValid: false, errorMessage: 'Company name must be at least 2 characters' }
    }
    
    if (company.length > 100) {
      return { field: 'company', isValid: false, errorMessage: 'Company name must be less than 100 characters' }
    }
    
    return { field: 'company', isValid: true }
  }

  // Validate executive role/title
  static validateRole(role: string): WaitlistValidation {
    if (!role) {
      return { field: 'role', isValid: false, errorMessage: 'Job title is required' }
    }
    
    if (role.length < 2) {
      return { field: 'role', isValid: false, errorMessage: 'Job title must be at least 2 characters' }
    }
    
    if (role.length > 100) {
      return { field: 'role', isValid: false, errorMessage: 'Job title must be less than 100 characters' }
    }
    
    // Check if role suggests executive level
    const executiveTitles = [
      'ceo', 'cfo', 'coo', 'cto', 'chief', 'president', 'founder', 'owner',
      'vp', 'vice president', 'director', 'head of', 'lead', 'senior', 'principal',
      'manager', 'executive', 'partner'
    ]
    
    const isExecutiveRole = executiveTitles.some(title => 
      role.toLowerCase().includes(title)
    )
    
    if (!isExecutiveRole) {
      return { 
        field: 'role', 
        isValid: false, 
        errorMessage: 'This access is limited to executives and senior management',
        suggestion: 'Please use your executive or management title'
      }
    }
    
    return { field: 'role', isValid: true }
  }

  // Validate company size
  static validateCompanySize(companySize: string): WaitlistValidation {
    const validSizes = ['startup', 'small', 'medium', 'large', 'enterprise', 'fortune500']
    
    if (!companySize) {
      return { field: 'companySize', isValid: false, errorMessage: 'Company size is required' }
    }
    
    if (!validSizes.includes(companySize)) {
      return { field: 'companySize', isValid: false, errorMessage: 'Please select a valid company size' }
    }
    
    return { field: 'companySize', isValid: true }
  }

  // Validate phone number (optional)
  static validatePhoneNumber(phoneNumber?: string): WaitlistValidation {
    if (!phoneNumber) {
      return { field: 'phoneNumber', isValid: true } // Optional field
    }
    
    // Remove all non-digit characters for validation
    const digitsOnly = phoneNumber.replace(/\D/g, '')
    
    if (digitsOnly.length < 10) {
      return { field: 'phoneNumber', isValid: false, errorMessage: 'Phone number must be at least 10 digits' }
    }
    
    if (digitsOnly.length > 15) {
      return { field: 'phoneNumber', isValid: false, errorMessage: 'Phone number must be less than 15 digits' }
    }
    
    return { field: 'phoneNumber', isValid: true }
  }

  // Validate LinkedIn profile (optional)
  static validateLinkedinProfile(linkedinProfile?: string): WaitlistValidation {
    if (!linkedinProfile) {
      return { field: 'linkedinProfile', isValid: true } // Optional field
    }
    
    const linkedinRegex = /^(https?:\/\/)?(www\.)?linkedin\.com\/(in|pub)\/[\w-]+\/?$/
    
    if (!linkedinRegex.test(linkedinProfile)) {
      return { 
        field: 'linkedinProfile', 
        isValid: false, 
        errorMessage: 'Please enter a valid LinkedIn profile URL',
        suggestion: 'Format: https://linkedin.com/in/your-profile'
      }
    }
    
    return { field: 'linkedinProfile', isValid: true }
  }

  // Check if email is business email
  static isBusinessEmail(email: string): boolean {
    const consumerDomains = [
      'gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'aol.com',
      'icloud.com', 'live.com', 'msn.com', 'ymail.com', 'protonmail.com',
      'mail.com', 'gmx.com', 'zoho.com', 'fastmail.com', 'hey.com'
    ]
    
    const domain = email.split('@')[1]?.toLowerCase()
    return domain ? !consumerDomains.includes(domain) : false
  }

  // Get executive level from role
  static getExecutiveLevel(role: string): 'c-suite' | 'vp' | 'director' | 'senior' | 'other' {
    const roleLower = role.toLowerCase()
    
    if (roleLower.includes('ceo') || roleLower.includes('cfo') || roleLower.includes('coo') || 
        roleLower.includes('cto') || roleLower.includes('chief') || roleLower.includes('president') ||
        roleLower.includes('founder')) {
      return 'c-suite'
    }
    
    if (roleLower.includes('vp') || roleLower.includes('vice president')) {
      return 'vp'
    }
    
    if (roleLower.includes('director')) {
      return 'director'
    }
    
    if (roleLower.includes('senior') || roleLower.includes('head of') || 
        roleLower.includes('lead') || roleLower.includes('principal')) {
      return 'senior'
    }
    
    return 'other'
  }

  // Get company tier from size
  static getCompanyTier(companySize: string): 'enterprise' | 'growth' | 'startup' {
    switch (companySize) {
      case 'fortune500':
      case 'enterprise':
      case 'large':
        return 'enterprise'
      case 'medium':
        return 'growth'
      case 'small':
      case 'startup':
        return 'startup'
      default:
        return 'growth'
    }
  }

  // Calculate executive priority score
  static calculatePriorityScore(data: WaitlistFormData): number {
    let score = 0
    
    // Executive level scoring
    const executiveLevel = this.getExecutiveLevel(data.role)
    const levelScores = {
      'c-suite': 10,
      'vp': 7,
      'director': 5,
      'senior': 3,
      'other': 1
    }
    score += levelScores[executiveLevel]
    
    // Company tier scoring
    const companyTier = this.getCompanyTier(data.companySize)
    const tierScores = {
      'enterprise': 8,
      'growth': 5,
      'startup': 3
    }
    score += tierScores[companyTier]
    
    // Business email bonus
    if (this.isBusinessEmail(data.email)) {
      score += 3
    }
    
    // LinkedIn profile bonus
    if (data.linkedinProfile) {
      score += 2
    }
    
    return score
  }

  // Comprehensive form validation
  static validateWaitlistForm(data: WaitlistFormData): {
    isValid: boolean
    errors: Record<string, string>
    validations: WaitlistValidation[]
    priorityScore: number
    executiveLevel: string
    companyTier: string
  } {
    const validations = [
      this.validateEmail(data.email),
      this.validateFirstName(data.firstName),
      this.validateLastName(data.lastName),
      this.validateCompany(data.company),
      this.validateRole(data.role),
      this.validateCompanySize(data.companySize),
      this.validatePhoneNumber(data.phoneNumber),
      this.validateLinkedinProfile(data.linkedinProfile)
    ]
    
    const errors: Record<string, string> = {}
    let isValid = true
    
    validations.forEach(validation => {
      if (!validation.isValid && validation.errorMessage) {
        errors[validation.field] = validation.errorMessage
        isValid = false
      }
    })
    
    // Additional custom validations
    if (!data.termsAccepted) {
      errors.termsAccepted = 'You must accept the terms and conditions'
      isValid = false
    }
    
    if (!data.privacyAccepted) {
      errors.privacyAccepted = 'You must accept the privacy policy'
      isValid = false
    }
    
    return {
      isValid,
      errors,
      validations: validations.filter(v => !v.isValid),
      priorityScore: this.calculatePriorityScore(data),
      executiveLevel: this.getExecutiveLevel(data.role),
      companyTier: this.getCompanyTier(data.companySize)
    }
  }

  // Real-time field validation for better UX
  static validateField(fieldName: keyof WaitlistFormData, value: any): WaitlistValidation {
    switch (fieldName) {
      case 'email':
        return this.validateEmail(value)
      case 'firstName':
        return this.validateFirstName(value)
      case 'lastName':
        return this.validateLastName(value)
      case 'company':
        return this.validateCompany(value)
      case 'role':
        return this.validateRole(value)
      case 'companySize':
        return this.validateCompanySize(value)
      case 'phoneNumber':
        return this.validatePhoneNumber(value)
      case 'linkedinProfile':
        return this.validateLinkedinProfile(value)
      default:
        return { field: fieldName, isValid: true }
    }
  }

  // Format phone number for display
  static formatPhoneNumber(phoneNumber: string): string {
    const digitsOnly = phoneNumber.replace(/\D/g, '')
    
    if (digitsOnly.length === 10) {
      return `(${digitsOnly.slice(0, 3)}) ${digitsOnly.slice(3, 6)}-${digitsOnly.slice(6)}`
    } else if (digitsOnly.length === 11 && digitsOnly[0] === '1') {
      return `+1 (${digitsOnly.slice(1, 4)}) ${digitsOnly.slice(4, 7)}-${digitsOnly.slice(7)}`
    }
    
    return phoneNumber // Return as-is if format is unclear
  }

  // Extract company domain from email
  static getCompanyDomain(email: string): string {
    const domain = email.split('@')[1]?.toLowerCase()
    return domain || ''
  }

  // Suggest company name from email domain
  static suggestCompanyName(email: string): string {
    const domain = this.getCompanyDomain(email)
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

  // Check if domain suggests Fortune 500 company
  static isLikelyFortune500Domain(email: string): boolean {
    const domain = this.getCompanyDomain(email)
    
    // Common Fortune 500 domain patterns
    const fortune500Patterns = [
      'microsoft.com', 'apple.com', 'google.com', 'amazon.com', 'facebook.com',
      'jpmorgan.com', 'wellsfargo.com', 'bankofamerica.com', 'goldmansachs.com',
      'mckinsey.com', 'deloitte.com', 'pwc.com', 'kpmg.com', 'accenture.com',
      'boeing.com', 'ge.com', 'ford.com', 'gm.com', 'exxonmobil.com'
    ]
    
    return fortune500Patterns.some(pattern => domain.includes(pattern.split('.')[0]))
  }
}

// Sanitization utilities
export class DataSanitizer {
  // Sanitize string input
  static sanitizeString(input: string): string {
    return input
      .trim()
      .replace(/[<>]/g, '') // Remove potential HTML tags
      .replace(/javascript:/gi, '') // Remove javascript: protocol
      .replace(/on\w+=/gi, '') // Remove event handlers
      .substring(0, 1000) // Limit length
  }

  // Sanitize email
  static sanitizeEmail(email: string): string {
    return email
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9@._-]/g, '') // Only allow valid email characters
      .substring(0, 254) // RFC 5321 limit
  }

  // Sanitize phone number
  static sanitizePhoneNumber(phone: string): string {
    return phone
      .replace(/[^\d+()-.\s]/g, '') // Only allow phone number characters
      .trim()
      .substring(0, 20)
  }

  // Sanitize URL
  static sanitizeUrl(url: string): string {
    try {
      const parsedUrl = new URL(url)
      if (parsedUrl.protocol !== 'http:' && parsedUrl.protocol !== 'https:') {
        throw new Error('Invalid protocol')
      }
      return parsedUrl.toString()
    } catch {
      return ''
    }
  }

  // Sanitize waitlist form data
  static sanitizeWaitlistData(data: WaitlistFormData): WaitlistFormData {
    return {
      email: this.sanitizeEmail(data.email),
      firstName: this.sanitizeString(data.firstName),
      lastName: this.sanitizeString(data.lastName),
      company: this.sanitizeString(data.company),
      role: this.sanitizeString(data.role),
      companySize: data.companySize, // Already validated against enum
      phoneNumber: data.phoneNumber ? this.sanitizePhoneNumber(data.phoneNumber) : undefined,
      linkedinProfile: data.linkedinProfile ? this.sanitizeUrl(data.linkedinProfile) : undefined,
      currentTools: data.currentTools?.map(tool => this.sanitizeString(tool)),
      primaryPainPoint: data.primaryPainPoint ? this.sanitizeString(data.primaryPainPoint) : undefined,
      budgetRange: data.budgetRange, // Already validated against enum
      timeFrame: data.timeFrame, // Already validated against enum
      hearAboutUs: data.hearAboutUs ? this.sanitizeString(data.hearAboutUs) : undefined,
      newsletterOptIn: data.newsletterOptIn,
      termsAccepted: data.termsAccepted,
      privacyAccepted: data.privacyAccepted
    }
  }
}

export default {
  ExecutiveFormValidator,
  DataSanitizer
}