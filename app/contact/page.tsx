'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Mail, Linkedin, Instagram, MapPin } from 'lucide-react'
import Link from 'next/link'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage('')

    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      setMessage('Mesajınız için teşekkürler! En kısa sürede size dönüş yapacağım.')
      setFormData({ name: '', email: '', subject: '', message: '' })
    } catch (error) {
      setMessage('Bir hata oluştu. Lütfen tekrar deneyin.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <div className="container py-12">
      <div className="mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
            İletişim
          </h1>
          <p className="text-lg text-muted-foreground">
            Sorularınız, görüşleriniz veya işbirliği teklifleriniz için benimle iletişime geçin.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* İletişim Formu */}
          <Card>
            <CardHeader>
              <CardTitle>Mesaj Gönder</CardTitle>
              <CardDescription>
                Size en kısa sürede dönüş yapabilmem için aşağıdaki formu doldurun.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      İsim
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="İsminiz"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      E-posta
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="ornek@email.com"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-2">
                    Konu
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    type="text"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Mesajınızın konusu"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Mesaj
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Mesajınızı buraya yazın..."
                    rows={5}
                    required
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full"
                  loading={isSubmitting}
                >
                  {isSubmitting ? 'Gönderiliyor...' : 'Mesaj Gönder'}
                </Button>

                {message && (
                  <p className={`text-sm text-center ${
                    message.includes('teşekkürler') ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {message}
                  </p>
                )}
              </form>
            </CardContent>
          </Card>

          {/* İletişim Bilgileri */}
          <div className="space-y-6">
            <Card className="glass">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Doğrudan İletişim</h3>
                <div className="space-y-4">
                  <Link 
                    href="mailto:100lesmeofficial@gmail.com"
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <Mail className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">E-posta</p>
                      <p className="text-sm text-muted-foreground">100lesmeofficial@gmail.com</p>
                    </div>
                  </Link>
                  
                  <Link 
                    href="https://linkedin.com/in/seda-tokmak"
                    target="_blank"
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <Linkedin className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">LinkedIn</p>
                      <p className="text-sm text-muted-foreground">Profesyonel ağımda bağlantı kuralım</p>
                    </div>
                  </Link>

                  <Link 
                    href="https://instagram.com/100lesme"
                    target="_blank"
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <Instagram className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Instagram</p>
                      <p className="text-sm text-muted-foreground">Günlük paylaşımları takip edin</p>
                    </div>
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card className="glass">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">100leşme Topluluğu</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Kendini keşfetme yolculuğunda yalnız değilsin. 100leşme topluluğuna katıl, 
                  deneyimlerini paylaş ve birlikte büyüyelim.
                </p>
                <div className="space-y-2 text-sm">
                  <p>✨ Haftalık motivasyon e-postaları</p>
                  <p>🌱 Özel içerikler ve rehberler</p>
                  <p>👥 Topluluk etkinlikleri</p>
                  <p>📚 Kişisel gelişim kaynakları</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
