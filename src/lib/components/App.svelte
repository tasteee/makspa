<script lang="ts">
	import { Canvas } from '@threlte/core'
	import Scene from './Scene.svelte'
	import BottomNav from './interface/BottomNav.svelte'
	import ModelsGallery from './interface/ModelsGallery.svelte'
	import SideBar from './interface/SideBar.svelte'
	import { World } from '@threlte/rapier'
	import keyboard from '../stores/keyboard.svelte'
	import { onMount } from 'svelte'
	import store from '../stores/store.svelte'
	import TransformModeToggle from './interface/TransformModeToggle.svelte'
	import CameraZoomInput from './Camera/CameraZoomInput.svelte'
	import ItemPanel from './interface/ItemPanel.svelte'

	onMount(() => {
		keyboard.registerListeners()
	})
</script>

<Canvas background="#010101">
	<World>
		<Scene />
	</World>
</Canvas>

{#if !!store.selectedItemUid}
	<TransformModeToggle />
{/if}

<ModelsGallery />
<BottomNav />
<!-- <CameraZoomInput /> -->
<SideBar />
<ItemPanel />
<!-- <InputIndicators /> -->
