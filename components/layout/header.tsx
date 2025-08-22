"use client"

import React, { useState, useEffect } from "react"
import { motion, useScroll, useMotionValueEvent } from "framer-motion"
import { ExecutiveButton } from "@/components/ui/executive-button"
import { cn } from "@/lib/utils"
import { Menu, X, ArrowRight } from "lucide-react"

interface HeaderProps {
  className?: string
  onEarlyAccessClick?: () => void
}

export default function Header({ className = "", onEarlyAccessClick }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50)
  })

  const navItems = [
    { label: "Features", href: "#features" },
    { label: "Integrations", href: "#integrations" },
    { label: "Pricing", href: "#pricing" },
    { label: "Enterprise", href: "#enterprise" }
  ]

  const handleNavClick = (href: string) => {
    setIsMenuOpen(false)
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const handleEarlyAccessClick = () => {
    onEarlyAccessClick?.()
    // Track conversion event
    if (typeof window !== 'undefined' && 'gtag' in window) {
      (window as any).gtag('event', 'early_access_click', {
        event_category: 'conversion',
        event_label: 'header_cta'
      })
    }
  }

  return (
    <motion.header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "bg-executive-black/80 backdrop-blur-xl border-b border-white/10" : "bg-transparent",
        className
      )}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="container-executive">
        <div className="flex items-center justify-between h-20">
          
          {/* Premium Logo */}
          <motion.div 
            className="flex items-center space-x-3 cursor-pointer group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="relative">
              {/* Executive Logo SVG */}
              <motion.svg
                width="40"
                height="40" 
                viewBox="0 0 40 40"
                fill="none"
                className="text-white group-hover:text-royal-purple transition-colors duration-300"
                whileHover={{ rotate: 5 }}
              >
                <defs>
                  <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#8b5cf6" />
                    <stop offset="100%" stopColor="#3b82f6" />
                  </linearGradient>
                </defs>
                <rect x="2" y="2" width="36" height="36" rx="8" fill="url(#logo-gradient)" opacity="0.1" />
                <path 
                  d="M12 8L28 8C30.2091 8 32 9.79086 32 12V28C32 30.2091 30.2091 32 28 32H12C9.79086 32 8 30.2091 8 28V12C8 9.79086 9.79086 8 12 8Z" 
                  stroke="currentColor" 
                  strokeWidth="1.5"
                  fill="none"
                />
                <circle cx="20" cy="20" r="6" fill="currentColor" opacity="0.8" />
                <path 
                  d="M15 15L25 25M25 15L15 25" 
                  stroke="white" 
                  strokeWidth="2" 
                  strokeLinecap="round"
                />
              </motion.svg>
              
              {/* Premium glow effect */}
              <div className="absolute inset-0 rounded-lg bg-royal-purple/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300" />
            </div>
            
            <div className="flex flex-col">
              <div className="flex items-baseline">
                <span className="text-2xl font-bold text-white group-hover:text-royal-purple transition-colors duration-300">
                  Napoleon
                </span>
                <motion.span 
                  className="text-2xl font-bold text-royal-purple ml-0.5"
                  animate={{ 
                    textShadow: [
                      "0 0 0px rgba(139, 92, 246, 0)",
                      "0 0 10px rgba(139, 92, 246, 0.5)",
                      "0 0 0px rgba(139, 92, 246, 0)"
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  AI
                </motion.span>
              </div>
              <span className="text-xs text-white/50 font-medium tracking-wider uppercase">
                Executive Grade
              </span>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <motion.a
                key={item.label}
                onClick={() => handleNavClick(item.href)}
                className="text-white/80 hover:text-white text-sm font-medium transition-colors duration-200 relative group cursor-pointer"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.1 }}
                whileHover={{ y: -2 }}
              >
                {item.label}
                <motion.div 
                  className="absolute bottom-0 left-0 w-0 h-0.5 bg-royal-purple rounded-full group-hover:w-full transition-all duration-300"
                  whileHover={{ scaleX: 1 }}
                  initial={{ scaleX: 0 }}
                />
                
                {/* Premium hover effect */}
                <div className="absolute inset-0 bg-royal-purple/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 -m-2" />
              </motion.a>
            ))}
          </nav>

          {/* Executive CTA Group */}
          <motion.div 
            className="hidden lg:flex items-center space-x-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            {/* Premium Contact Button */}
            <ExecutiveButton
              variant="ghost"
              size="medium"
              className="group"
              onClick={() => handleNavClick('#contact')}
            >
              Contact Sales
            </ExecutiveButton>

            {/* Executive Early Access CTA */}
            <div className="relative group">
              <ExecutiveButton
                variant="primary"
                size="medium"
                className="relative z-10 group"
                onClick={handleEarlyAccessClick}
                icon={<ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />}
                iconPosition="right"
              >
                Early Access
              </ExecutiveButton>
              
              {/* Premium glow effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-royal-purple/30 to-electric-blue/30 rounded-2xl blur-xl opacity-0 group-hover:opacity-100"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.button
            className="lg:hidden p-2 text-white/80 hover:text-white transition-colors duration-200"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            whileTap={{ scale: 0.9 }}
          >
            <motion.div
              animate={{ rotate: isMenuOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.div>
          </motion.button>
        </div>

        {/* Mobile Navigation Menu */}
        <motion.div
          className="lg:hidden"
          initial={false}
          animate={{ 
            height: isMenuOpen ? "auto" : 0,
            opacity: isMenuOpen ? 1 : 0
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          style={{ overflow: "hidden" }}
        >
          <div className="pb-6 pt-2 space-y-4">
            {navItems.map((item, index) => (
              <motion.a
                key={item.label}
                onClick={() => handleNavClick(item.href)}
                className="block text-white/80 hover:text-white font-medium py-2 px-4 rounded-lg hover:bg-white/5 transition-all duration-200 cursor-pointer"
                initial={{ opacity: 0, x: -20 }}
                animate={{ 
                  opacity: isMenuOpen ? 1 : 0,
                  x: isMenuOpen ? 0 : -20
                }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ x: 5 }}
              >
                {item.label}
              </motion.a>
            ))}
            
            {/* Mobile CTA Buttons */}
            <div className="pt-4 space-y-3">
              <ExecutiveButton
                variant="outline"
                size="medium"
                className="w-full"
                onClick={() => handleNavClick('#contact')}
              >
                Contact Sales
              </ExecutiveButton>
              
              <ExecutiveButton
                variant="primary"
                size="medium"
                className="w-full"
                onClick={handleEarlyAccessClick}
                icon={<ArrowRight className="w-4 h-4" />}
                iconPosition="right"
              >
                Join Early Access
              </ExecutiveButton>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Executive Scroll Progress Indicator */}
      <motion.div
        className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-royal-purple to-electric-blue origin-left"
        style={{ 
          scaleX: useScroll().scrollYProgress,
          opacity: isScrolled ? 1 : 0
        }}
        transition={{ opacity: { duration: 0.3 } }}
      />

      {/* Premium Background Blur Effect */}
      {isScrolled && (
        <div className="absolute inset-0 bg-executive-black/20 backdrop-blur-sm -z-10" />
      )}
    </motion.header>
  )
}