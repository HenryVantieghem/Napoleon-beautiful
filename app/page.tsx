import { Metadata } from 'next'
import Header from '@/components/layout/header'
import V0HeroContent from '@/components/sections/v0-hero-content'
import V0PulsingCircle from '@/components/ui/v0-pulsing-circle'
import V0ShaderBackground from '@/components/ui/v0-shader-background'
import { ErrorBoundary } from '@/components/ui/error-boundary'

export const metadata: Metadata = {
  title: "Napoleon AI - Executive Communication Intelligence | Fortune 500 AI Platform",
  description: "Join 847+ Fortune 500 executives who've reclaimed 25+ hours weekly. AI-powered message prioritization, strategic response intelligence, and executive workflow optimization.",
  openGraph: {
    title: "Napoleon AI - Executive Communication Intelligence", 
    description: "Transform your executive communication workflow. Join Fortune 500 leaders saving 25+ hours weekly.",
    images: ['/og-images/executive-hero.jpg'],
  },
}

export default function HomePage() {
  return (
    <ErrorBoundary>
      <V0ShaderBackground>
        <Header />
        <V0HeroContent />
        <V0PulsingCircle />
      </V0ShaderBackground>
    </ErrorBoundary>
  )
}
