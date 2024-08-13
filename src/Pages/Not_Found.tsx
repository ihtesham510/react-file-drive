import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
export default function Not_Found() {
	return (
		<div className='flex justify-center items-center relative h-screen w-full backdrop-blur-lg'>
			<Link to='/'>
				<Button className='absolute top-0 left-0 m-9'>
					<ArrowLeft />
				</Button>
			</Link>

			<h1 className='flex text-8xl items-center flex-col gap-6 font-mono'>
				<p>404</p> <p>Page not Found</p>
			</h1>
		</div>
	)
}
