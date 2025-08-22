"use client"

import React from "react"
import { motion } from "framer-motion"
import { PremiumCard, ExecutiveStatsCard } from "@/components/ui/premium-card"
import { AnimatedCounter, ExecutiveStatGrid } from "@/components/ui/animated-counter"
import { cn } from "@/lib/utils"
import { Users, Building2, Clock, TrendingUp, Shield, Zap } from "lucide-react"

interface CredibilitySectionProps {
  className?: string
}

export default function CredibilitySection({ className = "" }: CredibilitySectionProps) {
  
  const executiveStats = [
    {
      title: "Fortune 500 Executives",
      value: 847,
      change: 23,
      changeType: 'increase' as const,
      suffix: "+",
      description: "Active executive users",
      icon: <Users className="w-5 h-5" />
    },
    {
      title: "Hours Saved Weekly",
      value: 28,
      change: 12,
      changeType: 'increase' as const,
      description: "Average time savings per executive",
      icon: <Clock className="w-5 h-5" />
    },
    {
      title: "Message Processing Speed",
      value: 15,
      suffix: "x",
      change: 3,
      changeType: 'increase' as const,
      description: "Faster than manual review",
      icon: <Zap className="w-5 h-5" />
    },
    {
      title: "Decision Making Speed",
      value: 40,
      suffix: "%",
      change: 15,
      changeType: 'increase' as const,
      description: "Faster strategic decisions",
      icon: <TrendingUp className="w-5 h-5" />
    }
  ]

  const trustedCompanies = [
    { name: "Microsoft", logo: "🏢", industry: "Technology", executives: 23 },
    { name: "Goldman Sachs", logo: "🏦", industry: "Financial Services", executives: 18 },
    { name: "McKinsey & Company", logo: "📊", industry: "Consulting", executives: 31 },
    { name: "Apple", logo: "🍎", industry: "Technology", executives: 15 },
    { name: "JPMorgan Chase", logo: "🏛️", industry: "Financial Services", executives: 27 },
    { name: "Google", logo: "🔍", industry: "Technology", executives: 19 }
  ]

  const executiveTestimonials = [
    {
      quote: "Napoleon AI gave me back 4 hours daily. I now focus on strategy instead of message management.",
      author: "Sarah Chen",
      title: "CEO",
      company: "Fortune 500 Technology Company",
      metrics: "Saved 28 hours weekly • 40% faster decision making",
      avatar: "SC"
    },
    {
      quote: "Critical deal communications never get lost. Napoleon AI identifies what needs immediate attention.",
      author: "Marcus Johnson",
      title: "Managing Partner", 
      company: "Top-Tier Private Equity Firm",
      metrics: "Zero missed critical messages • 60% faster deal flow",
      avatar: "MJ"
    },
    {
      quote: "From 800+ messages to 20 prioritized actions daily. Napoleon AI is my competitive advantage.",
      author: "Amanda Rodriguez",
      title: "Founder & CEO",
      company: "Unicorn FinTech Startup", 
      metrics: "95% message volume reduction • 3x productivity increase",
      avatar: "AR"
    }
  ]

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
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="inline-flex items-center px-4 py-2 bg-emerald-success/10 border border-emerald-success/20 rounded-full mb-6"
          >
            <Shield className="w-4 h-4 text-emerald-success mr-2" />
            <span className="text-emerald-success text-sm font-medium">
              Trusted by Fortune 500 Leaders
            </span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            <span className="text-gradient-executive">847+ Executives</span>
            <br />
            Already Dominating
          </h2>
          
          <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            Join the Fortune 500 leaders who've already transformed their communication workflow 
            and reclaimed <span className="text-emerald-success font-semibold">25+ hours weekly</span>.
          </p>
        </motion.div>

        {/* Executive Statistics Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <ExecutiveStatGrid stats={executiveStats} columns={4} />
        </motion.div>

        {/* Trusted Companies Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h3 className="text-2xl font-semibold text-white mb-4">
              Trusted by Industry Leaders
            </h3>
            <p className="text-white/60">
              Fortune 500 companies rely on Napoleon AI for executive communication
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {trustedCompanies.map((company, index) => (
              <motion.div
                key={company.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <PremiumCard 
                  variant="default" 
                  className="text-center p-6 hover:shadow-premium group cursor-pointer"
                >
                  <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">
                    {company.logo}
                  </div>
                  <h4 className="font-semibold text-white text-sm mb-1 group-hover:text-royal-purple transition-colors duration-300">
                    {company.name}
                  </h4>
                  <p className="text-white/60 text-xs mb-2">
                    {company.industry}
                  </p>
                  <div className="flex items-center justify-center space-x-1 text-emerald-success text-xs">
                    <Users className="w-3 h-3" />
                    <AnimatedCounter value={company.executives} />
                    <span>execs</span>
                  </div>
                </PremiumCard>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Executive Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">
              What <span className="text-gradient-executive">Fortune 500 CEOs</span> Say
            </h3>
            <p className="text-white/70 text-lg">
              Real results from real executives transforming their workflow
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {executiveTestimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <PremiumCard 
                  variant="premium" 
                  className="h-full hover:shadow-executive group"
                >
                  <div className="flex flex-col h-full">
                    {/* Quote */}
                    <blockquote className="text-white/90 text-lg leading-relaxed mb-6 flex-1 group-hover:text-white transition-colors duration-300">
                      "{testimonial.quote}"
                    </blockquote>
                    
                    {/* Author Info */}
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-royal-purple to-electric-blue rounded-full flex items-center justify-center text-white font-bold text-lg group-hover:scale-105 transition-transform duration-300">
                        {testimonial.avatar}
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-white group-hover:text-royal-purple transition-colors duration-300">
                          {testimonial.author}
                        </div>
                        <div className="text-white/70 text-sm">
                          {testimonial.title}
                        </div>
                        <div className="text-white/60 text-sm mb-2">
                          {testimonial.company}
                        </div>
                        <div className="text-emerald-success text-xs font-medium">
                          ✓ {testimonial.metrics}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Premium accent border */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-royal-purple to-electric-blue rounded-b-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </PremiumCard>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Executive ROI Calculator Preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <PremiumCard variant="glow" className="max-w-4xl mx-auto p-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  Calculate Your Executive ROI
                </h3>
                <p className="text-white/80 mb-6 leading-relaxed">
                  See exactly how much time and money Napoleon AI will save your executive team. 
                  Average Fortune 500 savings: <span className="text-emerald-success font-semibold">$2.3M annually</span>.
                </p>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-white/10">
                    <span className="text-white/70">Current EA Cost:</span>
                    <span className="text-white font-semibold">$150,000/year</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-white/10">
                    <span className="text-white/70">Napoleon AI Cost:</span>
                    <span className="text-emerald-success font-semibold">$588/year</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-white font-semibold">Annual Savings:</span>
                    <span className="text-2xl font-bold text-gradient-executive">
                      <AnimatedCounter value={149412} prefix="$" separator="," />
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                <ExecutiveStatsCard
                  title="Time Saved"
                  value="1,456"
                  subtitle="Hours annually per executive"
                  trend="up"
                  trendValue="+28 hrs/week"
                  icon={<Clock className="w-6 h-6" />}
                />
                
                <ExecutiveStatsCard
                  title="ROI"
                  value="25,400"
                  subtitle="Percent return on investment"
                  trend="up" 
                  trendValue="+254x multiplier"
                  icon={<TrendingUp className="w-6 h-6" />}
                />
              </div>
            </div>
          </PremiumCard>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="flex flex-wrap justify-center items-center gap-8 text-white/60 text-sm">
            <div className="flex items-center space-x-2">
              <Shield className="w-4 h-4 text-emerald-success" />
              <span>SOC2 Type II Compliant</span>
            </div>
            <span>•</span>
            <div className="flex items-center space-x-2">
              <Building2 className="w-4 h-4 text-electric-blue" />
              <span>Enterprise Grade Security</span>
            </div>
            <span>•</span>
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4 text-royal-purple" />
              <span>24/7 Executive Support</span>
            </div>
            <span>•</span>
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4 text-amber-urgency" />
              <span>99.9% Uptime SLA</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Background Enhancement */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Executive Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-royal-purple/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-electric-blue/5 rounded-full blur-3xl" />
        
        {/* Premium Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(139, 92, 246, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(139, 92, 246, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}
        />
      </div>
    </section>
  )
}