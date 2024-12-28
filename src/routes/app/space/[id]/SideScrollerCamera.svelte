<script lang="ts">
	import { T } from '@threlte/core';
	import { useThrelte, useTask } from '@threlte/core';
	import CameraControls from 'camera-controls';
	import * as THREE from 'three';
	import { sideScrollerCamera as cameraStore } from '~/stores/camera.store.svelte';
	import { onMount, onDestroy } from 'svelte';

	CameraControls.install({ THREE: THREE });

	const { invalidate, renderer } = useThrelte();

	const onCreated = (camera) => {
		cameraStore.camera = camera;

		if (renderer) {
			cameraStore.createCameraControls(renderer.domElement);
			cameraStore.restoreState();
		}

		// Position the camera for a square view of the floor
		camera.position.set(...cameraStore.config.position); // Set initial position
		camera.lookAt(
			cameraStore.config.target.x,
			cameraStore.config.target.y,
			cameraStore.config.target.z
		);
	};

	const onDestroyed = () => {
		if (cameraStore.controls) {
			cameraStore.controls.dispose();
		}
	};

	useTask((delta) => {
		if (cameraStore.controls) {
			const updated = cameraStore.controls.update(delta);
			if (updated) invalidate();
		}
	});

	// Handle window resize
	const handleResize = () => {
		if (cameraStore.camera) {
			cameraStore.camera.aspect = window.innerWidth / window.innerHeight;
			cameraStore.camera.updateProjectionMatrix();
		}
	};

	onMount(() => {
		window.addEventListener('resize', handleResize);
		window.addEventListener('beforeunload', cameraStore.saveState);
	});

	onDestroy(() => {
		window.removeEventListener('resize', handleResize);
		window.removeEventListener('beforeunload', cameraStore.saveState);
	});
</script>

<T.PerspectiveCamera 
	makeDefault
	oncreate={onCreated}
	ondestroy={onDestroyed}
	fov={cameraStore.config.fov} 
	aspect={globalThis.innerWidth / globalThis.innerHeight}
	near={cameraStore.config.near}
	far={cameraStore.config.far}
/>
