import * as THREE from 'three'
import CameraControls from 'camera-controls'
import mainStore from '~/stores/main-store.svelte'
import menuBar from '~/stores/menuBar.store.svelte'
import isometricCameraConfig from '~/configs/isometric-camera-config'
import perspectiveCameraConfig from '~/configs/perspective-camera-config'
import sideScrollerCamera from '~/configs/sidescroller-camera-config.svelte'

class CameraStore {
	camera = $state(null)
	controls = $state(null)
	config = isometricCameraConfig

	updateFrustum = () => {
		const aspect = window.innerWidth / window.innerHeight
		const frustumSize = this.config.frustumSize
		this.camera.left = (-frustumSize * aspect) / 2
		this.camera.right = (frustumSize * aspect) / 2
		this.camera.top = frustumSize / 2
		this.camera.bottom = -frustumSize / 2
		this.camera.near = this.config.near
		this.camera.far = this.config.far
		this.camera.minZoom = this.config.minZoom
		this.camera.maxZoom = this.config.maxZoom
		this.camera.zoomSpeed = this.config.dollySpeed
		this.updateCamera()
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

	restoreState() {
		const savedState = localStorage.getItem('cameraState')
		if (savedState && this.controls) {
			const state = JSON.parse(savedState)
			this.controls.setPosition(state.position.x, state.position.y, state.position.z, false)
			this.controls.setTarget(state.target.x, state.target.y, state.target.z, false)
			this.camera.zoom = state.zoom
			this.camera.updateProjectionMatrix()
			this.controls.update()
		}
	}

	domElement = null

	createCameraControls = (domElement) => {
		if (domElement) this.domElement = domElement
		const element = this.domElement || domElement
		const controls = new CameraControls(this.camera, element)
		controls.mouseButtons.left = CameraControls.ACTION.ROTATE
		controls.mouseButtons.middle = CameraControls.ACTION.DOLLY
		controls.mouseButtons.right = CameraControls.ACTION.TRUCK
		controls.minZoom = this.config.minZoom
		controls.maxZoom = this.config.maxZoom
		controls.distance = this.config.distance
		controls.minDistance = this.config.minDistance
		controls.maxDistance = this.config.maxDistance
		controls.polarAngle = this.config.polarAngle
		controls.minPolarAngle = this.config.minPolarAngle
		controls.maxPolarAngle = this.config.maxPolarAngle
		controls.azimuthAngle = this.config.azimuthAngle
		controls.boundaryFriction = this.config.boundaryFriction
		controls.boundaryEnclosesCamera = this.config.boundaryEnclosesCamera
		controls.smoothTime = this.config.smoothTime
		controls.draggingSmoothTime = this.config.draggingSmoothTime
		controls.azimuthRotateSpeed = this.config.azimuthRotateSpeed
		controls.polarRotateSpeed = this.config.polarRotateSpeed
		controls.dollySpeed = this.config.dollySpeed
		controls.truckSpeed = this.config.truckSpeed
		controls.verticalDragToForward = this.config.verticalDragToForward
		controls.dollyToCursor = this.config.dollyToCursor
		controls.dollyDragInverted = this.config.dollyDragInverted
		controls.restThreshold = this.config.restThreshold
		controls.zoomTo(this.config.zoom, true)
		this.controls = controls
		this.restoreState() // Add this line
	}

	updateCamera = () => {
		return this.camera.updateProjectionMatrix()
	}

	getViewBounds = () => {
		return this.camera.getViewBounds()
	}

	getViewSize = () => {
		return this.camera.getViewSize()
	}

	calculateWorldSpaceOffset = (screenSpaceOffset: number): number => {
		const viewWidth = this.camera.right - this.camera.left
		const worldSpaceOffset = (screenSpaceOffset * viewWidth) / window.innerWidth
		return worldSpaceOffset / 2 / this.camera.zoom
	}

	moveTo = (x: number, y: number, z: number) => {
		let targetX = x
		let targetZ = z
		let targetY = y

		console.log('menuBar.activePanel', menuBar.activePanel)
		if (!!menuBar.activePanel) {
			const offsetX = this.calculateWorldSpaceOffset(200)
			const offsetZ = this.calculateWorldSpaceOffset(180)
			targetX += -offsetX
			targetZ += offsetZ
			targetY -= 0.125
		}

		this.controls.moveTo(targetX, targetY, targetZ, true)
	}

	moveToItem = (id: string) => {
		const item = mainStore.space.items[id]
		this.moveTo(item.positionX, item.positionY, item.positionZ)
	}

	resetCamera = () => {
		if (!this.controls || !this.camera) return

		// Safely reset angles and zoom
		const defaultPolarAngle = this.config.polarAngle || 0
		const defaultAzimuthAngle = this.config.azimuthAngle || 0
		const defaultZoom = this.config.zoom || 1

		this.controls.rotateTo(defaultAzimuthAngle, defaultPolarAngle, true)
		this.controls.zoomTo(defaultZoom, true)

		// Ensure the camera matrices are valid
		this.camera.updateMatrixWorld(true)

		// Reset listener parameters if AudioHandler is involved
		if (this.camera.audioListener) {
			const audioListener = this.camera.audioListener
			audioListener.gain.value = isFinite(audioListener.gain.value) ? audioListener.gain.value : 1 // Fallback to 1
		}
	}
}

export const isometricCameraStore = new CameraStore()
globalThis.isometricCameraStore = isometricCameraStore

export class PerspectiveCameraStore {
	camera = $state(null)
	controls = $state(null)
	config = perspectiveCameraConfig

	updateProjectionMatrix = () => {
		this.config.aspect = window.innerWidth / window.innerHeight
		this.camera.fov = this.config.fov
		this.camera.aspect = this.config.aspect
		this.camera.near = this.config.near
		this.camera.far = this.config.far
		const aspect = window.innerWidth / window.innerHeight
		const frustumSize = this.config.frustumSize
		this.camera.left = (-frustumSize * aspect) / 2
		this.camera.right = (frustumSize * aspect) / 2
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
		controls.minZoom = this.config.minZoom
		controls.maxZoom = this.config.maxZoom
		// controls.zoom = this.config.zoom
		controls.smoothTime = this.config.smoothTime
		controls.draggingSmoothTime = this.config.smoothTime
		controls.dollySpeed = this.config.dollySpeed
		controls.truckSpeed = this.config.truckSpeed
		controls.dollyToCursor = this.config.dollyToCursor
		controls.verticalDragToForward = this.config.verticalDragToForward
		// controls.verticalDragToForward = false
		controls.minDistance = this.config.minDistance
		controls.maxDistance = this.config.maxDistance
		controls.minPolarAngle = this.config.minPolarAngle
		controls.maxPolarAngle = this.config.maxPolarAngle

		// Enable smooth damping
		controls.smoothTime = this.config.smoothTime

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

	calculateWorldSpaceOffset = (screenSpaceOffset: number): number => {
		const viewWidth = this.camera.right - this.camera.left
		const worldSpaceOffset = (screenSpaceOffset * viewWidth) / window.innerWidth
		console.log({ viewWidth, cameraRight: this.camera.right, cameraLeft: this.camera.left, worldSpaceOffset })
		return worldSpaceOffset / 2 / this.camera.zoom
	}

	moveTo = (x: number, y: number, z: number) => {
		console.log('MOVING TO......', x, y, z)
		let targetX = x
		let targetZ = z
		let targetY = y

		console.log('menuBar.activePanel', menuBar.activePanel)
		if (!!menuBar.activePanel) {
			const offsetX = this.calculateWorldSpaceOffset(46)
			const offsetZ = this.calculateWorldSpaceOffset(46)
			targetX += -offsetX
			targetZ += offsetZ
			targetY -= 0.125
			console.log({ offsetX, offsetZ })
		}

		console.log({ targetX, targetY, targetZ })

		this.controls.moveTo(targetX, targetY, targetZ, true)
	}

	moveToItem = (id: string) => {
		const item = mainStore.space.items[id]
		console.log('MOVING TO ITEM', item)
		this.moveTo(item.positionX, item.positionY, item.positionZ)
	}

	resetCamera = () => {
		if (!this.controls || !this.camera) return
		const [x, y, z] = this.config.position
		this.controls.setPosition(x, y, z, true)
		// const { x: tx, y: ty, z: tz } = this.config.target
		// this.controls.setTarget(tx, ty, tz, true)
		this.controls.zoomTo(this.config.zoom, true)
		// this.camera.updateProjectionMatrix()
		// this.camera.updateMatrixWorld(true)
	}
}

export const perspectiveCameraStore = new PerspectiveCameraStore()
globalThis.perspectiveCameraStore = perspectiveCameraStore
export default perspectiveCameraStore
export { sideScrollerCamera }
