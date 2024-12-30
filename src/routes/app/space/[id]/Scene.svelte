<script lang="ts">
	import { T } from '@threlte/core'
	import * as THREE from 'three'
	import { ContactShadows, SoftShadows } from '@threlte/extras'
	import { interactivity } from '@threlte/extras'
	// import Camera from './Camera.svelte'
	import BuildModeCamera from './BuildModeCamera.svelte'
	import Space from './Space.svelte'
	import Ground from './Ground.svelte'
	import { onMount, onDestroy } from 'svelte'
	import CustomEnvironment from './Environment.svelte'
	import { CSM } from '@threlte/extras'
	import mainStore from '~/stores/main-store.svelte'
	import DigitsHandler from './DigitsHandler.svelte'
	import inputStore from '~/stores/input.store.svelte'

	interactivity()
	let space = $derived(mainStore.space || {}) as SpaceT

	let lightState0 = $state({
		positionX: 0,
		positionY: 2,
		positionZ: 0,
		intensity: 0.99,
		color: '#ffffff',
		castShadow: true
	})

	let lightState1 = $state({
		positionX: 2,
		positionY: 1,
		positionZ: 0,
		intensity: 0.5,
		shadow: true,
		castShadow: true,
		color: '#ffffff'
	})

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

	let dLight = $state(null)
	let helper = $state(null)

	const onLightCreate = (foo) => {
		dLight = foo
		console.log({ foo })
		// helper = new THREE.DirectionalLightHelper(foo)
	}
</script>

<DigitsHandler />

<T.AmbientLight color="white" intensity={0.1} position={[3, 1, 0]} />

<ContactShadows position={[0.1, 0.1, 0.1]} opacity={1} scale={30} blur={1} far={20} resolution={256} color="#000000" />
<!-- <SoftShadows focus={2} size={90} samples={10} /> -->

<T.DirectionalLight castShadow oncreate={onLightCreate} color="#ffffff" intensity={2} position={[5, 5, 5]} />

<!-- <CSM enabled={true} lightDirection={[0.25, -0.25, 0.25]} lightIntensity={6} lightColor="#000000"> -->
{#if !!space.id}
	<T.Group receiveShadow castShadow>
		<Ground />

		<CustomEnvironment
			isHdrEnabled={space.isHdrEnabled}
			intensity={space.hdrIntensity}
			blur={space.hdrBlur / 100}
			hdrPath={'/hdrs/' + space.hdr}
			backgroundColor={space.backgroundColor}
		/>

		<!-- {#if dLight}
				<T.DirectionalLightHelper args={[dLight, 0.25, '#ffffff']} />
			{/if} -->

		<BuildModeCamera />

		{#if space.id}
			<Space id={space.id} />
		{/if}
	</T.Group>
{/if}
<!-- </CSM> -->
