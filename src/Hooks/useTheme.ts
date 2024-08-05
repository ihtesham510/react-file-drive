import { useEffect } from 'react'
import { useThemeStore } from '../store'
export default function useTheme() {
	const themeStore = useThemeStore()
	const { theme } = themeStore
	useEffect(() => {
		if (theme == 'dark') {
			localStorage.setItem('theme', 'dark')
			document.documentElement.classList.add('dark')
		} else {
			localStorage.setItem('theme', 'light')
			document.documentElement.classList.remove('dark')
		}
	}, [theme])
	return themeStore
}
