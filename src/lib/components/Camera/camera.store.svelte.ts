import { isometricCameraConfiguration } from './configuration'
import { thirdPersonCameraConfiguration } from './configuration'
import { firstPersonCameraConfiguration } from './configuration'

const store = $state({
	activeCamera: 'isometric',
	isometric: isometricCameraConfiguration,
	thirdPerson: thirdPersonCameraConfiguration,
	firstPerson: firstPersonCameraConfiguration
})

const saveControls = (which: string, controls: any) => {
	store[which].controls = controls
}

const saveCamera = (which: string, camera: any) => {
	store[which].camera = camera
}

const setActiveCamera = (which: string) => {
	store.activeCamera = which
}

// cameraStore.adjustZoom(10)
// cameraStore.adjustZoom(-10)
const adjustZoom = (amount: number) => {
	const camera = store[store.activeCamera].camera
	store[store.activeCamera].camera.zoom = camera.zoom + amount
}

const setZoom = (value: number) => {
	store[store.activeCamera].camera.zoom = value
}

const getActiveCamera = () => {
	return store[store.activeCamera]
}

const zoomIn = () => adjustZoom(10)
const zoomOut = () => adjustZoom(-10)

const final = {
	getActiveCamera,
	setActiveCamera,
	saveCamera,
	saveControls,
	zoomIn,
	zoomOut,
	adjustZoom,
	setZoom,

	get state() {
		return store
	}
}

export default final
globalThis.cameraStore = final
