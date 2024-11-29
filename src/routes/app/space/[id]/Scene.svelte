<script lang="ts">
	import { T } from '@threlte/core'
	import { ContactShadows } from '@threlte/extras'
	import { interactivity } from '@threlte/extras'
	// import Camera from './Camera.svelte'
	import Camera from './PerspectiveCamera.svelte'
	import Space from './Space.svelte'
	import Ground from './Ground.svelte'
	import { onMount, onDestroy } from 'svelte'
	import Environment from './Environment.svelte'
	import mainStore from '~/stores/main-store.svelte'
	import stores from '~/stores'
	import inputStore from '~/stores/input.store.svelte'

	interactivity()

	let space = $derived(mainStore.space || {}) as SpaceT

	let lightState0 = $state({
		positionX: 2,
		positionY: 1,
		positionZ: -2,
		intensity: 1,
		color: '#ffffff',
		castShadow: true
	})

	let lightState1 = $state({
		positionX: 2,
		positionY: 1,
		positionZ: -2,
		intensity: 1,
		shadow: true,
		castShadow: true,
		color: '#ffffff'
	})

	globalThis.lights = {
		a: lightState0,
		b: lightState1
	}

	$effect(() => {
		const canvas = document.querySelector('canvas')
		if (mainStore.isDragging) {
			canvas.style.cursor = 'none'
		} else {
			canvas.style.cursor = 'default'
		}
	})

	onMount(() => {
		inputStore.start()
	})

	onDestroy(() => {
		inputStore.stop()
	})
</script>

{#if !!space.id}
	<!-- <T.DirectionalLight intensity={0.6} position={[4, 5, 4]} castShadow /> -->
	<T.DirectionalLight
		castShadow={lightState0.castShadow}
		color={lightState0.color}
		intensity={lightState0.intensity}
		position={[lightState0.positionX, lightState0.positionY, lightState0.positionZ]}
	/>
	<T.AmbientLight
		shadow={lightState1.shadow}
		color={lightState1.color}
		intensity={lightState1.intensity}
		position={[lightState1.positionX, lightState1.positionY, lightState1.positionZ]}
	/>
	<!-- <T.HemisphereLight intensity={0.9} color="#ffffff" groundColor={mainStore.space.color} /> -->
	<!-- <T.PointLight intensity={0.6} position={[0, 5, 0]} distance={20} decay={2} /> -->
	<!-- <T.DirectionalLight castShadow position={[0, 20, 0]} /> -->
	<ContactShadows scale={10} blur={2} far={2.5} opacity={0.5} />

	<Environment
		isHdrEnabled={space.isHdrEnabled}
		intensity={space.hdrIntensity}
		blur={space.hdrBlur / 100}
		hdrPath={'/hdrs/' + space.hdr}
		backgroundColor={space.backgroundColor}
	/>

	<T.Group>
		<Ground />
		<Camera />

		{#if space.id}
			<Space id={space.id} />
		{/if}
	</T.Group>
{/if}
