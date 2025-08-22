'use client'

import dynamic from 'next/dynamic'
import { PerformanceMonitor } from '@/components/ui/performance-monitor'
import HeroSectionOptimized from '@/components/sections/hero-section-optimized'
import { LazyAnalyticsWithFallback, LazyShaderBackgroundWithFallback } from '@/components/ui/lazy-components'

// Lazy load heavy components for optimal performance - Client Components only
const CredibilitySection = dynamic(
  () => import('@/components/sections/credibility-section'),
  {
    loading: () => (
      <div className="py-24 flex items-center justify-center">
        <div className="text-white/60">Loading credibility metrics...</div>
      </div>
    ),
    ssr: false // Now allowed in Client Component
  }
)

// Features section - loaded after critical content
const FeaturesSection = dynamic(
  () => import('@/components/sections/features-section').catch(() => ({
    default: () => <div className="py-24"><div className="text-center text-white/60">Features section loading...</div></div>
  })),
  {
    loading: () => (
      <div className="py-24 flex items-center justify-center">
        <div className="text-white/60">Loading features...</div>
      </div>
    ),
    ssr: false
  }
)

// Pricing section - lowest priority load
const PricingSection = dynamic(
  () => import('@/components/sections/pricing-section').catch(() => ({
    default: () => <div className="py-24"><div className="text-center text-white/60">Pricing section loading...</div></div>
  })),
  {
    loading: () => (
      <div className="py-24 flex items-center justify-center">
        <div className="text-white/60">Loading pricing...</div>
      </div>
    ),
    ssr: false
  }
)

// Executive waitlist form - critical for conversion but can be client-side
const WaitlistSection = dynamic(
  () => import('@/components/sections/waitlist-section').catch(() => ({
    default: () => <div className="py-24"><div className="text-center text-white/60">Waitlist form loading...</div></div>
  })),
  {
    loading: () => (
      <div className="py-24 flex items-center justify-center">
        <div className="text-white/60">Loading executive signup...</div>
      </div>
    ),
    ssr: false // Changed to client-side for better performance
  }
)

export default function HomePageClient() {
  return (
    <>
      {/* Performance monitoring for executive-grade analytics */}
      <PerformanceMonitor />
      
      {/* Analytics initialization */}
      <LazyAnalyticsWithFallback />
      
      {/* Main page structure optimized for <2.5s loading */}
      <div className="relative min-h-screen bg-executive-dark">
        
        {/* Background effects - lazy loaded for performance */}
        <LazyShaderBackgroundWithFallback />
        
        {/* Critical above-the-fold content - immediate load */}
        <HeroSectionOptimized />
        
        {/* Below-the-fold sections - progressive loading */}
        <CredibilitySection />
        
        <FeaturesSection />
        
        <WaitlistSection />
        
        <PricingSection />
        
      </div>
    </>
  )
}