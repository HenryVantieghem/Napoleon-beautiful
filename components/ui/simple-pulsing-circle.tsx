"use client"

import React from "react"

interface SimplePulsingCircleProps {
  className?: string
  size?: string
}

export default function SimplePulsingCircle({ 
  className = "w-16 h-16",
  size = "w-16 h-16"
}: SimplePulsingCircleProps) {
  return (
    <div className={`relative ${className}`}>
      {/* Main circle */}
      <div className={`${size} bg-gradient-to-br from-royal-purple to-electric-blue rounded-full animate-pulse opacity-80`} />
      
      {/* Pulsing rings */}
      <div className={`absolute inset-0 ${size} border-2 border-royal-purple rounded-full animate-ping opacity-40`} />
      <div 
        className={`absolute inset-0 ${size} border-2 border-electric-blue rounded-full animate-ping opacity-30`}
        style={{ animationDelay: '0.5s' }}
      />
      
      {/* Center dot */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-4 h-4 bg-white rounded-full opacity-90" />
      </div>
    </div>
  )
}