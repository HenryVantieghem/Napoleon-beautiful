"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { PremiumCard } from "@/components/ui/premium-card"
import { ExecutiveButton } from "@/components/ui/executive-button"
import { cn } from "@/lib/utils"
import { ArrowRight, Mail, User, Building, Briefcase, Users } from "lucide-react"

interface WaitlistSectionProps {
  className?: string
}

export default function WaitlistSection({ className = "" }: WaitlistSectionProps) {
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    company: '',
    role: '',
    companySize: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          termsAccepted: true,
          privacyAccepted: true,
          source: 'landing_page'
        })
      })

      if (response.ok) {
        setIsSubmitted(true)
        // Track conversion
        if (typeof window !== 'undefined' && 'gtag' in window) {
          (window as any).gtag('event', 'conversion', {
            send_to: 'AW-XXXXXXXXX/XXXXXXX',
            event_category: 'executive_waitlist',
            event_label: 'signup_success'
          })
        }
      }
    } catch (error) {
      console.error('Waitlist signup error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <section className={cn("py-24 relative", className)}>
        <div className="container-executive">
          <PremiumCard variant="glow" className="max-w-2xl mx-auto p-12 text-center">
            <div className="space-y-6">
              <div className="w-20 h-20 bg-gradient-to-br from-emerald-success/20 to-emerald-success/10 rounded-full flex items-center justify-center mx-auto">
                <Mail className="w-10 h-10 text-emerald-success" />
              </div>
              
              <h3 className="text-3xl font-bold text-white">
                Welcome to Napoleon AI, {formData.firstName}!
              </h3>
              
              <p className="text-white/80 text-lg leading-relaxed">
                You're confirmed for executive early access. Check your email for next steps and 
                exclusive Fortune 500 onboarding materials.
              </p>
              
              <div className="pt-4">
                <p className="text-emerald-success font-medium">
                  Estimated access: 3-7 days for C-suite executives
                </p>
              </div>
            </div>
          </PremiumCard>
        </div>
      </section>
    )
  }

  return (
    <section className={cn("py-24 relative", className)}>
      <div className="container-executive">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            <span className="text-gradient-executive">Join 847+ Executives</span>
            <br />
            Transforming Their Workflow
          </h2>
          
          <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            Exclusive early access for Fortune 500 executives. Limited to 1,000 leaders.
          </p>
        </motion.div>

        {/* Waitlist Form */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <PremiumCard variant="glow" className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Name Fields */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-white/80 text-sm font-medium">First Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                      className="w-full pl-12 pr-4 py-3 bg-executive-card border border-white/10 rounded-xl text-white placeholder-white/40 focus:border-royal-purple focus:outline-none transition-colors"
                      placeholder="Enter first name"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-white/80 text-sm font-medium">Last Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                      className="w-full pl-12 pr-4 py-3 bg-executive-card border border-white/10 rounded-xl text-white placeholder-white/40 focus:border-royal-purple focus:outline-none transition-colors"
                      placeholder="Enter last name"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="text-white/80 text-sm font-medium">Business Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full pl-12 pr-4 py-3 bg-executive-card border border-white/10 rounded-xl text-white placeholder-white/40 focus:border-royal-purple focus:outline-none transition-colors"
                    placeholder="your.email@company.com"
                    required
                  />
                </div>
              </div>

              {/* Company & Role */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-white/80 text-sm font-medium">Company</label>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                      className="w-full pl-12 pr-4 py-3 bg-executive-card border border-white/10 rounded-xl text-white placeholder-white/40 focus:border-royal-purple focus:outline-none transition-colors"
                      placeholder="Your company"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-white/80 text-sm font-medium">Executive Role</label>
                  <div className="relative">
                    <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
                    <input
                      type="text"
                      value={formData.role}
                      onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
                      className="w-full pl-12 pr-4 py-3 bg-executive-card border border-white/10 rounded-xl text-white placeholder-white/40 focus:border-royal-purple focus:outline-none transition-colors"
                      placeholder="CEO, CFO, CTO, etc."
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Company Size */}
              <div className="space-y-2">
                <label className="text-white/80 text-sm font-medium">Company Size</label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
                  <select
                    value={formData.companySize}
                    onChange={(e) => setFormData(prev => ({ ...prev, companySize: e.target.value }))}
                    className="w-full pl-12 pr-4 py-3 bg-executive-card border border-white/10 rounded-xl text-white focus:border-royal-purple focus:outline-none transition-colors appearance-none"
                    required
                  >
                    <option value="" disabled>Select company size</option>
                    <option value="fortune500">Fortune 500</option>
                    <option value="enterprise">Enterprise (1000+ employees)</option>
                    <option value="large">Large (500-1000 employees)</option>
                    <option value="medium">Medium (100-500 employees)</option>
                    <option value="small">Small (50-100 employees)</option>
                    <option value="startup">Startup (&lt;50 employees)</option>
                  </select>
                </div>
              </div>

              {/* Submit Button */}
              <ExecutiveButton
                type="submit"
                variant="primary"
                size="xl"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span>Securing Your Access...</span>
                ) : (
                  <>
                    <span>Get Executive Early Access</span>
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </>
                )}
              </ExecutiveButton>

              {/* Trust Indicators */}
              <div className="text-center text-white/50 text-xs space-y-1">
                <p>SOC2 compliant • Enterprise security • No spam, ever</p>
                <p>Join 847+ Fortune 500 executives already transforming their workflow</p>
              </div>
            </form>
          </PremiumCard>
        </motion.div>
      </div>
    </section>
  )
}