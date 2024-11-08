<script>
	import { T } from '@threlte/core'
	import Camera from './Camera.svelte'
	import Lighting from './Lighting.svelte'
	import Space from './Space.svelte'
	import Ground from './Ground.svelte'
	import store from '../stores/store.svelte'
	import { interactivity } from '@threlte/extras'
	import Cube from './Cube.svelte'

	interactivity()
</script>

<Ground />
<Camera />
<Lighting />

{#if store.state.activeSpaceUid}
	<Space uid={store.state.activeSpaceUid} />
{/if}

<!-- <Cube controls="<TrackballControls>" /> -->
