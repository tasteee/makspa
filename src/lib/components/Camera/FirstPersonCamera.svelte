<script lang="ts">
	import { T } from '@threlte/core'
	import { onMount, onDestroy } from 'svelte'
	import cameraStore from './camera.store.svelte'
	import { firstPersonCameraConfiguration } from './configuration'

	const config = firstPersonCameraConfiguration
	let camera = $state(null)

	let pressedKeys = $state({
		w: false,
		s: false,
		a: false,
		d: false,
		q: false,
		e: false,
		space: false,
		shift: false
	})

	const getKey = (event: KeyboardEvent) => {
		const key = event.key.toLowerCase()
		return key === ' ' ? 'space' : key
	}

	function handleKeyDown(event: KeyboardEvent) {
		if (event.repeat) return
		const key = getKey(event)
		pressedKeys.shift = event.shiftKey
		pressedKeys[key] = true
		// console.log(pressedKeys)
	}

	function handleKeyUp(event: KeyboardEvent) {
		const key = getKey(event)
		pressedKeys.shift = event.shiftKey
		pressedKeys[key] = false
	}

	$effect(() => {
		if (!camera) return

		function updateCamera() {
			if (pressedKeys.w) {
				camera.position.z -= config.moveSpeed * Math.cos(camera.rotation.y)
				camera.position.x -= config.moveSpeed * Math.sin(camera.rotation.y)
			}

			if (pressedKeys.s) {
				camera.position.z += config.moveSpeed * Math.cos(camera.rotation.y)
				camera.position.x += config.moveSpeed * Math.sin(camera.rotation.y)
			}

			if (pressedKeys.a) {
				camera.position.x -= config.moveSpeed * Math.cos(camera.rotation.y)
				camera.position.z += config.moveSpeed * Math.sin(camera.rotation.y)
			}

			if (pressedKeys.d) {
				camera.position.x += config.moveSpeed * Math.cos(camera.rotation.y)
				camera.position.z -= config.moveSpeed * Math.sin(camera.rotation.y)
			}

			if (pressedKeys.space && !pressedKeys.shift) {
				const newHeight = camera.position.y + config.verticalSpeed
				camera.position.y = Math.min(newHeight, config.maxHeight)
			}

			if (pressedKeys.shift && pressedKeys.space) {
				const newHeight = camera.position.y - config.verticalSpeed
				camera.position.y = Math.max(newHeight, config.minHeight)
			}

			if (pressedKeys.q) {
				camera.rotation.y += config.rotationSpeed
			}

			if (pressedKeys.e) {
				camera.rotation.y -= config.rotationSpeed
			}
		}

		function animate() {
			updateCamera()
			requestAnimationFrame(animate)
		}

		const animationFrame = requestAnimationFrame(animate)

		return () => {
			cancelAnimationFrame(animationFrame)
		}
	})

	onMount(() => {
		window.addEventListener('keydown', handleKeyDown)
		window.addEventListener('keyup', handleKeyUp)
		cameraStore.saveCamera('firstPerson', camera)
	})

	onDestroy(() => {
		window.removeEventListener('keydown', handleKeyDown)
		window.removeEventListener('keyup', handleKeyUp)
	})
</script>

<T.PerspectiveCamera
	bind:ref={camera}
	makeDefault={config.makeDefault}
	fov={config.fov}
	near={config.near}
	far={config.far}
	position={config.position}
	rotation={config.rotation}
/>
