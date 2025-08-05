import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import remarkHtml from 'remark-html'
import remarkGfm from 'remark-gfm'
import { BlogPost, Author, Category, Tag, PostFrontmatter } from '@/types/blog'
import { getReadingTime } from '@/lib/utils'

const postsDirectory = path.join(process.cwd(), 'content/blog')

// Configure remark processor
const processor = remark()
  .use(remarkGfm) // GitHub Flavored Markdown
  .use(remarkHtml, { sanitize: false }) // Convert to HTML

// Yazarlar veritabanı
const authors: Record<string, Author> = {
  'seda-tokmak': {
    name: 'Seda Tokmak',
    bio: '100leşme yolculuğunun yazarı, Saica Pack Türkiye Genel Müdürü. 25+ yıllık profesyonel deneyimiyle liderlik ve kişisel gelişim konularında paylaşımlarda bulunuyor.',
    avatar: '/images/authors/seda-tokmak.svg',
    social: {
      linkedin: 'https://linkedin.com/in/seda-tokmak',
      website: 'https://100lesme.com',
    },
  },
}

export async function getPostSlugs(): Promise<string[]> {
  try {
    if (!fs.existsSync(postsDirectory)) {
      return []
    }
    
    const files = fs.readdirSync(postsDirectory)
    return files
      .filter(file => file.endsWith('.mdx') || file.endsWith('.md'))
      .map(file => file.replace(/\.(mdx|md)$/, ''))
  } catch (error) {
    console.error('Error reading post slugs:', error)
    return []
  }
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`)
    
    if (!fs.existsSync(fullPath)) {
      return null
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)
    const frontmatter = data as PostFrontmatter

    // Process markdown content to HTML
    const processedContent = await processor.process(content)
    const htmlContent = processedContent.toString()

    const author = authors[frontmatter.author] || authors['seda-tokmak']
    const readingTime = getReadingTime(content)
    const excerpt = frontmatter.description || 
      content.replace(/^#+\s+.*/gm, '').slice(0, 160) + '...'

    const post: BlogPost = {
      slug,
      title: frontmatter.title,
      description: frontmatter.description,
      content: htmlContent, // Now this is proper HTML
      date: frontmatter.date,
      published: frontmatter.published ?? true,
      featured: frontmatter.featured ?? false,
      author,
      category: frontmatter.category,
      tags: frontmatter.tags || [],
      coverImage: frontmatter.coverImage,
      readingTime,
      excerpt,
      seo: frontmatter.seo,
    }

    return post
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error)
    return null
  }
}

export async function getAllPosts(): Promise<BlogPost[]> {
  try {
    const slugs = await getPostSlugs()
    const posts = await Promise.all(
      slugs.map(slug => getPostBySlug(slug))
    )

    return posts
      .filter((post): post is BlogPost => post !== null && post.published)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  } catch (error) {
    console.error('Error getting all posts:', error)
    return []
  }
}

// Keep all your other functions the same...
export async function getPostsByCategory(categorySlug: string): Promise<BlogPost[]> {
  try {
    const allPosts = await getAllPosts()
    return allPosts.filter(post => 
      post.category.toLowerCase().replace(/\s+/g, '-') === categorySlug
    )
  } catch (error) {
    console.error(`Error getting posts by category ${categorySlug}:`, error)
    return []
  }
}

export async function getPostsByTag(tagSlug: string): Promise<BlogPost[]> {
  try {
    const allPosts = await getAllPosts()
    return allPosts.filter(post => 
      post.tags.some(tag => 
        tag.toLowerCase().replace(/\s+/g, '-') === tagSlug
      )
    )
  } catch (error) {
    console.error(`Error getting posts by tag ${tagSlug}:`, error)
    return []
  }
}

export async function getFeaturedPosts(): Promise<BlogPost[]> {
  try {
    const allPosts = await getAllPosts()
    return allPosts.filter(post => post.featured)
  } catch (error) {
    console.error('Error getting featured posts:', error)
    return []
  }
}

export async function getRelatedPosts(currentSlug: string, limit: number = 3): Promise<BlogPost[]> {
  try {
    const currentPost = await getPostBySlug(currentSlug)
    if (!currentPost) return []

    const allPosts = await getAllPosts()
    const otherPosts = allPosts.filter(post => post.slug !== currentSlug)

    const scoredPosts = otherPosts.map(post => {
      let score = 0
      
      if (post.category === currentPost.category) {
        score += 3
      }
      
      const sharedTags = post.tags.filter(tag => 
        currentPost.tags.includes(tag)
      )
      score += sharedTags.length

      return { post, score }
    })

    return scoredPosts
      .filter(({ score }) => score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map(({ post }) => post)
  } catch (error) {
    console.error(`Error getting related posts for ${currentSlug}:`, error)
    return []
  }
}

export async function getAllCategories(): Promise<Category[]> {
  try {
    const allPosts = await getAllPosts()
    const categoryMap = new Map<string, number>()

    allPosts.forEach(post => {
      const categoryName = post.category
      categoryMap.set(categoryName, (categoryMap.get(categoryName) || 0) + 1)
    })

    return Array.from(categoryMap.entries()).map(([name, postCount]) => ({
      slug: name.toLowerCase().replace(/\s+/g, '-'),
      name,
      description: `${name} ile ilgili yazılar`,
      postCount,
    }))
  } catch (error) {
    console.error('Error getting all categories:', error)
    return []
  }
}

export async function getAllTags(): Promise<Tag[]> {
  try {
    const allPosts = await getAllPosts()
    const tagMap = new Map<string, number>()

    allPosts.forEach(post => {
      post.tags.forEach(tag => {
        tagMap.set(tag, (tagMap.get(tag) || 0) + 1)
      })
    })

    return Array.from(tagMap.entries()).map(([name, postCount]) => ({
      slug: name.toLowerCase().replace(/\s+/g, '-'),
      name,
      postCount,
    }))
  } catch (error) {
    console.error('Error getting all tags:', error)
    return []
  }
}

