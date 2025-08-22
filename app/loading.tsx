import PulsatingCircle from '@/components/ui/pulsing-circle'

export default function Loading() {
  return (
    <div className="min-h-screen bg-executive-dark flex items-center justify-center">
      <div className="flex flex-col items-center space-y-8">
        {/* Executive loading animation */}
        <div className="relative">
          <PulsatingCircle className="w-16 h-16" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 bg-gradient-to-br from-royal-purple to-electric-blue rounded-full animate-pulse" />
          </div>
        </div>
        
        {/* Loading message with executive context */}
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-semibold text-white">
            Preparing Your Executive Experience
          </h2>
          <p className="text-white/70 max-w-md">
            Loading Fortune 500-grade AI intelligence tailored for executive workflow optimization...
          </p>
          
          {/* Progress indicators */}
          <div className="flex items-center justify-center space-x-2 pt-4">
            <div className="w-2 h-2 bg-royal-purple rounded-full animate-bounce [animation-delay:-0.3s]" />
            <div className="w-2 h-2 bg-electric-blue rounded-full animate-bounce [animation-delay:-0.15s]" />
            <div className="w-2 h-2 bg-emerald-success rounded-full animate-bounce" />
          </div>
        </div>
      </div>
      
      {/* Background enhancement */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-royal-purple/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-electric-blue/5 rounded-full blur-3xl animate-pulse [animation-delay:1s]" />
      </div>
    </div>
  )
}