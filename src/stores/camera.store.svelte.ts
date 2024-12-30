import * as THREE from 'three'
import CameraControls from 'camera-controls'
import mainStore from '~/stores/main-store.svelte'
import menuBar from '~/stores/menuBar.store.svelte'
import { percentageToDegrees } from '~/modules/numbers'

//
//
//
//
//

class BuildModeCameraConfiguration {
	camera = null
	controls = null
	verticalDragToForward = true
	fov = 50 // Increased FOV for better perspective
	aspect = globalThis.innerWidth / globalThis.innerHeight
	near = 0.01
	far = 1000
	zoom = 0.5
	minZoom = 55
	maxZoom = 0.5

	// Polar angle is up and down rotation.
	// polarAngle = 1.0223005175331172
	// minPolarAngle = percentageToDegrees(45.264)
	// maxPolarAngle = percentageToDegrees(88.264)
	polarAngle = 0.9234912363618542
	minPolarAngle = 0.9234912363618542
	maxPolarAngle = 0.9234912363618542

	minDistance = 0.1
	maxDistance = 20
	dollySpeed = 1
	truckSpeed = 3
	smoothTime = 0.1
	azimuthRotateSpeed = 1
	polarRotateSpeed = 1
	dollyToCursor = true
	dollyDragInverted = false
	restThreshold = 0.0025
	frustumSize = 10

	// Adjust initial position for better view
	position = [2, 2, 2]
	target = { x: 0, y: 0, z: 0 }
}

const buildModeCameraConfig = new BuildModeCameraConfiguration()

export class BuildModeCameraStore {
	camera = $state(null)
	controls = $state(null)
	config = buildModeCameraConfig

	updateProjectionMatrix = () => {
		this.config.aspect = window.innerWidth / window.innerHeight
		this.camera.fov = this.config.fov
		this.camera.aspect = this.config.aspect
		this.camera.near = this.config.near
		this.camera.far = this.config.far
		this.camera.zoom = this.config.zoom
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
		this.camera.zoom = this.config.zoom

		// Look at the target
		const { x: tx, y: ty, z: tz } = this.config.target
		this.camera.lookAt(tx, ty, tz)
	}

	createCameraControls = (domElement) => {
		if (!domElement) return
		const controls = new CameraControls(this.camera, domElement)

		// Configure mouse controls
		controls.mouseButtons.left = CameraControls.ACTION.TRUCK
		controls.mouseButtons.middle = CameraControls.ACTION.DOLLY
		controls.mouseButtons.right = CameraControls.ACTION.ROTATE
		controls.touches.one = CameraControls.ACTION.TOUCH_ROTATE
		controls.touches.two = CameraControls.ACTION.TOUCH_DOLLY_TRUCK
		controls.touches.three = CameraControls.ACTION.TOUCH_TRUCK

		// Min zoom is how close you can zoom in.
		// Max zoom is how far you can zoom out.
		// controls.minZoom =
		controls.minDistance = this.config.minDistance
		controls.maxDistance = this.config.maxDistance
		// controls.maxZoom = this.config.maxZoom
		// controls.zoom = this.config.zoom
		controls.smoothTime = this.config.smoothTime
		controls.draggingSmoothTime = this.config.smoothTime
		controls.dollySpeed = this.config.dollySpeed
		controls.truckSpeed = this.config.truckSpeed
		controls.dollyToCursor = this.config.dollyToCursor
		controls.verticalDragToForward = this.config.verticalDragToForward
		// controls.verticalDragToForward = false
		// controls.minDistance = this.config.minDistance
		// controls.maxDistance = this.config.maxDistance
		controls.minPolarAngle = this.config.minPolarAngle
		controls.maxPolarAngle = this.config.maxPolarAngle

		// Enable smooth damping
		controls.smoothTime = this.config.smoothTime

		// Set initial position and target
		const [x, y, z] = this.config.position
		controls.setPosition(x, y, z, true)
		controls.setTarget(this.config.target.x, this.config.target.y, this.config.target.z, true)

		this.controls = controls
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

export const buildModeCameraStore = new BuildModeCameraStore()
globalThis.buildModeCameraStore = buildModeCameraStore
export default buildModeCameraStore
