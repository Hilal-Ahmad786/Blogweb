'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Search, X } from 'lucide-react'
import Link from 'next/link'
import { formatDate } from '@/lib/utils'
import type { BlogPost } from '@/types/blog'

export default function SearchPage() {
  const searchParams = useSearchParams()
  const [query, setQuery] = useState(searchParams.get('q') || '')
  const [results, setResults] = useState<BlogPost[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)

  const performSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([])
      setHasSearched(false)
      return
    }

    setIsLoading(true)
    setHasSearched(true)

    try {
      // Bu gerçek bir API çağrısı olacak
      // Şimdilik mock data kullanıyoruz
      await new Promise(resolve => setTimeout(resolve, 500))
      
      // Mock search results
      const mockResults: BlogPost[] = []
      setResults(mockResults)
    } catch (error) {
      console.error('Search error:', error)
      setResults([])
    } finally {
      setIsLoading(false)
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    performSearch(query)
  }

  const clearSearch = () => {
    setQuery('')
    setResults([])
    setHasSearched(false)
  }

  useEffect(() => {
    const initialQuery = searchParams.get('q')
    if (initialQuery) {
      performSearch(initialQuery)
    }
  }, [searchParams])

  return (
    <div className="container py-12">
      <div className="mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
            Arama
          </h1>
          <p className="text-lg text-muted-foreground">
            100leşme yazılarında aradığınızı bulun
          </p>
        </div>

        {/* Arama Formu */}
        <form onSubmit={handleSearch} className="mb-8">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Yazılarda ara... (örn: liderlik, özgüven, 100leşme)"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10 pr-12 py-3 text-lg"
            />
            {query && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={clearSearch}
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
          <div className="text-center mt-4">
            <Button type="submit" loading={isLoading} className="px-8">
              {isLoading ? 'Aranıyor...' : 'Ara'}
            </Button>
          </div>
        </form>

        {/* Arama Sonuçları */}
        {hasSearched && (
          <div>
            <div className="mb-6">
              <h2 className="text-xl font-semibold">
                Arama Sonuçları
                {query && (
                  <span className="text-muted-foreground font-normal">
                    {' '}"<span className="font-medium">{query}</span>" için
                  </span>
                )}
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                {results.length} sonuç bulundu
              </p>
            </div>

            {results.length > 0 ? (
              <div className="space-y-6">
                {results.map((post) => (
                  <Link key={post.slug} href={`/blog/${post.slug}`}>
                    <Card className="group transition-all duration-300 hover:shadow-lg card-hover">
                      <CardHeader>
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="secondary">{post.category}</Badge>
                          <span className="text-xs text-muted-foreground">
                            {post.readingTime} dk okuma
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {formatDate(post.date)}
                          </span>
                        </div>
                        <CardTitle className="group-hover:text-primary transition-colors">
                          {post.title}
                        </CardTitle>
                        <CardDescription className="line-clamp-2">
                          {post.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <div className="flex flex-wrap gap-1">
                            {post.tags.slice(0, 3).map((tag) => (
                              <Badge key={tag} variant="outline" className="text-xs">
                                #{tag}
                              </Badge>
                            ))}
                          </div>
                          <span className="text-sm font-medium text-primary">
                            Devamını oku →
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Search className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Sonuç bulunamadı</h3>
                <p className="text-muted-foreground mb-6">
                  "{query}" için arama sonucu bulunamadı. Farklı kelimeler deneyin.
                </p>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p><strong>Öneriler:</strong></p>
                  <p>• Farklı kelimeler veya eş anlamlılar deneyin</p>
                  <p>• Daha genel terimler kullanın</p>
                  <p>• Yazım hatalarını kontrol edin</p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Popüler Aramalar */}
        {!hasSearched && (
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-6">Popüler Konular</h2>
            <div className="flex flex-wrap gap-3 justify-center">
              {['100leşme', 'Liderlik', 'Özgüven', 'Kariyer', 'Kişisel Gelişim', 'İş Yaşamı'].map((topic) => (
                <Button
                  key={topic}
                  variant="outline"
                  onClick={() => {
                    setQuery(topic)
                    performSearch(topic)
                  }}
                  className="mb-2"
                >
                  {topic}
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
