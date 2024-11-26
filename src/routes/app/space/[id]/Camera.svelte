<script lang="ts">
	import { T } from '@threlte/core'
	import { useThrelte, useTask } from '@threlte/core'
	import CameraControls from 'camera-controls'
	import * as THREE from 'three'
	import cameraStore from '~/stores/camera.store.svelte'
	import inputStore from '~/stores/input.store.svelte'
	import AudioHandler from './AudioHandler.svelte'
	import { onMount, onDestroy } from 'svelte'

	CameraControls.install({ THREE: THREE })
	const { invalidate, renderer } = useThrelte()

	const onCreateed = (camera) => {
		cameraStore.camera = camera
		cameraStore.updateFrustum()
		if (renderer) {
			cameraStore.createCameraControls(renderer.domElement)
			cameraStore.restoreState() // Add this line
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

<T.OrthographicCamera
	makeDefault
	oncreate={onCreateed}
	ondestroy={onDestroyed}
	minZoom={cameraStore.config.minZoom}
	maxZoom={cameraStore.config.maxZoom}
>
	{#if !!inputStore.hasMouseClicked}
		{console.log('rendering it now!!!!!!!!!', inputStore.hasMouseClicked)}
		<AudioHandler />
	{/if}
</T.OrthographicCamera>
