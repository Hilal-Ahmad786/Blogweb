'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { NAVIGATION_ITEMS } from '@/lib/constants'
import { cn } from '@/lib/utils'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname()

  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Menu */}
      <div className="fixed right-0 top-0 h-full w-full max-w-sm border-l bg-background p-6 shadow-lg">
        <div className="flex items-center justify-between mb-8">
          <span className="font-bold text-xl gradient-text">Menu</span>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <nav className="space-y-4">
          {NAVIGATION_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={cn(
                'block px-4 py-3 rounded-lg text-sm font-medium transition-colors',
                pathname === item.href
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              )}
            >
              {item.title}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  )
}
