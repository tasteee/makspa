<script lang="ts">
	import { T, useTask } from '@threlte/core'
	import * as THREE from 'three'
	import cameraStore from './thirdPersonCamera.store.svelte'
	import Crosshair from './Crosshair.svelte'

	useTask(() => {
		cameraStore.updateMovement()
		cameraStore.updateCamera()
		cameraStore.updatePlayer()
		cameraStore.checkIntersections()
		cameraStore.updateCarriedItem()
	})

	// Event listeners
	$effect(() => {
		document.querySelector('canvas')?.addEventListener('click', cameraStore.handlePointerLock)
		document.addEventListener('pointerlockchange', cameraStore.updatePointerLockState)
		document.addEventListener('mousemove', cameraStore.handleMouseMove)
		document.addEventListener('keydown', cameraStore.handleKeyDown)
		document.addEventListener('keyup', cameraStore.handleKeyUp)

		return () => {
			document.querySelector('canvas')?.removeEventListener('click', cameraStore.handlePointerLock)
			document.removeEventListener('pointerlockchange', cameraStore.updatePointerLockState)
			document.removeEventListener('mousemove', cameraStore.handleMouseMove)
			document.removeEventListener('keydown', cameraStore.handleKeyDown)
			document.removeEventListener('keyup', cameraStore.handleKeyUp)
		}
	})
</script>

<T.Group>
	<T.PerspectiveCamera bind:ref={cameraStore.camera} makeDefault fov={40} near={0.1} far={1000}>
		<Crosshair />
	</T.PerspectiveCamera>

	<T.Mesh bind:ref={cameraStore.player} position={cameraStore.playerPosition}>
		<T.BoxGeometry args={[0.4, 0.8, 0.3]} />
		<T.MeshStandardMaterial color="pink" />
	</T.Mesh>
</T.Group>
