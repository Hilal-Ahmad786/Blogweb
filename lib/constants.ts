// Site yapılandırması
export const SITE_CONFIG = {
  name: '100leşme',
  description: 'Kendimle 100leşme yolculuğum. Liderlik, kişisel gelişim ve yaşamdan öğrendiklerim.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  ogImage: '/images/og-image.jpg',
  links: {
    email: '100lesmeofficial@gmail.com',
    linkedin: 'https://linkedin.com/in/seda-tokmak',
    instagram: 'https://instagram.com/100lesme',
  },
}

// Navigasyon öğeleri
export const NAVIGATION_ITEMS = [
  {
    title: 'Ana Sayfa',
    href: '/',
  },
  {
    title: 'Blog',
    href: '/blog',
  },
  {
    title: 'Kategoriler',
    href: '/categories',
  },
  {
    title: 'Başarı Hikayeleri',
    href: '/success-stories',
  },
  {
    title: 'Hakkımda',
    href: '/about',
  },
  {
    title: 'İletişim',
    href: '/contact',
  },
]

// Footer linkleri
export const FOOTER_LINKS = {
  content: [
    { title: 'Blog', href: '/blog' },
    { title: 'Kategoriler', href: '/categories' },
    { title: 'Etiketler', href: '/tags' },
    { title: 'Arama', href: '/search' },
  ],
  about: [
    { title: 'Hakkımda', href: '/about' },
    { title: 'Başarı Hikayeleri', href: '/success-stories' },
    { title: 'İletişim', href: '/contact' },
    { title: 'Gizlilik Politikası', href: '/privacy' },
  ],
  resources: [
    { title: 'RSS Feed', href: '/feed.xml' },
    { title: 'Site Haritası', href: '/sitemap.xml' },
    { title: 'Bülten', href: '/newsletter' },
  ],
}

// Sosyal medya linkleri
export const SOCIAL_LINKS = {
  email: 'mailto:100lesmeofficial@gmail.com',
  linkedin: 'https://linkedin.com/in/seda-tokmak',
  instagram: 'https://instagram.com/100lesme',
}
// Pagination
export const POSTS_PER_PAGE = 12
export const POSTS_PER_PAGE_COMPACT = 6
export const RELATED_POSTS_COUNT = 3
export const FEATURED_POSTS_COUNT = 3
// İçerik limitleri
export const POST_EXCERPT_LENGTH = 160
export const POST_TITLE_MAX_LENGTH = 100
export const POST_DESCRIPTION_MAX_LENGTH = 200
// Tema yapılandırması
export const THEME_CONFIG = {
defaultTheme: 'system' as const,
enableSystem: true,
disableTransitionOnChange: false,
}
// Form doğrulama
export const VALIDATION_CONFIG = {
email: {
minLength: 5,
maxLength: 100,
pattern: /^[^\s@]+@[^\s@]+.[^\s@]+$/,
},
name: {
minLength: 2,
maxLength: 50,
},
subject: {
minLength: 5,
maxLength: 100,
},
message: {
minLength: 10,
maxLength: 1000,
},
search: {
minLength: 2,
maxLength: 100,
},
}
// Hata mesajları
export const ERROR_MESSAGES = {
generic: 'Bir hata oluştu. Lütfen tekrar deneyin.',
network: 'Bağlantı hatası. İnternet bağlantınızı kontrol edin.',
notFound: 'İstenen sayfa bulunamadı.',
validation: 'Lütfen girdiğiniz bilgileri kontrol edin.',
rateLimit: 'Çok fazla istek. Lütfen daha sonra tekrar deneyin.',
}
// Başarı mesajları
export const SUCCESS_MESSAGES = {
formSubmitted: 'Form başarıyla gönderildi!',
newsletterSubscribed: 'Bültene başarıyla abone oldunuz!',
messageSent: 'Mesajınız başarıyla gönderildi!',
copied: 'Panoya kopyalandı!',
}
