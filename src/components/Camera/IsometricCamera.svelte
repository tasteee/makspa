<script>
	import { T, useTask, useThrelte } from '@threlte/core'
	import { Clock } from 'three'
	import CameraControls from 'camera-controls'
	import * as THREE from 'three'
	import cameraStore from './camera.store.svelte'
	import store from '~/stores/store.svelte'
	import throttle from 'just-throttle'

	CameraControls.install({ THREE: THREE })
	const configuration = cameraStore.isometric
	configuration.CameraControls = CameraControls

	let clock = $state(new Clock())
	const { invalidate, renderer } = useThrelte()

	function createCameraControls(domElement) {
		const controls = new CameraControls(store.camera, domElement)
		controls.mouseButtons.left = CameraControls.ACTION.ROTATE
		controls.mouseButtons.middle = CameraControls.ACTION.DOLLY
		controls.mouseButtons.right = CameraControls.ACTION.TRUCK
		controls.minDistance = configuration.minDistance
		controls.maxDistance = configuration.maxDistance
		controls.dollySpeed = configuration.dollySpeed
		controls.truckSpeed = configuration.truckSpeed
		controls.position = configuration.position
		controls.zoom = configuration.orthographicZoom
		controls.minZoom = configuration.minZoom
		controls.maxZoom = configuration.maxZoom
		controls.minPolarAngle = configuration.minPolarAngle
		controls.maxPolarAngle = configuration.maxPolarAngle
		controls.near = configuration.near
		controls.far = configuration.far
		controls.left = configuration.left
		controls.right = configuration.right
		controls.top = configuration.top
		controls.bottom = configuration.bottom
		controls.zoomTo(configuration.orthographicZoom, true)
		controls.verticalDragToForward = true
		return controls
	}

	function updateCameraFrustum(camera) {
		if (!camera) return
		const aspect = window.innerWidth / window.innerHeight
		const frustumSize = 10
		camera.left = (frustumSize * aspect) / -2
		camera.right = (frustumSize * aspect) / 2
		camera.top = frustumSize / 2
		camera.bottom = frustumSize / -2
		camera.updateProjectionMatrix()
	}

	useTask(() => {
		if (!store.cameraControls || !store.camera) return
		const delta = clock.getDelta()
		const hasUpdated = store.cameraControls.update(delta)

		if (hasUpdated) invalidate()
		return () => {
			clock.stop()
		}
	})

	// Handle window resize
	$effect(() => {
		const handleResize = () => {
			if (store.camera) {
				updateCameraFrustum(store.camera)
				invalidate()
			}
		}

		window.addEventListener('resize', handleResize)

		return () => {
			window.removeEventListener('resize', handleResize)
		}
	})

	const onCreate = (camera) => {
		updateCameraFrustum(camera)
		store.saveCamera(camera)

		if (renderer) {
			const cameraControls = createCameraControls(renderer.domElement)
			store.saveControls(cameraControls)
			cameraStore.saveCamera('isometric', camera)
			cameraStore.saveControls('isometric', cameraControls)
		}
	}
</script>

<T.OrthographicCamera
	makeDefault
	position={configuration.position}
	zoom={configuration.orthographicZoom}
	near={configuration.near}
	far={configuration.far}
	left={configuration.left}
	right={configuration.right}
	top={configuration.top}
	bottom={configuration.bottom}
	oncreate={onCreate}
	ondestroy={() => {
		if (cameraControls) {
			cameraControls.dispose()
		}
	}}
/>
