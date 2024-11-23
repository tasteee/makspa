<script lang="ts">
	import * as THREE from 'three'
	import { useThrelte } from '@threlte/core'
	import { onDestroy } from 'svelte'
	import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'

	type PropsT = {
		hdrPath: string
		environmentOnly?: boolean
		blur?: number
		backgroundColor?: string
		mode?: string
	}

	let props: PropsT = $props()
	let hdrPath = $derived(props.hdrPath)
	let mode = $derived(props.mode || 'environment')
	const { scene, renderer } = useThrelte()
	let envMap = $state<THREE.Texture>(null)

	$inspect(props)

	$effect(() => {
		if (mode === 'none') {
			scene.background = null
		}

		if (mode === 'color') {
			scene.background = new THREE.Color(props.backgroundColor)
		}

		if (mode === 'hdr') {
			if (!envMap) return
			scene.background = envMap

			if (!props.environmentOnly && props.blur >= 0) {
				scene.backgroundBlurriness = props.blur
			}
		}
	})

	$effect(() => {
		if (hdrPath) loadHDR(hdrPath)
	})

	async function loadHDR(path: string) {
		const pmremGenerator = new THREE.PMREMGenerator(renderer)
		const exrLoader = new RGBELoader()

		try {
			const texture = await exrLoader.loadAsync(path)
			const envMapCube = pmremGenerator.fromEquirectangular(texture)
			envMap = envMapCube.texture
			texture.dispose()
			pmremGenerator.dispose()
		} catch (error) {
			console.error('Error loading HDR environment map:', error)
		}
	}

	onDestroy(() => {
		scene.background = null
	})
</script>
