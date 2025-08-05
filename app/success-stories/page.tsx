import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Quote, Star, Heart, ArrowRight } from 'lucide-react'
import Link from 'next/link'

const successStories = [
  {
    id: 1,
    name: "Ayşe K.",
    role: "İnsan Kaynakları Müdürü",
    company: "Teknoloji Şirketi",
    story: "100leşme yazılarını okuduktan sonra kendimle yüzleşme cesareti buldum. Artık daha özgüvenli bir liderim ve ekibimle daha sağlıklı iletişim kuruyorum.",
    highlight: "Özgüven ve liderlik gelişimi",
    rating: 5,
    image: "/images/testimonials/ayse-k.svg"
  },
  {
    id: 2,
    name: "Zeynep M.",
    role: "Girişimci",
    company: "E-ticaret",
    story: "Seda Hanım'ın 'Bu hayat gerçekten benim mi?' sorusu benim de sorduğum sorudu. Kendi işime odaklandım ve bugün başarılı bir girişimciyim.",
    highlight: "Girişimcilik yolculuğu",
    rating: 5,
    image: "/images/testimonials/zeynep-m.svg"
  },
  {
    id: 3,
    name: "Elif T.",
    role: "Proje Yöneticisi",
    company: "Danışmanlık Firması",
    story: "Hem anne hem de profesyonel olarak kendimi geliştirmek istiyordum. 100leşme yaklaşımı sayesinde dengeyi kurdum ve her iki alanda da başarılıyım.",
    highlight: "İş-yaşam dengesi",
    rating: 5,
    image: "/images/testimonials/elif-t.svg"
  }
]

export default function SuccessStoriesPage() {
  return (
    <div className="container py-12">
      <div className="mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
            Başarı Hikayeleri
          </h1>
          <p className="text-lg text-muted-foreground">
            100leşme yolculuğunda ilham alan kadınların gerçek deneyimleri
          </p>
        </div>

        <div className="space-y-8 mb-12">
          {successStories.map((story) => (
            <Card key={story.id} className="glass overflow-hidden">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center flex-shrink-0">
                    <span className="text-primary-foreground font-bold text-lg">
                      {story.name.charAt(0)}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-lg">{story.name}</h3>
                      <div className="flex items-center">
                        {[...Array(story.rating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {story.role} • {story.company}
                    </p>
                    <Badge variant="secondary" className="mt-2">
                      {story.highlight}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <Quote className="absolute -left-2 -top-2 h-8 w-8 text-primary/20" />
                  <blockquote className="text-muted-foreground italic text-lg leading-relaxed pl-6">
                    "{story.story}"
                  </blockquote>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Bölümü */}
        <Card className="bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
          <CardContent className="p-8 text-center">
            <Heart className="h-12 w-12 text-primary mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">Sen de hikayeni paylaş</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              100leşme yolculuğunda nasıl ilerliyorsun? Deneyimlerini paylaş, 
              diğer kadınlara ilham ver. Hikayenin değerli ve duyulmaya değer.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/contact">
                  Hikayemi Paylaş
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/blog">
                  100leşme Yazılarını Oku
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
