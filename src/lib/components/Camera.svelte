<script lang="ts">
	import { T } from '@threlte/core'
	import { onMount, onDestroy } from 'svelte'
	import cameraStore from './camera.store.svelte'
	import keyboardStore from './keyboard.store.svelte'
	import config from './camera.config'
	import { useTask } from '@threlte/core'
	import PointerLockControls from './Camera/PointerLockControls.svelte'

	useTask(() => {
		if (!cameraStore.camera) return

		if (keyboardStore.isPressedW) {
			cameraStore.camera.position.z -= config.moveSpeed * Math.cos(cameraStore.camera.rotation.y)
			cameraStore.camera.position.x -= config.moveSpeed * Math.sin(cameraStore.camera.rotation.y)
		}

		if (keyboardStore.isPressedS) {
			cameraStore.camera.position.z += config.moveSpeed * Math.cos(cameraStore.camera.rotation.y)
			cameraStore.camera.position.x += config.moveSpeed * Math.sin(cameraStore.camera.rotation.y)
		}

		if (keyboardStore.isPressedA) {
			cameraStore.camera.position.x -= config.moveSpeed * Math.cos(cameraStore.camera.rotation.y)
			cameraStore.camera.position.z += config.moveSpeed * Math.sin(cameraStore.camera.rotation.y)
		}

		if (keyboardStore.isPressedD) {
			cameraStore.camera.position.x += config.moveSpeed * Math.cos(cameraStore.camera.rotation.y)
			cameraStore.camera.position.z -= config.moveSpeed * Math.sin(cameraStore.camera.rotation.y)
		}

		if (keyboardStore.isPressedSpace && !keyboardStore.isPressedShift) {
			const newHeight = cameraStore.camera.position.y + config.verticalSpeed
			cameraStore.camera.position.y = Math.min(newHeight, config.maxHeight)
		}

		if (keyboardStore.isPressedShift && keyboardStore.isPressedSpace) {
			const newHeight = cameraStore.camera.position.y - config.verticalSpeed
			cameraStore.camera.position.y = Math.max(newHeight, config.minHeight)
		}

		if (keyboardStore.isPressedQ) {
			cameraStore.camera.rotation.y += config.rotationSpeed
		}

		if (keyboardStore.isPressedE) {
			cameraStore.camera.rotation.y -= config.rotationSpeed
		}
	})
</script>

<T.Group position.y={0.9}>
	<T.PerspectiveCamera
		bind:ref={cameraStore.camera}
		makeDefault={config.makeDefault}
		fov={config.fov}
		near={config.near}
		far={config.far}
		position={config.position}
		rotation={config.rotation}
		oncreate={(ref) => {
			ref.lookAt(new Vector3(0, 1, 0))
		}}
	>
		<PointerLockControls bind:lock={lockControl} />
	</T.PerspectiveCamera>
</T.Group>
