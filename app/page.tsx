import { Metadata } from 'next'
import HomePageClient from '@/components/pages/home-page-client'

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
  return <HomePageClient />
}
