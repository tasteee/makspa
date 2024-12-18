import { percentageToDegrees } from '~/modules/numbers'

class IsometricCameraConfiguration {
	camera = null
	controls = null
	zoom = 100
	dollySpeed = 1
	truckSpeed = 0.5
	isometricAngle = percentageToDegrees(36)
	rotationX = percentageToDegrees(-36)
	rotationY = percentageToDegrees(45)
	distance = 10
	makeDefault = true
	orthographicZoom = 5
	near = -100
	far = 1000
	// These values will be calculated based on zoom
	left = -10
	right = 10
	top = 10
	bottom = -10
	// target = { x: 0, y: 0, z: 0 }
	enableDamping = true
	enableZoom = true
	enablePan = true
	dampingFactor = 0.05
	minZoom = 1
	maxZoom = 25
	minDistance = 5
	maxDistance = 15
	minPolarAngle = percentageToDegrees(45.264)
	maxPolarAngle = percentageToDegrees(70.264)
	// minAzimuthAngle = percentageToDegrees(0)
	// maxAzimuthAngle = percentageToDegrees(350)
	frustumSize = 10
	// Calculate position based on distance and angles
	positionX = this.distance * Math.sin(Math.PI / 4)
	positionY = this.distance * Math.sin(this.isometricAngle)
	positionZ = this.distance * Math.sin(Math.PI / 4)
	position = [this.positionX, this.positionY, this.positionZ]
	target = { x: 0.0, y: 0, z: 0.0 }

	updateOrthographicFrustum() {
		const aspect = window.innerWidth / window.innerHeight
		this.left = (-this.frustumSize * aspect) / 2
		this.right = (this.frustumSize * aspect) / 2
		this.top = this.frustumSize / 2
		this.bottom = -this.frustumSize / 2
	}
}

export default new IsometricCameraConfiguration()
