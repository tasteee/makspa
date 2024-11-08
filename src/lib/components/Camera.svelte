<script>
	import { T } from '@threlte/core'
	import { OrbitControls } from '@threlte/extras'

	// Constants for perfect isometric setup
	const ISOMETRIC_ANGLE = Math.atan(1 / Math.sqrt(2))
	const CAMERA_DISTANCE = 10
	const ORTHOGRAPHIC_ZOOM = 100
	const positionX = CAMERA_DISTANCE * Math.cos(ISOMETRIC_ANGLE)
	const positionY = CAMERA_DISTANCE * Math.sin(ISOMETRIC_ANGLE)
	const positionZ = CAMERA_DISTANCE * Math.cos(ISOMETRIC_ANGLE)
	const cameraPosition = [positionX, positionY, positionZ]
</script>

<T.OrthographicCamera
	makeDefault
	position={cameraPosition}
	zoom={ORTHOGRAPHIC_ZOOM}
	near={-100}
	far={1000}
	left={-10}
	right={10}
	top={10}
	bottom={-10}
>
	<OrbitControls
		enableDamping
		enableZoom={true}
		enablePan={true}
		minZoom={100}
		maxZoom={350}
		minPolarAngle={Math.PI / 3}
		maxPolarAngle={Math.PI / 3}
		minAzimuthAngle={-Math.PI / 6}
		maxAzimuthAngle={Math.PI / 6}
		minDistance={5}
		maxDistance={15}
		target.y={0.5}
		dampingFactor={0.05}
	/>
</T.OrthographicCamera>
