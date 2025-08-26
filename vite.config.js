import { defineConfig } from 'vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { VitePWA } from 'vite-plugin-pwa';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
	plugins: [
		tailwindcss(),
		sveltekit(),
		VitePWA({
			registerType: 'autoUpdate',
			includeAssets: [
				'favicon.png',
				'favicon-32x32.png',
				'favicon-16x16.png',
				'apple-touch-icon.png',
				'icons/icon-192x192.png',
				'icons/icon-512x512.png'
			],
			manifest: {
				name: 'kceva - Calculators & Converters',
				short_name: 'kceva',
				description: '100+ free online calculators and converters for finance, health, math, unit conversion, and more.',
				theme_color: '#2563eb',
				background_color: '#ffffff',
				display: 'standalone',
				orientation: 'portrait',
				start_url: '/',
				icons: [
					{
						src: '/icons/icon-192x192.png',
						sizes: '192x192',
						type: 'image/png'
					},
					{
						src: '/icons/icon-512x512.png',
						sizes: '512x512',
						type: 'image/png'
					}
				]
			},
			workbox: {
				runtimeCaching: [
					{
						urlPattern: ({ url }) => url.origin === self.location.origin,
						handler: 'CacheFirst',
						options: {
							cacheName: 'kceva-cache',
							expiration: {
								maxEntries: 200,
								maxAgeSeconds: 60 * 60 * 24 * 30 // 30 days
							}
						}
					},
					{
						urlPattern: /^https:\/\/fonts\.(googleapis|gstatic)\.com\/.*/i,
						handler: 'CacheFirst',
						options: {
							cacheName: 'google-fonts-cache',
							expiration: {
								maxEntries: 20,
								maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
							}
						}
					}
				]
			}
		})
	]
});