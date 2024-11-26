<script lang="ts">
	import { T } from '@threlte/core'
	import { interactivity } from '@threlte/extras'
	import Camera from './Camera.svelte'
	import Lighting from './Lighting.svelte'
	import Space from './Space.svelte'
	import Ground from './Ground.svelte'
	import ResetCameraButton from './ResetCameraButton.svelte'
	import { onMount, onDestroy } from 'svelte'
	import Environment from './Environment.svelte'
	import mainStore from '~/stores/main-store.svelte'
	import stores from '~/stores'

	interactivity()
	let space = $derived(mainStore.space || {}) as SpaceT
	let environment = $derived(space.environment)
	let environmentBlur = $derived(space.environmentBlur)
	let showEnvironment = $derived(space.isEnvironmentVisible)
	let backgroundColor = $derived(space.backgroundColor)
	let environmentOnly = $derived(space.environmentOnly)
	let backgroundType = $derived(space.backgroundType)

	onMount(() => {
		stores.input.start()
	})

	onDestroy(() => {
		stores.input.stop()
	})

	$inspect({
		space
	})
</script>

{#if !!space.id}
	{#if showEnvironment}
		<Environment
			{environmentOnly}
			blur={environmentBlur}
			hdrPath={'/hdrs/' + environment}
			{backgroundColor}
			mode={backgroundType}
		/>
	{/if}

	<T.Group>
		<Ground />
		<Camera />
		<Lighting />
		<ResetCameraButton />

		{#if space.id}
			<Space id={space.id} />
		{/if}
	</T.Group>
{/if}
