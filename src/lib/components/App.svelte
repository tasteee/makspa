<script lang="ts">
	import { Canvas } from '@threlte/core'
	import Scene from './Scene.svelte'

	import SideBar from './interface/SideBar.svelte'
	import MainBar from './interface/MainBar.svelte'
	import SpeedDial from './interface/SpeedDial.svelte'
	import ModelsGallery from './interface/ModelsGallery.svelte'
	import ToolBar from './interface/ToolBar.svelte'
	import Menu from './interface/Menu.svelte'
	import { World } from '@threlte/rapier'
	import InputIndicators from './interface/input-indicators/input-indicators.svelte'
	import keyboard from '../stores/keyboard.svelte'
	import { onMount } from 'svelte'

	onMount(() => {
		keyboard.registerListeners()
	})
</script>

<Canvas>
	<World>
		<Scene />
	</World>
</Canvas>

<InputIndicators />

<!-- <SideBar /> -->
<!-- <SpeedDial /> -->
<MainBar />
<ModelsGallery />
<ToolBar />
<Menu />
