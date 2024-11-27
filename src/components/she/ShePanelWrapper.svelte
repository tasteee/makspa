<script lang="ts">
	import ShePanel from './ShePanel.svelte'
	import mainStore from '~/stores/main-store.svelte'
	const props = $props()
</script>

<ShePanel side="right" title="Item" onCloseClick={mainStore.deselectItem} isOpen isCollapsible>
	{@render props.children()}
</ShePanel>

<style>
</style>
