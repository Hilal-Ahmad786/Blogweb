// Validation utilities for blog application

// Email validation
export function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email.trim())
  }
  
  // URL validation
  export function isValidUrl(url: string): boolean {
    try {
      new URL(url)
      return true
    } catch {
      return false
    }
  }
  
  // Slug validation (for blog posts, tags, etc.)
  export function isValidSlug(slug: string): boolean {
    const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
    return slugRegex.test(slug)
  }
  
  // Generate slug from title
  export function generateSlug(title: string): string {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
      .replace(/^-|-$/g, '') // Remove leading/trailing hyphens
  }
  
  // Password strength validation
  export function validatePassword(password: string): {
    isValid: boolean
    score: number
    feedback: string[]
  } {
    const feedback: string[] = []
    let score = 0
  
    if (password.length < 8) {
      feedback.push('Password should be at least 8 characters long')
    } else {
      score += 1
    }
  
    if (!/[a-z]/.test(password)) {
      feedback.push('Password should contain lowercase letters')
    } else {
      score += 1
    }
  
    if (!/[A-Z]/.test(password)) {
      feedback.push('Password should contain uppercase letters')
    } else {
      score += 1
    }
  
    if (!/\d/.test(password)) {
      feedback.push('Password should contain numbers')
    } else {
      score += 1
    }
  
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      feedback.push('Password should contain special characters')
    } else {
      score += 1
    }
  
    return {
      isValid: score >= 3,
      score,
      feedback
    }
  }
  
  // Blog post validation schema
  export interface BlogPostData {
    title: string
    content: string
    excerpt?: string
    tags: string[]
    category?: string
    slug?: string
    coverImage?: string
    published?: boolean
  }
  
  export function validateBlogPost(data: BlogPostData): {
    isValid: boolean
    errors: Record<string, string[]>
  } {
    const errors: Record<string, string[]> = {}
  
    // Title validation
    if (!data.title?.trim()) {
      errors.title = ['Title is required']
    } else if (data.title.trim().length < 3) {
      errors.title = ['Title must be at least 3 characters long']
    } else if (data.title.trim().length > 200) {
      errors.title = ['Title must be less than 200 characters']
    }
  
    // Content validation
    if (!data.content?.trim()) {
      errors.content = ['Content is required']
    } else if (data.content.trim().length < 100) {
      errors.content = ['Content must be at least 100 characters long']
    }
  
    // Excerpt validation
    if (data.excerpt && data.excerpt.length > 500) {
      errors.excerpt = ['Excerpt must be less than 500 characters']
    }
  
    // Tags validation
    if (!data.tags || data.tags.length === 0) {
      errors.tags = ['At least one tag is required']
    } else if (data.tags.length > 10) {
      errors.tags = ['Maximum 10 tags allowed']
    } else {
      const invalidTags = data.tags.filter(tag => !tag.trim() || tag.trim().length > 50)
      if (invalidTags.length > 0) {
        errors.tags = ['Each tag must be 1-50 characters long']
      }
    }
  
    // Slug validation
    if (data.slug && !isValidSlug(data.slug)) {
      errors.slug = ['Slug can only contain lowercase letters, numbers, and hyphens']
    }
  
    // Cover image validation
    if (data.coverImage && !isValidUrl(data.coverImage)) {
      errors.coverImage = ['Cover image must be a valid URL']
    }
  
    return {
      isValid: Object.keys(errors).length === 0,
      errors
    }
  }
  
  // Comment validation schema
  export interface CommentData {
    name: string
    email: string
    content: string
    website?: string
  }
  
  export function validateComment(data: CommentData): {
    isValid: boolean
    errors: Record<string, string[]>
  } {
    const errors: Record<string, string[]> = {}
  
    // Name validation
    if (!data.name?.trim()) {
      errors.name = ['Name is required']
    } else if (data.name.trim().length < 2) {
      errors.name = ['Name must be at least 2 characters long']
    } else if (data.name.trim().length > 100) {
      errors.name = ['Name must be less than 100 characters']
    }
  
    // Email validation
    if (!data.email?.trim()) {
      errors.email = ['Email is required']
    } else if (!isValidEmail(data.email)) {
      errors.email = ['Please enter a valid email address']
    }
  
    // Content validation
    if (!data.content?.trim()) {
      errors.content = ['Comment content is required']
    } else if (data.content.trim().length < 10) {
      errors.content = ['Comment must be at least 10 characters long']
    } else if (data.content.trim().length > 1000) {
      errors.content = ['Comment must be less than 1000 characters']
    }
  
    // Website validation (optional)
    if (data.website && data.website.trim() && !isValidUrl(data.website)) {
      errors.website = ['Please enter a valid website URL']
    }
  
    return {
      isValid: Object.keys(errors).length === 0,
      errors
    }
  }
  
  // Newsletter subscription validation
  export interface NewsletterData {
    email: string
    name?: string
  }
  
  export function validateNewsletter(data: NewsletterData): {
    isValid: boolean
    errors: Record<string, string[]>
  } {
    const errors: Record<string, string[]> = {}
  
    // Email validation
    if (!data.email?.trim()) {
      errors.email = ['Email is required']
    } else if (!isValidEmail(data.email)) {
      errors.email = ['Please enter a valid email address']
    }
  
    // Name validation (optional)
    if (data.name && data.name.trim().length > 100) {
      errors.name = ['Name must be less than 100 characters']
    }
  
    return {
      isValid: Object.keys(errors).length === 0,
      errors
    }
  }
  
  // Search query validation
  export function validateSearchQuery(query: string): {
    isValid: boolean
    errors: string[]
  } {
    const errors: string[] = []
  
    if (!query?.trim()) {
      errors.push('Search query is required')
    } else if (query.trim().length < 2) {
      errors.push('Search query must be at least 2 characters long')
    } else if (query.trim().length > 100) {
      errors.push('Search query must be less than 100 characters')
    }
  
    return {
      isValid: errors.length === 0,
      errors
    }
  }
  
  // File upload validation
  export function validateImageFile(
    file: File,
    maxSizeInMB: number = 5,
    allowedTypes: string[] = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
  ): {
    isValid: boolean
    errors: string[]
  } {
    const errors: string[] = []
  
    // File type validation
    if (!allowedTypes.includes(file.type)) {
      errors.push(`File type ${file.type} is not allowed. Allowed types: ${allowedTypes.join(', ')}`)
    }
  
    // File size validation
    const maxSizeInBytes = maxSizeInMB * 1024 * 1024
    if (file.size > maxSizeInBytes) {
      errors.push(`File size (${(file.size / 1024 / 1024).toFixed(2)}MB) exceeds maximum allowed size of ${maxSizeInMB}MB`)
    }
  
    // File name validation
    if (file.name.length > 255) {
      errors.push('File name is too long (maximum 255 characters)')
    }
  
    return {
      isValid: errors.length === 0,
      errors
    }
  }
  
  // Form field sanitization
  export function sanitizeString(input: string): string {
    return input
      .trim()
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      .replace(/\//g, '&#x2F;')
  }
  
  // HTML content sanitization (basic)
  export function sanitizeHtml(html: string): string {
    // Remove script tags and their content
    html = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    
    // Remove on* event handlers
    html = html.replace(/\s*on\w+\s*=\s*"[^"]*"/gi, '')
    html = html.replace(/\s*on\w+\s*=\s*'[^']*'/gi, '')
    
    // Remove javascript: links
    html = html.replace(/href\s*=\s*["']javascript:[^"']*["']/gi, '')
    
    return html
  }
  
  // Rate limiting validation
  export function validateRateLimit(
    identifier: string,
    maxRequests: number = 10,
    windowMs: number = 60000
  ): {
    isAllowed: boolean
    remainingRequests: number
    resetTime: number
  } {
    // This is a simple in-memory rate limiter for demonstration
    // In production, you'd want to use Redis or a similar solution
    
    const now = Date.now()
    const windowStart = now - windowMs
    
    // Get existing requests (you'd fetch this from storage)
    const requests = getStoredRequests(identifier, windowStart)
    
    const remainingRequests = Math.max(0, maxRequests - requests.length)
    const isAllowed = remainingRequests > 0
    
    if (isAllowed) {
      // Store the new request (you'd save this to storage)
      storeRequest(identifier, now)
    }
    
    return {
      isAllowed,
      remainingRequests: isAllowed ? remainingRequests - 1 : 0,
      resetTime: windowStart + windowMs
    }
  }
  
  // Helper functions for rate limiting (implement with your storage solution)
  function getStoredRequests(identifier: string, since: number): number[] {
    // Implement with your storage solution (Redis, database, etc.)
    return []
  }
  
  function storeRequest(identifier: string, timestamp: number): void {
    // Implement with your storage solution (Redis, database, etc.)
  }
  
  // Export validation result type
  export interface ValidationResult {
    isValid: boolean
    errors: Record<string, string[]> | string[]
  }
  
  // Generic validation function
  export function validate<T>(
    data: T,
    validator: (data: T) => ValidationResult
  ): ValidationResult {
    return validator(data)
  }