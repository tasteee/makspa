class FirstPersonCameraConfiguration {
	camera = null
	makeDefault = true
	fov = 75
	near = 0.1
	far = 1000
	// Initial position and rotation
	position = [0, 2, 5]
	rotation = [0, 0, 0]
	// Movement settings
	moveSpeed = 0.05
	rotationSpeed = 0.04
	verticalSpeed = 0.05
	// Camera constraints
	minHeight = 0.5
	maxHeight = 20
	// Look constraints
	minPolarAngle = 0
	maxPolarAngle = Math.PI
	enableDamping = true
	dampingFactor = 0.5
}

export default new FirstPersonCameraConfiguration()
