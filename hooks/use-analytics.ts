'use client'

import { useEffect } from 'react'

interface AnalyticsEvent {
  action: string
  category: string
  label?: string
  value?: number
}

interface PageView {
  path: string
  title?: string
  referrer?: string
}

export function useAnalytics() {
  const shouldTrack = typeof window !== 'undefined' && 
    window.location.hostname !== 'localhost' &&
    !window.location.hostname.includes('127.0.0.1')

  const trackEvent = ({ action, category, label, value }: AnalyticsEvent) => {
    if (!shouldTrack) return

    try {
      // Google Analytics 4 (GA4)
      if (typeof window !== 'undefined' && typeof (window as any).gtag !== 'undefined') {
        (window as any).gtag('event', action, {
          event_category: category,
          event_label: label,
          value: value,
        })
      }

      // Simple console logging for development
      if (process.env.NODE_ENV === 'development') {
        console.log('Analytics Event:', {
          action,
          category,
          label,
          value,
          timestamp: new Date().toISOString(),
        })
      }
    } catch (error) {
      console.warn('Analytics tracking failed:', error)
    }
  }

  const trackPageView = ({ path, title, referrer }: PageView) => {
    if (!shouldTrack) return

    try {
      // Google Analytics 4 (GA4)
      if (typeof window !== 'undefined' && typeof (window as any).gtag !== 'undefined') {
        (window as any).gtag('config', 'G-XXXXXXXXXX', {
          page_location: path,
          page_title: title,
        })
      }

      // Simple console logging for development
      if (process.env.NODE_ENV === 'development') {
        console.log('Page View:', {
          path,
          title,
          referrer,
          timestamp: new Date().toISOString(),
        })
      }
    } catch (error) {
      console.warn('Page view tracking failed:', error)
    }
  }

  const trackQuizStart = (name: string, questionCount: number) => {
    trackEvent({
      action: 'quiz_start',
      category: 'quiz',
      label: name,
      value: questionCount,
    })
  }

  const trackQuizComplete = (name: string, score: number, total: number, duration: number) => {
    trackEvent({
      action: 'quiz_complete',
      category: 'quiz',
      label: name,
      value: Math.round((score / total) * 100),
    })

    trackEvent({
      action: 'quiz_duration',
      category: 'quiz',
      label: name,
      value: duration,
    })
  }

  const trackThemeChange = (theme: string) => {
    trackEvent({
      action: 'theme_change',
      category: 'ui',
      label: theme,
    })
  }

  const trackNavigation = (from: string, to: string) => {
    trackEvent({
      action: 'navigation',
      category: 'ui',
      label: `${from} → ${to}`,
    })
  }

  return {
    trackEvent,
    trackPageView,
    trackQuizStart,
    trackQuizComplete,
    trackThemeChange,
    trackNavigation,
    canTrack: shouldTrack,
  }
}
