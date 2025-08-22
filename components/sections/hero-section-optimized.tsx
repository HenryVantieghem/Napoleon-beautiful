"use client"

import React, { useState, useEffect } from "react"
import { ExecutiveButton } from "@/components/ui/executive-button"
import { AnimatedCounter } from "@/components/ui/animated-counter"
import { PremiumCard } from "@/components/ui/premium-card"
import { EXECUTIVE_HEADLINES, VALUE_PROPOSITIONS, CALL_TO_ACTION, SOCIAL_PROOF } from "@/lib/executive-copy"
import { cn } from "@/lib/utils"
import { ArrowRight, Play, Zap, Users, Clock, DollarSign } from "lucide-react"

interface HeroSectionProps {
  onWaitlistClick?: () => void
  onDemoClick?: () => void
  className?: string
  variant?: 'default' | 'premium' | 'executive'
}

export default function HeroSectionOptimized({
  onWaitlistClick,
  onDemoClick,
  className = "",
  variant = 'executive'
}: HeroSectionProps) {
  const [execCount, setExecCount] = useState(847)
  const [todaySignups, setTodaySignups] = useState(12)
  const [isVisible, setIsVisible] = useState(false)
  
  // Performance-optimized visibility trigger
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  // Simulate real-time executive signups with performance throttling
  useEffect(() => {
    let interval: NodeJS.Timeout
    
    // Only start simulation after component is visible
    if (isVisible) {
      interval = setInterval(() => {
        if (Math.random() > 0.8) { // Reduced frequency for performance
          setExecCount(prev => prev + 1)
          setTodaySignups(prev => prev + 1)
        }
      }, 15000) // Increased interval for performance
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isVisible])

  const handleWaitlistClick = () => {
    // Track conversion with minimal overhead
    if (typeof window !== 'undefined' && 'gtag' in window) {
      (window as any).gtag('event', 'cta_click', {
        event_category: 'executive_conversion',
        event_label: 'hero_waitlist'
      })
    }
    onWaitlistClick?.()
  }

  const handleDemoClick = () => {
    // Track demo request with minimal overhead
    if (typeof window !== 'undefined' && 'gtag' in window) {
      (window as any).gtag('event', 'demo_request', {
        event_category: 'executive_engagement',
        event_label: 'hero_demo'
      })
    }
    onDemoClick?.()
  }

  return (
    <section className={cn(
      "relative min-h-screen flex items-center justify-center overflow-hidden",
      "pt-20 pb-16 px-6",
      className
    )}>
      {/* Container with performance-optimized responsive design */}
      <div className="container-executive relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left: Executive Messaging */}
          <div className={cn(
            "space-y-8 text-center lg:text-left",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
            "transition-all duration-700 ease-out"
          )}>
            
            {/* Executive Badge - Critical above-fold element */}
            <div className={cn(
              "inline-flex items-center px-4 py-2 rounded-full",
              "bg-emerald-success/10 border border-emerald-success/20",
              "text-emerald-success text-sm font-medium",
              isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95",
              "transition-all duration-500 ease-out delay-100"
            )}>
              <Zap className="w-4 h-4 mr-2" />
              <AnimatedCounter value={execCount} /> Fortune 500 Executives Already Saving 25+ Hours Weekly
            </div>

            {/* Executive Headline - Critical SEO content */}
            <div className="space-y-4">
              <h1 className={cn(
                "text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight tracking-tight",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
                "transition-all duration-700 ease-out delay-200"
              )}>
                <span className="text-gradient-executive">
                  {EXECUTIVE_HEADLINES.primary}
                </span>
                <br />
                <span className="text-white">
                  Communication Intelligence
                </span>
              </h1>
              
              <p className={cn(
                "text-xl md:text-2xl text-white/80 max-w-2xl leading-relaxed",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
                "transition-all duration-700 ease-out delay-300"
              )}>
                {VALUE_PROPOSITIONS.primary}
              </p>
            </div>

            {/* Executive CTAs - Critical conversion elements */}
            <div className={cn(
              "flex flex-col sm:flex-row gap-4 justify-center lg:justify-start",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
              "transition-all duration-700 ease-out delay-400"
            )}>
              <ExecutiveButton
                onClick={handleWaitlistClick}
                variant="primary"
                size="xl"
                className="group"
              >
                <span>{CALL_TO_ACTION.primary}</span>
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </ExecutiveButton>
              
              <ExecutiveButton
                onClick={handleDemoClick}
                variant="secondary" 
                size="xl"
                className="group"
              >
                <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
                <span>Watch Executive Demo</span>
              </ExecutiveButton>
            </div>

            {/* Executive Social Proof - Trust indicators */}
            <div className={cn(
              "pt-8 space-y-4",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
              "transition-all duration-700 ease-out delay-500"
            )}>
              <div className="flex items-center justify-center lg:justify-start space-x-6 text-white/60 text-sm">
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4 text-emerald-success" />
                  <span>
                    <AnimatedCounter value={todaySignups} /> execs joined today
                  </span>
                </div>
                <span>•</span>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-electric-blue" />
                  <span>Average 28 hours saved weekly</span>
                </div>
                <span>•</span>
                <div className="flex items-center space-x-2">
                  <DollarSign className="w-4 h-4 text-gold-premium" />
                  <span>$2.3M average annual savings</span>
                </div>
              </div>
              
              <p className="text-white/50 text-xs text-center lg:text-left">
                Trusted by Fortune 500 CEOs • SOC2 Compliant • Enterprise Security
              </p>
            </div>
          </div>

          {/* Right: Executive Value Demonstration */}
          <div className={cn(
            "relative",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
            "transition-all duration-700 ease-out delay-300"
          )}>
            
            {/* Executive Dashboard Preview */}
            <PremiumCard variant="glow" className="p-8 relative overflow-hidden">
              <div className="space-y-6">
                
                {/* Executive Metrics Header */}
                <div className="text-center space-y-2">
                  <h3 className="text-2xl font-bold text-white">
                    Your Executive Intelligence Dashboard
                  </h3>
                  <p className="text-white/70">
                    Real Fortune 500 CEO workflow transformation
                  </p>
                </div>

                {/* Critical Metrics Grid - Performance optimized */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-executive-card border border-white/10 rounded-xl p-4 text-center">
                    <div className="text-3xl font-bold text-emerald-success">
                      <AnimatedCounter value={847} />+
                    </div>
                    <div className="text-white/70 text-sm">Fortune 500 Executives</div>
                  </div>
                  <div className="bg-executive-card border border-white/10 rounded-xl p-4 text-center">
                    <div className="text-3xl font-bold text-electric-blue">
                      <AnimatedCounter value={28} />h
                    </div>
                    <div className="text-white/70 text-sm">Saved Weekly</div>
                  </div>
                  <div className="bg-executive-card border border-white/10 rounded-xl p-4 text-center">
                    <div className="text-3xl font-bold text-royal-purple">
                      <AnimatedCounter value={95} />%
                    </div>
                    <div className="text-white/70 text-sm">Noise Reduction</div>
                  </div>
                  <div className="bg-executive-card border border-white/10 rounded-xl p-4 text-center">
                    <div className="text-3xl font-bold text-gold-premium">
                      $<AnimatedCounter value={2.3} />M
                    </div>
                    <div className="text-white/70 text-sm">Annual ROI</div>
                  </div>
                </div>

                {/* Executive Message Preview */}
                <div className="bg-executive-dark/50 border border-white/5 rounded-xl p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="text-white font-medium">Critical Messages Today</div>
                    <div className="text-emerald-success text-sm font-medium">3 of 247 require attention</div>
                  </div>
                  
                  <div className="space-y-3">
                    {/* Sample executive messages with minimal DOM for performance */}
                    {[
                      { priority: "🔴", subject: "Board meeting materials ready", from: "Executive Assistant" },
                      { priority: "🟡", subject: "Q4 strategy review scheduled", from: "Chief Strategy Officer" },
                      { priority: "🔴", subject: "Acquisition opportunity", from: "Investment Team" }
                    ].map((msg, idx) => (
                      <div key={idx} className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg">
                        <span className="text-lg">{msg.priority}</span>
                        <div className="flex-1 min-w-0">
                          <div className="text-white text-sm font-medium truncate">{msg.subject}</div>
                          <div className="text-white/60 text-xs">{msg.from}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Performance-optimized premium glow effect */}
              <div className="absolute -top-px left-1/2 transform -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-royal-purple to-transparent opacity-60" />
            </PremiumCard>
          </div>
        </div>
      </div>

      {/* Minimal background effects for performance */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Simplified gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-royal-purple/3 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-electric-blue/3 rounded-full blur-3xl" />
        
        {/* Performance-optimized grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.01]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(139, 92, 246, 0.2) 1px, transparent 1px),
              linear-gradient(90deg, rgba(139, 92, 246, 0.2) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px'
          }}
        />
      </div>
    </section>
  )
}