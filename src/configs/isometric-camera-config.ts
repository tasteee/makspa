import { percentageToDegrees } from '~/modules/numbers'

class IsometricCameraConfiguration {
	camera = null
	controls = null
	zoom = 2
	minZoom = 1.5
	maxZoom = 25
	dollySpeed = 2
	truckSpeed = 1.5
	isometricAngle = percentageToDegrees(36)
	rotationX = percentageToDegrees(-36)
	rotationY = percentageToDegrees(45)
	distance = 10
	makeDefault = true
	near = -100
	far = 1000
	enableDamping = false
	enablePan = true
	minDistance = 5
	maxDistance = 15
	// polarAngle = percentageToDegrees(55.264)
	polarAngle = 1.0223005175331172
	minPolarAngle = percentageToDegrees(45.264)
	maxPolarAngle = percentageToDegrees(88.264)
	azimuthAngle = Math.PI / 4
	frustumSize = 10
	boundaryFriction = 0.1
	boundaryEnclosesCamera = false
	smoothTime = 0.3
	draggingSmoothTime = 0.125
	azimuthRotateSpeed = 1
	polarRotateSpeed = 1
	verticalDragToForward = true
	dollyToCursor = true
	dollyDragInverted = false
	restThreshold = 0.0025
	positionX = this.distance * Math.sin(Math.PI / 4)
	positionY = this.distance * Math.sin(this.isometricAngle)
	positionZ = this.distance * Math.sin(Math.PI / 4)
	position = [this.positionX, this.positionY, this.positionZ]
	target = { x: 0.0, y: 0, z: 0.0 }
}

export default new IsometricCameraConfiguration()
