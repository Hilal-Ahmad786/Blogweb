'use client'

import * as React from 'react'

// Simple toast implementation
interface Toast {
  id: string
  title: string
  description?: string
  variant?: 'default' | 'destructive'
}

interface ToastContextType {
  toasts: Toast[]
  toast: (toast: Omit<Toast, 'id'>) => void
  dismiss: (id: string) => void
}

const ToastContext = React.createContext<ToastContextType | undefined>(undefined)

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<Toast[]>([])

  const toast = React.useCallback((toast: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).slice(2)
    setToasts((prev) => [...prev, { id, ...toast }])
    
    // Auto dismiss after 5 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 5000)
  }, [])

  const dismiss = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ toasts, toast, dismiss }}>
      {children}
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = React.useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within ToastProvider')
  }
  return context
}

export function Toaster() {
  const { toasts, dismiss } = useToast()

  return (
    <div className="fixed bottom-0 right-0 z-50 w-full md:max-w-sm p-4 space-y-4">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`
            glass border rounded-lg p-4 shadow-lg transition-all duration-300 animate-slide-in
            ${toast.variant === 'destructive' 
              ? 'border-destructive/20 bg-destructive/10 text-destructive' 
              : 'border-border bg-background'
            }
          `}
        >
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <h4 className="text-sm font-medium">{toast.title}</h4>
              {toast.description && (
                <p className="text-sm text-muted-foreground">{toast.description}</p>
              )}
            </div>
            <button
              onClick={() => dismiss(toast.id)}
              className="text-muted-foreground hover:text-foreground"
            >
              ×
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
