import * as THREE from 'three'
import CameraControls from 'camera-controls'
import mainStore from '~/stores/main-store.svelte'
import menuBar from '~/stores/menuBar.store.svelte'
import { percentageToDegrees } from '~/modules/numbers'

class PerspectiveCameraConfiguration {
	camera = null
	controls = null
	fov = 75 // Increased FOV for better perspective
	aspect = globalThis.innerWidth / globalThis.innerHeight
	near = 0.1
	far = 1000
	zoom = 1
	minZoom = 0.1
	maxZoom = 25
	dollySpeed = 1
	truckSpeed = 1
	dampingFactor = 0.05
	azimuthRotateSpeed = 1
	polarRotateSpeed = 1
	dollyToCursor = true
	dollyDragInverted = false
	restThreshold = 0.0025

	// Adjust initial position for better view
	position = [15, 15, 15]
	target = { x: 0, y: 0, z: 0 }
}

class PerspectiveCameraStore {
	camera = $state(null)
	controls = $state(null)
	config = new PerspectiveCameraConfiguration()

	updateProjectionMatrix = () => {
		this.config.aspect = window.innerWidth / window.innerHeight
		this.camera.fov = this.config.fov
		this.camera.aspect = this.config.aspect
		this.camera.near = this.config.near
		this.camera.far = this.config.far
		this.camera.updateProjectionMatrix()
	}

	createCamera = () => {
		const { fov, aspect, near, far } = this.config
		this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far)

		// Set the initial position
		const [x, y, z] = this.config.position
		this.camera.position.set(x, y, z)

		// Look at the target
		const { x: tx, y: ty, z: tz } = this.config.target
		this.camera.lookAt(tx, ty, tz)
	}

	createCameraControls = (domElement) => {
		if (!domElement) return
		const controls = new CameraControls(this.camera, domElement)

		// Configure mouse controls
		controls.mouseButtons.left = CameraControls.ACTION.ROTATE
		controls.mouseButtons.middle = CameraControls.ACTION.DOLLY
		controls.mouseButtons.right = CameraControls.ACTION.TRUCK
		controls.touches.one = CameraControls.ACTION.TOUCH_ROTATE
		controls.touches.two = CameraControls.ACTION.TOUCH_DOLLY_TRUCK
		controls.touches.three = CameraControls.ACTION.TOUCH_TRUCK

		// Configure control parameters
		controls.dampingFactor = this.config.dampingFactor
		controls.draggingDampingFactor = this.config.dampingFactor
		controls.dollySpeed = this.config.dollySpeed
		controls.truckSpeed = this.config.truckSpeed
		controls.dollyToCursor = this.config.dollyToCursor
		controls.verticalDragToForward = false
		controls.minDistance = 1
		controls.maxDistance = 100

		// Enable smooth damping
		controls.smoothTime = 0.25

		// Set initial position and target
		const [x, y, z] = this.config.position
		controls.setPosition(x, y, z, true)
		controls.setTarget(this.config.target.x, this.config.target.y, this.config.target.z, true)

		this.controls = controls

		// Only restore state if there's a saved state
		const savedState = localStorage.getItem('cameraState')
		if (savedState) {
			this.restoreState()
		}

		// Ensure controls are updated
		controls.update(0)
	}

	restoreState() {
		const savedState = localStorage.getItem('cameraState')
		if (savedState && this.controls) {
			const state = JSON.parse(savedState)

			// Restore position
			this.controls.setPosition(
				state.position.x,
				state.position.y,
				state.position.z,
				false // Don't animate immediately
			)

			// Restore target
			this.controls.setTarget(state.target.x, state.target.y, state.target.z, false)

			// Restore zoom level
			this.camera.zoom = state.zoom
			this.camera.updateProjectionMatrix()
			this.controls.update()
		}
	}

	saveState() {
		if (this.controls) {
			localStorage.setItem(
				'cameraState',
				JSON.stringify({
					position: this.controls.getPosition(),
					target: this.controls.getTarget(),
					zoom: this.camera.zoom
				})
			)
		}
	}

	resetCamera = () => {
		if (!this.controls || !this.camera) return

		// Reset to initial position
		const [x, y, z] = this.config.position
		this.controls.setPosition(x, y, z, true)

		// Reset target
		const { x: tx, y: ty, z: tz } = this.config.target
		this.controls.setTarget(tx, ty, tz, true)

		// Reset zoom
		this.controls.zoomTo(this.config.zoom, true)

		// Ensure camera updates
		this.camera.updateProjectionMatrix()
		this.camera.updateMatrixWorld(true)
	}
}

export const perspectiveCameraStore = new PerspectiveCameraStore()
globalThis.cameraStore0 = perspectiveCameraStore
export default perspectiveCameraStore
