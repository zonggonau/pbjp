'use client'

import { useState, useMemo } from 'react'

export function useSearch<T>(
  items: T[],
  searchKeys: (keyof T)[],
  options?: {
    threshold?: number
    caseSensitive?: boolean
    includeScore?: boolean
  }
) {
  const [query, setQuery] = useState('')
  const { threshold = 0.3, caseSensitive = false, includeScore = false } = options || {}

  const filteredItems = useMemo(() => {
    if (!query.trim()) return items

    const searchQuery = caseSensitive ? query : query.toLowerCase()
    
    return items
      .map(item => {
        let score = 0
        let matches = false

        for (const key of searchKeys) {
          const value = String(item[key] || '')
          const searchValue = caseSensitive ? value : value.toLowerCase()
          
          if (searchValue.includes(searchQuery)) {
            matches = true
            score += 1
          }
        }

        return { item, score, matches }
      })
      .filter(({ matches, score }) => {
        if (!matches) return false
        const normalizedScore = score / searchKeys.length
        return normalizedScore >= (1 - threshold)
      })
      .sort((a, b) => b.score - a.score)
      .map(({ item, score }) => includeScore ? { item, score } : { item })
      .map(result => includeScore ? result : (result as any).item)
  }, [items, query, searchKeys, threshold, caseSensitive, includeScore])

  return {
    query,
    setQuery,
    filteredItems,
    isSearching: query.trim().length > 0
  }
}

export function useFilter<T>(
  items: T[],
  filters: {
    key: keyof T
    value: any
    comparator?: (item: T[keyof T], value: any) => boolean
  }[]
) {
  const filteredItems = useMemo(() => {
    return items.filter(item => {
      return filters.every(({ key, value, comparator }) => {
        if (comparator) {
          return comparator(item[key], value)
        }
        return item[key] === value
      })
    })
  }, [items, filters])

  return {
    filteredItems,
    hasActiveFilters: filters.some(filter => filter.value !== undefined && filter.value !== '')
  }
}
