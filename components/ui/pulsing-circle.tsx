"use client"

import React from "react"
import { motion } from "framer-motion"
import SimplePulsingCircle from "./simple-pulsing-circle"

interface PulsingCircleProps {
  size?: number
  colors?: string[]
  text?: string
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left' | 'center'
  className?: string
  onClick?: () => void
}

export default function PulsingCircle({ 
  size = 70,
  colors = ["#8b5cf6", "#3b82f6", "#10b981", "#f59e0b", "#8b5cf6"],
  text = "NAPOLEON AI • EXECUTIVE GRADE • FORTUNE 500 • NAPOLEON AI • EXECUTIVE GRADE • FORTUNE 500 •",
  position = 'bottom-right',
  className = "",
  onClick
}: PulsingCircleProps) {
  const positionClasses = {
    'bottom-right': 'bottom-8 right-8',
    'bottom-left': 'bottom-8 left-8', 
    'top-right': 'top-8 right-8',
    'top-left': 'top-8 left-8',
    'center': 'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
  }

  return (
    <div className={`absolute ${positionClasses[position]} z-30 ${className}`}>
      <motion.div 
        className={`relative flex items-center justify-center cursor-pointer group`}
        style={{ width: size + 10, height: size + 10 }}
        onClick={onClick}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.5, type: "spring", stiffness: 200 }}
      >
        {/* Executive-Grade Pulsing Border */}
        <SimplePulsingCircle 
          className={`w-[${size}px] h-[${size}px]`}
          size={`w-[${size}px] h-[${size}px]`}
        />

        {/* Central Icon/Logo */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="w-6 h-6 text-white-pure"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            {/* Napoleon AI Logo/Icon */}
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-full h-full drop-shadow-lg"
            >
              <path d="M12 2L3.09 8.26L4 21H20L20.91 8.26L12 2Z" opacity="0.3" />
              <path d="M12 2L20.91 8.26L20 21H4L3.09 8.26L12 2Z" />
              <circle cx="12" cy="12" r="3" fill="white" opacity="0.8" />
            </svg>
          </motion.div>
        </div>

        {/* Rotating Executive Text */}
        <motion.svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 100 100"
          animate={{ rotate: 360 }}
          transition={{
            duration: 25,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          style={{ transform: "scale(1.8)" }}
        >
          <defs>
            <path id="circle" d="M 50, 50 m -38, 0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" />
          </defs>
          <text className="text-xs fill-white/80 font-medium uppercase tracking-wider">
            <textPath href="#circle" startOffset="0%">
              {text}
            </textPath>
          </text>
        </motion.svg>

        {/* Premium Glow Effect */}
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-r from-royal-purple/20 to-electric-blue/20 blur-xl opacity-0 group-hover:opacity-100"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Executive Interaction Ripple */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-royal-purple/30 opacity-0"
          whileHover={{ 
            opacity: [0, 1, 0],
            scale: [1, 1.5, 2],
          }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </motion.div>
    </div>
  )
}

// Executive Status Indicator Component
export const ExecutiveStatusIndicator: React.FC<{
  status: 'online' | 'busy' | 'away' | 'offline'
  size?: 'sm' | 'md' | 'lg'
  showPulse?: boolean
  className?: string
}> = ({ 
  status, 
  size = 'md', 
  showPulse = true,
  className = "" 
}) => {
  const statusColors = {
    online: '#10b981',
    busy: '#ea580c', 
    away: '#f59e0b',
    offline: '#6b7280'
  }

  const sizes = {
    sm: { circle: 8, pulse: 12 },
    md: { circle: 12, pulse: 18 },
    lg: { circle: 16, pulse: 24 }
  }

  return (
    <div className={`relative inline-flex ${className}`}>
      <div
        className="rounded-full border-2 border-white/20"
        style={{ 
          width: sizes[size].circle, 
          height: sizes[size].circle,
          backgroundColor: statusColors[status]
        }}
      />
      {showPulse && status === 'online' && (
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-emerald-success"
          animate={{ scale: [1, 2], opacity: [1, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
        />
      )}
    </div>
  )
}

// Executive Notification Badge Component  
export const ExecutiveNotificationBadge: React.FC<{
  count: number
  maxCount?: number
  size?: 'sm' | 'md' | 'lg'
  variant?: 'primary' | 'success' | 'warning' | 'error'
  showPulse?: boolean
  className?: string
}> = ({
  count,
  maxCount = 99,
  size = 'md',
  variant = 'primary',
  showPulse = true,
  className = ""
}) => {
  const displayCount = count > maxCount ? `${maxCount}+` : count.toString()
  
  const variants = {
    primary: 'bg-royal-purple text-white-pure',
    success: 'bg-emerald-success text-white-pure', 
    warning: 'bg-amber-urgency text-white-pure',
    error: 'bg-orange-cta text-white-pure'
  }

  const sizes = {
    sm: 'h-4 min-w-[16px] text-xs px-1',
    md: 'h-5 min-w-[20px] text-sm px-1.5',
    lg: 'h-6 min-w-[24px] text-base px-2'
  }

  if (count === 0) return null

  return (
    <motion.div
      className={`
        relative inline-flex items-center justify-center rounded-full font-semibold
        ${variants[variant]} ${sizes[size]} ${className}
      `}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 500, damping: 25 }}
    >
      {displayCount}
      
      {showPulse && (
        <motion.div
          className={`absolute inset-0 rounded-full ${variants[variant]} opacity-75`}
          animate={{ scale: [1, 1.5], opacity: [0.75, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
        />
      )}
    </motion.div>
  )
}

// Executive Activity Ring Component
export const ExecutiveActivityRing: React.FC<{
  progress: number
  size?: number
  strokeWidth?: number
  colors?: [string, string]
  showProgress?: boolean
  animated?: boolean
  className?: string
}> = ({
  progress,
  size = 60,
  strokeWidth = 4,
  colors = ["#8b5cf6", "#3b82f6"],
  showProgress = true,
  animated = true,
  className = ""
}) => {
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const strokeDasharray = circumference
  const strokeDashoffset = circumference - (progress / 100) * circumference

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <svg width={size} height={size} className="transform -rotate-90">
        <defs>
          <linearGradient id="progress-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={colors[0]} />
            <stop offset="100%" stopColor={colors[1]} />
          </linearGradient>
        </defs>
        
        {/* Background ring */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(255, 255, 255, 0.1)"
          strokeWidth={strokeWidth}
          fill="none"
        />
        
        {/* Progress ring */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="url(#progress-gradient)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          fill="none"
          style={{
            strokeDasharray,
            strokeDashoffset: animated ? strokeDashoffset : circumference - (progress / 100) * circumference,
          }}
          initial={animated ? { strokeDashoffset: circumference } : undefined}
          animate={animated ? { strokeDashoffset } : undefined}
          transition={animated ? { duration: 1, ease: "easeInOut" } : undefined}
        />
      </svg>
      
      {showProgress && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm font-semibold text-white-pure">
            {Math.round(progress)}%
          </span>
        </div>
      )}
    </div>
  )
}