<script lang="ts">
	import { onMount } from 'svelte'
	import { Canvas } from '@threlte/core'
	import Scene from './Scene.svelte'
	import { World } from '@threlte/rapier'
	import TopBar from '~/components/TopBar.svelte'
	import mainStore from '~/stores/main-store.svelte'
	import UrlPattern from 'url-pattern'
	import AudioViz from '~/components/AudioViz.svelte'
	import audio from '~/stores/audio-store.svelte'
	import SoundtrackControls from '~/components/SoundtrackControls.svelte'
	import SheFlex from '~/components/she/SheFlex.svelte'
	import MovementControlOptions from '~/components/MovementControlOptions.svelte'

	onMount(() => {
		const urlPattern = new UrlPattern('/app/space/:id')
		const match = urlPattern.match(globalThis.location.pathname)
		mainStore.loadSpace(match.id)
	})
</script>

<Canvas shadows>
	<World>
		<Scene />
	</World>
</Canvas>

<SheFlex style="z-index: 100;">
	<TopBar />

	{#if mainStore.isItemSelected}
		<MovementControlOptions />
	{/if}
</SheFlex>

{#if !!audio.analyser}
	<AudioViz />
	<SoundtrackControls />
{/if}
