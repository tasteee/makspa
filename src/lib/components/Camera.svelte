<script lang="ts">
	import { T } from '@threlte/core'
	import stores from '../stores'
	import { useThrelte, useTask } from '@threlte/core'
	import CameraControls from 'camera-controls'
	import * as THREE from 'three'

	CameraControls.install({ THREE: THREE })
	const { invalidate, renderer } = useThrelte()

	const onCreate = (camera) => {
		stores.camera.camera = camera
		stores.camera.updateCameraFrustum()
		if (renderer) stores.camera.createCameraControls(renderer.domElement)
	}

	const onDestroy = () => {
		if (stores.camera.controls) {
			stores.camera.controls.dispose()
		}
	}

	useTask((delta) => {
		const updated = stores.camera.controls.update(delta)
		if (updated) invalidate()
	})
</script>

<T.OrthographicCamera
	makeDefault
	oncreate={onCreate}
	ondestroy={onDestroy}
	minZoom={stores.camera.controlsConfig.minZoom}
	maxZoom={stores.camera.controlsConfig.maxZoom}
	zoom={stores.camera.controlsConfig.zoom}
	polarAngle={stores.camera.controlsConfig.polarAngle}
	minPolarAngle={stores.camera.controlsConfig.minPolarAngle}
	maxPolarAngle={stores.camera.controlsConfig.maxPolarAngle}
	azimuthAngle={stores.camera.controlsConfig.azimuthAngle}
	minAzimuthAngle={stores.camera.controlsConfig.minAzimuthAngle}
	maxAzimuthAngle={stores.camera.controlsConfig.maxAzimuthAngle}
	aspect={stores.camera.cameraConfig.aspect}
/>

<!-- fov={stores.camera.cameraConfig.fov} -->
