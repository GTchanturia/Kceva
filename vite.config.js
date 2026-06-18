import { defineConfig } from 'vite';
import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
	plugins: [
		tailwindcss(),
		sveltekit(),
		VitePWA({
			registerType: 'autoUpdate',
			// Use generateSW so the plugin manages its own SW, independent of SvelteKit's SW
			strategies: 'generateSW',
			manifest: {
				name: 'kceva Calculators',
				short_name: 'kceva',
				description: '100+ free online calculators and converters',
				theme_color: '#2563eb',
				background_color: '#ffffff',
				display: 'standalone',
				start_url: '/',
				icons: [
					{ src: '/favicon-192x192.png', sizes: '192x192', type: 'image/png' },
					{ src: '/favicon-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' }
				]
			},
			workbox: {
				// Cache static assets
				globPatterns: ['**/*.{js,css,html,svg,png,ico,woff2}'],
				// Skip third-party origins
				navigateFallback: null
			},
			devOptions: {
				enabled: false
			}
		})
	]
});
