<script lang="ts">
	import store from '../stores/store.svelte'
	import Item from './Item.svelte'
	import { T } from '@threlte/core'

	type PropsT = { uid: string }
	const props: PropsT = $props()
	let activeItems = $derived(store.activeSpaceItems.slice(0, 10))
</script>

{#if activeItems.length > 0}
	<T.Group>
		{#each activeItems as item}
			<Item uid={item.uid} />
		{/each}
	</T.Group>
{/if}
