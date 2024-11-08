import adapter from '@sveltejs/adapter-auto'

const config = {
	build: {
		target: 'esnext'
	},

	kit: {
		adapter: adapter()
	}
}

export default config
