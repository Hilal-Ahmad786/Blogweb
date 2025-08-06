import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { MDXComponents } from 'mdx/types'

// Custom components for MDX content
const components: MDXComponents = {
  // Headings
  h1: ({ children, ...props }) => (
    <h1 className="text-4xl font-bold text-gray-900 mb-6 mt-8 leading-tight" {...props}>
      {children}
    </h1>
  ),
  h2: ({ children, ...props }) => (
    <h2 className="text-3xl font-semibold text-gray-900 mb-4 mt-8 leading-tight" {...props}>
      {children}
    </h2>
  ),
  h3: ({ children, ...props }) => (
    <h3 className="text-2xl font-semibold text-gray-900 mb-3 mt-6 leading-tight" {...props}>
      {children}
    </h3>
  ),
  h4: ({ children, ...props }) => (
    <h4 className="text-xl font-semibold text-gray-900 mb-2 mt-4" {...props}>
      {children}
    </h4>
  ),
  h5: ({ children, ...props }) => (
    <h5 className="text-lg font-semibold text-gray-900 mb-2 mt-4" {...props}>
      {children}
    </h5>
  ),
  h6: ({ children, ...props }) => (
    <h6 className="text-base font-semibold text-gray-900 mb-2 mt-4" {...props}>
      {children}
    </h6>
  ),

  // Paragraphs and text
  p: ({ children, ...props }) => (
    <p className="text-gray-700 mb-4 leading-7 text-base" {...props}>
      {children}
    </p>
  ),

  // Links
  a: ({ href, children, ...props }) => {
    // External links
    if (href?.startsWith('http')) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 underline transition-colors"
          {...props}
        >
          {children}
        </a>
      )
    }
    // Internal links
    return (
      <Link
        href={href || '#'}
        className="text-blue-600 hover:text-blue-800 underline transition-colors"
        {...props}
      >
        {children}
      </Link>
    )
  },

  // Lists
  ul: ({ children, ...props }) => (
    <ul className="list-disc list-inside mb-4 space-y-2 text-gray-700" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }) => (
    <ol className="list-decimal list-inside mb-4 space-y-2 text-gray-700" {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }) => (
    <li className="leading-7" {...props}>
      {children}
    </li>
  ),

  // Code blocks
  pre: ({ children, ...props }) => (
    <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-4 text-sm" {...props}>
      {children}
    </pre>
  ),
  code: ({ children, ...props }) => (
    <code className="bg-gray-100 text-gray-800 px-1.5 py-0.5 rounded text-sm font-mono" {...props}>
      {children}
    </code>
  ),

  // Blockquotes
  blockquote: ({ children, ...props }) => (
    <blockquote className="border-l-4 border-blue-500 pl-4 py-2 mb-4 italic text-gray-700 bg-gray-50 rounded-r" {...props}>
      {children}
    </blockquote>
  ),

  // Images
  img: ({ src, alt, width, height, ...props }) => (
    <div className="mb-6">
      <Image
        src={src || ''}
        alt={alt || ''}
        width={typeof width === 'number' ? width : 800}
        height={typeof height === 'number' ? height : 400}
        className="rounded-lg w-full h-auto"
        {...props}
      />
      {alt && (
        <p className="text-sm text-gray-600 text-center mt-2 italic">
          {alt}
        </p>
      )}
    </div>
  ),

  // Tables
  table: ({ children, ...props }) => (
    <div className="overflow-x-auto mb-6">
      <table className="min-w-full border border-gray-300 bg-white" {...props}>
        {children}
      </table>
    </div>
  ),
  thead: ({ children, ...props }) => (
    <thead className="bg-gray-50" {...props}>
      {children}
    </thead>
  ),
  tbody: ({ children, ...props }) => (
    <tbody className="divide-y divide-gray-200" {...props}>
      {children}
    </tbody>
  ),
  th: ({ children, ...props }) => (
    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-900 border-b" {...props}>
      {children}
    </th>
  ),
  td: ({ children, ...props }) => (
    <td className="px-4 py-2 text-sm text-gray-700 border-b" {...props}>
      {children}
    </td>
  ),

  // Horizontal rule
  hr: ({ ...props }) => (
    <hr className="border-gray-300 my-8" {...props} />
  ),

  // Strong and emphasis
  strong: ({ children, ...props }) => (
    <strong className="font-semibold text-gray-900" {...props}>
      {children}
    </strong>
  ),
  em: ({ children, ...props }) => (
    <em className="italic" {...props}>
      {children}
    </em>
  ),

  // Custom callout component
  Callout: ({ children, type = 'info' }: { children: React.ReactNode; type?: 'info' | 'warning' | 'error' | 'success' }) => {
    const styles = {
      info: 'bg-blue-50 border-blue-200 text-blue-800',
      warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
      error: 'bg-red-50 border-red-200 text-red-800',
      success: 'bg-green-50 border-green-200 text-green-800',
    }
    
    return (
      <div className={`border-l-4 p-4 mb-4 rounded-r ${styles[type]}`}>
        {children}
      </div>
    )
  },
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
  }
}

export default components