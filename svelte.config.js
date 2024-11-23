import adapter from '@sveltejs/adapter-auto'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'

const config = {
	kit: {
		adapter: adapter(),
		alias: {
			'@': './src',
			'~': './src',
			$lib: './src/lib',
			'@lib': './src/lib',
			components: './src/lib/components',
			'@modules': './src/lib/modules',
			modules: './src/lib/modules',
			stores: './src/lib/stores',
			types: './src/lib/types',
			styles: './src/lib/styles'
		}
	},
	preprocess: vitePreprocess()
}

export default config
