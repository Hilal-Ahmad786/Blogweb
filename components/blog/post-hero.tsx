import Image from 'next/image'
import Link from 'next/link'

interface Author {
  id: string
  name: string
  avatar?: string
  bio?: string
}

interface PostHeroProps {
  title: string
  excerpt?: string
  publishedAt: string
  updatedAt?: string
  readingTime?: number
  tags: string[]
  category?: string
  coverImage?: string
  author: Author
  variant?: 'default' | 'minimal' | 'centered' | 'overlay'
  showBreadcrumbs?: boolean
  className?: string
}

export default function PostHero({
  title,
  excerpt,
  publishedAt,
  updatedAt,
  readingTime,
  tags,
  category,
  coverImage,
  author,
  variant = 'default',
  showBreadcrumbs = true,
  className = ''
}: PostHeroProps) {
  const formattedPublishedDate = new Date(publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  const formattedUpdatedDate = updatedAt ? new Date(updatedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }) : null

  if (variant === 'minimal') {
    return (
      <header className={`py-8 ${className}`}>
        <div className="max-w-4xl mx-auto px-4">
          {showBreadcrumbs && (
            <Breadcrumbs category={category} />
          )}
          
          <div className="space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
              {title}
            </h1>
            
            <PostMeta
              author={author}
              publishedAt={publishedAt}
              updatedAt={updatedAt}
              readingTime={readingTime}
            />
            
            {tags.length > 0 && (
              <TagsList tags={tags} />
            )}
          </div>
        </div>
      </header>
    )
  }

  if (variant === 'centered') {
    return (
      <header className={`py-16 text-center ${className}`}>
        <div className="max-w-4xl mx-auto px-4">
          {showBreadcrumbs && (
            <div className="flex justify-center mb-6">
              <Breadcrumbs category={category} />
            </div>
          )}
          
          {category && (
            <span className="inline-block px-3 py-1 text-sm font-medium text-blue-600 bg-blue-50 rounded-full mb-4">
              {category}
            </span>
          )}
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
            {title}
          </h1>
          
          {excerpt && (
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              {excerpt}
            </p>
          )}
          
          <PostMeta
            author={author}
            publishedAt={publishedAt}
            updatedAt={updatedAt}
            readingTime={readingTime}
            centered
          />
          
          {tags.length > 0 && (
            <div className="mt-6">
              <TagsList tags={tags} centered />
            </div>
          )}
        </div>
        
        {coverImage && (
          <div className="mt-12">
            <div className="max-w-6xl mx-auto px-4">
              <div className="aspect-video rounded-lg overflow-hidden shadow-2xl">
                <Image
                  src={coverImage}
                  alt={title}
                  width={1200}
                  height={675}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        )}
      </header>
    )
  }

  if (variant === 'overlay') {
    return (
      <header className={`relative min-h-[60vh] flex items-center ${className}`}>
        {/* Background Image */}
        {coverImage && (
          <div className="absolute inset-0">
            <Image
              src={coverImage}
              alt={title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/50" />
          </div>
        )}
        
        {/* Content */}
        <div className="relative z-10 w-full">
          <div className="max-w-4xl mx-auto px-4 text-white">
            {showBreadcrumbs && (
              <Breadcrumbs category={category} dark />
            )}
            
            {category && (
              <span className="inline-block px-3 py-1 text-sm font-medium text-white bg-white/20 backdrop-blur-sm rounded-full mb-4">
                {category}
              </span>
            )}
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              {title}
            </h1>
            
            {excerpt && (
              <p className="text-xl text-gray-200 mb-8 max-w-3xl leading-relaxed">
                {excerpt}
              </p>
            )}
            
            <PostMeta
              author={author}
              publishedAt={publishedAt}
              updatedAt={updatedAt}
              readingTime={readingTime}
              dark
            />
            
            {tags.length > 0 && (
              <div className="mt-6">
                <TagsList tags={tags} dark />
              </div>
            )}
          </div>
        </div>
      </header>
    )
  }

  // Default variant
  return (
    <header className={`py-12 ${className}`}>
      <div className="max-w-4xl mx-auto px-4">
        {showBreadcrumbs && (
          <Breadcrumbs category={category} />
        )}
        
        {category && (
          <span className="inline-block px-3 py-1 text-sm font-medium text-blue-600 bg-blue-50 rounded-full mb-6">
            {category}
          </span>
        )}
        
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
          {title}
        </h1>
        
        {excerpt && (
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            {excerpt}
          </p>
        )}
        
        <PostMeta
          author={author}
          publishedAt={publishedAt}
          updatedAt={updatedAt}
          readingTime={readingTime}
        />
        
        {tags.length > 0 && (
          <div className="mt-6">
            <TagsList tags={tags} />
          </div>
        )}
      </div>
      
      {coverImage && (
        <div className="mt-12">
          <div className="max-w-6xl mx-auto px-4">
            <div className="aspect-video rounded-lg overflow-hidden shadow-xl">
              <Image
                src={coverImage}
                alt={title}
                width={1200}
                height={675}
                className="w-full h-full object-cover"
                priority
              />
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

// Breadcrumbs Component
function Breadcrumbs({ 
  category, 
  dark = false 
}: { 
  category?: string
  dark?: boolean 
}) {
  const textColor = dark ? 'text-white/80 hover:text-white' : 'text-gray-600 hover:text-gray-900'
  const separatorColor = dark ? 'text-white/60' : 'text-gray-400'

  return (
    <nav className="flex items-center space-x-2 text-sm mb-6">
      <Link href="/" className={`${textColor} transition-colors`}>
        Home
      </Link>
      <span className={separatorColor}>/</span>
      <Link href="/blog" className={`${textColor} transition-colors`}>
        Blog
      </Link>
      {category && (
        <>
          <span className={separatorColor}>/</span>
          <Link 
            href={`/category/${encodeURIComponent(category.toLowerCase())}`}
            className={`${textColor} transition-colors`}
          >
            {category}
          </Link>
        </>
      )}
    </nav>
  )
}

// Post Meta Component
function PostMeta({
  author,
  publishedAt,
  updatedAt,
  readingTime,
  centered = false,
  dark = false
}: {
  author: Author
  publishedAt: string
  updatedAt?: string
  readingTime?: number
  centered?: boolean
  dark?: boolean
}) {
  const formattedPublishedDate = new Date(publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  const formattedUpdatedDate = updatedAt ? new Date(updatedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }) : null

  const textColor = dark ? 'text-white/80' : 'text-gray-600'
  const authorTextColor = dark ? 'text-white' : 'text-gray-900'

  return (
    <div className={`flex items-center space-x-4 ${centered ? 'justify-center' : ''}`}>
      {/* Author */}
      <div className="flex items-center space-x-3">
        {author.avatar ? (
          <Image
            src={author.avatar}
            alt={author.name}
            width={48}
            height={48}
            className="rounded-full"
          />
        ) : (
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
            {author.name.charAt(0)}
          </div>
        )}
        <div>
          <Link 
            href={`/author/${author.id}`}
            className={`font-medium ${authorTextColor} hover:text-blue-600 transition-colors`}
          >
            {author.name}
          </Link>
          <div className={`text-sm ${textColor}`}>
            <time dateTime={publishedAt}>
              {formattedPublishedDate}
            </time>
            {readingTime && (
              <>
                <span className="mx-2">•</span>
                <span>{readingTime} min read</span>
              </>
            )}
          </div>
        </div>
      </div>
      
      {/* Updated date */}
      {formattedUpdatedDate && formattedUpdatedDate !== formattedPublishedDate && (
        <div className={`text-sm ${textColor} border-l border-gray-300 pl-4`}>
          <span>Updated: {formattedUpdatedDate}</span>
        </div>
      )}
    </div>
  )
}

// Tags List Component
function TagsList({ 
  tags, 
  centered = false, 
  dark = false 
}: { 
  tags: string[]
  centered?: boolean
  dark?: boolean 
}) {
  const tagStyles = dark 
    ? 'text-white bg-white/20 hover:bg-white/30 backdrop-blur-sm'
    : 'text-gray-700 bg-gray-100 hover:bg-gray-200'

  return (
    <div className={`flex flex-wrap gap-2 ${centered ? 'justify-center' : ''}`}>
      {tags.map((tag) => (
        <Link
          key={tag}
          href={`/tag/${encodeURIComponent(tag)}`}
          className={`px-3 py-1 text-sm font-medium rounded-full transition-colors ${tagStyles}`}
        >
          #{tag}
        </Link>
      ))}
    </div>
  )
}