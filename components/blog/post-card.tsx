import Link from 'next/link'
import Image from 'next/image'

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content?: string
  publishedAt: string
  updatedAt?: string
  tags: string[]
  category?: string
  coverImage?: string
  readingTime?: number
  featured?: boolean
  author: {
    id: string
    name: string
    avatar?: string
  }
}

interface PostCardProps {
  post: BlogPost
  variant?: 'default' | 'featured' | 'minimal' | 'horizontal' | 'grid'
  showAuthor?: boolean
  showExcerpt?: boolean
  showTags?: boolean
  showReadingTime?: boolean
  showCategory?: boolean
  className?: string
}

export default function PostCard({
  post,
  variant = 'default',
  showAuthor = true,
  showExcerpt = true,
  showTags = true,
  showReadingTime = true,
  showCategory = true,
  className = ''
}: PostCardProps) {
  const {
    title,
    slug,
    excerpt,
    publishedAt,
    tags,
    category,
    coverImage,
    readingTime,
    featured,
    author
  } = post

  const formattedDate = new Date(publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  if (variant === 'minimal') {
    return (
      <article className={`group ${className}`}>
        <Link href={`/blog/${slug}`}>
          <div className="flex items-start space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors">
            {coverImage && (
              <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                <Image
                  src={coverImage}
                  alt={title}
                  width={64}
                  height={64}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 mb-1">
                {title}
              </h3>
              <div className="flex items-center text-sm text-gray-500 space-x-2">
                <time dateTime={publishedAt}>{formattedDate}</time>
                {showReadingTime && readingTime && (
                  <>
                    <span>•</span>
                    <span>{readingTime} min read</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </Link>
      </article>
    )
  }

  if (variant === 'horizontal') {
    return (
      <article className={`group bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-200 ${className}`}>
        <Link href={`/blog/${slug}`}>
          <div className="flex">
            {coverImage && (
              <div className="w-48 h-32 flex-shrink-0">
                <Image
                  src={coverImage}
                  alt={title}
                  width={192}
                  height={128}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                />
              </div>
            )}
            <div className="flex-1 p-4">
              {showCategory && category && (
                <span className="inline-block px-2 py-1 text-xs font-medium text-blue-600 bg-blue-50 rounded-full mb-2">
                  {category}
                </span>
              )}
              
              <h3 className="font-semibold text-lg text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 mb-2">
                {title}
              </h3>
              
              {showExcerpt && excerpt && (
                <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                  {excerpt}
                </p>
              )}
              
              <PostMeta
                author={author}
                publishedAt={publishedAt}
                readingTime={readingTime}
                showAuthor={showAuthor}
                showReadingTime={showReadingTime}
              />
            </div>
          </div>
        </Link>
      </article>
    )
  }

  if (variant === 'featured') {
    return (
      <article className={`group bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 ${className}`}>
        <Link href={`/blog/${slug}`}>
          {coverImage && (
            <div className="aspect-video overflow-hidden relative">
              <Image
                src={coverImage}
                alt={title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {featured && (
                <div className="absolute top-4 left-4">
                  <span className="bg-yellow-400 text-yellow-900 px-2 py-1 text-xs font-semibold rounded-full">
                    Featured
                  </span>
                </div>
              )}
            </div>
          )}
          
          <div className="p-6">
            {showCategory && category && (
              <span className="inline-block px-3 py-1 text-sm font-medium text-blue-600 bg-blue-50 rounded-full mb-3">
                {category}
              </span>
            )}
            
            <h2 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-3 line-clamp-2">
              {title}
            </h2>
            
            {showExcerpt && excerpt && (
              <p className="text-gray-600 mb-4 line-clamp-3">
                {excerpt}
              </p>
            )}
            
            <PostMeta
              author={author}
              publishedAt={publishedAt}
              readingTime={readingTime}
              showAuthor={showAuthor}
              showReadingTime={showReadingTime}
              className="mb-4"
            />
            
            {showTags && tags.length > 0 && (
              <PostTags tags={tags} maxTags={3} />
            )}
          </div>
        </Link>
      </article>
    )
  }

  // Default variant
  return (
    <article className={`group bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-200 ${className}`}>
      <Link href={`/blog/${slug}`}>
        {coverImage ? (
          <div className="aspect-video overflow-hidden">
            <Image
              src={coverImage}
              alt={title}
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
                {title.split(' ').slice(0, 3).join(' ')}
              </p>
            </div>
          </div>
        )}

        <div className="p-6">
          {showCategory && category && (
            <span className="inline-block px-2 py-1 text-xs font-medium text-blue-600 bg-blue-50 rounded-full mb-3">
              {category}
            </span>
          )}
          
          <h3 className="font-semibold text-xl text-gray-900 group-hover:text-blue-600 transition-colors mb-3 line-clamp-2">
            {title}
          </h3>
          
          {showExcerpt && excerpt && (
            <p className="text-gray-600 mb-4 line-clamp-3">
              {excerpt}
            </p>
          )}
          
          <PostMeta
            author={author}
            publishedAt={publishedAt}
            readingTime={readingTime}
            showAuthor={showAuthor}
            showReadingTime={showReadingTime}
            className="mb-4"
          />
          
          {showTags && tags.length > 0 && (
            <PostTags tags={tags} maxTags={3} />
          )}
        </div>
      </Link>
    </article>
  )
}

// Post Meta Component
function PostMeta({
  author,
  publishedAt,
  readingTime,
  showAuthor = true,
  showReadingTime = true,
  className = ''
}: {
  author: BlogPost['author']
  publishedAt: string
  readingTime?: number
  showAuthor?: boolean
  showReadingTime?: boolean
  className?: string
}) {
  const formattedDate = new Date(publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })

  return (
    <div className={`flex items-center text-sm text-gray-500 ${className}`}>
      {showAuthor && (
        <div className="flex items-center space-x-2">
          {author.avatar ? (
            <Image
              src={author.avatar}
              alt={author.name}
              width={24}
              height={24}
              className="rounded-full"
            />
          ) : (
            <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xs font-medium">
              {author.name.charAt(0)}
            </div>
          )}
          <span className="font-medium">{author.name}</span>
        </div>
      )}
      
      <span className="mx-2">•</span>
      <time dateTime={publishedAt}>{formattedDate}</time>
      
      {showReadingTime && readingTime && (
        <>
          <span className="mx-2">•</span>
          <span>{readingTime} min read</span>
        </>
      )}
    </div>
  )
}

// Post Tags Component
function PostTags({ 
  tags, 
  maxTags = 3 
}: { 
  tags: string[]
  maxTags?: number 
}) {
  const visibleTags = tags.slice(0, maxTags)
  const remainingCount = tags.length - maxTags

  return (
    <div className="flex flex-wrap gap-2">
      {visibleTags.map((tag) => (
        <Link
          key={tag}
          href={`/tag/${encodeURIComponent(tag)}`}
          className="px-2 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
          onClick={(e) => e.stopPropagation()}
        >
          {tag}
        </Link>
      ))}
      {remainingCount > 0 && (
        <span className="px-2 py-1 text-xs font-medium text-gray-500 bg-gray-50 rounded-full">
          +{remainingCount}
        </span>
      )}
    </div>
  )
}

// Grid layout component for multiple post cards
export function PostGrid({ 
  posts, 
  variant = 'default',
  columns = 3,
  className = '',
  ...cardProps 
}: {
  posts: BlogPost[]
  variant?: PostCardProps['variant']
  columns?: 2 | 3 | 4
  className?: string
} & Omit<PostCardProps, 'post' | 'variant'>) {
  const gridClasses = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
  }

  return (
    <div className={`grid ${gridClasses[columns]} gap-6 ${className}`}>
      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          variant={variant}
          {...cardProps}
        />
      ))}
    </div>
  )
}