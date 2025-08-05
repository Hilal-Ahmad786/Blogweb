export interface BlogPost {
    slug: string
    title: string
    description: string
    content: string
    date: string
    published: boolean
    featured: boolean
    author: Author
    category: string
    tags: string[]
    coverImage?: string
    readingTime: number
    excerpt: string
    seo?: SEOData
  }
  
  export interface Author {
    name: string
    bio: string
    avatar?: string
    social?: {
      twitter?: string
      github?: string
      linkedin?: string
      website?: string
    }
  }
  
  export interface SEOData {
    title?: string
    description?: string
    keywords?: string[]
    ogImage?: string
    canonicalUrl?: string
  }
  
  export interface Category {
    slug: string
    name: string
    description: string
    color?: string
    postCount: number
  }
  
  export interface Tag {
    slug: string
    name: string
    color?: string
    postCount: number
  }
  
  export interface BlogStats {
    totalPosts: number
    totalCategories: number
    totalTags: number
    totalAuthors: number
    averageReadingTime: number
    mostPopularCategory: string
    mostPopularTag: string
  }
  
  export interface SearchResult {
    posts: BlogPost[]
    categories: Category[]
    tags: Tag[]
    totalResults: number
  }
  
  export interface PostFrontmatter {
    title: string
    description: string
    date: string
    published?: boolean
    featured?: boolean
    author: string
    category: string
    tags: string[]
    coverImage?: string
    seo?: SEOData
  }
  
  export interface PaginationInfo {
    currentPage: number
    totalPages: number
    totalItems: number
    hasNextPage: boolean
    hasPreviousPage: boolean
  }
  
  export interface RelatedPost {
    slug: string
    title: string
    excerpt: string
    category: string
    readingTime: number
    coverImage?: string
  }
  
  // Newsletter types (for future implementation)
  export interface NewsletterSubscription {
    email: string
    subscribedAt: string
    confirmed: boolean
    preferences?: {
      categories: string[]
      frequency: 'daily' | 'weekly' | 'monthly'
    }
  }
  
  // Comment types (placeholder for future implementation)
  export interface Comment {
    id: string
    postSlug: string
    author: string
    email: string
    content: string
    createdAt: string
    approved: boolean
    parentId?: string
    replies?: Comment[]
  }
  
  // Analytics types (for future implementation)
  export interface PostAnalytics {
    slug: string
    views: number
    likes: number
    shares: number
    comments: number
    averageTimeOnPage: number
    bounceRate: number
  }
  
  // API Response types
  export interface APIResponse<T> {
    data: T
    message: string
    success: boolean
    timestamp: string
  }
  
  export interface PaginatedAPIResponse<T> extends APIResponse<T> {
    pagination: PaginationInfo
  }
  
  // Form types
  export interface ContactFormData {
    name: string
    email: string
    subject: string
    message: string
  }
  
  export interface NewsletterFormData {
    email: string
    categories?: string[]
  }
  
  export interface SearchFormData {
    query: string
    category?: string
    tags?: string[]
    sortBy?: 'relevance' | 'date' | 'popularity'
    sortOrder?: 'asc' | 'desc'
  }
  
  // Error types
  export interface BlogError {
    code: string
    message: string
    details?: any
  }
  
  // Theme types
  export type Theme = 'light' | 'dark' | 'system'
  
  // Layout types
  export interface LayoutProps {
    children: React.ReactNode
    className?: string
  }
  
  // Component prop types
  export interface BlogPostCardProps {
    post: BlogPost
    variant?: 'default' | 'compact' | 'featured'
    showCategory?: boolean
    showTags?: boolean
    showAuthor?: boolean
    showExcerpt?: boolean
  }
  
  export interface PaginationProps {
    currentPage: number
    totalPages: number
    onPageChange: (page: number) => void
    showFirstLast?: boolean
    maxVisiblePages?: number
  }
  
  export interface SearchProps {
    onSearch: (query: string) => void
    placeholder?: string
    defaultValue?: string
    showFilters?: boolean
  }
  
  // State management types (for future Redux/Zustand implementation)
  export interface BlogState {
    posts: BlogPost[]
    categories: Category[]
    tags: Tag[]
    currentPost: BlogPost | null
    searchResults: SearchResult | null
    loading: boolean
    error: BlogError | null
  }
  
  export interface UIState {
    theme: Theme
    sidebarOpen: boolean
    searchOpen: boolean
    mobileMenuOpen: boolean
    cookieConsent: boolean
  }
  
  // Utility types
  export type PostStatus = 'draft' | 'published' | 'archived'
  export type SortOrder = 'asc' | 'desc'
  export type PostSortBy = 'date' | 'title' | 'category' | 'readingTime' | 'popularity'