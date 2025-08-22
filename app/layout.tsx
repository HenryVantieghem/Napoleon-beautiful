import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import "./globals.css";

// Optimized font loading with critical performance settings
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  preload: true,
  fallback: ['system-ui', 'arial'],
  display: 'swap',
  adjustFontFallback: false,
});

// Executive-grade metadata for Fortune 500 branding
export const metadata: Metadata = {
  title: {
    default: "Napoleon AI - Executive Communication Intelligence",
    template: "%s | Napoleon AI"
  },
  description: "Transform your executive communication workflow. Join 847+ Fortune 500 leaders who've reclaimed 25+ hours weekly with AI-powered message prioritization and response intelligence.",
  keywords: [
    "executive AI",
    "Fortune 500",
    "executive communication",
    "AI assistant",
    "executive productivity",
    "C-suite tools",
    "business intelligence",
    "executive analytics"
  ],
  authors: [{ name: "Napoleon AI" }],
  creator: "Napoleon AI",
  publisher: "Napoleon AI",
  applicationName: "Napoleon AI Executive Platform",
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
  
  // Open Graph for executive social sharing
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://napoleonai.app",
    title: "Napoleon AI - Executive Communication Intelligence",
    description: "Join 847+ Fortune 500 executives who've transformed their workflow with AI-powered communication intelligence.",
    siteName: "Napoleon AI",
    images: [
      {
        url: "/og-images/executive-hero.jpg",
        width: 1200,
        height: 630,
        alt: "Napoleon AI Executive Platform"
      }
    ]
  },
  
  // Twitter/X cards for executive networks
  twitter: {
    card: "summary_large_image",
    site: "@NapoleonAI",
    creator: "@NapoleonAI",
    title: "Napoleon AI - Executive Communication Intelligence",
    description: "Transform your executive workflow. Join 847+ Fortune 500 leaders.",
    images: ["/og-images/executive-hero.jpg"]
  },
  
  // Technical SEO optimizations
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  
  // Performance and caching
  other: {
    'msapplication-TileColor': '#1e1b4b',
    'theme-color': '#1e1b4b',
  },
  
  // Verification for executive-grade trust
  verification: {
    google: 'executive-verification-code',
  },
  
  // Categories for executive context
  category: 'Executive Productivity',
};

// Structured data for enterprise credibility
const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Napoleon AI",
  "applicationCategory": "ExecutiveProductivityApplication",
  "description": "AI-powered executive communication intelligence platform",
  "url": "https://napoleonai.app",
  "author": {
    "@type": "Organization",
    "name": "Napoleon AI"
  },
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "ratingCount": "847",
    "bestRating": "5"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Critical performance optimizations */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://napoleonai.app" />
        <link rel="dns-prefetch" href="https://vercel.app" />
        
        {/* Executive branding assets */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icons/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        
        {/* Structured data for enterprise credibility */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        
        {/* Performance and security */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="format-detection" content="telephone=no" />
      </head>
      <body
        className={`${inter.variable} font-sans antialiased bg-executive-dark text-white selection:bg-royal-purple/30 selection:text-white`}
        suppressHydrationWarning={true}
      >
        {/* Skip navigation for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-royal-purple text-white px-4 py-2 rounded-md z-50"
        >
          Skip to main content
        </a>
        
        {/* Main content wrapper with performance optimizations */}
        <div id="main-content" className="min-h-screen">
          {children}
        </div>
        
        {/* Performance monitoring for executive-grade analytics */}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
