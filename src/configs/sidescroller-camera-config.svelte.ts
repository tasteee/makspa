import * as THREE from 'three'
import CameraControls from 'camera-controls'
import mainStore from '~/stores/main-store.svelte'
import menuBar from '~/stores/menuBar.store.svelte'
import { percentageToDegrees } from '~/modules/numbers'

class SideScrollerCameraConfig {
	camera = null;
	controls = null;
	verticalDragToForward = false;
	fov = 50; // Perspective view
	aspect = globalThis.innerWidth / globalThis.innerHeight;
	near = 0.1;
	far = 1000;
	zoom = 1;
	minZoom = 0.5;
	maxZoom = 3;
	polarAngle = percentageToDegrees(60); // Top-down slanted view
	minPolarAngle = percentageToDegrees(60); // Prevent extreme upward angles
	maxPolarAngle = percentageToDegrees(60); // Lock to a consistent top-down angle
	minDistance = 5;
	maxDistance = 20;
	dollySpeed = 0.7;
	truckSpeed = 1.5;
	smoothTime = 0.3;
	azimuthRotateSpeed = 0; // Lock Y-axis rotation
	polarRotateSpeed = 0; // Lock vertical rotation
	dollyToCursor = false;
	dollyDragInverted = false;
	restThreshold = 0.001;
	frustumSize = 15;
	distance = 12;
	azimuthAngle = percentageToDegrees(0); // No rotation around Y-axis
	boundaryFriction = 0.2;
	boundaryEnclosesCamera = true;
	draggingSmoothTime = 0.2;

	// Position the camera above and slightly to the front
	position = [0, 10, 10]; // Positioned above and offset forward
	target = { x: 0, y: 0, z: 0 }; // Look at the center of the scene
}



class SideScrollerCamera {
	camera = $state(null)
	controls = $state(null)
	config = new SideScrollerCameraConfig()

	updateFrustum = () => {
		const aspect = window.innerWidth / window.innerHeight
		const frustumSize = this.config.frustumSize
		// Set up orthographic-like view bounds
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
				'sideScrollerCameraState',
				JSON.stringify({
					position: this.controls.getPosition(),
					target: this.controls.getTarget(),
					zoom: this.camera.zoom
				})
			)
		}
	}

	restoreState() {
		const savedState = localStorage.getItem('sideScrollerCameraState')
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
		
		// Configure for side-scrolling controls
		controls.mouseButtons.left = CameraControls.ACTION.TRUCK // Pan with left mouse
		controls.mouseButtons.middle = CameraControls.ACTION.DOLLY // Zoom with middle mouse
		controls.mouseButtons.right = CameraControls.ACTION.NONE // Disable right mouse
		
		// Apply config settings
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
		
		// Set initial zoom
		controls.zoomTo(this.config.zoom, true)
		this.controls = controls
		this.restoreState()
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

		// Adjust offset for UI panels
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

		// Reset to default side-view angles and zoom
		const defaultPolarAngle = this.config.polarAngle
		const defaultAzimuthAngle = this.config.azimuthAngle
		const defaultZoom = this.config.zoom

		this.controls.rotateTo(defaultAzimuthAngle, defaultPolarAngle, true)
		this.controls.zoomTo(defaultZoom, true)
		this.camera.updateMatrixWorld(true)

		// Handle audio listener if present
		if (this.camera.audioListener) {
			const audioListener = this.camera.audioListener
			audioListener.gain.value = isFinite(audioListener.gain.value) ? audioListener.gain.value : 1
		}
	}
}

export default new SideScrollerCamera()