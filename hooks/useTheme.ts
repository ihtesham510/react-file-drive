import { useThemeStore } from '@/store'
import { useEffect } from 'react'

export default function () {
	const themeStore = useThemeStore()
	useEffect(() => {
		localStorage.setItem('theme', themeStore.theme)
		if (themeStore.theme === 'dark') {
			document.documentElement.classList.add('dark')
		} else {
			document.documentElement.classList.remove('dark')
		}
	}, [themeStore.theme])
	return themeStore
}
