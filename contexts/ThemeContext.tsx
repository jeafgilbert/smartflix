import { createContext } from 'react'

interface Theme {
  name: string,
  background: string,
  bottomTabBackground: string,
  tintColor: string,
  tintColorActive: string,
  color: string,
  modalBackground: string,
  darkTintColor: string,
  darkTintColorInactive: string,
  darkTintColorActive: string,
}

interface ThemeContext {
  theme: Theme,
  toggleTheme: () => void
}

// Light Theme
export const lightTheme = {
  name: 'light',
  background: '#f0f0f0',
  bottomTabBackground: '#f0f0f0',
  tintColor: '#999',
  tintColorActive: '#111',
  color: '#111',
  modalBackground: '#fff',
  darkTintColor: '#fff',
  darkTintColorInactive: '#aaa',
  darkTintColorActive: '#fff',
}

// Dark Theme
export const darkTheme = {
  name: 'dark',
  background: '#111',
  bottomTabBackground: '#111',
  tintColor: '#aaa',
  tintColorActive: '#fff',
  color: '#fff',
  modalBackground: '#404040',
  darkTintColor: '#fff',
  darkTintColorInactive: '#aaa',
  darkTintColorActive: '#fff',
}

const ThemeContext = createContext<ThemeContext>({
  theme: darkTheme,
  toggleTheme: () => {},
})

export default ThemeContext