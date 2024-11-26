<script lang="ts">
	import { onMount } from 'svelte'
	import { Canvas } from '@threlte/core'
	import Scene from './Scene.svelte'
	import { World } from '@threlte/rapier'
	import SheTopBar from '~/components/Interface/SheTopBar.svelte'
	import mainStore from '~/stores/main-store.svelte'
	import TopBarPanels from '~/components/Interface/TopBarPanels.svelte'
	import UrlPattern from 'url-pattern'
	import AudioViz from '~/components/AudioViz.svelte'
	import audio from '~/stores/audio-store.svelte'
	import audioStore from '~/stores/audio-store.svelte'
	import SoundtrackControls from '~/components/SoundtrackControls.svelte'

	onMount(() => {
		const urlPattern = new UrlPattern('/app/space/:id')
		const match = urlPattern.match(globalThis.location.pathname)
		mainStore.enterSpace(match.id)
	})

	$effect(() => {
		if (!mainStore.space) return
		const color1 = mainStore.space.floorColor1
		const color2 = mainStore.space.floorColor2
		console.log('updating bar colors', color1, color2)
		audioStore.updateVizBarColors(color1, color2)
	})

	// console.log('rendeing /app/space/:id')
</script>

<Canvas>
	<World>
		<Scene />
	</World>
</Canvas>

<SheTopBar />

{#if !!mainStore.space?.id}
	<TopBarPanels />
{/if}

{#if !!audio.analyser}
	<AudioViz />
	<SoundtrackControls />
{/if}
