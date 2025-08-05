import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center space-y-6">
        <div className="space-y-2">
          <h1 className="text-6xl font-bold text-primary">404</h1>
          <h2 className="text-2xl font-semibold">Page Not Found</h2>
          <p className="text-muted-foreground max-w-md">
            Sorry, we couldn't find the page you're looking for. It might have been moved, deleted, or doesn't exist.
          </p>
        </div>
        
        <div className="flex gap-4 justify-center">
          <Button asChild>
            <Link href="/">Go Home</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/blog">Browse Blog</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
