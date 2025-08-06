// Basic MDX utility functions without external dependencies

// Types
export interface BlogPostFrontmatter {
  title: string
  excerpt?: string
  publishedAt: string
  updatedAt?: string
  tags: string[]
  category?: string
  coverImage?: string
  featured?: boolean
  draft?: boolean
  author: {
    name: string
    avatar?: string
  }
  seo?: {
    title?: string
    description?: string
    keywords?: string[]
  }
}

// Reading time calculation
export function calculateReadingTime(text: string, wordsPerMinute: number = 200): number {
  const words = text.trim().split(/\s+/).length
  const minutes = Math.ceil(words / wordsPerMinute)
  return minutes
}

// Word count calculation
export function calculateWordCount(text: string): number {
  return text.trim().split(/\s+/).filter(word => word.length > 0).length
}

// Generate heading ID
function generateHeadingId(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

// Parse frontmatter from MDX content
export function parseFrontmatter(content: string): {
  frontmatter: BlogPostFrontmatter | null
  content: string
} {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/
  const match = content.match(frontmatterRegex)
  
  if (!match) {
    return { frontmatter: null, content }
  }
  
  try {
    const frontmatterString = match[1]
    const contentWithoutFrontmatter = match[2]
    
    // Simple YAML parsing (you might want to use a proper YAML parser)
    const frontmatter = parseYAML(frontmatterString)
    
    return {
      frontmatter: frontmatter as BlogPostFrontmatter,
      content: contentWithoutFrontmatter
    }
  } catch (error) {
    console.error('Error parsing frontmatter:', error)
    return { frontmatter: null, content }
  }
}

// Simple YAML parser (basic implementation)
function parseYAML(yamlString: string): Record<string, any> {
  const lines = yamlString.split('\n')
  const result: Record<string, any> = {}
  
  let currentKey = ''
  let isArray = false
  
  for (const line of lines) {
    const trimmedLine = line.trim()
    
    if (!trimmedLine || trimmedLine.startsWith('#')) {
      continue
    }
    
    if (trimmedLine.startsWith('- ')) {
      // Array item
      if (isArray && currentKey) {
        if (!Array.isArray(result[currentKey])) {
          result[currentKey] = []
        }
        result[currentKey].push(trimmedLine.substring(2).trim())
      }
    } else if (trimmedLine.includes(':')) {
      // Key-value pair
      const [key, ...valueParts] = trimmedLine.split(':')
      const value = valueParts.join(':').trim()
      
      currentKey = key.trim()
      isArray = false
      
      if (value === '') {
        // Possible array or object start
        isArray = true
        result[currentKey] = []
      } else if (value.startsWith('[') && value.endsWith(']')) {
        // Inline array
        const arrayContent = value.slice(1, -1)
        result[currentKey] = arrayContent
          .split(',')
          .map(item => item.trim().replace(/^["']|["']$/g, ''))
      } else {
        // Regular value
        result[currentKey] = parseValue(value)
      }
    }
  }
  
  return result
}

// Parse YAML value
function parseValue(value: string): any {
  // Remove quotes
  const unquoted = value.replace(/^["']|["']$/g, '')
  
  // Boolean
  if (unquoted === 'true') return true
  if (unquoted === 'false') return false
  
  // Number
  if (!isNaN(Number(unquoted))) return Number(unquoted)
  
  // Date
  if (unquoted.match(/^\d{4}-\d{2}-\d{2}/)) {
    return unquoted
  }
  
  return unquoted
}

// Extract headings from content (simple version)
export function extractHeadings(content: string): Array<{ id: string; title: string; level: number }> {
  const headings: Array<{ id: string; title: string; level: number }> = []
  const lines = content.split('\n')
  
  for (const line of lines) {
    const trimmedLine = line.trim()
    if (trimmedLine.startsWith('#')) {
      const match = trimmedLine.match(/^(#{1,6})\s+(.+)$/)
      if (match) {
        const level = match[1].length
        const title = match[2].trim()
        const id = generateHeadingId(title)
        headings.push({ id, title, level })
      }
    }
  }
  
  return headings
}

// Generate table of contents from headings
export function generateTableOfContents(
  headings: Array<{ id: string; title: string; level: number }>,
  maxLevel: number = 3
): Array<{ id: string; title: string; level: number; children?: any[] }> {
  const filteredHeadings = headings.filter(heading => heading.level <= maxLevel)
  const toc: any[] = []
  const stack: any[] = []
  
  for (const heading of filteredHeadings) {
    const item = {
      id: heading.id,
      title: heading.title,
      level: heading.level,
      children: []
    }
    
    // Find the appropriate parent
    while (stack.length > 0 && stack[stack.length - 1].level >= heading.level) {
      stack.pop()
    }
    
    if (stack.length === 0) {
      toc.push(item)
    } else {
      stack[stack.length - 1].children.push(item)
    }
    
    stack.push(item)
  }
  
  return toc
}

// Validate MDX content
export function validateMDX(content: string): {
  isValid: boolean
  errors: string[]
} {
  const errors: string[] = []
  
  try {
    const { frontmatter } = parseFrontmatter(content)
    
    if (!frontmatter) {
      errors.push('Frontmatter is required')
    } else {
      if (!frontmatter.title) {
        errors.push('Title is required in frontmatter')
      }
      
      if (!frontmatter.publishedAt) {
        errors.push('Published date is required in frontmatter')
      }
      
      if (!frontmatter.tags || frontmatter.tags.length === 0) {
        errors.push('At least one tag is required in frontmatter')
      }
    }
    
    // Check for common MDX syntax errors
    const openBraces = (content.match(/{/g) || []).length
    const closeBraces = (content.match(/}/g) || []).length
    
    if (openBraces !== closeBraces) {
      errors.push('Mismatched curly braces in MDX content')
    }
    
  } catch (error) {
    errors.push('Invalid MDX syntax')
  }
  
  return {
    isValid: errors.length === 0,
    errors
  }
}

// Extract excerpt from content
export function extractExcerpt(
  content: string,
  maxLength: number = 200,
  separator: string = '<!-- excerpt -->'
): string {
  // Check for manual excerpt separator
  if (content.includes(separator)) {
    const parts = content.split(separator)
    return parts[0].trim()
  }
  
  // Auto-generate excerpt from first paragraph
  const paragraphs = content
    .replace(/^---[\s\S]*?---/, '') // Remove frontmatter
    .split('\n\n')
    .filter(p => p.trim() && !p.startsWith('#')) // Remove empty lines and headings
  
  if (paragraphs.length > 0) {
    let excerpt = paragraphs[0].trim()
    
    // Remove markdown formatting
    excerpt = excerpt
      .replace(/\*\*(.*?)\*\*/g, '$1') // Bold
      .replace(/\*(.*?)\*/g, '$1')     // Italic
      .replace(/`(.*?)`/g, '$1')       // Code
      .replace(/\[(.*?)\]\(.*?\)/g, '$1') // Links
      .replace(/#{1,6}\s/g, '')        // Headings
    
    if (excerpt.length > maxLength) {
      excerpt = excerpt.substring(0, maxLength).trim() + '...'
    }
    
    return excerpt
  }
  
  return ''
}

// Optimize images in MDX content
export function optimizeImages(content: string): string {
  // Replace ![alt](src) with optimized Image component
  const imageRegex = /!\[(.*?)\]\((.*?)\)/g
  
  return content.replace(imageRegex, (match, alt, src) => {
    return `<Image src="${src}" alt="${alt}" width={800} height={400} className="rounded-lg" />`
  })
}

// Simple markdown to HTML conversion (basic)
export function markdownToHtml(markdown: string): string {
  let html = markdown
    // Headers
    .replace(/^### (.*$)/gm, '<h3>$1</h3>')
    .replace(/^## (.*$)/gm, '<h2>$1</h2>')
    .replace(/^# (.*$)/gm, '<h1>$1</h1>')
    // Bold
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    // Italic
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    // Code
    .replace(/`(.*?)`/g, '<code>$1</code>')
    // Links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
    // Paragraphs
    .replace(/\n\n/g, '</p><p>')
    
  return `<p>${html}</p>`
}