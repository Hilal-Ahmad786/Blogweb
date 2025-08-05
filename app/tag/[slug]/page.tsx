import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Metadata } from 'next'

// Define your post type - adjust based on your actual data structure
interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  publishedAt: string
  tags: string[]
  author?: {
    name: string
    avatar?: string
  }
  coverImage?: string
}

interface TagPageProps {
  params: {
    slug: string
  }
}

// This function should fetch posts by tag - adapt to your data source
async function getPostsByTag(tag: string): Promise<BlogPost[]> {
  try {
    // Option 1: If you have an API route
    // const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/posts?tag=${tag}`)
    // if (!response.ok) return []
    // return response.json()

    // Option 2: If you use a CMS or database
    // Replace this with your actual data fetching logic
    // For now, returning empty array - you'll need to implement this
    
    // Example structure for when you implement:
    return []
    
  } catch (error) {
    console.error('Error fetching posts by tag:', error)
    return []
  }
}

// Function to format date
function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

export default async function TagPage({ params }: TagPageProps) {
  const { slug } = params
  const decodedTag = decodeURIComponent(slug)
  
  // Fetch posts for this tag
  const posts = await getPostsByTag(decodedTag)
  
  // If no posts found, you might want to show the page anyway
  // or redirect to 404 - depending on your preference
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
            <Link href="/" className="hover:text-blue-600 transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/tags" className="hover:text-blue-600 transition-colors">
              Tags
            </Link>
            <span>/</span>
            <span className="text-gray-900">{decodedTag}</span>
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Posts tagged with "{decodedTag}"
          </h1>
          
          <p className="text-lg text-gray-600">
            {posts.length} {posts.length === 1 ? 'post' : 'posts'} found
          </p>
        </div>

        {/* Posts Grid */}
        {posts.length > 0 ? (
          <div className="space-y-8">
            {posts.map((post) => (
              <article 
                key={post.id} 
                className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="p-6">
                  {/* Post Title */}
                  <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                    <Link 
                      href={`/blog/${post.slug}`}
                      className="hover:text-blue-600 transition-colors"
                    >
                      {post.title}
                    </Link>
                  </h2>
                  
                  {/* Post Meta */}
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                    <time dateTime={post.publishedAt}>
                      {formatDate(post.publishedAt)}
                    </time>
                    {post.author && (
                      <span>by {post.author.name}</span>
                    )}
                  </div>
                  
                  {/* Post Excerpt */}
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    {post.excerpt}
                  </p>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag) => (
                      <Link
                        key={tag}
                        href={`/tag/${encodeURIComponent(tag)}`}
                        className={`px-3 py-1 text-xs rounded-full transition-colors ${
                          tag === decodedTag 
                            ? 'bg-blue-100 text-blue-800' 
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {tag}
                      </Link>
                    ))}
                  </div>
                  
                  {/* Read More Link */}
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors"
                  >
                    Read more
                    <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          // Empty State
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No posts found
            </h3>
            <p className="text-gray-600 mb-6">
              There are no posts tagged with "{decodedTag}" yet.
            </p>
            <Link
              href="/blog"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Browse all posts
            </Link>
          </div>
        )}
        
        {/* Back to Tags */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <Link
            href="/tags"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <svg className="mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            View all tags
          </Link>
        </div>
      </div>
    </div>
  )
}

// Generate metadata for SEO
export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  const decodedTag = decodeURIComponent(params.slug)
  
  return {
    title: `Posts tagged with "${decodedTag}" | Your Blog Name`,
    description: `Browse all blog posts tagged with ${decodedTag}. Discover related content and insights.`,
    openGraph: {
      title: `Posts tagged with "${decodedTag}"`,
      description: `Browse all blog posts tagged with ${decodedTag}`,
      type: 'website',
    },
  }
}