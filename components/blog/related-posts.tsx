import Link from 'next/link'
import Image from 'next/image'

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  publishedAt: string
  tags: string[]
  coverImage?: string
  readingTime?: number
}

interface RelatedPostsProps {
  currentPostId: string
  currentPostTags: string[]
  posts?: BlogPost[]
  maxPosts?: number
}

// Function to calculate similarity score between posts
function calculateSimilarity(post: BlogPost, currentTags: string[]): number {
  const commonTags = post.tags.filter(tag => currentTags.includes(tag))
  return commonTags.length / Math.max(currentTags.length, post.tags.length)
}

// Function to get related posts based on tags
function getRelatedPosts(
  allPosts: BlogPost[],
  currentPostId: string,
  currentTags: string[],
  maxPosts: number = 3
): BlogPost[] {
  // Filter out current post and calculate similarity scores
  const otherPosts = allPosts
    .filter(post => post.id !== currentPostId)
    .map(post => ({
      ...post,
      similarity: calculateSimilarity(post, currentTags)
    }))
    .filter(post => post.similarity > 0) // Only posts with at least one common tag
    .sort((a, b) => b.similarity - a.similarity) // Sort by similarity score
    .slice(0, maxPosts)

  return otherPosts
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

export default function RelatedPosts({
  currentPostId,
  currentPostTags,
  posts = [],
  maxPosts = 3
}: RelatedPostsProps) {
  const relatedPosts = getRelatedPosts(posts, currentPostId, currentPostTags, maxPosts)

  if (relatedPosts.length === 0) {
    return null
  }

  return (
    <section className="mt-12 pt-8 border-t border-gray-200">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">
        Related Posts
      </h3>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {relatedPosts.map((post) => (
          <article
            key={post.id}
            className="group bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-200"
          >
            <Link href={`/blog/${post.slug}`}>
              {/* Cover Image */}
              {post.coverImage ? (
                <div className="aspect-video overflow-hidden">
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    width={400}
                    height={225}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                </div>
              ) : (
                <div className="aspect-video bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <div className="text-white text-center">
                    <svg
                      className="w-12 h-12 mx-auto mb-2 opacity-80"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                      />
                    </svg>
                    <p className="text-sm font-medium opacity-90">
                      {post.title.split(' ').slice(0, 3).join(' ')}
                    </p>
                  </div>
                </div>
              )}

              {/* Content */}
              <div className="p-4">
                <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-2 line-clamp-2">
                  {post.title}
                </h4>
                
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {post.excerpt}
                </p>

                {/* Meta */}
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <time dateTime={post.publishedAt}>
                    {formatDate(post.publishedAt)}
                  </time>
                  {post.readingTime && (
                    <span>{post.readingTime} min read</span>
                  )}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mt-3">
                  {post.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className={`px-2 py-1 text-xs rounded-full ${
                        currentPostTags.includes(tag)
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                  {post.tags.length > 3 && (
                    <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-600">
                      +{post.tags.length - 3}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          </article>
        ))}
      </div>

      {/* View All Posts Link */}
      <div className="text-center mt-8">
        <Link
          href="/blog"
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
        >
          View all posts
          <svg
            className="ml-1 w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>
      </div>
    </section>
  )
}

// Alternative simpler version if you want minimal related posts
export function SimpleRelatedPosts({
  currentPostId,
  currentPostTags,
  posts = [],
  maxPosts = 3
}: RelatedPostsProps) {
  const relatedPosts = getRelatedPosts(posts, currentPostId, currentPostTags, maxPosts)

  if (relatedPosts.length === 0) {
    return null
  }

  return (
    <aside className="mt-8 p-6 bg-gray-50 rounded-lg">
      <h4 className="font-semibold text-gray-900 mb-4">You might also like</h4>
      <ul className="space-y-3">
        {relatedPosts.map((post) => (
          <li key={post.id}>
            <Link
              href={`/blog/${post.slug}`}
              className="block hover:text-blue-600 transition-colors"
            >
              <div className="flex justify-between items-start">
                <h5 className="font-medium text-sm line-clamp-2 flex-1 mr-2">
                  {post.title}
                </h5>
                <time className="text-xs text-gray-500 whitespace-nowrap">
                  {formatDate(post.publishedAt)}
                </time>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  )
}