"use client"

import React, { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

interface ShaderBackgroundProps {
  children: React.ReactNode
  className?: string
  variant?: 'default' | 'premium' | 'executive' | 'animated'
  intensity?: 'low' | 'medium' | 'high'
  interactive?: boolean
  colors?: string[]
  speed?: number
}

export default function ShaderBackground({ 
  children, 
  className = "",
  variant = 'executive',
  intensity = 'high',
  interactive = true,
  colors,
  speed = 0.3
}: ShaderBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isActive, setIsActive] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  // Executive color schemes
  const colorSchemes = {
    default: ["#000000", "#8b5cf6", "#ffffff", "#1e1b4b", "#4c1d95"],
    premium: ["#000000", "#8b5cf6", "#3b82f6", "#10b981", "#f59e0b"],
    executive: ["#000000", "#4c1d95", "#8b5cf6", "#1e1b4b", "#000000"],
    animated: ["#8b5cf6", "#3b82f6", "#10b981", "#f59e0b", "#8b5cf6"]
  }

  const selectedColors = colors || colorSchemes[variant]
  const intensitySettings = {
    low: { opacity: 0.3, blur: 10 },
    medium: { opacity: 0.6, blur: 15 },
    high: { opacity: 0.8, blur: 20 }
  }

  useEffect(() => {
    const handleMouseEnter = () => setIsActive(true)
    const handleMouseLeave = () => setIsActive(false)
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        setMousePosition({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height
        })
      }
    }

    const container = containerRef.current
    if (container && interactive) {
      container.addEventListener("mouseenter", handleMouseEnter)
      container.addEventListener("mouseleave", handleMouseLeave)
      container.addEventListener("mousemove", handleMouseMove)
    }

    return () => {
      if (container && interactive) {
        container.removeEventListener("mouseenter", handleMouseEnter)
        container.removeEventListener("mouseleave", handleMouseLeave)
        container.removeEventListener("mousemove", handleMouseMove)
      }
    }
  }, [interactive])

  return (
    <div 
      ref={containerRef} 
      className={`min-h-screen bg-executive-black relative overflow-hidden ${className}`}
    >
      {/* Advanced SVG Filters for Executive Premium Effect */}
      <svg className="absolute inset-0 w-0 h-0 pointer-events-none">
        <defs>
          <filter id="glass-effect" x="-50%" y="-50%" width="200%" height="200%">
            <feTurbulence baseFrequency="0.005" numOctaves="1" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="0.3" />
            <feColorMatrix
              type="matrix"
              values="1 0 0 0 0.02
                      0 1 0 0 0.02
                      0 0 1 0 0.05
                      0 0 0 0.9 0"
              result="tint"
            />
          </filter>
          
          <filter id="gooey-filter" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
              result="gooey"
            />
            <feComposite in="SourceGraphic" in2="gooey" operator="atop" />
          </filter>
          
          <filter id="executive-premium" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur" />
            <feColorMatrix
              in="blur"
              type="matrix"
              values="1 0 0 0 0.1
                      0 1 0 0 0.05
                      0 0 1 0 0.2
                      0 0 0 1 0"
              result="premium"
            />
          </filter>

          <filter id="executive-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>

          {/* Executive Gradient Definitions */}
          <radialGradient id="executive-radial" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.1" />
          </radialGradient>

          <linearGradient id="executive-linear" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.2" />
            <stop offset="25%" stopColor="#4c1d95" stopOpacity="0.15" />
            <stop offset="50%" stopColor="#1e1b4b" stopOpacity="0.1" />
            <stop offset="75%" stopColor="#3b82f6" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.2" />
          </linearGradient>
        </defs>
      </svg>

      {/* Primary Executive Gradient Layer */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        style={{ 
          background: `radial-gradient(circle at 30% 40%, ${selectedColors[1]}20, transparent 50%), 
                       radial-gradient(circle at 70% 60%, ${selectedColors[2]}15, transparent 50%),
                       radial-gradient(circle at 50% 50%, ${selectedColors[3]}10, transparent 70%)`,
          opacity: intensitySettings[intensity].opacity,
          filter: `blur(${intensitySettings[intensity].blur}px)`
        }}
        animate={{
          opacity: [intensitySettings[intensity].opacity * 0.8, intensitySettings[intensity].opacity, intensitySettings[intensity].opacity * 0.8]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Secondary Animated Layer for Sophistication */}
      <motion.div
        className="absolute inset-0 w-full h-full opacity-30"
        style={{ 
          background: `linear-gradient(45deg, ${selectedColors[0]}05, transparent 30%, ${selectedColors[1]}08, transparent 70%, ${selectedColors[2]}05)`,
          filter: `blur(${intensitySettings[intensity].blur / 2}px)` 
        }}
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%', '0% 0%']
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      
      {/* Interactive Layer - responds to mouse movement */}
      {interactive && isActive && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(600px circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, rgba(139, 92, 246, 0.15), transparent 40%)`,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        />
      )}
      
      {/* Premium Overlay Gradients for Executive Sophistication */}
      <div className="absolute inset-0 bg-gradient-to-br from-royal-purple/10 via-transparent to-electric-blue/10" />
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-navy-trust/5 to-deep-purple/10" />
      
      {/* Animated Executive Pattern Overlay */}
      {variant === 'animated' && (
        <motion.div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              radial-gradient(circle at 25% 25%, #8b5cf6 2px, transparent 2px),
              radial-gradient(circle at 75% 75%, #3b82f6 2px, transparent 2px)
            `,
            backgroundSize: '50px 50px',
            backgroundPosition: '0 0, 25px 25px'
          }}
          animate={{
            backgroundPosition: ['0 0, 25px 25px', '50px 50px, 75px 75px', '0 0, 25px 25px']
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      )}
      
      {/* Executive Grid Pattern for Premium Feel */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      />

      {/* Floating Executive Particles */}
      {intensity === 'high' && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-royal-purple rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -100, 0],
                opacity: [0, 0.6, 0],
                scale: [0, 1, 0]
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      )}

      {/* Executive Performance Optimization Layer */}
      <div className="absolute inset-0 will-change-transform" style={{ transform: 'translateZ(0)' }} />
      
      {/* Main Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}

// Executive Floating Elements Component
export const ExecutiveFloatingElements: React.FC<{
  count?: number
  colors?: string[]
  size?: 'sm' | 'md' | 'lg'
  speed?: 'slow' | 'medium' | 'fast'
  className?: string
}> = ({ 
  count = 15, 
  colors = ["#8b5cf6", "#3b82f6", "#10b981"],
  size = 'md',
  speed = 'medium',
  className = ""
}) => {
  const sizeClasses = {
    sm: 'w-1 h-1',
    md: 'w-2 h-2',
    lg: 'w-3 h-3'
  }

  const speedSettings = {
    slow: { duration: 8, delay: 3 },
    medium: { duration: 5, delay: 2 },
    fast: { duration: 3, delay: 1 }
  }

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full ${sizeClasses[size]}`}
          style={{
            backgroundColor: colors[i % colors.length],
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -200, 0],
            x: [0, Math.random() * 100 - 50, 0],
            opacity: [0, 0.8, 0],
            scale: [0, 1, 0]
          }}
          transition={{
            duration: speedSettings[speed].duration + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * speedSettings[speed].delay,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  )
}

// Executive Gradient Orb Component
export const ExecutiveGradientOrb: React.FC<{
  size?: number
  colors?: [string, string]
  position?: { x: string, y: string }
  blur?: number
  opacity?: number
  animate?: boolean
  className?: string
}> = ({
  size = 400,
  colors = ["#8b5cf6", "#3b82f6"],
  position = { x: "50%", y: "50%" },
  blur = 60,
  opacity = 0.3,
  animate = true,
  className = ""
}) => {
  return (
    <motion.div
      className={`absolute pointer-events-none ${className}`}
      style={{
        left: position.x,
        top: position.y,
        width: size,
        height: size,
        transform: 'translate(-50%, -50%)',
        background: `radial-gradient(circle, ${colors[0]} 0%, ${colors[1]} 50%, transparent 70%)`,
        filter: `blur(${blur}px)`,
        opacity: opacity
      }}
      animate={animate ? {
        scale: [1, 1.2, 1],
        opacity: [opacity * 0.5, opacity, opacity * 0.5]
      } : undefined}
      transition={animate ? {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      } : undefined}
    />
  )
}