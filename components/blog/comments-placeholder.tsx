'use client'

import { useState } from 'react'

interface CommentsPlaceholderProps {
  postId: string
  postTitle: string
  postUrl?: string
}

export default function CommentsPlaceholder({ 
  postId, 
  postTitle, 
  postUrl 
}: CommentsPlaceholderProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <section className="mt-12 pt-8 border-t border-gray-200">
      <div className="max-w-4xl mx-auto">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">
          Comments
        </h3>

        {!isExpanded ? (
          <div className="bg-gray-50 rounded-lg p-8 text-center">
            <div className="mb-4">
              <svg
                className="w-12 h-12 mx-auto text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            </div>
            
            <h4 className="text-lg font-semibold text-gray-900 mb-2">
              Join the Discussion
            </h4>
            
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Share your thoughts and engage with other readers about "{postTitle}".
            </p>

            <button
              onClick={() => setIsExpanded(true)}
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              Load Comments
              <svg
                className="ml-2 w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            <div className="mt-6 text-sm text-gray-500">
              <p>Comments are powered by your preferred service</p>
            </div>
          </div>
        ) : (
          <CommentsSection postId={postId} postTitle={postTitle} postUrl={postUrl} />
        )}
      </div>
    </section>
  )
}

// Comments section component (expandable)
function CommentsSection({ 
  postId, 
  postTitle, 
  postUrl 
}: CommentsPlaceholderProps) {
  return (
    <div className="space-y-6">
      {/* Comment form */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h4 className="font-semibold text-gray-900 mb-4">
          Leave a Comment
        </h4>
        
        <form className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Name *
              </label>
              <input
                type="text"
                id="name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email *
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="your@email.com"
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">
              Comment *
            </label>
            <textarea
              id="comment"
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Share your thoughts..."
            />
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              id="subscribe"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="subscribe" className="ml-2 text-sm text-gray-600">
              Subscribe to replies via email
            </label>
          </div>
          
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
          >
            Post Comment
          </button>
        </form>
      </div>

      {/* Sample comments - replace with actual comment system */}
      <div className="space-y-4">
        <SampleComment />
        <SampleComment isReply />
      </div>

      {/* Integration suggestions */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h5 className="font-medium text-blue-900 mb-2">
          🚀 Ready to integrate a comment system?
        </h5>
        <p className="text-sm text-blue-800 mb-3">
          Replace this placeholder with your preferred commenting solution:
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
          <div className="bg-white rounded px-2 py-1 text-blue-700">Disqus</div>
          <div className="bg-white rounded px-2 py-1 text-blue-700">Commento</div>
          <div className="bg-white rounded px-2 py-1 text-blue-700">Utterances</div>
          <div className="bg-white rounded px-2 py-1 text-blue-700">Giscus</div>
        </div>
      </div>
    </div>
  )
}

// Sample comment component for demonstration
function SampleComment({ isReply = false }: { isReply?: boolean }) {
  return (
    <div className={`bg-white border border-gray-200 rounded-lg p-4 ${isReply ? 'ml-8' : ''}`}>
      <div className="flex items-start space-x-3">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-medium text-sm">
          JS
        </div>
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-1">
            <h6 className="font-medium text-gray-900">John Smith</h6>
            <span className="text-sm text-gray-500">2 hours ago</span>
          </div>
          <p className="text-gray-700 text-sm mb-2">
            This is a great article! Thanks for sharing these insights. I particularly found the section about performance optimization very helpful.
          </p>
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <button className="hover:text-blue-600 transition-colors">
              👍 Like (3)
            </button>
            <button className="hover:text-blue-600 transition-colors">
              💬 Reply
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Alternative: Simple Disqus integration placeholder
export function DisqusCommentsPlaceholder({ 
  postId, 
  postTitle, 
  postUrl 
}: CommentsPlaceholderProps) {
  const [loadDisqus, setLoadDisqus] = useState(false)

  return (
    <section className="mt-12 pt-8 border-t border-gray-200">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">
        Comments
      </h3>
      
      {!loadDisqus ? (
        <div className="text-center py-8">
          <button
            onClick={() => setLoadDisqus(true)}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Load Disqus Comments
          </button>
        </div>
      ) : (
        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <p className="text-gray-600 mb-4">
            Disqus comments would load here
          </p>
          <div className="text-sm text-gray-500">
            <p>To integrate Disqus:</p>
            <ol className="list-decimal list-inside mt-2 space-y-1">
              <li>Sign up at disqus.com</li>
              <li>Get your site shortname</li>
              <li>Replace this placeholder with Disqus embed code</li>
            </ol>
          </div>
        </div>
      )}
    </section>
  )
}