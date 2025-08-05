'use client'

import { useEffect, useState, RefObject } from 'react'

interface UseIntersectionOptions extends IntersectionObserverInit {
  freezeOnceVisible?: boolean
}

export function useIntersection(
  elementRef: RefObject<Element>,
  {
    threshold = 0,
    root = null,
    rootMargin = '0%',
    freezeOnceVisible = false
  }: UseIntersectionOptions = {}
): boolean {
  const [isIntersecting, setIsIntersecting] = useState(false)

  useEffect(() => {
    const element = elementRef?.current

    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isElementIntersecting = entry.isIntersecting
        
        if (!freezeOnceVisible || !isElementIntersecting) {
          setIsIntersecting(isElementIntersecting)
        }
      },
      { threshold, root, rootMargin }
    )

    observer.observe(element)

    return () => {
      observer.unobserve(element)
    }
  }, [elementRef, threshold, root, rootMargin, freezeOnceVisible])

  return isIntersecting
}

// Advanced intersection hook with detailed information
export function useIntersectionAdvanced(
  elementRef: RefObject<Element>,
  options: UseIntersectionOptions = {}
) {
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null)

  useEffect(() => {
    const element = elementRef?.current

    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!options.freezeOnceVisible || !entry.isIntersecting) {
          setEntry(entry)
        }
      },
      options
    )

    observer.observe(element)

    return () => {
      observer.unobserve(element)
    }
  }, [elementRef, options])

  return {
    isIntersecting: entry?.isIntersecting ?? false,
    intersectionRatio: entry?.intersectionRatio ?? 0,
    boundingClientRect: entry?.boundingClientRect,
    intersectionRect: entry?.intersectionRect,
    rootBounds: entry?.rootBounds,
    target: entry?.target,
    time: entry?.time
  }
}

// Hook for multiple elements intersection
export function useMultipleIntersection(
  elementRefs: RefObject<Element>[],
  options: UseIntersectionOptions = {}
) {
  const [intersections, setIntersections] = useState<Map<Element, boolean>>(new Map())

  useEffect(() => {
    const elements = elementRefs
      .map(ref => ref.current)
      .filter(Boolean) as Element[]

    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        setIntersections(prev => {
          const newMap = new Map(prev)
          
          entries.forEach(entry => {
            if (!options.freezeOnceVisible || !entry.isIntersecting) {
              newMap.set(entry.target, entry.isIntersecting)
            }
          })
          
          return newMap
        })
      },
      options
    )

    elements.forEach(element => observer.observe(element))

    return () => {
      elements.forEach(element => observer.unobserve(element))
    }
  }, [elementRefs, options])

  return intersections
}

// Hook for intersection with callback
export function useIntersectionCallback(
  elementRef: RefObject<Element>,
  callback: (isIntersecting: boolean, entry: IntersectionObserverEntry) => void,
  options: UseIntersectionOptions = {}
) {
  useEffect(() => {
    const element = elementRef?.current

    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!options.freezeOnceVisible || !entry.isIntersecting) {
          callback(entry.isIntersecting, entry)
        }
      },
      options
    )

    observer.observe(element)

    return () => {
      observer.unobserve(element)
    }
  }, [elementRef, callback, options])
}

// Hook for lazy loading with intersection observer
export function useLazyLoad(
  elementRef: RefObject<Element>,
  options: UseIntersectionOptions = {}
) {
  const [isLoaded, setIsLoaded] = useState(false)
  const isIntersecting = useIntersection(elementRef, {
    ...options,
    freezeOnceVisible: true
  })

  useEffect(() => {
    if (isIntersecting && !isLoaded) {
      setIsLoaded(true)
    }
  }, [isIntersecting, isLoaded])

  return isLoaded
}

// Hook for scroll-triggered animations
export function useScrollAnimation(
  elementRef: RefObject<Element>,
  animationClass: string = 'animate-in',
  options: UseIntersectionOptions = {}
) {
  const [hasAnimated, setHasAnimated] = useState(false)
  const isIntersecting = useIntersection(elementRef, {
    ...options,
    freezeOnceVisible: true
  })

  useEffect(() => {
    const element = elementRef?.current

    if (isIntersecting && !hasAnimated && element) {
      element.classList.add(animationClass)
      setHasAnimated(true)
    }
  }, [isIntersecting, hasAnimated, animationClass, elementRef])

  return hasAnimated
}

// Hook for visibility tracking (analytics, etc.)
export function useVisibilityTracking(
  elementRef: RefObject<Element>,
  onVisible: () => void,
  options: UseIntersectionOptions = {}
) {
  const [hasBeenVisible, setHasBeenVisible] = useState(false)

  useIntersectionCallback(
    elementRef,
    (isIntersecting) => {
      if (isIntersecting && !hasBeenVisible) {
        onVisible()
        setHasBeenVisible(true)
      }
    },
    { ...options, freezeOnceVisible: true }
  )

  return hasBeenVisible
}

// Hook for progressive image loading
export function useProgressiveImage(
  lowQualitySrc: string,
  highQualitySrc: string,
  elementRef: RefObject<Element>
) {
  const [src, setSrc] = useState(lowQualitySrc)
  const [isLoaded, setIsLoaded] = useState(false)
  const shouldLoad = useIntersection(elementRef, {
    threshold: 0.1,
    freezeOnceVisible: true
  })

  useEffect(() => {
    if (shouldLoad && !isLoaded) {
      const img = new Image()
      img.onload = () => {
        setSrc(highQualitySrc)
        setIsLoaded(true)
      }
      img.src = highQualitySrc
    }
  }, [shouldLoad, highQualitySrc, isLoaded])

  return { src, isLoaded }
}