<script lang="ts">
	import * as THREE from 'three'
	import { useThrelte } from '@threlte/core'
	import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'

	let props = $props<{
		isHdrEnabled: boolean
		hdrPath: string
		blur?: number
		intensity?: number
		backgroundColor?: string
	}>()

	const { scene, renderer } = useThrelte()
	let envMap = $state<THREE.Texture | null>(null)
	let intensity = $derived((props.intensity ?? 1) / 100) // Intensity can be in range [0, 1]
	let blur = $derived(props.blur ?? 0)
	let backgroundColor = $derived(props.backgroundColor ?? '#000000')

	// Reactively update background and environment map
	$effect(() => {
		// Always set the background color
		scene.background = new THREE.Color(backgroundColor)

		if (props.isHdrEnabled && envMap) {
			// If HDR is enabled, set the environment map
			scene.environment = envMap
			scene.backgroundRotation = new THREE.Euler(0, 0, 0)
			scene.environmentIntensity = intensity
			scene.environmentRotation = new THREE.Euler(0, 0, 0)
			scene.backgroundBlurriness = blur
		} else {
			// Disable environment map if HDR is not enabled
			scene.environment = null
		}
	})

	// Apply environment map to materials of objects if enabled
	$effect(() => {
		if (envMap) {
			scene.traverse((object: THREE.Object3D) => {
				if (object instanceof THREE.Mesh) {
					// Apply environment map to materials that support it (like MeshStandardMaterial)
					object.material.envMap = envMap
					object.material.needsUpdate = true
				}
			})
		}
	})

	// Load HDR when the path changes
	$effect(() => {
		if (props.hdrPath && props.isHdrEnabled) {
			loadHDR(props.hdrPath)
		}
	})

	async function loadHDR(path: string) {
		const pmremGenerator = new THREE.PMREMGenerator(renderer)
		const exrLoader = new RGBELoader()

		try {
			const texture = await exrLoader.loadAsync(path)
			const envMapCube = pmremGenerator.fromEquirectangular(texture)
			envMap = envMapCube.texture

			// Cleanup
			texture.dispose()
			pmremGenerator.dispose()
		} catch (error) {
			console.error('Error loading HDR environment map:', error)
		}
	}

	// Cleanup resources
	$effect(() => {
		return () => {
			scene.background = null
			scene.environment = null
			envMap?.dispose()
		}
	})
</script>
