'use client'

import * as React from 'react'
import { Moon, Sun, Monitor } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export function ThemeSwitcher() {
  const [theme, setTheme] = React.useState('system')
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
    const stored = localStorage.getItem('theme')
    if (stored) {
      setTheme(stored)
      applyTheme(stored)
    }
  }, [])

  const applyTheme = (newTheme: string) => {
    const root = document.documentElement
    
    if (newTheme === 'dark') {
      root.classList.add('dark')
    } else if (newTheme === 'light') {
      root.classList.remove('dark')
    } else {
      // system
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      if (systemPrefersDark) {
        root.classList.add('dark')
      } else {
        root.classList.remove('dark')
      }
    }
  }

  const changeTheme = (newTheme: string) => {
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    applyTheme(newTheme)
  }

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" disabled>
        <Sun className="h-4 w-4" />
      </Button>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Toggle theme">
          <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => changeTheme('light')}
          className={theme === 'light' ? 'bg-accent' : ''}
        >
          <Sun className="mr-2 h-4 w-4" />
          <span>Light</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => changeTheme('dark')}
          className={theme === 'dark' ? 'bg-accent' : ''}
        >
          <Moon className="mr-2 h-4 w-4" />
          <span>Dark</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => changeTheme('system')}
          className={theme === 'system' ? 'bg-accent' : ''}
        >
          <Monitor className="mr-2 h-4 w-4" />
          <span>System</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
