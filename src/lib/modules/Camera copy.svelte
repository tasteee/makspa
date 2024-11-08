<script lang="ts">
	import { T } from '@threlte/core'
	import { OrbitControls } from '@threlte/extras'

	const DEG2RAD = Math.PI / 180
	const RAD2DEG = 180 / Math.PI
	const isometricAngle = 35.264 * DEG2RAD
	const aspect = window.innerWidth / window.innerHeight
	const frustumSize = 10

	const createIsometricCamera = () => {
		const d = frustumSize / 2
		return {
			left: -d * aspect,
			right: d * aspect,
			top: d,
			bottom: -d,
			near: -100,
			far: 100,
			position: [d, d, d],
			rotation: [-isometricAngle, DEG2RAD * 45, 0],
			zoom: 40,
		}
	}

	const cameraProps = createIsometricCamera()
</script>

<T.OrthographicCamera makeDefault {...cameraProps}>
	<OrbitControls enableZoom={true} enableDamping enableRotate={true} target={[0, 0, 0]} />
</T.OrthographicCamera>
