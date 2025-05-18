/** @type {import('next').NextConfig} */

const path = require('path');

const nextConfig = {
	reactStrictMode: false,
	output: 'standalone',
	experimental: {
		missingSuspenseWithCSRBailout: false,
	},
	eslint: {
		ignoreDuringBuilds: true,
	},
	typescript: {
		// Dangerously allow production builds to successfully complete even if
		// your project has type errors.
		ignoreBuildErrors: true,
	},
	images: {
		remotePatterns: [
			{
				protocol: 'http',
				hostname: 'localhost',
				port: '3000',
			},
			{
				protocol: 'https',
				hostname: 'dev.poker-planning.noduscompany.com',
				port: '',
			},
			{
				protocol: 'https',
				hostname: 'api.atlassian.com',
				port: '',
			},
			{
				protocol: 'https',
				hostname: 'lh3.googleusercontent.com'
			},
			{
				protocol: 'https',
				hostname: 'i.pravatar.cc'
			}
		],
	},
}

module.exports = nextConfig
