import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemoteSerializeResult } from 'next-mdx-remote'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import rehypePrism from 'rehype-prism-plus'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import remarkToc from 'remark-toc'
import { visit } from 'unist-util-visit'

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

export interface ProcessedMDX {
  mdxSource: MDXRemoteSerializeResult
  frontmatter: BlogPostFrontmatter
  readingTime: number
  wordCount: number
  headings: Array<{
    id: string
    title: string
    level: number
  }>
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

// Extract headings from MDX content
function extractHeadings() {
  return (tree: any) => {
    const headings: Array<{ id: string; title: string; level: number }> = []
    
    visit(tree, 'element', (node) => {
      if (['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(node.tagName)) {
        const level = parseInt(node.tagName.charAt(1))
        const title = extractTextFromNode(node)
        const id = generateHeadingId(title)
        
        headings.push({ id, title, level })
      }
    })
    
    return headings
  }
}

// Extract text content from a node
function extractTextFromNode(node: any): string {
  if (node.type === 'text') {
    return node.value
  }
  
  if (node.children) {
    return node.children.map(extractTextFromNode).join('')
  }
  
  return ''
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

// Remark plugin to add reading time
function remarkReadingTime() {
  return (tree: any, file: any) => {
    const textContent = extractTextContent(tree)
    const readingTime = calculateReadingTime(textContent)
    const wordCount = calculateWordCount(textContent)
    
    file.data = file.data || {}
    file.data.readingTime = readingTime
    file.data.wordCount = wordCount
  }
}

// Extract text content from AST
function extractTextContent(node: any): string {
  if (node.type === 'text') {
    return node.value
  }
  
  if (node.children) {
    return node.children.map(extractTextContent).join(' ')
  }
  
  return ''
}

// Remark plugin to extract and store headings
function remarkExtractHeadings() {
  return (tree: any, file: any) => {
    const headings: Array<{ id: string; title: string; level: number }> = []
    
    visit(tree, 'heading', (node) => {
      const title = extractTextContent(node)
      const id = generateHeadingId(title)
      const level = node.depth
      
      headings.push({ id, title, level })
    })
    
    file.data = file.data || {}
    file.data.headings = headings
  }
}

// Process MDX content
export async function processMDX(
  content: string,
  frontmatter: BlogPostFrontmatter
): Promise<ProcessedMDX> {
  try {
    const mdxSource = await serialize(content, {
      mdxOptions: {
        remarkPlugins: [
          remarkGfm,
          remarkMath,
          remarkToc,
          remarkReadingTime,
          remarkExtractHeadings
        ],
        rehypePlugins: [
          rehypeSlug,
          [rehypeAutolinkHeadings, {
            behavior: 'wrap',
            properties: {
              className: ['heading-link']
            }
          }],
          [rehypePrism, {
            showLineNumbers: true,
            ignoreMissing: true
          }],
          rehypeKatex
        ],
        format: 'mdx'
      },
      parseFrontmatter: false
    })

    const readingTime = mdxSource.compiledSource.includes('readingTime') 
      ? (mdxSource as any).readingTime || calculateReadingTime(content)
      : calculateReadingTime(content)
    
    const wordCount = mdxSource.compiledSource.includes('wordCount')
      ? (mdxSource as any).wordCount || calculateWordCount(content)
      : calculateWordCount(content)
    
    const headings = (mdxSource as any).headings || []

    return {
      mdxSource,
      frontmatter,
      readingTime,
      wordCount,
      headings
    }
  } catch (error) {
    console.error('Error processing MDX:', error)
    throw new Error('Failed to process MDX content')
  }
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