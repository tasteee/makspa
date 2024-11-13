<script>
	import { T } from '@threlte/core'
	import { onMount } from 'svelte'
	import { OrbitControls } from '@threlte/extras'
	import cameraStore from './camera.store.svelte'

	const configuration = cameraStore.state.isometric
	let camera = $state(null)
	let controls = $state(null)

	onMount(() => {
		configuration.updateOrthographicFrustum()
		cameraStore.saveCamera('isometric', camera)
		cameraStore.saveControls('isometric', controls)
	})
</script>

<T.OrthographicCamera
	bind:this={camera}
	rotation.y={configuration.rotationY}
	rotation.x={configuration.rotationX}
	makeDefault={configuration.makeDefault}
	position={configuration.position}
	zoom={configuration.orthographicZoom}
	near={configuration.near}
	far={configuration.far}
	left={configuration.left}
	right={configuration.right}
	top={configuration.top}
	bottom={configuration.bottom}
	target={configuration.target}
>
	<OrbitControls
		bind:this={controls}
		enableDamping={configuration.enableDamping}
		enableZoom={configuration.enableZoom}
		enablePan={configuration.enablePan}
		target.y={configuration.target.y}
		dampingFactor={configuration.dampingFactor}
		minZoom={configuration.minZoom}
		maxZoom={configuration.maxZoom}
		minDistance={configuration.minDistance}
		maxDistance={configuration.maxDistance}
		minPolarAngle={configuration.minPolarAngle}
		maxPolarAngle={configuration.maxPolarAngle}
		minAzimuthAngle={configuration.minAzimuthAngle}
		maxAzimuthAngle={configuration.maxAzimuthAngle}
	/>
</T.OrthographicCamera>
