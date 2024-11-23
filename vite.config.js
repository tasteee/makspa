import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'
import topLevelAwait from 'vite-plugin-top-level-await'
import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vitest/config'
import mkcert from 'vite-plugin-mkcert'
import path from 'path'

const topAwait = topLevelAwait({
	promiseExportName: '__tla',
	promiseImportName: (i) => `__tla_${i}`
})

export default defineConfig({
	plugins: [mkcert(), sveltekit(), topAwait],
	preprocess: [vitePreprocess()],

	resolve: {
		alias: {
			'@': path.resolve('./src'),
			'~': path.resolve('./src'),
			$lib: path.resolve('./src/lib'),
			'@lib': path.resolve('./src/lib'),
			components: path.resolve('./src/lib/components'),
			'@modules': path.resolve('./src/lib/modules'),
			modules: path.resolve('./src/lib/modules'),
			stores: path.resolve('./src/lib/stores'),
			types: path.resolve('./src/lib/types'),
			styles: path.resolve('./src/lib/styles')
		}
	},

	optimizeDeps: {
		exclude: ['@threlte/flex']
	},

	build: {
		target: 'esnext'
	},

	server: {
		proxy: {}
	}
})
