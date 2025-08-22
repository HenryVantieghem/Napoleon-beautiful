"use client"

import React, { useEffect, useState, useRef } from 'react'
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion'
import { cn } from '@/lib/utils'

interface AnimatedCounterProps {
  value: number
  duration?: number
  delay?: number
  prefix?: string
  suffix?: string
  className?: string
  separator?: string
  decimalPlaces?: number
  startOnView?: boolean
  springConfig?: {
    stiffness?: number
    damping?: number
    mass?: number
  }
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  value,
  duration = 2000,
  delay = 0,
  prefix = '',
  suffix = '',
  className = '',
  separator = ',',
  decimalPlaces = 0,
  startOnView = true,
  springConfig = { stiffness: 100, damping: 30, mass: 1 }
}) => {
  const ref = useRef<HTMLSpanElement>(null)
  const motionValue = useMotionValue(0)
  const springValue = useSpring(motionValue, springConfig)
  const [displayValue, setDisplayValue] = useState('0')
  const isInView = useInView(ref, { once: true, margin: '0px 0px -100px 0px' })

  const formatNumber = (num: number): string => {
    const roundedNum = Number(num.toFixed(decimalPlaces))
    const parts = roundedNum.toString().split('.')
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, separator)
    return parts.join('.')
  }

  useEffect(() => {
    const unsubscribe = springValue.onChange((latest) => {
      setDisplayValue(formatNumber(latest))
    })

    return () => unsubscribe()
  }, [springValue, decimalPlaces, separator])

  useEffect(() => {
    if ((startOnView && isInView) || !startOnView) {
      const timer = setTimeout(() => {
        motionValue.set(value)
      }, delay)

      return () => clearTimeout(timer)
    }
  }, [motionValue, value, delay, isInView, startOnView])

  return (
    <motion.span
      ref={ref}
      className={cn("font-mono tabular-nums", className)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay / 1000 }}
    >
      {prefix}
      {displayValue}
      {suffix}
    </motion.span>
  )
}

// Executive Metric Display Component
interface ExecutiveMetricProps {
  title: string
  value: number
  change?: number
  changeType?: 'increase' | 'decrease' | 'neutral'
  prefix?: string
  suffix?: string
  description?: string
  icon?: React.ReactNode
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

export const ExecutiveMetric: React.FC<ExecutiveMetricProps> = ({
  title,
  value,
  change,
  changeType = 'neutral',
  prefix = '',
  suffix = '',
  description,
  icon,
  className = '',
  size = 'md'
}) => {
  const sizeClasses = {
    sm: {
      container: 'p-4',
      title: 'text-sm',
      value: 'text-xl font-bold',
      change: 'text-xs',
      description: 'text-xs'
    },
    md: {
      container: 'p-6',
      title: 'text-base',
      value: 'text-3xl font-bold',
      change: 'text-sm',
      description: 'text-sm'
    },
    lg: {
      container: 'p-8',
      title: 'text-lg',
      value: 'text-4xl font-bold',
      change: 'text-base',
      description: 'text-base'
    },
    xl: {
      container: 'p-10',
      title: 'text-xl',
      value: 'text-5xl font-bold',
      change: 'text-lg',
      description: 'text-lg'
    }
  }

  const changeColorClasses = {
    increase: 'text-emerald-success',
    decrease: 'text-orange-cta',
    neutral: 'text-white-60'
  }

  const changeIcon = {
    increase: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
    ),
    decrease: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
      </svg>
    ),
    neutral: null
  }

  return (
    <motion.div
      className={cn(
        "glass-executive rounded-2xl border border-white-10 hover:border-white-20 transition-all duration-300 group",
        sizeClasses[size].container,
        className
      )}
      whileHover={{ scale: 1.02, y: -2 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header with icon and title */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          {icon && (
            <div className="p-2 rounded-lg bg-royal-purple/10 text-royal-purple group-hover:bg-royal-purple/20 transition-colors duration-300">
              {icon}
            </div>
          )}
          <h3 className={cn("font-medium text-white-80 group-hover:text-white-pure transition-colors duration-300", sizeClasses[size].title)}>
            {title}
          </h3>
        </div>
        
        {change !== undefined && (
          <div className={cn("flex items-center space-x-1", sizeClasses[size].change, changeColorClasses[changeType])}>
            {changeIcon[changeType]}
            <AnimatedCounter
              value={Math.abs(change)}
              suffix={suffix === '%' ? '%' : ''}
              prefix={changeType === 'increase' ? '+' : changeType === 'decrease' ? '-' : ''}
              duration={1500}
              delay={500}
            />
          </div>
        )}
      </div>

      {/* Main value */}
      <div className={cn("text-gradient-executive mb-2", sizeClasses[size].value)}>
        <AnimatedCounter
          value={value}
          prefix={prefix}
          suffix={suffix}
          duration={2000}
          separator=","
          decimalPlaces={0}
        />
      </div>

      {/* Description */}
      {description && (
        <p className={cn("text-white-60 group-hover:text-white-70 transition-colors duration-300", sizeClasses[size].description)}>
          {description}
        </p>
      )}

      {/* Premium glow effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-royal-purple/5 to-electric-blue/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </motion.div>
  )
}

// Executive Progress Bar Component
interface ExecutiveProgressBarProps {
  value: number
  maxValue?: number
  label?: string
  showValue?: boolean
  className?: string
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'success' | 'warning' | 'purple'
  animated?: boolean
}

export const ExecutiveProgressBar: React.FC<ExecutiveProgressBarProps> = ({
  value,
  maxValue = 100,
  label,
  showValue = true,
  className = '',
  size = 'md',
  variant = 'default',
  animated = true
}) => {
  const percentage = Math.min((value / maxValue) * 100, 100)
  
  const sizeClasses = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4'
  }

  const variantClasses = {
    default: 'from-royal-purple to-electric-blue',
    success: 'from-emerald-success to-green-growth',
    warning: 'from-amber-urgency to-orange-cta',
    purple: 'from-deep-purple to-royal-purple'
  }

  return (
    <div className={cn("space-y-2", className)}>
      {(label || showValue) && (
        <div className="flex justify-between items-center text-sm">
          {label && <span className="text-white-80 font-medium">{label}</span>}
          {showValue && (
            <span className="text-white-60 font-mono">
              <AnimatedCounter
                value={value}
                suffix={` / ${maxValue}`}
                duration={1500}
              />
            </span>
          )}
        </div>
      )}
      
      <div className={cn(
        "w-full bg-white-5 rounded-full overflow-hidden border border-white-10",
        sizeClasses[size]
      )}>
        <motion.div
          className={cn("h-full bg-gradient-to-r rounded-full", variantClasses[variant])}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: animated ? 1.5 : 0, ease: "easeOut" }}
        />
      </div>
      
      {animated && (
        <div className="text-xs text-white-50 text-right font-mono">
          <AnimatedCounter
            value={percentage}
            suffix="%"
            duration={1500}
            decimalPlaces={1}
          />
        </div>
      )}
    </div>
  )
}

// Executive Stat Grid Component
interface ExecutiveStatGridProps {
  stats: Array<{
    title: string
    value: number
    change?: number
    changeType?: 'increase' | 'decrease' | 'neutral'
    prefix?: string
    suffix?: string
    description?: string
    icon?: React.ReactNode
  }>
  columns?: 2 | 3 | 4
  className?: string
}

export const ExecutiveStatGrid: React.FC<ExecutiveStatGridProps> = ({
  stats,
  columns = 3,
  className = ''
}) => {
  const gridCols = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
  }

  return (
    <div className={cn("grid gap-6", gridCols[columns], className)}>
      {stats.map((stat, index) => (
        <ExecutiveMetric
          key={index}
          {...stat}
        />
      ))}
    </div>
  )
}

export { AnimatedCounter as default }