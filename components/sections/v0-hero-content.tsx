"use client"

import { AnimatedCounter } from "@/components/ui/animated-counter"

export default function V0HeroContent() {
  return (
    <main className="absolute bottom-8 left-8 z-20 max-w-lg">
      <div className="text-left">
        {/* Executive Badge with V0 Glass Effect */}
        <div
          className="inline-flex items-center px-3 py-1 rounded-full bg-white/5 backdrop-blur-sm mb-4 relative"
          style={{
            filter: "url(#glass-effect)",
          }}
        >
          <div className="absolute top-0 left-1 right-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full" />
          <span className="text-white/90 text-xs font-light relative z-10">
            ⚡ <AnimatedCounter value={847} /> Fortune 500 Executives Already Saving 25+ Hours Weekly
          </span>
        </div>

        {/* Main Heading - V0 Style Typography */}
        <h1 className="text-5xl md:text-6xl md:leading-16 tracking-tight font-light text-white mb-4">
          <span className="font-medium italic">End Message</span>
          <br />
          <span className="font-light tracking-tight text-white">Whack-a-Mole</span>
          <br />
          <span className="font-light tracking-tight text-white">Forever</span>
        </h1>

        {/* Subtitle */}
        <h2 className="text-3xl md:text-4xl font-light text-white/80 leading-tight mb-4">
          Communication
          <br />
          Intelligence
        </h2>

        {/* Description - V0 Style */}
        <p className="text-xs font-light text-white/70 mb-4 leading-relaxed max-w-md">
          AI that thinks like your perfect executive assistant. Create stunning workflow 
          experiences with advanced AI technology that transforms how Fortune 500 leaders 
          manage their critical communications.
        </p>

        {/* Buttons - V0 Style */}
        <div className="flex items-center gap-4 flex-wrap">
          <button className="px-8 py-3 rounded-full bg-transparent border border-white/30 text-white font-normal text-xs transition-all duration-200 hover:bg-white/10 hover:border-white/50 cursor-pointer">
            Pricing
          </button>
          <button className="px-8 py-3 rounded-full bg-white text-black font-normal text-xs transition-all duration-200 hover:bg-white/90 cursor-pointer">
            Get Started
          </button>
        </div>
      </div>
    </main>
  )
}