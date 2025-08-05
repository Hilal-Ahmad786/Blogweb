import { getAllCategories } from '@/lib/api'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { Folder, ArrowRight } from 'lucide-react'

export default async function CategoriesPage() {
  const categories = await getAllCategories()

  const categoryColors = [
    'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
    'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
    'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200',
    'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200',
  ]

  return (
    <div className="container py-12">
      <div className="mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
            Kategoriler
          </h1>
          <p className="text-lg text-muted-foreground">
            İlgi alanlarınıza göre yazıları keşfedin ve kendinizi geliştirin.
          </p>
        </div>

        {categories.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {categories.map((category, index) => (
              <Link key={category.slug} href={`/category/${category.slug}`}>
                <Card className="group h-full transition-all duration-300 hover:shadow-lg card-hover">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <div className={`p-3 rounded-lg ${categoryColors[index % categoryColors.length]}`}>
                        <Folder className="h-6 w-6" />
                      </div>
                      <Badge variant="secondary">
                        {category.postCount} yazı
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardTitle className="mb-2 group-hover:text-primary transition-colors">
                      {category.name}
                    </CardTitle>
                    <CardDescription className="mb-4">
                      {category.description}
                    </CardDescription>
                    <div className="flex items-center text-sm text-primary font-medium">
                      Yazıları Görüntüle
                      <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Folder className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Henüz kategori yok</h3>
            <p className="text-muted-foreground">
              İlk yazı yayınlandığında kategoriler burada görünecek.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
