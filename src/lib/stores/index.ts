import main from './store.svelte'
import spaceItems from './spaceItems.store.svelte'
import loaders from './loaders.store.svelte'
import camera from './camera.store.svelte'
import session from './session.store.svelte'
import keyboard from './keyboard.store.svelte'

const stores = {
	main,
	spaceItems,
	loaders,
	camera,
	session,
	keyboard
}

export default stores
