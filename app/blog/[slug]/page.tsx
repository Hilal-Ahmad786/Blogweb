import { getPostBySlug, getAllPosts } from '@/lib/api'
import { formatDate } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { notFound } from 'next/navigation'

interface PostPageProps {
  params: {
    slug: string
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <article className="container py-12">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Badge>{post.category}</Badge>
            <span className="text-sm text-muted-foreground">
              {post.readingTime} min read
            </span>
            <span className="text-sm text-muted-foreground">
              {formatDate(post.date)}
            </span>
          </div>
          
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
            {post.title}
          </h1>
          
          <p className="text-xl text-muted-foreground mb-6">
            {post.description}
          </p>

          {post.coverImage && (
            <div className="aspect-video overflow-hidden rounded-lg mb-8">
              <img
                src={post.coverImage}
                alt={post.title}
                className="h-full w-full object-cover"
              />
            </div>
          )}
        </header>

        {/* Content */}
        <div className="prose prose-lg max-w-none">
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>

        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="mt-12 pt-8 border-t">
            <h3 className="text-lg font-semibold mb-4">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  )
}

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}
