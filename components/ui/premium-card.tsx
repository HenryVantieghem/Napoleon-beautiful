"use client"

import React, { forwardRef } from 'react'
import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'
import { motion } from 'framer-motion'

const premiumCardVariants = cva(
  "relative rounded-2xl border backdrop-blur-sm transition-all duration-300 group overflow-hidden",
  {
    variants: {
      variant: {
        default: [
          "bg-white-5 border-white-10 glass-executive",
          "hover:bg-white-10 hover:border-white-20 hover:shadow-executive",
          "hover:-translate-y-1 hover:scale-[1.02]"
        ],
        elevated: [
          "bg-white-10 border-white-20 glass-executive-strong shadow-lg",
          "hover:bg-white-20 hover:border-white-30 hover:shadow-executive",
          "hover:-translate-y-2 hover:scale-[1.02]"
        ],
        premium: [
          "bg-gradient-to-br from-white-5 to-white-10 border-white-20 shadow-premium",
          "hover:shadow-executive hover:from-white-10 hover:to-white-15",
          "hover:-translate-y-2 hover:scale-[1.02]",
          "before:absolute before:inset-0 before:bg-gradient-to-br before:from-royal-purple/5 before:to-electric-blue/5 before:opacity-0 before:transition-opacity before:duration-300",
          "hover:before:opacity-100"
        ],
        glow: [
          "bg-white-5 border-royal-purple/20 shadow-glow",
          "hover:bg-white-10 hover:border-royal-purple/40 hover:shadow-glow-strong",
          "hover:-translate-y-2 hover:scale-[1.02]"
        ],
        success: [
          "bg-green-subtle border-emerald-success/20",
          "hover:bg-green-subtle hover:border-emerald-success/40 hover:shadow-premium",
          "hover:-translate-y-1 hover:scale-[1.02]"
        ],
        warning: [
          "bg-amber-subtle border-amber-urgency/20",
          "hover:bg-amber-subtle hover:border-amber-urgency/40 hover:shadow-premium",
          "hover:-translate-y-1 hover:scale-[1.02]"
        ]
      },
      size: {
        sm: "p-4",
        md: "p-6",
        lg: "p-8",
        xl: "p-12"
      },
      spacing: {
        comfortable: "space-y-4",
        relaxed: "space-y-6",
        loose: "space-y-8"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      spacing: "comfortable"
    }
  }
)

export interface PremiumCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof premiumCardVariants> {
  title?: string
  subtitle?: string
  description?: string
  icon?: React.ReactNode
  image?: string
  href?: string
  target?: string
  rel?: string
  interactive?: boolean
  loading?: boolean
  headerActions?: React.ReactNode
  footerActions?: React.ReactNode
}

const PremiumCard = forwardRef<HTMLDivElement, PremiumCardProps>(
  ({
    className,
    variant,
    size,
    spacing,
    title,
    subtitle,
    description,
    icon,
    image,
    href,
    target,
    rel,
    interactive = false,
    loading = false,
    headerActions,
    footerActions,
    children,
    onClick,
    onDrag,
    onDragStart,
    onDragEnd,
    onAnimationStart,
    onAnimationEnd,
    onAnimationIteration,
    ...props
  }, ref) => {
    const isInteractive = interactive || href || onClick

    const cardContent = (
      <>
        {/* Premium background glow effect */}
        <motion.div
          className="absolute inset-0 rounded-2xl bg-gradient-to-br from-royal-purple/5 via-transparent to-electric-blue/5 opacity-0"
          whileHover={{ opacity: isInteractive ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Shimmer effect on hover */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000 ease-out" />
        
        {/* Loading state */}
        {loading && (
          <div className="absolute inset-0 rounded-2xl bg-executive-black/50 backdrop-blur-sm flex items-center justify-center z-20">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-8 h-8 border-2 border-royal-purple border-t-transparent rounded-full"
            />
          </div>
        )}
        
        {/* Image */}
        {image && (
          <div className="relative mb-4 rounded-xl overflow-hidden">
            <img
              src={image}
              alt={title || ''}
              className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-executive-black/20 to-transparent" />
          </div>
        )}
        
        {/* Header */}
        {(title || subtitle || icon || headerActions) && (
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-start space-x-3 flex-1">
              {icon && (
                <div className="flex-shrink-0 p-2 rounded-lg bg-white-5 text-royal-purple">
                  {icon}
                </div>
              )}
              <div className="flex-1 min-w-0">
                {subtitle && (
                  <p className="text-sm font-medium text-white-60 uppercase tracking-wider mb-1">
                    {subtitle}
                  </p>
                )}
                {title && (
                  <h3 className="text-lg font-semibold text-white-pure mb-1 group-hover:text-gradient-executive transition-all duration-300">
                    {title}
                  </h3>
                )}
              </div>
            </div>
            {headerActions && (
              <div className="flex-shrink-0 ml-4">
                {headerActions}
              </div>
            )}
          </div>
        )}
        
        {/* Description */}
        {description && (
          <p className="text-white-80 leading-relaxed mb-4 group-hover:text-white-90 transition-colors duration-300">
            {description}
          </p>
        )}
        
        {/* Content */}
        {children && (
          <div className={cn("relative z-10", spacing)}>
            {children}
          </div>
        )}
        
        {/* Footer Actions */}
        {footerActions && (
          <div className="mt-6 pt-4 border-t border-white-10 group-hover:border-white-20 transition-colors duration-300">
            {footerActions}
          </div>
        )}
        
        {/* Interactive indicator */}
        {isInteractive && (
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-2 h-2 bg-royal-purple rounded-full animate-pulse" />
          </div>
        )}
      </>
    )

    const cardClassName = cn(premiumCardVariants({ variant, size, spacing }), className)
    const cardProps = {
      onClick: onClick,
      ref,
      ...props
    }

    if (href) {
      return (
        <motion.a
          href={href}
          target={target}
          rel={rel}
          whileHover={{ scale: 1.02, y: -4 }}
          whileTap={{ scale: 0.98 }}
          className={cn(cardClassName, "cursor-pointer")}
          {...(cardProps as any)}
        >
          {cardContent}
        </motion.a>
      )
    }

    if (isInteractive) {
      return (
        <motion.div
          whileHover={{ scale: 1.02, y: -4 }}
          whileTap={{ scale: 0.98 }}
          className={cn(cardClassName, "cursor-pointer")}
          {...cardProps}
        >
          {cardContent}
        </motion.div>
      )
    }

    return (
      <div {...cardProps} className={cardClassName}>
        {cardContent}
      </div>
    )
  }
)

PremiumCard.displayName = "PremiumCard"

// Executive Statistics Card Component
export const ExecutiveStatsCard = forwardRef<HTMLDivElement, {
  title: string
  value: string | number
  subtitle?: string
  trend?: 'up' | 'down' | 'neutral'
  trendValue?: string
  icon?: React.ReactNode
  className?: string
}>(({ title, value, subtitle, trend, trendValue, icon, className, ...props }, ref) => {
  const getTrendColor = () => {
    switch (trend) {
      case 'up': return 'text-emerald-success'
      case 'down': return 'text-orange-cta'
      default: return 'text-white-60'
    }
  }

  const getTrendIcon = () => {
    switch (trend) {
      case 'up':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        )
      case 'down':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        )
      default:
        return null
    }
  }

  return (
    <PremiumCard
      ref={ref}
      variant="elevated"
      className={cn("text-center", className)}
      {...props}
    >
      <div className="space-y-2">
        {icon && (
          <div className="mx-auto w-12 h-12 bg-royal-purple/10 rounded-xl flex items-center justify-center text-royal-purple mb-4">
            {icon}
          </div>
        )}
        <div className="text-3xl font-bold text-white-pure text-gradient-executive">
          {value}
        </div>
        <div className="text-sm font-medium text-white-80 uppercase tracking-wider">
          {title}
        </div>
        {subtitle && (
          <div className="text-xs text-white-60">
            {subtitle}
          </div>
        )}
        {trend && trendValue && (
          <div className={cn("flex items-center justify-center space-x-1 text-sm", getTrendColor())}>
            {getTrendIcon()}
            <span>{trendValue}</span>
          </div>
        )}
      </div>
    </PremiumCard>
  )
})

ExecutiveStatsCard.displayName = "ExecutiveStatsCard"

export { PremiumCard, premiumCardVariants }