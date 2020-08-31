import { createContext } from 'react'

interface Theme {
  background: string,
  bottomTabBackground: string,
  bottomTabTintColor: string,
  bottomTabTintColorActive: string,
  color: string,
  modalBackground: string
}

interface ThemeContext {
  theme: Theme,
  toggleTheme: () => void
}

// Light Theme
export const lightTheme = {
  background: '#f0f0f0',
  bottomTabBackground: '#f0f0f0',
  bottomTabTintColor: '#999',
  bottomTabTintColorActive: '#111',
  color: '#111',
  modalBackground: '#fff',
}

// Dark Theme
export const darkTheme = {
  background: '#111',
  bottomTabBackground: '#111',
  bottomTabTintColor: '#aaa',
  bottomTabTintColorActive: '#fff',
  color: '#fff',
  modalBackground: '#404040',
}

const ThemeContext = createContext<ThemeContext>({
  theme: lightTheme,
  toggleTheme: () => {},
})

export default ThemeContext