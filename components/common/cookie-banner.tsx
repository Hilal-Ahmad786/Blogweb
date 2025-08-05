'use client'

import * as React from 'react'
import { Button } from '@/components/ui/button'

export function CookieBanner() {
  const [isVisible, setIsVisible] = React.useState(false)

  React.useEffect(() => {
    const hasAccepted = localStorage.getItem('cookie-consent')
    if (!hasAccepted) {
      setIsVisible(true)
    }
  }, [])

  const acceptCookies = () => {
    localStorage.setItem('cookie-consent', 'true')
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4">
      <div className="mx-auto max-w-4xl glass border rounded-lg p-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex-1">
            <p className="text-sm text-foreground">
              We use cookies to enhance your browsing experience and analyze our traffic. 
              By clicking "Accept", you consent to our use of cookies.
            </p>
          </div>
          <div className="flex gap-2 shrink-0">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsVisible(false)}
            >
              Decline
            </Button>
            <Button size="sm" onClick={acceptCookies}>
              Accept
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
