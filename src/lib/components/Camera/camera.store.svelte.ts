import { isometricCameraConfiguration } from './camera.configs'
import { thirdPersonCameraConfiguration } from './camera.configs'
import { firstPersonCameraConfiguration } from './camera.configs'

class CameraStore {
	activeCamera = $state('isometric')
	isometric = $state(isometricCameraConfiguration)
	thirdPerson = $state(thirdPersonCameraConfiguration)
	firstPerson = $state(firstPersonCameraConfiguration)

	saveControls(which: string, controls: any) {
		this[which].controls = controls
	}

	saveCamera(which: string, camera: any) {
		this[which].camera = camera
	}

	setActiveCamera(which: string) {
		this.activeCamera = which
	}

	getActiveCamera() {
		return this[this.activeCamera]
	}

	adjustZoom(amount: number) {
		const camera = this[this.activeCamera].camera
		camera.zoom = camera.zoom + amount
	}

	setZoom(value: number) {
		this[this.activeCamera].camera.zoom = value
	}

	zoomIn() {
		this.adjustZoom(10)
	}

	zoomOut() {
		this.adjustZoom(-10)
	}

	resetZoom() {
		this.setZoom(100)
	}

	resetCamera() {
		this.setZoom(100)
		this.setActiveCamera('isometric')
	}
}

const store = $state(new CameraStore())

export default store
globalThis.cameraStore = store
