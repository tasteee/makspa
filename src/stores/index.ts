import loaders from './loaders.store.svelte'
import camera from './camera.store.svelte'
import input from './input.store.svelte'
import shop from './shop.store.svelte'
import menuBar from './menuBar.store.svelte'
import main from './main-store.svelte'
import auth from './auth.store.svelte'

const stores = {
	auth,
	loaders,
	camera,
	input,
	menuBar,
	shop,
	main
}

export default stores
