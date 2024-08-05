import React from 'react'
import { Link } from 'react-router-dom'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { BookCheckIcon, FolderGit2Icon, LayoutDashboardIcon, LineChart, ListTodoIcon } from 'lucide-react'
const DashboardAside = () => {
	return (
		<TooltipProvider>
			<aside className='fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background md:flex'>
				<nav className='flex flex-col items-center gap-4 px-2 sm:py-5'>
					<Link
						to='#'
						className='group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base'
					>
						<BookCheckIcon className='h-4 w-4 transition-all group-hover:scale-110' />
						<span className='sr-only'>Acme Inc</span>
					</Link>
					<Tooltip>
						<TooltipTrigger asChild>
							<Link
								to='/dashboard/overview'
								className={` ${'bg-accent text-white'} text-muted-foreground flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8`}
							>
								<LayoutDashboardIcon className='h-5 w-5' />
								<span className='sr-only'>Dashboard</span>
							</Link>
						</TooltipTrigger>
						<TooltipContent side='right'>Dashboard</TooltipContent>
					</Tooltip>
					<Tooltip>
						<TooltipTrigger asChild>
							<Link
								to='/dashboard/alltasks'
								className={` ${'bg-accent text-white'}text-muted-foreground flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8`}
							>
								<ListTodoIcon className='h-5 w-5' />
								<span className='sr-only'>All Tasks</span>
							</Link>
						</TooltipTrigger>
						<TooltipContent side='right'>All Tasks</TooltipContent>
					</Tooltip>
					<Tooltip>
						<TooltipTrigger asChild>
							<Link
								to='/dashboard/projects'
								className={` ${'bg-accent text-white'}text-muted-foreground flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8`}
							>
								<FolderGit2Icon className='h-5 w-5' />
								<span className='sr-only'>Projects</span>
							</Link>
						</TooltipTrigger>
						<TooltipContent side='right'>Projects</TooltipContent>
					</Tooltip>
					<Tooltip>
						<TooltipTrigger asChild>
							<Link
								to='/dashboard/analytics'
								className={` ${'hover:bg-accent text-white'}text-muted-foreground flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8`}
							>
								<LineChart className='h-5 w-5' />
								<span className='sr-only'>Analytics</span>
							</Link>
						</TooltipTrigger>
						<TooltipContent side='right'>Analytics</TooltipContent>
					</Tooltip>
				</nav>
			</aside>
		</TooltipProvider>
	)
}

export default DashboardAside
