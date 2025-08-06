'use client'

import { useState, useEffect, useContext, createContext, ReactNode } from 'react'

type Theme = 'light' | 'dark' | 'system'

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
  resolvedTheme: 'light' | 'dark'
  systemTheme: 'light' | 'dark'
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

// Theme Provider Component
export function ThemeProvider({ 
  children,
  defaultTheme = 'system',
  storageKey = 'theme',
  attribute = 'data-theme',
  enableSystem = true
}: {
  children: ReactNode
  defaultTheme?: Theme
  storageKey?: string
  attribute?: string
  enableSystem?: boolean
}) {
  const [theme, setThemeState] = useState<Theme>(defaultTheme)
  const [systemTheme, setSystemTheme] = useState<'light' | 'dark'>('light')
  const [mounted, setMounted] = useState(false)

  // Get system theme preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    setSystemTheme(mediaQuery.matches ? 'dark' : 'light')

    const handleChange = (e: MediaQueryListEvent) => {
      setSystemTheme(e.matches ? 'dark' : 'light')
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  // Load theme from localStorage on mount
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem(storageKey) as Theme
      if (savedTheme && ['light', 'dark', 'system'].includes(savedTheme)) {
        setThemeState(savedTheme)
      }
    } catch (error) {
      console.error('Error loading theme from localStorage:', error)
    }
    setMounted(true)
  }, [storageKey])

  // Calculate resolved theme
  const resolvedTheme = theme === 'system' ? systemTheme : theme

  // Apply theme to document
  useEffect(() => {
    if (!mounted) return

    const root = document.documentElement
    
    // Remove previous theme classes/attributes
    root.classList.remove('light', 'dark')
    root.removeAttribute('data-theme')
    
    // Apply new theme
    if (attribute.startsWith('class')) {
      root.classList.add(resolvedTheme)
    } else {
      root.setAttribute(attribute, resolvedTheme)
    }

    // Also set class for Tailwind dark mode
    if (resolvedTheme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  }, [resolvedTheme, mounted, attribute])

  // Set theme function
  const setTheme = (newTheme: Theme) => {
    try {
      localStorage.setItem(storageKey, newTheme)
      setThemeState(newTheme)
    } catch (error) {
      console.error('Error saving theme to localStorage:', error)
    }
  }

  // Toggle between light and dark (ignores system)
  const toggleTheme = () => {
    if (theme === 'system') {
      setTheme(systemTheme === 'dark' ? 'light' : 'dark')
    } else {
      setTheme(theme === 'dark' ? 'light' : 'dark')
    }
  }

  const value: ThemeContextType = {
    theme,
    setTheme,
    resolvedTheme,
    systemTheme,
    toggleTheme
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}

// Main useTheme hook
export function useTheme() {
  const context = useContext(ThemeContext)
  
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  
  return context
}

// Simple theme hook without context (for standalone usage)
export function useSimpleTheme(defaultTheme: 'light' | 'dark' = 'light') {
  const [theme, setThemeState] = useState<'light' | 'dark'>(defaultTheme)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Load from localStorage
    try {
      const saved = localStorage.getItem('simple-theme') as 'light' | 'dark'
      if (saved && ['light', 'dark'].includes(saved)) {
        setThemeState(saved)
      }
    } catch (error) {
      console.error('Error loading theme:', error)
    }
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    // Apply theme
    document.documentElement.classList.toggle('dark', theme === 'dark')
    
    // Save to localStorage
    try {
      localStorage.setItem('simple-theme', theme)
    } catch (error) {
      console.error('Error saving theme:', error)
    }
  }, [theme, mounted])

  const toggleTheme = () => {
    setThemeState(prev => prev === 'dark' ? 'light' : 'dark')
  }

  return { theme, setTheme: setThemeState, toggleTheme, mounted }
}

// Hook for system theme detection
export function useSystemTheme() {
  const [systemTheme, setSystemTheme] = useState<'light' | 'dark'>('light')

  useEffect(() => {
    if (typeof window === 'undefined') return

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    setSystemTheme(mediaQuery.matches ? 'dark' : 'light')

    const handleChange = (e: MediaQueryListEvent) => {
      setSystemTheme(e.matches ? 'dark' : 'light')
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  return systemTheme
}

// Hook for theme-aware animations
export function useThemeTransition(duration: number = 300) {
  const { resolvedTheme } = useTheme()
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    setIsTransitioning(true)
    const timer = setTimeout(() => setIsTransitioning(false), duration)
    return () => clearTimeout(timer)
  }, [resolvedTheme, duration])

  return { isTransitioning, resolvedTheme }
}

// Hook for theme-specific values
export function useThemeValue<T>(lightValue: T, darkValue: T): T {
  const { resolvedTheme } = useTheme()
  return resolvedTheme === 'dark' ? darkValue : lightValue
}

// Hook for theme-specific CSS classes
export function useThemeClasses(lightClasses: string, darkClasses: string): string {
  const { resolvedTheme } = useTheme()
  return resolvedTheme === 'dark' ? darkClasses : lightClasses
}

// Hook for persisted theme state with custom storage
export function usePersistedTheme(
  key: string = 'theme',
  defaultValue: Theme = 'system'
) {
  const [theme, setThemeState] = useState<Theme>(defaultValue)
  const [loaded, setLoaded] = useState(false)

  // Load from storage
  useEffect(() => {
    try {
      const item = localStorage.getItem(key)
      if (item && ['light', 'dark', 'system'].includes(item)) {
        setThemeState(item as Theme)
      }
    } catch (error) {
      console.error(`Error loading ${key} from localStorage:`, error)
    } finally {
      setLoaded(true)
    }
  }, [key])

  // Save to storage
  const setTheme = (value: Theme) => {
    try {
      setThemeState(value)
      localStorage.setItem(key, value)
    } catch (error) {
      console.error(`Error saving ${key} to localStorage:`, error)
    }
  }

  return { theme, setTheme, loaded }
}

// Theme toggle button component hook
export function useThemeToggle() {
  const { theme, setTheme, resolvedTheme, toggleTheme } = useTheme()

  const getNextTheme = (): Theme => {
    switch (theme) {
      case 'light':
        return 'dark'
      case 'dark':
        return 'system'
      case 'system':
        return 'light'
      default:
        return 'light'
    }
  }

  const cycleTheme = () => {
    setTheme(getNextTheme())
  }

  const getThemeIcon = () => {
    switch (resolvedTheme) {
      case 'light':
        return '☀️'
      case 'dark':
        return '🌙'
      default:
        return '☀️'
    }
  }

  const getThemeLabel = () => {
    switch (theme) {
      case 'light':
        return 'Light mode'
      case 'dark':
        return 'Dark mode'
      case 'system':
        return `System (${resolvedTheme})`
      default:
        return 'Light mode'
    }
  }

  return {
    theme,
    resolvedTheme,
    toggleTheme,
    cycleTheme,
    setTheme,
    getThemeIcon,
    getThemeLabel,
    nextTheme: getNextTheme()
  }
}

// Hook for theme-aware color values
export function useThemeColors() {
  const { resolvedTheme } = useTheme()
  
  const colors = {
    light: {
      primary: '#3B82F6',
      secondary: '#64748B',
      background: '#FFFFFF',
      surface: '#F8FAFC',
      text: '#1E293B',
      textSecondary: '#64748B',
      border: '#E2E8F0',
      accent: '#8B5CF6'
    },
    dark: {
      primary: '#60A5FA',
      secondary: '#94A3B8',
      background: '#0F172A',
      surface: '#1E293B',
      text: '#F1F5F9',
      textSecondary: '#94A3B8',
      border: '#334155',
      accent: '#A78BFA'
    }
  }
  
  return colors[resolvedTheme]
}

// Hook for theme-aware media queries
export function useThemeMediaQuery() {
  const [matches, setMatches] = useState(false)
  
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    setMatches(mediaQuery.matches)
    
    const handleChange = (e: MediaQueryListEvent) => {
      setMatches(e.matches)
    }
    
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])
  
  return {
    prefersDark: matches,
    prefersLight: !matches
  }
}

// Hook for smooth theme transitions
export function useSmoothThemeTransition(duration: number = 200) {
  const { resolvedTheme } = useTheme()
  
  useEffect(() => {
    const root = document.documentElement
    
    // Add transition styles
    root.style.setProperty('--theme-transition-duration', `${duration}ms`)
    root.classList.add('theme-transitioning')
    
    // Remove transition class after duration
    const timer = setTimeout(() => {
      root.classList.remove('theme-transitioning')
    }, duration)
    
    return () => {
      clearTimeout(timer)
      root.classList.remove('theme-transitioning')
    }
  }, [resolvedTheme, duration])
}

// Hook for theme persistence with different storage options
export function useAdvancedThemePersistence(
  key: string = 'theme',
  storage: 'localStorage' | 'sessionStorage' | 'cookie' = 'localStorage'
) {
  const [theme, setThemeState] = useState<Theme>('system')
  const [isLoaded, setIsLoaded] = useState(false)
  
  // Get storage API
  const getStorage = () => {
    switch (storage) {
      case 'localStorage':
        return window.localStorage
      case 'sessionStorage':
        return window.sessionStorage
      case 'cookie':
        return {
          getItem: (key: string) => {
            const cookies = document.cookie.split(';')
            const cookie = cookies.find(c => c.trim().startsWith(`${key}=`))
            return cookie ? cookie.split('=')[1] : null
          },
          setItem: (key: string, value: string) => {
            document.cookie = `${key}=${value}; path=/; max-age=31536000` // 1 year
          }
        }
      default:
        return window.localStorage
    }
  }
  
  // Load theme
  useEffect(() => {
    try {
      const storageApi = getStorage()
      const saved = storageApi.getItem(key) as Theme
      if (saved && ['light', 'dark', 'system'].includes(saved)) {
        setThemeState(saved)
      }
    } catch (error) {
      console.error('Error loading theme:', error)
    } finally {
      setIsLoaded(true)
    }
  }, [key, storage])
  
  // Save theme
  const setTheme = (newTheme: Theme) => {
    try {
      const storageApi = getStorage()
      storageApi.setItem(key, newTheme)
      setThemeState(newTheme)
    } catch (error) {
      console.error('Error saving theme:', error)
    }
  }
  
  return { theme, setTheme, isLoaded }
}