<script lang="ts">
	import { T } from '@threlte/core'
	import { interactivity } from '@threlte/extras'
	import Camera from './Camera/Camera.svelte'
	import Lighting from './Lighting.svelte'
	import Space from './Space.svelte'
	import Ground from './Ground.svelte'
	import store from '../stores/store.svelte'
	import ResetCameraButton from './Camera/ResetCameraButton.svelte'
	import ItemFocuser from './ItemFocuser.svelte'
	interactivity()
</script>

<T.Group>
	<Ground />
	<Camera />
	<Lighting />
	<ResetCameraButton />
	<ItemFocuser />

	{#if store.activeSpaceUid}
		<Space uid={store.activeSpaceUid} />
	{/if}
</T.Group>
