import * as THREE from 'three'
import type { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

import keyboardStore from './keyboard.store.svelte'

class CameraStore {
	camera = $state(null)
	controls = $state(null)
}

export default new CameraStore()
