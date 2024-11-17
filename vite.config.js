import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'
import topLevelAwait from 'vite-plugin-top-level-await'
import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vitest/config'
import mkcert from 'vite-plugin-mkcert'

const topAwait = topLevelAwait({
	promiseExportName: '__tla',
	promiseImportName: (i) => `__tla_${i}`
})

const preprocess = [vitePreprocess()]

export default defineConfig({
	plugins: [mkcert(), sveltekit(), topAwait],
	preprocess,

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
