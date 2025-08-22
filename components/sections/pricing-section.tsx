"use client"

import React from "react"
import { motion } from "framer-motion"
import { PremiumCard } from "@/components/ui/premium-card"
import { ExecutiveButton } from "@/components/ui/executive-button"
import { cn } from "@/lib/utils"
import { Check, Crown, Zap, Shield } from "lucide-react"

interface PricingSectionProps {
  className?: string
}

export default function PricingSection({ className = "" }: PricingSectionProps) {
  const pricingTiers = [
    {
      name: "Executive Access",
      price: "Free",
      description: "Limited early access for select Fortune 500 executives",
      features: [
        "AI Message Prioritization",
        "Basic Analytics Dashboard", 
        "5 Strategic Responses Daily",
        "Email Support",
        "30-Day Trial"
      ],
      cta: "Join Waitlist",
      popular: false,
      icon: <Zap className="w-6 h-6" />
    },
    {
      name: "Executive Pro",
      price: "$49",
      period: "/month",
      description: "Complete executive communication intelligence platform",
      features: [
        "Unlimited AI Processing",
        "Advanced Strategic Analytics",
        "Custom Response Templates",
        "Team Integration",
        "Priority Support",
        "Executive Dashboard",
        "Security Compliance"
      ],
      cta: "Get Executive Access",
      popular: true,
      icon: <Crown className="w-6 h-6" />
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "White-glove solution for Fortune 500 leadership teams",
      features: [
        "Everything in Pro",
        "Dedicated Success Manager",
        "Custom AI Training",
        "Advanced Security",
        "SLA Guarantees",
        "Executive Onboarding",
        "24/7 Support"
      ],
      cta: "Contact Sales",
      popular: false,
      icon: <Shield className="w-6 h-6" />
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
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            <span className="text-gradient-executive">Executive Pricing</span>
            <br />
            For Fortune 500 Leaders
          </h2>
          
          <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            Investment in executive productivity that pays for itself in the first week.
          </p>
        </motion.div>

        {/* Pricing Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingTiers.map((tier, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative"
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <div className="bg-gradient-to-r from-royal-purple to-electric-blue text-white text-sm font-medium px-4 py-2 rounded-full">
                    Most Popular
                  </div>
                </div>
              )}
              
              <PremiumCard 
                variant={tier.popular ? "glow" : "default"} 
                className="h-full p-8 relative overflow-hidden group"
              >
                <div className="space-y-6">
                  
                  {/* Tier Header */}
                  <div className="text-center space-y-2">
                    <div className="flex items-center justify-center space-x-2 text-royal-purple">
                      {tier.icon}
                      <h3 className="text-2xl font-bold text-white">
                        {tier.name}
                      </h3>
                    </div>
                    
                    <div className="space-y-1">
                      <div className="flex items-baseline justify-center space-x-1">
                        <span className="text-4xl font-bold text-white">
                          {tier.price}
                        </span>
                        {tier.period && (
                          <span className="text-white/60 text-lg">
                            {tier.period}
                          </span>
                        )}
                      </div>
                      <p className="text-white/70 text-sm">
                        {tier.description}
                      </p>
                    </div>
                  </div>

                  {/* Features List */}
                  <div className="space-y-3">
                    {tier.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-3">
                        <Check className="w-5 h-5 text-emerald-success flex-shrink-0" />
                        <span className="text-white/80 text-sm">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <div className="pt-4">
                    <ExecutiveButton
                      variant={tier.popular ? "primary" : "secondary"}
                      size="large"
                      className="w-full"
                    >
                      {tier.cta}
                    </ExecutiveButton>
                  </div>
                </div>
                
                {/* Premium accent for popular tier */}
                {tier.popular && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full h-1 bg-gradient-to-r from-royal-purple to-electric-blue" />
                )}
              </PremiumCard>
            </motion.div>
          ))}
        </div>

        {/* Enterprise ROI Message */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-white/60 text-lg">
            Average Fortune 500 ROI: <span className="text-emerald-success font-semibold">25,400%</span> in first year
          </p>
          <p className="text-white/50 text-sm mt-2">
            Based on 28 hours saved weekly at $500/hour executive value
          </p>
        </motion.div>
      </div>
    </section>
  )
}