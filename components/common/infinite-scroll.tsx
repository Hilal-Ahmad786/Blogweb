'use client'

import { useEffect, useState, useCallback, useRef } from 'react'
import { useIntersection } from '@/hooks/use-intersection'

interface InfiniteScrollProps<T> {
  data: T[]
  renderItem: (item: T, index: number) => React.ReactNode
  loadMore: () => Promise<T[]>
  hasMore: boolean
  loading: boolean
  loadingComponent?: React.ReactNode
  endMessage?: React.ReactNode
  threshold?: number
  rootMargin?: string
  className?: string
  itemClassName?: string
}

export default function InfiniteScroll<T extends { id: string | number }>({
  data,
  renderItem,
  loadMore,
  hasMore,
  loading,
  loadingComponent,
  endMessage,
  threshold = 0.1,
  rootMargin = '0px',
  className = '',
  itemClassName = ''
}: InfiniteScrollProps<T>) {
  const [items, setItems] = useState<T[]>(data)
  const [isLoading, setIsLoading] = useState(loading)
  const [hasMoreItems, setHasMoreItems] = useState(hasMore)
  const loadingRef = useRef<HTMLDivElement>(null)
  
  // Use intersection observer to detect when loading trigger comes into view
  const isIntersecting = useIntersection(loadingRef, {
    threshold,
    rootMargin
  })

  // Update items when data prop changes
  useEffect(() => {
    setItems(data)
  }, [data])

  // Update loading state when loading prop changes
  useEffect(() => {
    setIsLoading(loading)
  }, [loading])

  // Update hasMore state when hasMore prop changes
  useEffect(() => {
    setHasMoreItems(hasMore)
  }, [hasMore])

  // Load more items when intersection is detected
  const handleLoadMore = useCallback(async () => {
    if (isLoading || !hasMoreItems) return

    setIsLoading(true)
    
    try {
      const newItems = await loadMore()
      
      if (newItems.length === 0) {
        setHasMoreItems(false)
      } else {
        setItems(prevItems => [...prevItems, ...newItems])
      }
    } catch (error) {
      console.error('Error loading more items:', error)
    } finally {
      setIsLoading(false)
    }
  }, [isLoading, hasMoreItems, loadMore])

  // Trigger load more when intersection is detected
  useEffect(() => {
    if (isIntersecting && hasMoreItems && !isLoading) {
      handleLoadMore()
    }
  }, [isIntersecting, hasMoreItems, isLoading, handleLoadMore])

  return (
    <div className={className}>
      {/* Render items */}
      <div className="space-y-6">
        {items.map((item, index) => (
          <div key={item.id} className={itemClassName}>
            {renderItem(item, index)}
          </div>
        ))}
      </div>

      {/* Loading indicator / End message */}
      {hasMoreItems ? (
        <div
          ref={loadingRef}
          className="flex justify-center py-8"
        >
          {isLoading ? (
            loadingComponent || <DefaultLoadingComponent />
          ) : (
            <div className="text-gray-500 text-sm">
              Scroll to load more...
            </div>
          )}
        </div>
      ) : (
        <div className="flex justify-center py-8">
          {endMessage || <DefaultEndMessage />}
        </div>
      )}
    </div>
  )
}

// Default loading component
function DefaultLoadingComponent() {
  return (
    <div className="flex items-center space-x-2">
      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
      <span className="text-gray-600">Loading more...</span>
    </div>
  )
}

// Default end message
function DefaultEndMessage() {
  return (
    <div className="text-center">
      <div className="inline-flex items-center px-4 py-2 bg-gray-100 rounded-full text-gray-600 text-sm">
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
        You've reached the end!
      </div>
    </div>
  )
}

// Infinite scroll with grid layout
export function InfiniteScrollGrid<T extends { id: string | number }>({
  data,
  renderItem,
  loadMore,
  hasMore,
  loading,
  columns = 3,
  gap = 6,
  loadingComponent,
  endMessage,
  threshold = 0.1,
  rootMargin = '0px',
  className = ''
}: InfiniteScrollProps<T> & {
  columns?: 2 | 3 | 4
  gap?: number
}) {
  const gridClasses = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
  }

  return (
    <InfiniteScroll
      data={data}
      renderItem={renderItem}
      loadMore={loadMore}
      hasMore={hasMore}
      loading={loading}
      loadingComponent={loadingComponent}
      endMessage={endMessage}
      threshold={threshold}
      rootMargin={rootMargin}
      className={className}
      itemClassName={`grid ${gridClasses[columns]} gap-${gap}`}
    />
  )
}

// Infinite scroll with pagination info
export function InfiniteScrollWithPagination<T extends { id: string | number }>({
  data,
  renderItem,
  loadMore,
  hasMore,
  loading,
  totalCount,
  loadingComponent,
  endMessage,
  threshold = 0.1,
  rootMargin = '0px',
  className = ''
}: InfiniteScrollProps<T> & {
  totalCount?: number
}) {
  const [items, setItems] = useState<T[]>(data)

  useEffect(() => {
    setItems(data)
  }, [data])

  return (
    <div className={className}>
      {/* Items count */}
      {totalCount !== undefined && (
        <div className="mb-6 text-sm text-gray-600">
          Showing {items.length} of {totalCount} items
        </div>
      )}

      <InfiniteScroll
        data={data}
        renderItem={renderItem}
        loadMore={loadMore}
        hasMore={hasMore}
        loading={loading}
        loadingComponent={loadingComponent}
        endMessage={endMessage}
        threshold={threshold}
        rootMargin={rootMargin}
      />

      {/* Progress indicator */}
      {totalCount !== undefined && totalCount > 0 && (
        <div className="mt-6">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${Math.min((items.length / totalCount) * 100, 100)}%` }}
            />
          </div>
          <div className="text-center text-sm text-gray-600 mt-2">
            {Math.round((items.length / totalCount) * 100)}% loaded
          </div>
        </div>
      )}
    </div>
  )
}

// Hook for managing infinite scroll state
export function useInfiniteScroll<T>(
  initialData: T[] = [],
  fetchFunction: (page: number) => Promise<{ data: T[]; hasMore: boolean; total?: number }>
) {
  const [data, setData] = useState<T[]>(initialData)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState<number | undefined>()
  const [error, setError] = useState<string | null>(null)

  const loadMore = useCallback(async (): Promise<T[]> => {
    if (loading) return []

    setLoading(true)
    setError(null)

    try {
      const result = await fetchFunction(page)
      
      setData(prevData => [...prevData, ...result.data])
      setHasMore(result.hasMore)
      setPage(prevPage => prevPage + 1)
      
      if (result.total !== undefined) {
        setTotal(result.total)
      }

      return result.data
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      return []
    } finally {
      setLoading(false)
    }
  }, [fetchFunction, page, loading])

  const reset = useCallback(() => {
    setData(initialData)
    setPage(1)
    setHasMore(true)
    setError(null)
    setTotal(undefined)
  }, [initialData])

  return {
    data,
    loading,
    hasMore,
    total,
    error,
    loadMore,
    reset
  }
}