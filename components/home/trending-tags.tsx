import Link from 'next/link'
import { Badge } from '@/components/ui/badge'

interface TrendingTagsProps {
  tags: string[]
}

export function TrendingTags({ tags }: TrendingTagsProps) {
  // Filter out technical tags and keep only relevant personal development tags
  const personalDevelopmentTags = [
    '100leşme',
    'Kendini Tanıma', 
    'Liderlik',
    'Özgüven',
    'Kişisel Gelişim',
    'İç Ses',
    'Yaşam Felsefesi',
    'Kadın',
    'İş Yaşamı',
    'Motivasyon'
  ]
  
  // Use predefined tags or filter the passed tags
  const displayTags = personalDevelopmentTags.slice(0, 10)

  if (!displayTags.length) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Henüz etiket yok.</p>
      </div>
    )
  }

  return (
    <div className="flex flex-wrap gap-3 justify-center">
      {displayTags.map((tag, index) => (
        <Link key={tag} href={`/tag/${tag.toLowerCase().replace(/\s+/g, '-')}`}>
          <Badge
            variant="outline"
            className="hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer text-sm px-4 py-2"
          >
            #{tag}
          </Badge>
        </Link>
      ))}
    </div>
  )
}

