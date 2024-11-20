import isometricCameraConfiguration from './configs/isometric.config'
import thirdPersonCameraConfiguration from './configs/thirdPerson.config'
import firstPersonCameraConfiguration from './configs/firstPerson.config'

class CameraStore {
	activeCameraName = $state('isometric')
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
		this.activeCameraName = which
	}

	getActiveCamera() {
		return this[this.activeCameraName]
	}

	adjustZoom(amount: number) {
		const camera = this[this.activeCameraName].camera
		camera.zoom = camera.zoom + amount
	}

	setZoom(value: number) {
		this[this.activeCameraName].camera.zoom = value
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

const store = new CameraStore()
export default store
globalThis.cameraStore = store
