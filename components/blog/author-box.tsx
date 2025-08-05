import Image from 'next/image'
import Link from 'next/link'

interface Author {
  id: string
  name: string
  bio?: string
  avatar?: string
  role?: string
  company?: string
  location?: string
  website?: string
  social?: {
    twitter?: string
    linkedin?: string
    github?: string
    instagram?: string
  }
  stats?: {
    postsCount?: number
    followers?: number
  }
}

interface AuthorBoxProps {
  author: Author
  showStats?: boolean
  variant?: 'default' | 'compact' | 'card' | 'minimal'
  className?: string
}

export default function AuthorBox({ 
  author, 
  showStats = true,
  variant = 'default',
  className = '' 
}: AuthorBoxProps) {
  const {
    name,
    bio,
    avatar,
    role,
    company,
    location,
    website,
    social,
    stats
  } = author

  if (variant === 'minimal') {
    return (
      <div className={`flex items-center space-x-3 ${className}`}>
        <AuthorAvatar author={author} size="sm" />
        <div>
          <Link
            href={`/author/${author.id}`}
            className="font-medium text-gray-900 hover:text-blue-600 transition-colors"
          >
            {name}
          </Link>
          {role && (
            <p className="text-sm text-gray-600">{role}</p>
          )}
        </div>
      </div>
    )
  }

  if (variant === 'compact') {
    return (
      <div className={`flex items-start space-x-4 p-4 bg-gray-50 rounded-lg ${className}`}>
        <AuthorAvatar author={author} size="md" />
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-1">
            <Link
              href={`/author/${author.id}`}
              className="font-semibold text-gray-900 hover:text-blue-600 transition-colors"
            >
              {name}
            </Link>
            {role && (
              <span className="text-sm text-gray-600">• {role}</span>
            )}
          </div>
          {bio && (
            <p className="text-sm text-gray-700 mb-2 line-clamp-2">{bio}</p>
          )}
          <SocialLinks social={social} size="sm" />
        </div>
      </div>
    )
  }

  if (variant === 'card') {
    return (
      <div className={`bg-white border border-gray-200 rounded-lg p-6 ${className}`}>
        <div className="text-center mb-4">
          <AuthorAvatar author={author} size="lg" className="mx-auto mb-3" />
          <Link
            href={`/author/${author.id}`}
            className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors"
          >
            {name}
          </Link>
          {role && (
            <p className="text-gray-600 mt-1">
              {role}
              {company && ` at ${company}`}
            </p>
          )}
          {location && (
            <p className="text-sm text-gray-500 mt-1">📍 {location}</p>
          )}
        </div>

        {bio && (
          <p className="text-gray-700 text-center mb-4">{bio}</p>
        )}

        <SocialLinks social={social} size="md" className="justify-center mb-4" />

        {showStats && stats && (
          <div className="flex justify-center space-x-6 pt-4 border-t border-gray-200">
            {stats.postsCount !== undefined && (
              <div className="text-center">
                <div className="font-semibold text-gray-900">{stats.postsCount}</div>
                <div className="text-sm text-gray-600">Posts</div>
              </div>
            )}
            {stats.followers !== undefined && (
              <div className="text-center">
                <div className="font-semibold text-gray-900">{stats.followers}</div>
                <div className="text-sm text-gray-600">Followers</div>
              </div>
            )}
          </div>
        )}
      </div>
    )
  }

  // Default variant
  return (
    <div className={`bg-gray-50 rounded-lg p-6 ${className}`}>
      <div className="flex items-start space-x-4">
        <AuthorAvatar author={author} size="lg" />
        
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
            <div>
              <Link
                href={`/author/${author.id}`}
                className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors"
              >
                {name}
              </Link>
              {role && (
                <p className="text-gray-600">
                  {role}
                  {company && ` at ${company}`}
                </p>
              )}
              {location && (
                <p className="text-sm text-gray-500">📍 {location}</p>
              )}
            </div>
            
            {showStats && stats && (
              <div className="flex space-x-4 mt-2 sm:mt-0">
                {stats.postsCount !== undefined && (
                  <div className="text-center">
                    <div className="font-semibold text-gray-900">{stats.postsCount}</div>
                    <div className="text-xs text-gray-600">Posts</div>
                  </div>
                )}
                {stats.followers !== undefined && (
                  <div className="text-center">
                    <div className="font-semibold text-gray-900">{stats.followers}</div>
                    <div className="text-xs text-gray-600">Followers</div>
                  </div>
                )}
              </div>
            )}
          </div>

          {bio && (
            <p className="text-gray-700 mb-4">{bio}</p>
          )}

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <SocialLinks social={social} size="md" />
            
            {website && (
              <Link
                href={website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center mt-3 sm:mt-0 text-sm text-blue-600 hover:text-blue-800 transition-colors"
              >
                Visit Website
                <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// Author Avatar Component
function AuthorAvatar({ 
  author, 
  size = 'md', 
  className = '' 
}: { 
  author: Author
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string 
}) {
  const sizeClasses = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-12 h-12 text-base',
    lg: 'w-16 h-16 text-lg',
    xl: 'w-24 h-24 text-xl'
  }

  const initials = author.name
    .split(' ')
    .map(name => name[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  if (author.avatar) {
    return (
      <div className={`${sizeClasses[size]} rounded-full overflow-hidden ${className}`}>
        <Image
          src={author.avatar}
          alt={author.name}
          width={size === 'xl' ? 96 : size === 'lg' ? 64 : size === 'md' ? 48 : 32}
          height={size === 'xl' ? 96 : size === 'lg' ? 64 : size === 'md' ? 48 : 32}
          className="w-full h-full object-cover"
        />
      </div>
    )
  }

  return (
    <div className={`
      ${sizeClasses[size]} 
      rounded-full 
      bg-gradient-to-br from-blue-500 to-purple-600 
      flex items-center justify-center 
      text-white font-semibold
      ${className}
    `}>
      {initials}
    </div>
  )
}

// Social Links Component
function SocialLinks({ 
  social, 
  size = 'md',
  className = '' 
}: { 
  social?: Author['social']
  size?: 'sm' | 'md' | 'lg'
  className?: string 
}) {
  if (!social) return null

  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  }

  const containerClasses = {
    sm: 'p-1',
    md: 'p-1.5',
    lg: 'p-2'
  }

  return (
    <div className={`flex space-x-2 ${className}`}>
      {social.twitter && (
        <Link
          href={`https://twitter.com/${social.twitter}`}
          target="_blank"
          rel="noopener noreferrer"
          className={`${containerClasses[size]} text-gray-600 hover:text-blue-500 transition-colors`}
        >
          <svg className={sizeClasses[size]} fill="currentColor" viewBox="0 0 24 24">
            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
          </svg>
        </Link>
      )}
      
      {social.linkedin && (
        <Link
          href={`https://linkedin.com/in/${social.linkedin}`}
          target="_blank"
          rel="noopener noreferrer"
          className={`${containerClasses[size]} text-gray-600 hover:text-blue-700 transition-colors`}
        >
          <svg className={sizeClasses[size]} fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
        </Link>
      )}
      
      {social.github && (
        <Link
          href={`https://github.com/${social.github}`}
          target="_blank"
          rel="noopener noreferrer"
          className={`${containerClasses[size]} text-gray-600 hover:text-gray-900 transition-colors`}
        >
          <svg className={sizeClasses[size]} fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
          </svg>
        </Link>
      )}
      
      {social.instagram && (
        <Link
          href={`https://instagram.com/${social.instagram}`}
          target="_blank"
          rel="noopener noreferrer"
          className={`${containerClasses[size]} text-gray-600 hover:text-pink-600 transition-colors`}
        >
          <svg className={sizeClasses[size]} fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
          </svg>
        </Link>
      )}
    </div>
  )
}