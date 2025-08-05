import { getAllPosts } from '@/lib/api'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { formatDate } from '@/lib/utils'
import Link from 'next/link'

export default async function BlogPage() {
  const posts = await getAllPosts()

  return (
    <div className="container py-12">
      <div className="mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
            Tüm Yazılar
          </h1>
          <p className="text-lg text-muted-foreground">
            100leşme yolculuğumdan tüm yazıları keşfedin ve ilham alın.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <Card className="h-full transition-all duration-300 hover:shadow-lg card-hover">
                {post.coverImage && (
                  <div className="aspect-video overflow-hidden rounded-t-lg">
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                )}
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary">{post.category}</Badge>
                    <span className="text-xs text-muted-foreground">
                      {post.readingTime} dk okuma
                    </span>
                  </div>
                  <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                  <CardDescription className="line-clamp-3">
                    {post.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      {formatDate(post.date)}
                    </span>
                    <span className="text-sm font-medium text-primary">
                      Devamını oku →
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {posts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Henüz yazı yok.</p>
          </div>
        )}
      </div>
    </div>
  )
}
