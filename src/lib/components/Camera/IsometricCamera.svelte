<script>
	import { T, useTask, useThrelte } from '@threlte/core'
	import { Clock } from 'three'
	import CameraControls from 'camera-controls'
	import * as THREE from 'three'
	import cameraStore from './camera.store.svelte'
	import store from '../../stores/store.svelte'

	const configuration = cameraStore.isometric
	CameraControls.install({ THREE: THREE })
	configuration.CameraControls = CameraControls

	let camera = $state(null)
	let cameraControls = $state(null)
	let clock = $state(new Clock())
	let selectedItem = $derived(store.selectedItem)
	const { invalidate, scene, renderer } = useThrelte()

	function createCameraControls(camera, domElement) {
		const controls = new CameraControls(camera, domElement)
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
		controls.near = configuration.near
		controls.far = configuration.far
		controls.left = configuration.left
		controls.right = configuration.right
		controls.top = configuration.top
		controls.bottom = configuration.bottom
		controls.zoomTo(configuration.orthographicZoom, true)
		// controls.verticalDragToForward = true
		window.control = controls

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

	// Animation loop using useTask
	useTask(() => {
		if (!cameraControls || !camera) return

		const delta = clock.getDelta()
		const hasUpdated = cameraControls.update(delta)

		if (hasUpdated) {
			invalidate()
		}

		return () => {
			clock.stop()
		}
	})

	// Handle window resize
	$effect(() => {
		const handleResize = () => {
			if (camera) {
				updateCameraFrustum(camera)
				invalidate()
			}
		}

		window.addEventListener('resize', handleResize)

		return () => {
			window.removeEventListener('resize', handleResize)
		}
	})
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
	oncreate={(ref) => {
		camera = ref
		updateCameraFrustum(ref)
		if (renderer) {
			cameraControls = createCameraControls(ref, renderer.domElement)
			cameraStore.saveCamera('isometric', ref)
			cameraStore.saveControls('isometric', cameraControls)
		}
	}}
	ondestroy={() => {
		if (cameraControls) {
			cameraControls.dispose()
		}
	}}
/>
