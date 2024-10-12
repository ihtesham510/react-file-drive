'use client'

import { Button } from '@/components/ui/button'
import useTheme from '@/hooks/useTheme'
import { MoonIcon, SunIcon } from 'lucide-react'

export default function () {
	const { theme, toggleTheme } = useTheme()
	return (
		<Button variant='outline' size='icon' onClick={toggleTheme}>
			{theme === 'dark' ? <MoonIcon /> : <SunIcon />}
		</Button>
	)
}
