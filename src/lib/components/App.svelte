<script lang="ts">
	import { Canvas } from '@threlte/core'
	import Scene from './Scene.svelte'
	import TransformModeToggle from './Interface/TransformModeToggle.svelte'
	import { World } from '@threlte/rapier'
	import keyboard from '../stores/keyboard.svelte'
	import { onMount } from 'svelte'
	import store from '../stores/store.svelte'
	import ItemPanelVertical from './Interface/ItemPanelVertical.svelte'
	import SheTopBar from './Interface/SheTopBar.svelte'

	onMount(() => {
		keyboard.registerListeners()
	})
</script>

<Canvas background="#010101">
	<World>
		<Scene />
	</World>
</Canvas>
<SheTopBar />

{#if store.isItemPanelOpen}
	{#if store.selectedItemUid}
		<ItemPanelVertical />
		<TransformModeToggle />
	{/if}
{/if}
