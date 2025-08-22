"use client"

import React, { useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { ExecutiveButton } from "@/components/ui/executive-button"
import { AnimatedCounter } from "@/components/ui/animated-counter"
import { PremiumCard } from "@/components/ui/premium-card"
import { EXECUTIVE_HEADLINES, VALUE_PROPOSITIONS, CALL_TO_ACTION, SOCIAL_PROOF, URGENCY_TRIGGERS } from "@/lib/executive-copy"
import { cn } from "@/lib/utils"
import { ArrowRight, Play, Zap, Users, Clock, DollarSign } from "lucide-react"

interface HeroSectionProps {
  onWaitlistClick?: () => void
  onDemoClick?: () => void
  className?: string
  variant?: 'default' | 'premium' | 'executive'
}

export default function HeroSection({
  onWaitlistClick,
  onDemoClick,
  className = "",
  variant = 'executive'
}: HeroSectionProps) {
  const [showForm, setShowForm] = useState(false)
  const [execCount, setExecCount] = useState(847)
  const [todaySignups, setTodaySignups] = useState(12)
  
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 300], [0, 100])
  const opacity = useTransform(scrollY, [0, 300], [1, 0.8])

  // Simulate real-time executive signups
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) { // 30% chance every 10 seconds
        setExecCount(prev => prev + 1)
        setTodaySignups(prev => prev + 1)
      }
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  const handleWaitlistClick = () => {
    onWaitlistClick?.()
    setShowForm(true)
  }

  const handleDemoClick = () => {
    onDemoClick?.()
    // Track demo click event
    if (typeof window !== 'undefined' && 'gtag' in window) {
      (window as any).gtag('event', 'demo_request', {
        event_category: 'conversion',
        event_label: 'hero_demo_button'
      })
    }
  }

  return (
    <motion.section 
      className={cn("relative z-20 min-h-screen flex items-center justify-center px-6", className)}
      style={{ y, opacity }}
    >
      <div className="max-w-7xl mx-auto text-center">
        
        {/* Executive Status Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center px-6 py-3 rounded-full bg-white/5 backdrop-blur-sm mb-8 border border-white/10 group hover:border-white/20 transition-all duration-300"
          style={{ filter: "url(#glass-effect)" }}
        >
          <div className="absolute top-0 left-1 right-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full" />
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-emerald-success rounded-full animate-pulse" />
            <span className="text-white/90 text-sm font-medium tracking-wide">
              ✨ Exclusive Early Access for Fortune 500 Executives
            </span>
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Zap className="w-4 h-4 text-amber-urgency" />
            </motion.div>
          </div>
        </motion.div>

        {/* Commanding Executive Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.8 }}
          className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-white mb-6 tracking-tight leading-none"
        >
          <span className="block">End Message</span>
          <span className="block">
            <span className="text-gradient-executive animate-shimmer">
              Whack-a-Mole
            </span>
          </span>
          <motion.span 
            className="block font-light italic text-white/80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            Forever
          </motion.span>
        </motion.h1>

        {/* Executive Value Proposition */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mb-8"
        >
          <p className="text-xl md:text-2xl lg:text-3xl text-white/80 mb-6 max-w-5xl mx-auto leading-relaxed font-light">
            AI that thinks like your perfect executive assistant. Process{" "}
            <motion.span 
              className="text-royal-purple font-semibold"
              whileHover={{ scale: 1.05, textShadow: "0 0 20px rgba(139, 92, 246, 0.5)" }}
            >
              800+ daily messages
            </motion.span>{" "}
            across{" "}
            <motion.span 
              className="text-electric-blue font-semibold"
              whileHover={{ scale: 1.05, textShadow: "0 0 20px rgba(59, 130, 246, 0.5)" }}
            >
              15+ platforms
            </motion.span>
            .
          </p>
          
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
            className="inline-block"
          >
            <span className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-emerald-success to-green-growth bg-clip-text text-transparent">
              Save 25+ hours weekly.
            </span>
          </motion.div>
        </motion.div>

        {/* ROI Positioning Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mb-12"
        >
          <PremiumCard variant="premium" className="inline-block px-8 py-6 max-w-md">
            <div className="text-center space-y-2">
              <p className="text-white/60 text-lg font-light">
                Replace your $100K+ executive assistant with
              </p>
              <div className="flex items-baseline justify-center space-x-1">
                <DollarSign className="w-8 h-8 text-emerald-success" />
                <span className="text-4xl md:text-5xl font-bold text-white">49</span>
                <span className="text-xl text-white/60">/month</span>
              </div>
              <p className="text-amber-urgency text-sm font-medium">
                ROI: 20,000%+ annually
              </p>
            </div>
          </PremiumCard>
        </motion.div>

        {/* Executive CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
        >
          <ExecutiveButton
            onClick={handleWaitlistClick}
            variant="primary"
            size="xl"
            className="group relative overflow-hidden"
            icon={<ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />}
            iconPosition="right"
          >
            <span className="relative z-10">Join Executive Early Access</span>
          </ExecutiveButton>
          
          <ExecutiveButton
            onClick={handleDemoClick}
            variant="outline"
            size="xl"
            className="group"
            icon={<Play className="w-5 h-5 transition-transform group-hover:scale-110" />}
            iconPosition="left"
          >
            <span className="relative z-10">Watch 2-Minute Demo</span>
          </ExecutiveButton>
        </motion.div>

        {/* Social Proof & Real-time Metrics */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="space-y-6"
        >
          {/* Executive Counter */}
          <div className="text-white/80 text-center">
            <p className="text-lg mb-4 font-medium">
              Join <AnimatedCounter 
                value={execCount} 
                className="text-royal-purple font-bold mx-1" 
              />+ Fortune 500 executives in early access
            </p>
            
            {/* Real-time Activity Indicators */}
            <div className="flex flex-wrap justify-center items-center gap-6 text-sm">
              <motion.div 
                className="flex items-center space-x-2"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <div className="w-2 h-2 bg-emerald-success rounded-full animate-pulse" />
                <span className="flex items-center">
                  <AnimatedCounter value={todaySignups} className="font-semibold mr-1" />
                  executives joined today
                </span>
              </motion.div>
              
              <span className="text-white/40">•</span>
              
              <motion.div 
                className="flex items-center space-x-2"
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Clock className="w-3 h-3 text-amber-urgency" />
                <span>Limited spots remaining</span>
              </motion.div>
              
              <span className="text-white/40">•</span>
              
              <div className="flex items-center space-x-2">
                <Users className="w-3 h-3 text-electric-blue" />
                <span>Average savings: 28 hrs/week</span>
              </div>
            </div>
          </div>

          {/* Executive Testimonial Preview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="max-w-2xl mx-auto"
          >
            <PremiumCard variant="elevated" className="text-left">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-royal-purple to-electric-blue rounded-full flex items-center justify-center text-white font-bold">
                  SC
                </div>
                <div className="flex-1">
                  <blockquote className="text-white/90 italic mb-2">
                    "Napoleon AI gave me back 4 hours daily. I now focus on strategy instead of message management."
                  </blockquote>
                  <div className="text-white/70 text-sm">
                    <span className="font-semibold">Sarah Chen</span> • CEO, Fortune 500 Technology Company
                  </div>
                  <div className="text-emerald-success text-xs mt-1">
                    ✓ Saved 28 hours weekly • 40% faster decision making
                  </div>
                </div>
              </div>
            </PremiumCard>
          </motion.div>

          {/* Urgency Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0.7, 1] }}
            transition={{ delay: 1.2, duration: 2, repeat: Infinity, repeatType: "reverse" }}
            className="text-center"
          >
            <div className="inline-flex items-center px-4 py-2 bg-amber-urgency/10 border border-amber-urgency/20 rounded-full">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="w-2 h-2 bg-amber-urgency rounded-full mr-2"
              />
              <span className="text-amber-urgency text-sm font-medium">
                Early access pricing ends in 7 days
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Background Enhancement Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Executive Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(139, 92, 246, 0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(139, 92, 246, 0.5) 1px, transparent 1px)
            `,
            backgroundSize: '100px 100px'
          }}
        />

        {/* Floating Executive Particles */}
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-royal-purple/30 rounded-full"
            style={{
              left: `${10 + i * 8}%`,
              top: `${20 + (i % 3) * 30}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut"
            }}
          />
        ))}

        {/* Executive Spotlight Effect */}
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] rounded-full"
          style={{
            background: `radial-gradient(circle, rgba(139, 92, 246, 0.03) 0%, rgba(59, 130, 246, 0.02) 50%, transparent 70%)`
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.5, 0.8, 0.5]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
    </motion.section>
  )
}