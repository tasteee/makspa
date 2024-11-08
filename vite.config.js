import topLevelAwait from 'vite-plugin-top-level-await'
import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vitest/config'
import mkcert from 'vite-plugin-mkcert'

const topAwait = topLevelAwait({
	promiseExportName: '__tla',
	promiseImportName: (i) => `__tla_${i}`
})

export default defineConfig({
	plugins: [mkcert(), sveltekit(), topAwait],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	},

	optimizeDeps: {
		exclude: ['@threlte/flex'] // Exclude the problematic package from optimization
	},

	build: {
		target: 'esnext'
	},

	server: {
		proxy: {}
	}
})
