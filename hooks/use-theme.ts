'use client'

import { useState, useEffect } from 'react'

export type Theme = 'light' | 'dark' | 'system'

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === 'undefined') return 'system'
    
    const stored = localStorage.getItem('pbjp_theme') as Theme
    if (stored) return stored
    
    return 'system'
  })

  const [systemTheme, setSystemTheme] = useState<'light' | 'dark'>('light')

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    
    const handleChange = (e: MediaQueryListEvent) => {
      setSystemTheme(e.matches ? 'dark' : 'light')
    }

    // Set initial value
    setSystemTheme(mediaQuery.matches ? 'dark' : 'light')

    // Listen for changes
    mediaQuery.addEventListener('change', handleChange)
    
    return () => {
      mediaQuery.removeEventListener('change', handleChange)
    }
  }, [])

  useEffect(() => {
    const root = document.documentElement
    
    if (theme === 'system') {
      root.classList.remove('light', 'dark')
      root.classList.add(systemTheme)
    } else {
      root.classList.remove('light', 'dark')
      root.classList.add(theme)
    }
  }, [theme, systemTheme])

  const setThemeWithTransition = (newTheme: Theme) => {
    // Add transition class for smooth theme switching
    document.documentElement.classList.add('theme-transition')
    
    setTheme(newTheme)
    localStorage.setItem('pbjp_theme', newTheme)
    
    // Remove transition class after animation completes
    setTimeout(() => {
      document.documentElement.classList.remove('theme-transition')
    }, 300)
  }

  const resolvedTheme = theme === 'system' ? systemTheme : theme

  return {
    theme,
    setTheme: setThemeWithTransition,
    resolvedTheme,
    isDark: resolvedTheme === 'dark',
    systemTheme
  }
}
