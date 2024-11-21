<script lang="ts">
	import { T } from '@threlte/core'
	import { onMount, onDestroy } from 'svelte'
	import { interactivity } from '@threlte/extras'
	import Camera from './Camera.svelte'
	import Lighting from './Lighting.svelte'
	import Space from './Space.svelte'
	import Ground from './Ground.svelte'
	import Player from './Player/Player.svelte'
	import store from '../stores/store.svelte'
	import ResetCameraButton from './Camera/ResetCameraButton.svelte'
	import keyboardStore from './keyboard.store.svelte'

	interactivity()

	onMount(() => {
		keyboardStore.start()
	})

	onDestroy(() => {
		keyboardStore.stop()
	})
</script>

<T.Group>
	<Ground />
	<Player />
	<Lighting />
	<ResetCameraButton />

	{#if store.activeSpaceUid}
		<Space uid={store.activeSpaceUid} />
	{/if}
</T.Group>
