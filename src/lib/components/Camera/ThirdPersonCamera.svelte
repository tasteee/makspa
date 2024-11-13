<script lang="ts">
	import { T } from '@threlte/core'
	import { OrbitControls } from '@threlte/extras'
	import { onMount } from 'svelte'
	import cameraStore from './camera.store.svelte'

	onMount(() => {
		cameraStore.saveCamera('thirdPerson', camera)
	})

	const configuration = cameraStore.state.thirdPerson
	let camera = $state(null)
	let controls = $state(null)
</script>

<T.PerspectiveCamera
	bind:ref={camera}
	makeDefault={configuration.makeDefault}
	fov={configuration.fov}
	near={configuration.near}
	far={configuration.far}
	position={configuration.position as any}
	zoom={configuration.zoom}
	maxZoom={configuration.maxZoom}
>
	<OrbitControls
		bind:ref={controls}
		enableDamping={configuration.enableDamping}
		enableZoom={configuration.enableZoom}
		enablePan={configuration.enablePan}
		dampingFactor={configuration.dampingFactor}
		minDistance={configuration.minDistance}
		maxDistance={configuration.maxDistance}
		minPolarAngle={configuration.minPolarAngle}
		maxPolarAngle={configuration.maxPolarAngle}
		minAzimuthAngle={configuration.minAzimuthAngle}
		maxAzimuthAngle={configuration.maxAzimuthAngle}
	/>
</T.PerspectiveCamera>
