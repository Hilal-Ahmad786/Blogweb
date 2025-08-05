import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { formatDate } from '@/lib/utils'
import type { BlogPost } from '@/types/blog'

interface FeaturedPostsProps {
  posts: BlogPost[]
}

export function FeaturedPosts({ posts }: FeaturedPostsProps) {
  if (!posts.length) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Henüz yazı yok.</p>
      </div>
    )
  }

  return (
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
  )
}
