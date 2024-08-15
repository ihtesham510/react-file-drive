import { motion } from 'framer-motion'

import GlobeGithub from './ui/GithubGlobe'
import arcs from '@/assets/arcs'

export function Globe() {
	const globeConfig = {
		pointSize: 4,
		globeColor: '#ffffff',
		showAtmosphere: true,
		atmosphereColor: '#FFFFFF',
		atmosphereAltitude: 0.1,
		emissive: '#062056',
		emissiveIntensity: 0.1,
		shininess: 0.9,
		polygonColor: 'rgba(0,0,0,1.7)',
		ambientLight: '#ffffff',
		directionalLeftLight: '#ffffff',
		directionalTopLight: '#ffffff',
		pointLight: '#ffffff',
		arcTime: 1000,
		arcLength: 1,
		rings: 1,
		maxRings: 3,
		initialPosition: { lat: 22.3193, lng: 114.1694 },
		autoRotate: true,
		autoRotateSpeed: 0.5,
	}

	return (
		<div className='flex flex-row items-center justify-center py-20 h-screen md:h-auto dark:bg-black bg-white relative w-full'>
			<div className='max-w-7xl mx-auto w-full relative overflow-hidden h-full md:h-[40rem] px-4'>
				<motion.div
					initial={{
						opacity: 0,
						y: 20,
					}}
					animate={{
						opacity: 1,
						y: 0,
					}}
					transition={{
						duration: 1,
					}}
					className='div'
				>
					<h2 className='pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-9xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10 text-center'>
						Globe
					</h2>
				</motion.div>
				<div className='absolute w-full bottom-0 inset-x-0 h-40 md:h-80 bg-gradient-to-b pointer-events-none select-none from-transparent dark:to-white to-white z-40' />
				<div className='absolute w-full h-80 md:h-full z-10'>
					<GlobeGithub data={arcs} globeConfig={globeConfig} />
				</div>
			</div>
		</div>
	)
}
