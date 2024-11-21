<script lang="ts">
	import { T } from '@threlte/core'
	import * as THREE from 'three'
	import cameraStore from './thirdPersonCamera.store.svelte'

	let isTargeting = $derived(!!cameraStore.intersectedObject)
	const crosshairDistance = 0.1 // Distance from camera
</script>

<T.Group position.z={-crosshairDistance} position.y={0.0}>
	<T.Mesh>
		<T.CircleGeometry args={[0.001, 24]} />
		<T.MeshBasicMaterial color={isTargeting ? '#ff4444' : '#ffffff'} transparent opacity={0.7} depthTest={false} />
	</T.Mesh>
</T.Group>
