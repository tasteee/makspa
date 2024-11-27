<script lang="ts">
	import mainStore from '~/stores/main-store.svelte'
	import Item from './Item.svelte'
	import Group from '~/modules/Group.svelte'

	type PropsT = { id: string }
	const props: PropsT = $props()
	let items = $derived.by(() => Object.values(mainStore.space.items)) as ItemT[]
</script>

{#if items.length > 0}
	<Group id={props.id}>
		{#each items as item (item.id)}
			<Item {item} />
		{/each}
	</Group>
{/if}
