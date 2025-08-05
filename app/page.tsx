import { HeroSection } from '@/components/home/hero-section'
import { FeaturedPosts } from '@/components/home/featured-posts'
import { TrendingTags } from '@/components/home/trending-tags'
import { NewsletterCTA } from '@/components/home/newsletter-cta'
import { getAllPosts } from '@/lib/api'

export default async function HomePage() {
  const allPosts = await getAllPosts()
  const featuredPosts = allPosts.slice(0, 3)

  // Use predefined relevant tags instead of calculating from posts
  const personalDevelopmentTags = [
    '100leşme',
    'Kendini Tanıma', 
    'Liderlik',
    'Özgüven',
    'Kişisel Gelişim',
    'İç Ses',
    'Yaşam Felsefesi',
    'Kadın',
    'İş Yaşamı',
    'Motivasyon'
  ]

  return (
    <div className="flex flex-col">
      {/* Hero Bölümü */}
      <HeroSection />
      
      {/* Son Yazılar */}
      <section className="py-16 lg:py-24">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl gradient-text">
              Son Yazılar
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              100leşme yolculuğumdan en güncel paylaşımları keşfedin.
            </p>
          </div>
          <FeaturedPosts posts={featuredPosts} />
        </div>
      </section>

      {/* Popüler Konular */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Popüler Konular
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              En çok ilgi gören konuları keşfedin ve kendinizi geliştirin.
            </p>
          </div>
          <TrendingTags tags={personalDevelopmentTags} />
        </div>
      </section>

      {/* Bülten Kaydı */}
      <section className="py-16 lg:py-24">
        <div className="container">
          <NewsletterCTA />
        </div>
      </section>
    </div>
  )
}