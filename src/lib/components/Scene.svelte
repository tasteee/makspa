<script lang="ts">
	import { T } from '@threlte/core'
	import { interactivity } from '@threlte/extras'
	import Camera from './Camera/Camera.svelte'
	import Lighting from './Lighting.svelte'
	import Space from './Space.svelte'
	import Ground from './Ground.svelte'
	import store from '../stores/store.svelte'
	import Player from './Camera/Player.svelte'

	interactivity()
</script>

<T.Group>
	<!-- <Player /> -->
	<Ground />
	<Camera />
	<Lighting />

	{#if store.activeSpaceUid}
		<Space uid={store.activeSpaceUid} />
	{/if}
</T.Group>
