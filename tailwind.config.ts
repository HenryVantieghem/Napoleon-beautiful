import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        // Executive Authority & Power
        'executive-black': '#000000',
        'charcoal-depth': '#1a1a1a',
        'dark-surface': '#0f0f0f',
        'dark-elevated': '#262626',
        
        // Innovation & Premium Positioning
        'royal-purple': '#8b5cf6',
        'deep-purple': '#4c1d95',
        'purple-glow': '#a855f7',
        'purple-light': '#c084fc',
        'purple-subtle': 'rgba(139, 92, 246, 0.1)',
        
        // Trust & Enterprise Reliability
        'navy-trust': '#1e1b4b',
        'electric-blue': '#3b82f6',
        'sky-accent': '#0ea5e9',
        'blue-light': '#60a5fa',
        'blue-subtle': 'rgba(59, 130, 246, 0.1)',
        
        // Success & ROI Indicators
        'emerald-success': '#10b981',
        'green-growth': '#059669',
        'green-light': '#34d399',
        'green-subtle': 'rgba(16, 185, 129, 0.1)',
        
        // Urgency & Action Triggers
        'amber-urgency': '#f59e0b',
        'orange-cta': '#ea580c',
        'yellow-accent': '#fbbf24',
        'amber-subtle': 'rgba(245, 158, 11, 0.1)',
        
        // Luxury & Sophistication
        'gold-premium': '#fbbf24',
        'silver-elegant': '#e5e7eb',
        'platinum': '#f8fafc',
        'white-pure': '#ffffff',
        
        // Executive Opacity Layers
        'white-5': 'rgba(255, 255, 255, 0.05)',
        'white-10': 'rgba(255, 255, 255, 0.10)',
        'white-20': 'rgba(255, 255, 255, 0.20)',
        'white-30': 'rgba(255, 255, 255, 0.30)',
        'white-40': 'rgba(255, 255, 255, 0.40)',
        'white-50': 'rgba(255, 255, 255, 0.50)',
        'white-60': 'rgba(255, 255, 255, 0.60)',
        'white-70': 'rgba(255, 255, 255, 0.70)',
        'white-80': 'rgba(255, 255, 255, 0.80)',
        'white-90': 'rgba(255, 255, 255, 0.90)',
      },
      fontFamily: {
        sans: ['Inter', 'SF Pro Display', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'system-ui', 'sans-serif'],
        mono: ['SF Mono', 'Monaco', 'Menlo', 'Consolas', 'monospace'],
      },
      spacing: {
        // Executive Spacing (Golden Ratio: 1.618)
        'xs': '0.25rem',    // 4px
        'sm': '0.5rem',     // 8px
        'md': '0.75rem',    // 12px
        'lg': '1rem',       // 16px
        'xl': '1.618rem',   // ~26px
        '2xl': '2.618rem',  // ~42px
        '3xl': '4.236rem',  // ~68px
        '4xl': '6.854rem',  // ~110px
        '5xl': '11.09rem',  // ~178px
      },
      borderRadius: {
        'sm': '0.375rem',   // 6px
        'md': '0.5rem',     // 8px
        'lg': '0.75rem',    // 12px
        'xl': '1rem',       // 16px
        '2xl': '1.5rem',    // 24px
        'full': '9999px',
      },
      boxShadow: {
        'premium': '0 32px 64px rgba(139, 92, 246, 0.15), 0 16px 32px rgba(59, 130, 246, 0.1)',
        'executive': '0 40px 80px rgba(0, 0, 0, 0.12), 0 20px 40px rgba(139, 92, 246, 0.08)',
        'glass': '0 8px 32px rgba(0, 0, 0, 0.1)',
        'glow': '0 0 20px rgba(139, 92, 246, 0.3)',
        'glow-strong': '0 0 40px rgba(139, 92, 246, 0.6), 0 0 60px rgba(59, 130, 246, 0.3)',
      },
      backgroundImage: {
        'gradient-purple': 'linear-gradient(135deg, #8b5cf6 0%, #4c1d95 100%)',
        'gradient-blue': 'linear-gradient(135deg, #3b82f6 0%, #1e1b4b 100%)',
        'gradient-success': 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
        'gradient-premium': 'linear-gradient(135deg, #8b5cf6 0%, #3b82f6 50%, #10b981 100%)',
        'gradient-executive': 'linear-gradient(135deg, #000000 0%, #4c1d95 50%, #1e1b4b 100%)',
        'pattern-dots': 'radial-gradient(circle, rgba(255, 255, 255, 0.1) 1px, transparent 1px)',
        'pattern-grid': 'linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse-slow 4s ease-in-out infinite',
        'shimmer': 'shimmer 2s infinite',
        'glow': 'glow 3s ease-in-out infinite alternate',
        'gradient-shift': 'gradient-shift 3s ease infinite',
        'executive-pulse': 'executive-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'pulse-slow': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(139, 92, 246, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(139, 92, 246, 0.6), 0 0 60px rgba(59, 130, 246, 0.3)' },
        },
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'executive-pulse': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1.1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
        '7xl': ['4.5rem', { lineHeight: '1' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }],
        'hero': ['clamp(3rem, 8vw, 8rem)', { lineHeight: '0.9', letterSpacing: '-0.02em' }],
        'section': ['clamp(2rem, 5vw, 4rem)', { lineHeight: '1.1', letterSpacing: '-0.01em' }],
        'executive-copy': ['clamp(1.125rem, 2.5vw, 1.5rem)', { lineHeight: '1.6' }],
      },
      letterSpacing: {
        'tighter': '-0.05em',
        'tight': '-0.025em',
        'normal': '0em',
        'wide': '0.025em',
        'wider': '0.05em',
        'widest': '0.1em',
      },
      transitionDuration: {
        '75': '75ms',
        '100': '100ms',
        '150': '150ms',
        '200': '200ms',
        '300': '300ms',
        '500': '500ms',
        '700': '700ms',
        '1000': '1000ms',
      },
      transitionTimingFunction: {
        'executive': 'cubic-bezier(0.25, 0.1, 0.25, 1)',
        'premium': 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      },
      backdropBlur: {
        'executive': '20px',
        'executive-strong': '40px',
      },
      screens: {
        'xs': '475px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1400px',
        '3xl': '1600px',
      },
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/container-queries'),
    // Custom executive plugin for utilities
    function({ addUtilities }: any) {
      const newUtilities = {
        '.text-gradient-executive': {
          background: 'linear-gradient(135deg, #8b5cf6 0%, #3b82f6 50%, #10b981 100%)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundSize: '200% 200%',
          animation: 'gradient-shift 3s ease infinite',
        },
        '.glass-executive': {
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(20px) saturate(180%)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        },
        '.glass-executive-strong': {
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(40px) saturate(200%)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
        },
        '.btn-executive-hover': {
          position: 'relative',
          overflow: 'hidden',
          transition: 'all 300ms cubic-bezier(0.25, 0.1, 0.25, 1)',
        },
        '.btn-executive-hover::before': {
          content: '""',
          position: 'absolute',
          inset: '0',
          background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
          opacity: '0',
          transition: 'opacity 300ms cubic-bezier(0.25, 0.1, 0.25, 1)',
          zIndex: '-1',
        },
        '.btn-executive-hover:hover::before': {
          opacity: '0.1',
        },
        '.container-executive': {
          width: '100%',
          maxWidth: '1400px',
          marginLeft: 'auto',
          marginRight: 'auto',
          paddingLeft: '1rem',
          paddingRight: '1rem',
        },
        '@media (min-width: 640px)': {
          '.container-executive': {
            paddingLeft: '1.618rem',
            paddingRight: '1.618rem',
          },
        },
        '@media (min-width: 1024px)': {
          '.container-executive': {
            paddingLeft: '2.618rem',
            paddingRight: '2.618rem',
          },
        },
        '@media (min-width: 1280px)': {
          '.container-executive': {
            paddingLeft: '4.236rem',
            paddingRight: '4.236rem',
          },
        },
      }
      addUtilities(newUtilities)
    },
  ],
}

export default config