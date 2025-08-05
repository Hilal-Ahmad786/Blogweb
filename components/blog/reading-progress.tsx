'use client'

import { useReadingProgress } from '@/hooks/use-reading-progress'

interface ReadingProgressProps {
  target?: string // CSS selector for the content to track
  className?: string
  showPercentage?: boolean
}

export default function ReadingProgress({ 
  target = 'main', 
  className = '',
  showPercentage = false 
}: ReadingProgressProps) {
  const progress = useReadingProgress(target)

  return (
    <>
      {/* Progress Bar */}
      <div 
        className={`fixed top-0 left-0 right-0 h-1 bg-gray-200 z-50 ${className}`}
      >
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-150 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Optional Percentage Display */}
      {showPercentage && (
        <div className="fixed top-4 right-4 z-50">
          <div className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-full px-3 py-1 text-sm font-medium text-gray-700 shadow-sm">
            {Math.round(progress)}%
          </div>
        </div>
      )}
    </>
  )
}

// Circular progress variant
export function CircularReadingProgress({ 
  target = 'main', 
  size = 60,
  strokeWidth = 4,
  className = '' 
}: ReadingProgressProps & { 
  size?: number
  strokeWidth?: number 
}) {
  const progress = useReadingProgress(target)
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const strokeDashoffset = circumference - (progress / 100) * circumference

  return (
    <div 
      className={`fixed bottom-6 right-6 z-50 ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        className="transform -rotate-90"
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgb(229 231 235)" // gray-200
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="url(#gradient)"
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className="transition-all duration-150 ease-out"
        />
        {/* Gradient definition */}
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgb(59 130 246)" /> {/* blue-500 */}
            <stop offset="100%" stopColor="rgb(147 51 234)" /> {/* purple-600 */}
          </linearGradient>
        </defs>
      </svg>
      
      {/* Percentage text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xs font-semibold text-gray-700">
          {Math.round(progress)}%
        </span>
      </div>
    </div>
  )
}

// Minimal progress indicator
export function MinimalReadingProgress({ 
  target = 'main',
  className = '' 
}: ReadingProgressProps) {
  const progress = useReadingProgress(target)

  if (progress < 5) return null // Only show when user has started reading

  return (
    <div className={`fixed bottom-6 left-6 z-50 ${className}`}>
      <div className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-full px-4 py-2 shadow-sm">
        <div className="flex items-center space-x-3">
          {/* Mini progress bar */}
          <div className="w-12 h-1 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-150 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          {/* Reading status */}
          <span className="text-xs font-medium text-gray-600">
            {progress < 95 ? 'Reading...' : 'Complete!'}
          </span>
        </div>
      </div>
    </div>
  )
}

// Progress with estimated time remaining
export function ReadingProgressWithTime({ 
  target = 'main',
  averageWPM = 200, // words per minute
  totalWords = 0,
  className = '' 
}: ReadingProgressProps & { 
  averageWPM?: number
  totalWords?: number 
}) {
  const progress = useReadingProgress(target)
  
  const estimatedReadingTimeMinutes = totalWords / averageWPM
  const remainingTimeMinutes = (estimatedReadingTimeMinutes * (100 - progress)) / 100
  const remainingTime = Math.max(0, Math.ceil(remainingTimeMinutes))

  if (progress < 5) return null

  return (
    <div className={`fixed bottom-6 right-6 z-50 ${className}`}>
      <div className="bg-white/95 backdrop-blur-sm border border-gray-200 rounded-lg px-4 py-3 shadow-lg max-w-xs">
        {/* Progress bar */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Reading Progress</span>
          <span className="text-sm text-gray-500">{Math.round(progress)}%</span>
        </div>
        
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mb-2">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-150 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        {/* Time remaining */}
        {totalWords > 0 && progress < 95 && (
          <div className="text-xs text-gray-500">
            ~{remainingTime} min remaining
          </div>
        )}
        
        {progress >= 95 && (
          <div className="text-xs text-green-600 font-medium">
            ✓ Article completed
          </div>
        )}
      </div>
    </div>
  )
}