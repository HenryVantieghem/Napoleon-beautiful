"use client"

import React, { forwardRef } from 'react'
import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'
import { motion } from 'framer-motion'

const executiveButtonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-2xl font-semibold text-sm transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-royal-purple focus-visible:ring-offset-2 focus-visible:ring-offset-executive-black disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden group btn-executive-hover",
  {
    variants: {
      variant: {
        primary: [
          "bg-gradient-to-r from-royal-purple to-electric-blue text-white-pure shadow-premium",
          "hover:shadow-executive hover:scale-[1.02] hover:-translate-y-0.5",
          "active:scale-[0.98] active:translate-y-0",
          "before:absolute before:inset-0 before:bg-gradient-to-r before:from-purple-glow before:to-sky-accent before:opacity-0 before:transition-opacity before:duration-300",
          "hover:before:opacity-20"
        ],
        secondary: [
          "bg-gradient-to-r from-navy-trust to-deep-purple text-white-pure shadow-lg",
          "hover:shadow-premium hover:scale-[1.02] hover:-translate-y-0.5",
          "active:scale-[0.98] active:translate-y-0",
          "before:absolute before:inset-0 before:bg-gradient-to-r before:from-electric-blue before:to-royal-purple before:opacity-0 before:transition-opacity before:duration-300",
          "hover:before:opacity-15"
        ],
        outline: [
          "border-2 border-white-20 bg-transparent text-white-pure glass-executive",
          "hover:border-white-30 hover:bg-white-5 hover:scale-[1.01] hover:-translate-y-0.5",
          "active:scale-[0.99] active:translate-y-0",
          "before:absolute before:inset-0 before:bg-gradient-to-r before:from-royal-purple/10 before:to-electric-blue/10 before:opacity-0 before:transition-opacity before:duration-300",
          "hover:before:opacity-100"
        ],
        ghost: [
          "bg-white-5 text-white-80 backdrop-blur-sm",
          "hover:bg-white-10 hover:text-white-pure hover:scale-[1.01] hover:-translate-y-0.5",
          "active:scale-[0.99] active:translate-y-0",
          "before:absolute before:inset-0 before:bg-gradient-to-r before:from-royal-purple/5 before:to-electric-blue/5 before:opacity-0 before:transition-opacity before:duration-300",
          "hover:before:opacity-100"
        ],
        success: [
          "bg-gradient-to-r from-emerald-success to-green-growth text-white-pure shadow-lg",
          "hover:shadow-premium hover:scale-[1.02] hover:-translate-y-0.5",
          "active:scale-[0.98] active:translate-y-0",
          "before:absolute before:inset-0 before:bg-gradient-to-r before:from-green-light before:to-emerald-success before:opacity-0 before:transition-opacity before:duration-300",
          "hover:before:opacity-20"
        ],
        warning: [
          "bg-gradient-to-r from-amber-urgency to-orange-cta text-white-pure shadow-lg",
          "hover:shadow-premium hover:scale-[1.02] hover:-translate-y-0.5",
          "active:scale-[0.98] active:translate-y-0",
          "before:absolute before:inset-0 before:bg-gradient-to-r before:from-yellow-accent before:to-amber-urgency before:opacity-0 before:transition-opacity before:duration-300",
          "hover:before:opacity-20"
        ]
      },
      size: {
        small: "h-9 px-4 py-2 text-sm",
        medium: "h-11 px-6 py-2.5 text-base",
        large: "h-14 px-8 py-3 text-lg font-semibold",
        xl: "h-16 px-12 py-4 text-xl font-bold",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "medium",
    },
  }
)

export interface ExecutiveButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof executiveButtonVariants> {
  loading?: boolean
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
  href?: string
  target?: string
  rel?: string
}

const ExecutiveButton = forwardRef<HTMLButtonElement, ExecutiveButtonProps>(
  ({ 
    className, 
    variant, 
    size, 
    loading, 
    icon, 
    iconPosition = 'left',
    href,
    target,
    rel,
    children, 
    disabled,
    onClick,
    onDrag,
    onDragStart,
    onDragEnd,
    onAnimationStart,
    onAnimationEnd,
    onAnimationIteration,
    ...props 
  }, ref) => {
    const isDisabled = disabled || loading

    const buttonContent = (
      <>
        {loading && (
          <motion.div
            className="mr-2"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          </motion.div>
        )}
        {icon && iconPosition === 'left' && !loading && (
          <span className="mr-2 flex items-center">{icon}</span>
        )}
        <span className="relative z-10 flex items-center">
          {children}
        </span>
        {icon && iconPosition === 'right' && !loading && (
          <span className="ml-2 flex items-center">{icon}</span>
        )}
      </>
    )

    const buttonProps = {
      className: cn(executiveButtonVariants({ variant, size, className })),
      disabled: isDisabled,
      onClick: !isDisabled ? onClick : undefined,
      ref,
      ...props
    }

    if (href) {
      return (
        <motion.a
          href={href}
          target={target}
          rel={rel}
          whileTap={{ scale: 0.98 }}
          whileHover={{ scale: 1.02 }}
          className={buttonProps.className}
          {...(buttonProps as any)}
        >
          {buttonContent}
        </motion.a>
      )
    }

    return (
      <motion.button
        whileTap={{ scale: 0.98 }}
        whileHover={{ scale: 1.02 }}
        {...buttonProps}
      >
        {/* Premium glow effect on hover */}
        <motion.div
          className="absolute inset-0 rounded-2xl bg-gradient-to-r from-royal-purple/20 to-electric-blue/20 opacity-0 blur-xl"
          whileHover={{ opacity: 1, scale: 1.1 }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Shimmer effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000 ease-out" />
        
        {buttonContent}
      </motion.button>
    )
  }
)

ExecutiveButton.displayName = "ExecutiveButton"

export { ExecutiveButton, executiveButtonVariants }