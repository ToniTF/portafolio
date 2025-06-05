import React, { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext()

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme debe usarse dentro de un ThemeProvider')
  }
  return context
}

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    // Verificar preferencia guardada o preferencia del sistema
    const saved = localStorage.getItem('theme')
    if (saved) return saved
    
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })
  useEffect(() => {
    // Aplicar el tema al documentElement
    const root = window.document.documentElement
    
    // Añadir una pequeña transición antes de cambiar clases para suavizar la transición
    const applyTheme = () => {
      root.classList.remove('light', 'dark')
      root.classList.add(theme)
    }
    
    // Aplicar inmediatamente para evitar pestañeo
    applyTheme()
    
    // Guardar preferencia
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
  }

  const value = {
    theme,
    setTheme,
    toggleTheme,
    isDark: theme === 'dark'
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}
