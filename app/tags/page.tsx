import { getAllTags } from '@/lib/api'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { Hash, TrendingUp } from 'lucide-react'

export default async function TagsPage() {
  const tags = await getAllTags()

  // Popülerlik sırasına göre sırala
  const sortedTags = tags.sort((a, b) => b.postCount - a.postCount)

  return (
    <div className="container py-12">
      <div className="mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
            Etiketler
          </h1>
          <p className="text-lg text-muted-foreground">
            İlginizi çeken konuları etiketler üzerinden keşfedin.
          </p>
        </div>

        {tags.length > 0 ? (
          <div className="space-y-8">
            {/* Popüler Etiketler */}
            <div>
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <TrendingUp className="mr-2 h-6 w-6 text-primary" />
                Popüler Etiketler
              </h2>
              <div className="flex flex-wrap gap-3">
                {sortedTags.slice(0, 10).map((tag) => (
                  <Link key={tag.slug} href={`/tag/${tag.slug}`}>
                    <Badge
                      variant="outline"
                      className="hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer text-base px-4 py-2"
                    >
                      #{tag.name}
                      <span className="ml-2 text-xs opacity-70">
                        ({tag.postCount})
                      </span>
                    </Badge>
                  </Link>
                ))}
              </div>
            </div>

            {/* Tüm Etiketler */}
            <div>
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <Hash className="mr-2 h-6 w-6 text-primary" />
                Tüm Etiketler
              </h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {sortedTags.map((tag) => (
                  <Link key={tag.slug} href={`/tag/${tag.slug}`}>
                    <div className="p-4 rounded-lg border hover:bg-muted/50 transition-colors group">
                      <div className="flex items-center justify-between">
                        <span className="font-medium group-hover:text-primary transition-colors">
                          #{tag.name}
                        </span>
                        <Badge variant="secondary" className="text-xs">
                          {tag.postCount} yazı
                        </Badge>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <Hash className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Henüz etiket yok</h3>
            <p className="text-muted-foreground">
              İlk yazı yayınlandığında etiketler burada görünecek.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
