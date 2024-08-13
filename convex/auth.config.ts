const AUTH_DOMAIN = process.env.CLERK_AUTH_DOMAIN
export default {
	providers: [
		{
			domain: AUTH_DOMAIN,
			applicationID: 'convex',
		},
	],
}
