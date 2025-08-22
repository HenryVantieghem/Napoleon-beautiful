"use client"

import React from "react"
import { motion } from "framer-motion"
import { PremiumCard } from "@/components/ui/premium-card"
import { cn } from "@/lib/utils"
import { Zap, Brain, Shield, Clock, TrendingUp, Users } from "lucide-react"

interface FeaturesSectionProps {
  className?: string
}

export default function FeaturesSection({ className = "" }: FeaturesSectionProps) {
  const executiveFeatures = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: "AI Message Intelligence",
      description: "Advanced AI analyzes and prioritizes your 500+ daily messages, surfacing only what requires executive attention.",
      metrics: "95% noise reduction"
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Executive Time Recovery",
      description: "Automated workflow optimization reclaims 25+ hours weekly for strategic focus and decision making.",
      metrics: "28h saved weekly"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Enterprise Security",
      description: "SOC2 Type II compliant with end-to-end encryption designed for Fortune 500 data protection standards.",
      metrics: "Enterprise grade"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Strategic Analytics",
      description: "Executive dashboard with communication patterns, response times, and strategic decision support metrics.",
      metrics: "Real-time insights"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Instant Response Intelligence",
      description: "AI-powered response suggestions calibrated for C-suite communication style and strategic context.",
      metrics: "15x faster responses"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Executive Team Integration",
      description: "Seamless integration with your executive assistant and leadership team for coordinated communication.",
      metrics: "Team optimization"
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
            <span className="text-gradient-executive">Executive Features</span>
            <br />
            Built for Fortune 500
          </h2>
          
          <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            Premium AI capabilities designed specifically for C-suite executives and senior leadership teams.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {executiveFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <PremiumCard variant="default" className="h-full hover:shadow-premium group">
                <div className="p-8 space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-royal-purple/20 to-electric-blue/20 rounded-xl flex items-center justify-center text-royal-purple group-hover:text-electric-blue transition-colors duration-300">
                      {feature.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white group-hover:text-royal-purple transition-colors duration-300">
                        {feature.title}
                      </h3>
                      <div className="text-emerald-success text-sm font-medium">
                        {feature.metrics}
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-white/80 leading-relaxed group-hover:text-white/90 transition-colors duration-300">
                    {feature.description}
                  </p>
                </div>
              </PremiumCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}