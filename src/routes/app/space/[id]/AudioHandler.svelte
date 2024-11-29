<!-- AudioHandler.svelte  -->
<!-- THIS IS ONLY RENDERED ONCE THE USER MAKES THE FIRST CLICK -->
<script lang="ts">
	import { useTask } from '@threlte/core'
	import { AudioListener, Audio } from '@threlte/extras'
	import audioStore from '~/stores/audio-store.svelte'
	import { useThrelte } from '@threlte/core'
	const { renderMode } = useThrelte()
	renderMode.set('on-demand')

	let audioListener = $state(null)
	let backgroundAudio = $state(null)
	let volume = $derived(audioStore.isSoundtrackMuted ? 0 : audioStore.volume / 100)

	$effect(() => {
		if (!audioListener) return
		if (audioStore.context) return
		console.log({ audioListener })
		audioStore.context = audioListener.context
		audioStore.analyser = audioStore.context.createAnalyser()
		audioStore.analyser.fftSize = 2048
	})

	$effect(() => {
		if (!backgroundAudio) return
		if (audioStore.backgroundAudio) return
		console.log({ backgroundAudio })
		audioStore.backgroundAudio = backgroundAudio
		audioStore.backgroundAudio.setVolume(0.5)
	})

	useTask(() => {
		if (!audioStore.backgroundAudio.isPlaying) return
		// Re-generate the AudioViz bars.
		audioStore.updateFrequencyData()
	})
</script>

<AudioListener bind:ref={audioListener} />

<Audio
	bind:ref={audioStore.backgroundAudio}
	src="/audio/tracks/nakedpoetry.mp3"
	loop
	autoplay={false}
	playbackRate={0.8}
	{volume}
/>

{#each Object.entries(audioStore.interfaceSoundsConfig) as [id, config]}
	<Audio
		src={window.location.origin + config.path}
		bind:ref={audioStore.interfaceSounds[id]}
		playbackRate={config.playbackRate}
		volume={config.volume}
	/>
{/each}
