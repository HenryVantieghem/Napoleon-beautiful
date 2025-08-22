"use client"

import React from 'react'
import { ExecutiveButton } from '@/components/ui/executive-button'
import { AnimatedCounter } from '@/components/ui/animated-counter'
import { ArrowRight, Play, Zap, Users, Clock, DollarSign } from 'lucide-react'

export default function SimplifiedHero() {
  return (
    <main className="relative min-h-screen flex items-center px-8">
      {/* Background gradient orbs for depth */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          
          {/* Left Column - Hero Text */}
          <div className="space-y-6 lg:space-y-8 text-center lg:text-left">
            {/* Executive Badge */}
            <div className="inline-block px-3 py-2 lg:px-4 lg:py-2 bg-green-500/20 rounded-full border border-green-500/30">
              <div className="flex items-center text-green-400 text-xs sm:text-sm">
                <Zap className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 flex-shrink-0" />
                <span className="truncate">⚡ <AnimatedCounter value={847} /> Fortune 500 Executives Already Saving 25+ Hours Weekly</span>
              </div>
            </div>
            
            {/* Main Headline - Mobile Optimized */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight tracking-tight">
              <span className="text-white">
                End Message<br />
                Whack-a-Mole<br />
                Forever<br />
              </span>
              <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-normal text-gray-300">
                Communication<br />
                Intelligence
              </span>
            </h1>
            
            {/* Value Proposition */}
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 max-w-lg leading-relaxed mx-auto lg:mx-0">
              AI that thinks like your perfect executive assistant
            </p>
            
            {/* Action Buttons - Mobile Responsive */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start w-full">
              <ExecutiveButton
                variant="primary"
                size="xl"
                className="group bg-white text-black hover:bg-gray-100 w-full sm:w-auto"
              >
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </ExecutiveButton>
              
              <ExecutiveButton
                variant="outline"
                size="xl"
                className="group border border-white/30 text-white hover:bg-white/10 w-full sm:w-auto"
              >
                <Play className="w-4 h-4 sm:w-5 sm:h-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
                <span>Pricing</span>
              </ExecutiveButton>
            </div>
          </div>
          
          {/* Right Column - Executive Dashboard Preview */}
          <div className="relative order-first lg:order-last">
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-4 sm:p-6 lg:p-8 border border-gray-700">
              {/* Dashboard Header */}
              <div className="text-center mb-6 lg:mb-8">
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-2">
                  Your Executive Intelligence Dashboard
                </h3>
                <p className="text-gray-400 text-sm lg:text-base">
                  Real Fortune 500 CEO workflow transformation
                </p>
              </div>
              
              {/* Key Metrics Grid - Mobile Responsive */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:gap-6 mb-6 lg:mb-8">
                <div className="text-center">
                  <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-green-400">
                    <AnimatedCounter value={847} />+
                  </div>
                  <div className="text-gray-400 text-xs sm:text-sm">Fortune 500 Executives</div>
                </div>
                <div className="text-center">
                  <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-blue-400">
                    <AnimatedCounter value={28} />h
                  </div>
                  <div className="text-gray-400 text-xs sm:text-sm">Saved Weekly</div>
                </div>
                <div className="text-center">
                  <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-purple-400">
                    <AnimatedCounter value={95} />%
                  </div>
                  <div className="text-gray-400 text-xs sm:text-sm">Noise Reduction</div>
                </div>
                <div className="text-center">
                  <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-yellow-400">
                    $<AnimatedCounter value={2} />M
                  </div>
                  <div className="text-gray-400 text-xs sm:text-sm">Annual ROI</div>
                </div>
              </div>
              
              {/* Message Preview - Mobile Responsive */}
              <div className="bg-black/30 rounded-xl p-3 sm:p-4 lg:p-6 space-y-3 lg:space-y-4">
                <div className="flex items-center justify-between">
                  <div className="text-white font-medium text-sm lg:text-base">Critical Messages Today</div>
                  <div className="text-green-400 text-xs lg:text-sm font-medium">3 of 247 require attention</div>
                </div>
                
                <div className="space-y-2 lg:space-y-3">
                  {[
                    { priority: "🔴", subject: "Board meeting materials ready", from: "Executive Assistant" },
                    { priority: "🟡", subject: "Q4 strategy review scheduled", from: "Chief Strategy Officer" },
                    { priority: "🔴", subject: "Acquisition opportunity", from: "Investment Team" }
                  ].map((msg, idx) => (
                    <div key={idx} className="flex items-center space-x-2 lg:space-x-3 p-2 lg:p-3 bg-white/5 rounded-lg">
                      <span className="text-sm lg:text-lg flex-shrink-0">{msg.priority}</span>
                      <div className="flex-1 min-w-0">
                        <div className="text-white text-xs sm:text-sm font-medium truncate">{msg.subject}</div>
                        <div className="text-gray-400 text-xs truncate">{msg.from}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Glow effect */}
            <div className="absolute -top-px left-1/2 transform -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent opacity-60" />
          </div>
        </div>
        
        {/* Social Proof Stats - Mobile Responsive */}
        <div className="mt-8 lg:mt-16 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 sm:gap-8 text-gray-400 text-xs sm:text-sm">
          <div className="flex items-center space-x-2">
            <Users className="w-3 h-3 sm:w-4 sm:h-4 text-green-400 flex-shrink-0" />
            <span><AnimatedCounter value={12} /> execs joined today</span>
          </div>
          <span className="hidden sm:block">•</span>
          <div className="flex items-center space-x-2">
            <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400 flex-shrink-0" />
            <span>Average 28 hours saved weekly</span>
          </div>
          <span className="hidden sm:block">•</span>
          <div className="flex items-center space-x-2">
            <DollarSign className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 flex-shrink-0" />
            <span>$2.3M average annual savings</span>
          </div>
        </div>
      </div>
    </main>
  )
}