<script lang="ts">
	import stores from '../stores/index'
	import Item from './Item.svelte'
	import Group from '../modules/Group.svelte'

	type PropsT = { uid: string }
	const props: PropsT = $props()
	let itemUids = $derived(stores.spaceItems.uids)
</script>

{#if itemUids.length > 0}
	<Group uid={props.uid}>
		{#each itemUids as uid}
			<Item {uid} />
		{/each}
	</Group>
{/if}
