import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'
// import AutoImport from 'unplugin-auto-import/vite'
import topLevelAwait from 'vite-plugin-top-level-await'
import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vitest/config'
import mkcert from 'vite-plugin-mkcert'
import path from 'path'

const topAwait = topLevelAwait({
	promiseExportName: '__tla',
	promiseImportName: (i) => `__tla_${i}`
})

// const autoImportPlugin = AutoImport({
// 	include: [/\.ts$/, /\.svelte$/, /\.js$/],

// 	imports: {
// 		three: ['*', 'THREE'],
// 		'array-range': ['default', 'range'],
// 		'just-memoize': ['default', 'memoize']
// 	},

// 	dts: './src/auto-imports.d.ts'
// })

export default defineConfig({
	plugins: [mkcert(), sveltekit(), topAwait],
	preprocess: [vitePreprocess()],

	resolve: {
		alias: {
			'~': path.resolve('./src')
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
