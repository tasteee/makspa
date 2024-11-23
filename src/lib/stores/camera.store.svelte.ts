import * as THREE from 'three'
import CameraControls from 'camera-controls'
import spaceItems from './spaceItems.store.svelte'

class CameraStore {
	camera = $state(null)
	controls = $state(null)
	controlsConfig = controlsConfig
	cameraConfig = cameraConfig

	updateCameraFrustum = () => {
		if (!this.camera) return
		const aspect = window.innerWidth / window.innerHeight
		this.camera.left = (this.controlsConfig.frustumSize * aspect) / -2
		this.camera.right = (this.controlsConfig.frustumSize * aspect) / 2
		this.camera.top = this.controlsConfig.frustumSize / 2
		this.camera.bottom = this.controlsConfig.frustumSize / -2
		this.updateCamera()
	}

	createCameraControls = (domElement) => {
		const controls = new CameraControls(this.camera, domElement)
		controls.mouseButtons.left = CameraControls.ACTION.ROTATE
		controls.mouseButtons.middle = CameraControls.ACTION.DOLLY
		controls.mouseButtons.right = CameraControls.ACTION.TRUCK
		controls.minZoom = controlsConfig.minZoom
		controls.maxZoom = controlsConfig.maxZoom
		controls.distance = controlsConfig.distance
		controls.minDistance = controlsConfig.minDistance
		controls.maxDistance = controlsConfig.maxDistance
		controls.polarAngle = controlsConfig.polarAngle
		controls.minPolarAngle = controlsConfig.minPolarAngle
		controls.maxPolarAngle = controlsConfig.maxPolarAngle
		controls.azimuthAngle = controlsConfig.azimuthAngle
		// controls.minAzimuthAngle = controlsConfig.minAzimuthAngle
		// controls.maxAzimuthAngle = controlsConfig.maxAzimuthAngle
		controls.boundaryFriction = controlsConfig.boundaryFriction
		controls.boundaryEnclosesCamera = controlsConfig.boundaryEnclosesCamera
		controls.smoothTime = controlsConfig.smoothTime
		controls.draggingSmoothTime = controlsConfig.draggingSmoothTime
		controls.azimuthRotateSpeed = controlsConfig.azimuthRotateSpeed
		controls.polarRotateSpeed = controlsConfig.polarRotateSpeed
		controls.dollySpeed = controlsConfig.dollySpeed
		controls.truckSpeed = controlsConfig.truckSpeed
		controls.verticalDragToForward = controlsConfig.verticalDragToForward
		controls.dollyToCursor = controlsConfig.dollyToCursor
		controls.dollyDragInverted = controlsConfig.dollyDragInverted
		controls.colliderMeshes = controlsConfig.colliderMeshes
		controls.infinityDolly = controlsConfig.infinityDolly
		controls.restThreshold = controlsConfig.restThreshold
		controls.verticalDragToForward = true
		this.controls = controls
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

	moveTo = (x, y, z) => {
		console.trace('moveTo', x, y, z)
		this.controls.moveTo(x, y, z, true)
	}

	moveToItem = (uid: string) => {
		const item = spaceItems.getItemByUid(uid)
		this.moveTo(item.position_x, item.position_y, item.position_z)
	}
}

const cameraConfig = {
	makeDefault: true,
	aspect: 1,
	focus: 8,
	filmGauge: 35,
	filmOffset: 1,
	height: 2,
	fov: 75,
	near: 0.1,
	far: 1000
}

const controlsConfig = {
	// camera = null
	// controls = null
	// zoom = 100
	// dollySpeed = 1
	// truckSpeed = 0.5
	// isometricAngle = percentageToDegrees(36)
	// rotationX = percentageToDegrees(-36)
	// rotationY = percentageToDegrees(45)
	// distance = 10
	// makeDefault = true
	// orthographicZoom = 5
	// near = -100
	// far = 1000
	// // These values will be calculated based on zoom
	// left = -10
	// right = 10
	// top = 10
	// bottom = -10
	// // target = { x: 0, y: 0, z: 0 }
	// enableDamping = true
	// enableZoom = true
	// enablePan = true
	// dampingFactor = 0.05
	// minZoom = 1
	// maxZoom = 25
	// minDistance = 5
	// maxDistance = 15
	// minPolarAngle = percentageToDegrees(45.264)
	// maxPolarAngle = percentageToDegrees(70.264)
	// // minAzimuthAngle = percentageToDegrees(0)
	// // maxAzimuthAngle = percentageToDegrees(350)
	// frustumSize = 10
	// // Calculate position based on distance and angles
	// positionX = this.distance * Math.sin(Math.PI / 4)
	// positionY = this.distance * Math.sin(this.isometricAngle)
	// positionZ = this.distance * Math.sin(Math.PI / 4)
	// position = [this.positionX, this.positionY, this.positionZ]
	// target = { x: 0.0, y: 0, z: 0.0 }

	enableDamping: true,
	enableZoom: true,
	enablePan: true,

	zoom: 2,
	minZoom: 0.1,
	maxZoom: 1000,

	distance: 5,
	minDistance: 2,
	maxDistance: 10,

	polarAngle: 1,
	minPolarAngle: 0.75,
	maxPolarAngle: 1.5,

	azimuthAngle: Math.PI / 4,
	minAzimuthAngle: -Math.PI,
	maxAzimuthAngle: Math.PI,

	boundaryFriction: 0.1,
	boundaryEnclosesCamera: false,
	smoothTime: 0.3,
	draggingSmoothTime: 0.125,
	azimuthRotateSpeed: 1,
	polarRotateSpeed: 1,
	dollySpeed: 1,
	truckSpeed: 2,
	verticalDragToForward: true,
	dollyToCursor: false,
	dollyDragInverted: false,
	interactiveArea: null,
	colliderMeshes: [],
	infinityDolly: false,
	restThreshold: 0.0025,

	frustumSize: 10,
	target: { x: 0, y: 1, z: 0 },

	position: [0, 2, 5]
}

export const cameraStore = new CameraStore()
globalThis.cameraStore = cameraStore
export default cameraStore
