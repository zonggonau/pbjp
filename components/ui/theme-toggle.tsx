'use client'

'use client'

import { useTheme, type Theme } from '@/hooks/use-theme'

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme()

  const cycleTheme = () => {
    const themes: Theme[] = ['light', 'dark', 'system']
    const currentIndex = themes.indexOf(theme)
    const nextIndex = (currentIndex + 1) % themes.length
    setTheme(themes[nextIndex])
  }

  const getIcon = () => {
    if (theme === 'system') {
      return resolvedTheme === 'dark' ? '🌙' : '☀️'
    }
    return theme === 'dark' ? '🌙' : '☀️'
  }

  const icon = getIcon()
  const getLabel = () => {
    if (theme === 'system') {
      return `System (${resolvedTheme})`
    }
    return theme.charAt(0).toUpperCase() + theme.slice(1)
  }

  return (
    <button
      onClick={cycleTheme}
      className="inline-flex items-center gap-2 rounded-md border border-zinc-300 p-2 text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800 transition-colors"
      title={`Current theme: ${getLabel()}. Click to cycle themes.`}
      aria-label={`Toggle theme. Current: ${getLabel()}`}
    >
      <span className="h-4 w-4 text-lg">{icon}</span>
      <span className="text-xs font-medium">{getLabel()}</span>
    </button>
  )
}
