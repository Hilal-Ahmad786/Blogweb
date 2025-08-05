import { getPostsByCategory, getAllCategories } from '@/lib/api'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { formatDate } from '@/lib/utils'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Folder } from 'lucide-react'

interface CategoryPageProps {
  params: {
    slug: string
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const posts = await getPostsByCategory(params.slug)
  const categories = await getAllCategories()
  const currentCategory = categories.find(cat => cat.slug === params.slug)

  if (!currentCategory) {
    notFound()
  }

  return (
    <div className="container py-12">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 rounded-lg bg-primary/10 text-primary mr-3">
              <Folder className="h-8 w-8" />
            </div>
            <Badge variant="secondary" className="text-sm">
              {posts.length} yazı
            </Badge>
          </div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
            {currentCategory.name}
          </h1>
          <p className="text-lg text-muted-foreground">
            {currentCategory.description}
          </p>
        </div>

        {/* Posts */}
        {posts.length > 0 ? (
          <div className="space-y-6">
            {posts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`}>
                <Card className="group transition-all duration-300 hover:shadow-lg card-hover">
                  <div className="md:flex">
                    {post.coverImage && (
                      <div className="md:w-1/3">
                        <div className="aspect-video md:aspect-square overflow-hidden rounded-t-lg md:rounded-l-lg md:rounded-t-none">
                          <img
                            src={post.coverImage}
                            alt={post.title}
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>
                      </div>
                    )}
                    <div className={post.coverImage ? "md:w-2/3" : "w-full"}>
                      <CardHeader>
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="secondary">{post.category}</Badge>
                          <span className="text-xs text-muted-foreground">
                            {post.readingTime} dk okuma
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {formatDate(post.date)}
                          </span>
                        </div>
                        <CardTitle className="group-hover:text-primary transition-colors">
                          {post.title}
                        </CardTitle>
                        <CardDescription className="line-clamp-2">
                          {post.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <div className="flex flex-wrap gap-1">
                            {post.tags.slice(0, 3).map((tag) => (
                              <Badge key={tag} variant="outline" className="text-xs">
                                #{tag}
                              </Badge>
                            ))}
                          </div>
                          <span className="text-sm font-medium text-primary">
                            Devamını oku →
                          </span>
                        </div>
                      </CardContent>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Folder className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Bu kategoride henüz yazı yok</h3>
            <p className="text-muted-foreground mb-6">
              Bu kategori için yazılar hazırlanıyor. Diğer kategorilere göz atabilirsiniz.
            </p>
            <Link href="/categories" className="text-primary hover:underline">
              Tüm Kategoriler →
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export async function generateStaticParams() {
  const categories = await getAllCategories()
  return categories.map((category) => ({
    slug: category.slug,
  }))
}
