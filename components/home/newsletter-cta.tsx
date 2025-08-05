'use client'

import * as React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Heart } from 'lucide-react'

export function NewsletterCTA() {
  const [email, setEmail] = React.useState('')
  const [isLoading, setIsLoading] = React.useState(false)
  const [message, setMessage] = React.useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsLoading(true)
    setMessage('')

    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      setMessage('Teşekkürler! Yakında senden haber alacaksın.')
      setEmail('')
    } catch (error) {
      setMessage('Bir hata oluştu. Lütfen tekrar dene.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-2xl text-center">
      <div className="glass rounded-2xl p-8 lg:p-12">
        <Heart className="h-12 w-12 text-primary mx-auto mb-6 fill-current" />
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
          100leşme Yolculuğunda Buluşalım
        </h2>
        <p className="text-lg text-muted-foreground mb-8">
          Yeni yazılarımdan haberdar olmak istiyorsan, e-posta adresini bırak. 
          Sadece anlamlı içerikler, spam yok.
        </p>
        
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <Input
            type="email"
            placeholder="E-posta adresin"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-1"
          />
          <Button type="submit" loading={isLoading} className="shrink-0">
            {isLoading ? 'Kaydediliyor...' : 'Katıl'}
          </Button>
        </form>

        {message && (
          <p className={`mt-4 text-sm ${message.includes('Teşekkürler') ? 'text-green-600' : 'text-red-600'}`}>
            {message}
          </p>
        )}

        <p className="text-xs text-muted-foreground mt-4">
          İstediğin zaman çıkabilirsin. E-posta adresini kimseyle paylaşmam.
        </p>
      </div>
    </div>
  )
}
