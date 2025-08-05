import Link from 'next/link'
import { FOOTER_LINKS, SOCIAL_LINKS, SITE_CONFIG } from '@/lib/constants'
import { Mail, Linkedin, Instagram } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-12">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Marka */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/60">
                <span className="text-primary-foreground font-bold text-sm">1</span>
              </div>
              <span className="font-bold text-xl gradient-text">{SITE_CONFIG.name}</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground max-w-xs">
              {SITE_CONFIG.description}
            </p>
          </div>

          {/* İçerik Linkleri */}
          <div>
            <h3 className="font-semibold mb-4">İçerik</h3>
            <ul className="space-y-3">
              {FOOTER_LINKS.content.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Hakkımda Linkleri */}
          <div>
            <h3 className="font-semibold mb-4">Hakkımda</h3>
            <ul className="space-y-3">
              {FOOTER_LINKS.about.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Kaynaklar */}
          <div>
            <h3 className="font-semibold mb-4">Kaynaklar</h3>
            <ul className="space-y-3">
              {FOOTER_LINKS.resources.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              © 2024 {SITE_CONFIG.name}. Tüm hakları saklıdır.
            </p>
            <div className="flex space-x-4 mt-4 sm:mt-0">
              <Link
                href={SOCIAL_LINKS.email}
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="E-posta"
              >
                <Mail className="h-4 w-4" />
              </Link>
              <Link
                href={SOCIAL_LINKS.linkedin}
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="LinkedIn"
                target="_blank"
              >
                <Linkedin className="h-4 w-4" />
              </Link>
              <Link
                href={SOCIAL_LINKS.instagram}
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Instagram"
                target="_blank"
              >
                <Instagram className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
