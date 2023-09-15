import { ReactNode, createContext, useEffect, useState } from "react";

type Theme = 'light' | 'dark'

type ThemeContextType = {
  theme: Theme;
  toggleTheme(): void
}

export const ThemeContext = createContext<ThemeContextType>({
  theme: 'dark',
  toggleTheme: () => { }
})

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>('dark')

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme')

    if (storedTheme) {
      setTheme(storedTheme as Theme)
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark')
    } else {
      setTheme('light')
    }
  }, [])

  function toggleTheme() {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'))
  }

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    localStorage.setItem('theme', theme)
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}