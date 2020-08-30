import { createContext } from 'react'

interface Theme {
  background: string,
  bottomTabBackground: string,
  bottomTabTintColor: string,
  bottomTabTintColorActive: string,
  color: string
}

interface ThemeContext {
  theme: Theme,
  toggleTheme: (() => void)
}

// Light Theme
export const lightTheme = {
  background: '#fff',
  bottomTabBackground: '#fff',
  bottomTabTintColor: '#999',
  bottomTabTintColorActive: '#111',
  color: '#111',
}

// Dark Theme
export const darkTheme = {
  background: '#111',
  bottomTabBackground: '#111',
  bottomTabTintColor: '#aaa',
  bottomTabTintColorActive: '#fff',
  color: '#fff',
}

const ThemeContext = createContext<ThemeContext>({
  theme: lightTheme,
  toggleTheme: () => {},
})

export default ThemeContext