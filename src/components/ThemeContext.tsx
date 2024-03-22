import { Theme } from '@/lib/types'
import React, { ReactNode, createContext, useCallback, useContext, useEffect, useState } from 'react'
interface ThemeContextType {
	theme: Theme
	toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const getInitialTheme = (): Theme => {
		const hasDarkTheme = localStorage.getItem('theme')
		if (!hasDarkTheme) {
			return 'dark'
		}
		if (hasDarkTheme == 'dark') return 'dark'
		return 'light'
	}
	const [theme, setTheme] = useState<Theme>(getInitialTheme)
	useEffect(() => {
		if (theme == 'dark') {
			localStorage.setItem('theme', 'dark')
			document.documentElement.classList.add('dark')
		} else {
			localStorage.setItem('theme', 'light')
			document.documentElement.classList.remove('dark')
		}
	}, [theme])
	const toggleTheme = useCallback(() => {
		setTheme(theme => (theme == 'dark' ? 'light' : 'dark'))
	}, [theme])
	return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>
}

export const useTheme = () => {
	const context = useContext(ThemeContext)
	if (!context) {
		throw new Error('useTheme must be used within a ThemeProvider')
	}
	return context
}
