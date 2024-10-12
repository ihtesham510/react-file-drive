/** @type {import('next').NextConfig} */
const nextConfig = {
	env: {
		VITE_CONVEX_URL: process.env.VITE_CONVEX_URL,
	},
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'good-salamander-320.convex.cloud',
				port: '',
				pathname: '/api/storage/**',
			},
		],
	},
}

export default nextConfig
