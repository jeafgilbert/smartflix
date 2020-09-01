import React, { useState } from 'react'
import ThemeContext, { darkTheme, lightTheme } from '../contexts/ThemeContext'

export const ThemeProvider: React.FC = ({ children }) => {
  const [themeName, setThemeName] = useState('dark')
  const [activeTheme, setActiveTheme] = useState(darkTheme)

  const themeContext = React.useMemo(
    () => ({
      theme: activeTheme,
      toggleTheme: () => {
        if (themeName === 'light') {
          setThemeName('dark')
          setActiveTheme(darkTheme)
        }
        else {
          setThemeName('light')
          setActiveTheme(lightTheme)
        }
      },
    }), [activeTheme])

  return (
    <ThemeContext.Provider value={themeContext}>
      {children}
    </ThemeContext.Provider>
  )
}