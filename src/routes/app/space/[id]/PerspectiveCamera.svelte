<script lang="ts">
	import { T } from '@threlte/core'
	import { useThrelte, useTask } from '@threlte/core'
	import CameraControls from 'camera-controls'
	import * as THREE from 'three'
	import cameraStore from '~/stores/perspective-camera-store.svelte'
	import inputStore from '~/stores/input.store.svelte'
	import AudioHandler from './AudioHandler.svelte'
	import { onMount, onDestroy } from 'svelte'

	CameraControls.install({ THREE: THREE })

	const { invalidate, renderer } = useThrelte()

	const onCreateed = (camera) => {
		cameraStore.camera = camera
		cameraStore.updateProjectionMatrix()
		if (renderer) {
			cameraStore.createCameraControls(renderer.domElement)
			cameraStore.restoreState()
		}
	}

	const onDestroyed = () => {
		if (cameraStore.controls) {
			cameraStore.controls.dispose()
		}
	}

	useTask((delta) => {
		const updated = cameraStore.controls.update(delta)
		if (updated) invalidate()
	})

	onMount(() => {
		window.addEventListener('beforeunload', cameraStore.saveState)
	})

	onDestroy(() => {
		window.removeEventListener('beforeunload', cameraStore.saveState)
	})
</script>

<T.PerspectiveCamera
	makeDefault
	oncreate={onCreateed}
	ondestroy={onDestroyed}
	fov={cameraStore.config.fov}
	aspect={cameraStore.config.aspect}
	near={cameraStore.config.near}
	far={cameraStore.config.far}
>
	{#if !!inputStore.hasMouseClicked}
		<AudioHandler />
	{/if}
</T.PerspectiveCamera>
