class ThirdPersonCameraConfiguration {
	camera = null
	zoom = 2
	maxZoom = 25
	makeDefault = true
	fov = 75
	near = 0.1
	far = 1000
	distance = 5
	height = 2
	rotationSpeed = 0.1
	// target = { x: 0, y: 1, z: 0 }
	enableDamping = true
	enableZoom = true
	enablePan = true
	dampingFactor = 0.05
	minDistance = 2
	maxDistance = 10
	minPolarAngle = 0
	maxPolarAngle = Math.PI / 2
	minAzimuthAngle = -Math.PI
	maxAzimuthAngle = Math.PI
	position = [0, this.height, this.distance]
}

export default new ThirdPersonCameraConfiguration()
