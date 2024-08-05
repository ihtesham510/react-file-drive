import { Button } from './ui/button'
import useTheme from '@/Hooks/useTheme'
import { SunIcon, MoonIcon } from 'lucide-react'
import ToolTip from './Tooltip'

export default function ThemeSwitch() {
	const { theme, toggleTheme } = useTheme()

	return (
		<ToolTip message={`Switch to ${theme == 'light' ? 'dark' : 'light'}`}>
			<Button variant='outline' onClick={() => toggleTheme()} size='icon'>
				{theme == 'light' && (
					<SunIcon className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
				)}
				<MoonIcon className='absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
				{theme == 'dark' && (
					<MoonIcon className='absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
				)}
				<span className='sr-only'>Toggle theme</span>
			</Button>
		</ToolTip>
	)
}
