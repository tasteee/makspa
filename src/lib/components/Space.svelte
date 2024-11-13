<script lang="ts">
	import store from '../stores/store.svelte'
	import Item from './Item.svelte'
	import { T } from '@threlte/core'

	// If Space.svelte is rendering, that means the artist has
	// indicated that they want to enter a space.

	// We will use props.uid to load the space and the items and
	// render them accordingly.

	type PropsT = { uid: string }
	const props: PropsT = $props()
	let activeItems = $derived(store.activeSpaceItems)
</script>

<T.Group>
	{#each activeItems as item}
		<Item uid={item.uid} />
	{/each}
</T.Group>
