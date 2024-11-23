<script lang="ts">
	import { Canvas } from '@threlte/core'
	import Scene from './Scene.svelte'
	import TransformModeToggle from './Interface/TransformModeToggle.svelte'
	import { World } from '@threlte/rapier'
	import store from '../stores/store.svelte'
	import ItemPanelVertical from './Interface/ItemPanelVertical.svelte'
	import SheTopBar from './Interface/SheTopBar.svelte'
	import InputIndicators from './Interface/InputIndicators.svelte'
</script>

<Canvas>
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

<!-- <div class="bottomContainer">
	<InputIndicators />
</div> -->

<style>
	:global {
		.bottomContainer {
			position: absolute;
			bottom: 0px;
			left: 0px;
			width: 100vw;
			height: 0px;
			display: flex;
			justify-content: center;
			overflow-y: visible;
		}
	}
</style>
