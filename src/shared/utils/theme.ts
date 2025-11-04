const THEME_KEY = 'dev-trace-theme'

export type Theme = 'light' | 'dark'

export const themeUtils = {
  getTheme(): Theme {
    if (typeof window === 'undefined') return 'light'
    
    const saved = localStorage.getItem(THEME_KEY) as Theme | null
    if (saved) return saved
    
    // 시스템 설정 확인
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark'
    }
    
    return 'light'
  },

  setTheme(theme: Theme): void {
    if (typeof window === 'undefined') return
    
    localStorage.setItem(THEME_KEY, theme)
    document.documentElement.classList.remove('light', 'dark')
    document.documentElement.classList.add(theme)
  },

  toggleTheme(): Theme {
    const current = this.getTheme()
    const next = current === 'light' ? 'dark' : 'light'
    this.setTheme(next)
    return next
  },

  init(): void {
    if (typeof window === 'undefined') return
    this.setTheme(this.getTheme())
  },
}

