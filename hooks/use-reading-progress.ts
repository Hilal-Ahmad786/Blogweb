'use client'

import { useState, useEffect } from 'react'

export function useReadingProgress(target: string = 'main'): number {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const updateProgress = () => {
      // Get the target element (content to track)
      const element = document.querySelector(target) as HTMLElement
      if (!element) return

      // Get element dimensions and position
      const elementTop = element.offsetTop
      const elementHeight = element.offsetHeight
      
      // Get current scroll position
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      
      // Get viewport height
      const windowHeight = window.innerHeight
      
      // Calculate when reading starts (when element comes into view)
      const readingStart = elementTop - windowHeight + 100 // 100px buffer
      
      // Calculate total readable distance
      const totalDistance = elementHeight - windowHeight + 200 // Extra buffer
      
      // Calculate current reading progress
      const currentProgress = scrollTop - readingStart
      
      // Calculate percentage (0-100)
      let progressPercentage = 0
      if (currentProgress > 0 && totalDistance > 0) {
        progressPercentage = Math.min(100, Math.max(0, (currentProgress / totalDistance) * 100))
      }
      
      setProgress(progressPercentage)
    }

    // Initial calculation
    updateProgress()

    // Add scroll listener with throttling for performance
    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateProgress()
          ticking = false
        })
        ticking = true
      }
    }

    // Add event listeners
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', updateProgress, { passive: true })

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', updateProgress)
    }
  }, [target])

  return progress
}

// Alternative hook with more detailed reading analytics
export function useReadingAnalytics(target: string = 'main') {
  const [analytics, setAnalytics] = useState({
    progress: 0,
    timeSpent: 0,
    isReading: false,
    hasStartedReading: false,
    hasFinishedReading: false,
    scrollDirection: 'down' as 'up' | 'down',
    readingSpeed: 0, // pixels per second
  })

  useEffect(() => {
    let startTime = Date.now()
    let lastScrollY = window.pageYOffset
    let lastUpdateTime = Date.now()
    let timeSpentReading = 0

    const updateAnalytics = () => {
      const element = document.querySelector(target) as HTMLElement
      if (!element) return

      const elementTop = element.offsetTop
      const elementHeight = element.offsetHeight
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      const windowHeight = window.innerHeight
      
      // Calculate progress (same as basic hook)
      const readingStart = elementTop - windowHeight + 100
      const totalDistance = elementHeight - windowHeight + 200
      const currentProgress = scrollTop - readingStart
      const progressPercentage = Math.min(100, Math.max(0, (currentProgress / totalDistance) * 100))
      
      // Determine if user is currently reading (content is visible and scrolling slowly)
      const isInReadingZone = scrollTop >= readingStart && scrollTop <= elementTop + elementHeight
      const currentTime = Date.now()
      const timeDelta = currentTime - lastUpdateTime
      const scrollDelta = Math.abs(scrollTop - lastScrollY)
      const scrollSpeed = timeDelta > 0 ? scrollDelta / timeDelta : 0
      
      // Consider user "reading" if they're in the content area and scrolling slowly or not at all
      const isReadingNow = isInReadingZone && scrollSpeed < 2 // Less than 2 pixels per ms
      
      // Update time spent reading
      if (isReadingNow && timeDelta < 1000) { // Avoid huge time jumps (tab switching, etc.)
        timeSpentReading += timeDelta
      }
      
      // Scroll direction
      const direction = scrollTop > lastScrollY ? 'down' : 'up'
      
      // Reading speed (approximate)
      const readingSpeedPixelsPerSecond = timeDelta > 0 ? (scrollDelta / timeDelta) * 1000 : 0

      setAnalytics(prev => ({
        progress: progressPercentage,
        timeSpent: timeSpentReading,
        isReading: isReadingNow,
        hasStartedReading: prev.hasStartedReading || progressPercentage > 5,
        hasFinishedReading: prev.hasFinishedReading || progressPercentage >= 95,
        scrollDirection: direction,
        readingSpeed: readingSpeedPixelsPerSecond,
      }))

      // Update tracking variables
      lastScrollY = scrollTop
      lastUpdateTime = currentTime
    }

    // Initial calculation
    updateAnalytics()

    // Throttled scroll handler
    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateAnalytics()
          ticking = false
        })
        ticking = true
      }
    }

    // Event listeners
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', updateAnalytics, { passive: true })

    // Track when user leaves/returns to tab
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // User switched tabs, pause time tracking
        lastUpdateTime = Date.now()
      } else {
        // User returned, reset time tracking to avoid huge time jumps
        lastUpdateTime = Date.now()
      }
    }
    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', updateAnalytics)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [target])

  return analytics
}

// Hook for tracking reading sessions across page visits
export function useReadingSession(postId: string, target: string = 'main') {
  const progress = useReadingProgress(target)
  
  useEffect(() => {
    // Save reading progress to localStorage
    const saveProgress = () => {
      if (progress > 0) {
        const readingSessions = JSON.parse(localStorage.getItem('readingSessions') || '{}')
        readingSessions[postId] = {
          progress,
          lastRead: Date.now(),
          completed: progress >= 95
        }
        localStorage.setItem('readingSessions', JSON.stringify(readingSessions))
      }
    }

    // Debounce saving to avoid too frequent localStorage writes
    const timeoutId = setTimeout(saveProgress, 1000)
    return () => clearTimeout(timeoutId)
  }, [progress, postId])

  // Get saved progress for this post
  const getSavedProgress = () => {
    if (typeof window === 'undefined') return null
    
    const readingSessions = JSON.parse(localStorage.getItem('readingSessions') || '{}')
    return readingSessions[postId] || null
  }

  return {
    currentProgress: progress,
    savedSession: getSavedProgress()
  }
}
