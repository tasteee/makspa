<script lang="ts">
	import { Canvas } from '@threlte/core'
	import Scene from './Scene.svelte'
	import { World } from '@threlte/rapier'
	import ItemPanelVertical from './Interface/ItemPanelVertical.svelte'
	import SheTopBar from '~/components/Interface/SheTopBar.svelte'
	import stores from '~/stores'
</script>

<Canvas>
	<World>
		<Scene />
	</World>
</Canvas>

<SheTopBar />
