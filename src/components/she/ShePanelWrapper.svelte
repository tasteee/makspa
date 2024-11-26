<script lang="ts">
	import { onMount } from 'svelte'
	import ShePanel from './ShePanel.svelte'
	import stores from '~/stores'
	const props = $props()
</script>

<ShePanel side="right" title="Item" onCloseClick={stores.items.deselectItem} isOpen isCollapsible>
	{@render props.children()}
</ShePanel>

<style>
</style>
