import Head from 'next/head'

interface SEOMetaProps {
  title: string
  description: string
  canonical?: string
  ogImage?: string
  ogType?: 'website' | 'article' | 'blog'
  twitterCard?: 'summary' | 'summary_large_image'
  keywords?: string[]
  author?: string
  publishedTime?: string
  modifiedTime?: string
  tags?: string[]
  siteName?: string
  locale?: string
  robots?: string
  schema?: Record<string, any>
}

const DEFAULT_SITE_NAME = 'Your Blog'
const DEFAULT_LOCALE = 'en_US'
const DEFAULT_OG_IMAGE = '/images/og-default.jpg'
const DEFAULT_TWITTER_HANDLE = '@yourblog'

export default function SEOMeta({
  title,
  description,
  canonical,
  ogImage = DEFAULT_OG_IMAGE,
  ogType = 'website',
  twitterCard = 'summary_large_image',
  keywords = [],
  author,
  publishedTime,
  modifiedTime,
  tags = [],
  siteName = DEFAULT_SITE_NAME,
  locale = DEFAULT_LOCALE,
  robots = 'index, follow',
  schema
}: SEOMetaProps) {
  // Combine title with site name
  const fullTitle = title.includes(siteName) ? title : `${title} | ${siteName}`
  
  // Create keywords string
  const keywordsString = [...keywords, ...tags].join(', ')
  
  // Ensure canonical URL is absolute
  const canonicalUrl = canonical?.startsWith('http') 
    ? canonical 
    : canonical 
    ? `${process.env.NEXT_PUBLIC_SITE_URL}${canonical}`
    : undefined

  // Ensure OG image is absolute
  const ogImageUrl = ogImage?.startsWith('http') 
    ? ogImage 
    : `${process.env.NEXT_PUBLIC_SITE_URL}${ogImage}`

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywordsString && <meta name="keywords" content={keywordsString} />}
      {author && <meta name="author" content={author} />}
      <meta name="robots" content={robots} />
      
      {/* Canonical URL */}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      
      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content={locale} />
      {ogImageUrl && <meta property="og:image" content={ogImageUrl} />}
      {ogImageUrl && <meta property="og:image:alt" content={title} />}
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
      
      {/* Article specific Open Graph tags */}
      {ogType === 'article' && (
        <>
          {author && <meta property="article:author" content={author} />}
          {publishedTime && <meta property="article:published_time" content={publishedTime} />}
          {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
          {tags.map((tag) => (
            <meta key={tag} property="article:tag" content={tag} />
          ))}
        </>
      )}
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:site" content={DEFAULT_TWITTER_HANDLE} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {ogImageUrl && <meta name="twitter:image" content={ogImageUrl} />}
      
      {/* Additional Meta Tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      
      {/* Schema.org JSON-LD */}
      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      )}
    </Head>
  )
}

// Blog post specific SEO component
export function BlogPostSEO({
  title,
  description,
  slug,
  publishedAt,
  updatedAt,
  tags = [],
  category,
  author,
  coverImage,
  readingTime
}: {
  title: string
  description: string
  slug: string
  publishedAt: string
  updatedAt?: string
  tags?: string[]
  category?: string
  author: {
    name: string
    avatar?: string
  }
  coverImage?: string
  readingTime?: number
}) {
  const canonical = `/blog/${slug}`
  const publishedTime = new Date(publishedAt).toISOString()
  const modifiedTime = updatedAt ? new Date(updatedAt).toISOString() : undefined

  // Create schema for blog post
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description: description,
    image: coverImage ? `${process.env.NEXT_PUBLIC_SITE_URL}${coverImage}` : undefined,
    datePublished: publishedTime,
    dateModified: modifiedTime || publishedTime,
    author: {
      '@type': 'Person',
      name: author.name,
      image: author.avatar ? `${process.env.NEXT_PUBLIC_SITE_URL}${author.avatar}` : undefined
    },
    publisher: {
      '@type': 'Organization',
      name: DEFAULT_SITE_NAME,
      logo: {
        '@type': 'ImageObject',
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/images/logo.png`
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${process.env.NEXT_PUBLIC_SITE_URL}${canonical}`
    },
    keywords: tags.join(', '),
    articleSection: category,
    timeRequired: readingTime ? `PT${readingTime}M` : undefined
  }

  return (
    <SEOMeta
      title={title}
      description={description}
      canonical={canonical}
      ogImage={coverImage}
      ogType="article"
      keywords={tags}
      author={author.name}
      publishedTime={publishedTime}
      modifiedTime={modifiedTime}
      tags={tags}
      schema={schema}
    />
  )
}

// Homepage specific SEO component
export function HomeSEO({
  title = 'Home',
  description = 'Welcome to our blog where we share insights, tutorials, and thoughts on web development, design, and technology.',
  featuredPosts = []
}: {
  title?: string
  description?: string
  featuredPosts?: Array<{
    title: string
    slug: string
    publishedAt: string
  }>
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: DEFAULT_SITE_NAME,
    description: description,
    url: process.env.NEXT_PUBLIC_SITE_URL,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${process.env.NEXT_PUBLIC_SITE_URL}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string'
    },
    mainEntity: {
      '@type': 'Blog',
      name: DEFAULT_SITE_NAME,
      description: description,
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/blog`,
      blogPost: featuredPosts.map(post => ({
        '@type': 'BlogPosting',
        headline: post.title,
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${post.slug}`,
        datePublished: new Date(post.publishedAt).toISOString()
      }))
    }
  }

  return (
    <SEOMeta
      title={title}
      description={description}
      canonical="/"
      ogType="website"
      schema={schema}
    />
  )
}

// Category page SEO component
export function CategorySEO({
  category,
  description,
  postCount = 0
}: {
  category: string
  description?: string
  postCount?: number
}) {
  const title = `${category} Articles`
  const desc = description || `Explore ${postCount} articles about ${category}. Find tutorials, insights, and best practices.`
  const canonical = `/category/${encodeURIComponent(category.toLowerCase())}`

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: title,
    description: desc,
    url: `${process.env.NEXT_PUBLIC_SITE_URL}${canonical}`,
    mainEntity: {
      '@type': 'ItemList',
      name: `${category} Articles`,
      numberOfItems: postCount
    }
  }

  return (
    <SEOMeta
      title={title}
      description={desc}
      canonical={canonical}
      keywords={[category]}
      schema={schema}
    />
  )
}

// Tag page SEO component
export function TagSEO({
  tag,
  postCount = 0
}: {
  tag: string
  postCount?: number
}) {
  const title = `Posts tagged "${tag}"`
  const description = `Browse ${postCount} posts tagged with ${tag}. Discover related content and insights.`
  const canonical = `/tag/${encodeURIComponent(tag)}`

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: title,
    description: description,
    url: `${process.env.NEXT_PUBLIC_SITE_URL}${canonical}`,
    mainEntity: {
      '@type': 'ItemList',
      name: `Posts tagged with ${tag}`,
      numberOfItems: postCount
    }
  }

  return (
    <SEOMeta
      title={title}
      description={description}
      canonical={canonical}
      keywords={[tag]}
      tags={[tag]}
      schema={schema}
    />
  )
}

// Author page SEO component
export function AuthorSEO({
  author,
  bio,
  postCount = 0
}: {
  author: {
    name: string
    avatar?: string
  }
  bio?: string
  postCount?: number
}) {
  const title = `${author.name} - Author`
  const description = bio || `Read ${postCount} articles by ${author.name}. Explore their insights and expertise.`
  const canonical = `/author/${encodeURIComponent(author.name.toLowerCase().replace(/\s+/g, '-'))}`

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    name: title,
    description: description,
    url: `${process.env.NEXT_PUBLIC_SITE_URL}${canonical}`,
    mainEntity: {
      '@type': 'Person',
      name: author.name,
      image: author.avatar ? `${process.env.NEXT_PUBLIC_SITE_URL}${author.avatar}` : undefined,
      description: bio
    }
  }

  return (
    <SEOMeta
      title={title}
      description={description}
      canonical={canonical}
      author={author.name}
      schema={schema}
    />
  )
}