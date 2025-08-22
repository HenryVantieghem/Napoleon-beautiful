'use client'

import { lazy, Suspense } from 'react'
import SimplePulsingCircle from './simple-pulsing-circle'

// Lazy load heavy components for performance optimization
export const LazyShaderBackground = lazy(() => 
  import('./shader-background')
)

export const LazyCredibilitySection = lazy(() => 
  import('../sections/credibility-section')
)

export const LazyAnalyticsManager = lazy(() => 
  import('@/lib/analytics').then(module => ({ 
    default: () => {
      // Initialize analytics manager
      module.getAnalyticsManager()
      return null
    }
  }))
)

// Loading components for each lazy section
export function ShaderBackgroundFallback() {
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-executive-dark via-charcoal-depth to-navy-trust opacity-90" />
  )
}

export function SectionLoadingFallback({ height = "400px" }: { height?: string }) {
  return (
    <div className="w-full flex items-center justify-center" style={{ height }}>
      <div className="flex flex-col items-center space-y-4">
        <SimplePulsingCircle className="w-8 h-8" />
        <p className="text-white/60 text-sm">Loading executive content...</p>
      </div>
    </div>
  )
}

// Wrapper components with optimized suspense boundaries
export function LazyShaderBackgroundWithFallback() {
  return (
    <Suspense fallback={<ShaderBackgroundFallback />}>
      <LazyShaderBackground>
        <></>
      </LazyShaderBackground>
    </Suspense>
  )
}

export function LazyCredibilitySectionWithFallback() {
  return (
    <Suspense fallback={<SectionLoadingFallback height="600px" />}>
      <LazyCredibilitySection />
    </Suspense>
  )
}

export function LazyAnalyticsWithFallback() {
  return (
    <Suspense fallback={null}>
      <LazyAnalyticsManager />
    </Suspense>
  )
}