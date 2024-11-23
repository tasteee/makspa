<script lang="ts">
	import { T } from '@threlte/core'
	import { interactivity } from '@threlte/extras'
	import Camera from './Camera.svelte'
	// import IsometricCamera from './Camera/Camera.svelte'
	import Lighting from './Lighting.svelte'
	import Space from './Space.svelte'
	import Ground from './Ground.svelte'
	import store from '../stores/store.svelte'
	import ResetCameraButton from './Camera/ResetCameraButton.svelte'
	import { onMount, onDestroy } from 'svelte'
	import keyboardStore from '../stores/keyboard.store.svelte'
	import Environment from './Environment.svelte'

	let space = $derived(store.activeSpace)
	let environment = $derived(space.environment)
	let environmentBlur = $derived(space.environment_blur)
	let showEnvironment = $derived(space.is_environment_visible)
	let environmentBackgroundColor = $derived(space.environment_background_color)
	let environmentOnly = $derived(space.environment_only)
	let backgroundType = $derived(space.background_type)

	interactivity()

	onMount(() => {
		keyboardStore.start()
	})

	onDestroy(() => {
		keyboardStore.stop()
	})

	$inspect({
		environment,
		environmentBlur,
		showEnvironment,
		environmentBackgroundColor,
		backgroundType
	})
</script>

{#if showEnvironment}
	<Environment
		{environmentOnly}
		blur={environmentBlur}
		hdrPath={'/hdrs/' + environment}
		backgroundColor={environmentBackgroundColor}
		mode={backgroundType}
	/>
{/if}

<T.Group>
	<Ground />
	<Camera />
	<Lighting />
	<ResetCameraButton />

	{#if store.activeSpaceUid}
		<Space uid={store.activeSpaceUid} />
	{/if}
</T.Group>
