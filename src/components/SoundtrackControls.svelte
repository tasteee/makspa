<script lang="ts">
	import SheIconButton from './she/SheIconButton.svelte'
	import SheFlex from './she/SheFlex.svelte'
	import SheIcon from './she/SheIcon.svelte'
	import audioStore from '~/stores/audio-store.svelte'
	import SheInput from './she/SheInput.svelte'
	import SheSlider from './she/SheSlider.svelte'
	import { onMount } from 'svelte'
	import { fade } from 'svelte/transition'

	let isVisible = $state(false)
	let isPlaying = $state(null)
	let playButtonIcon = $derived(isPlaying ? 'play' : 'pause')

	onMount(() => {
		let interval = setInterval(() => {
			isPlaying = audioStore.backgroundAudio.isPlaying
			isVisible = !!isPlaying
			if (isPlaying) clearInterval(interval)
		}, 500)
	})

	const onClick = () => {
		isPlaying = !isPlaying
	}

	$effect(() => {
		if (isPlaying === null) return
		const isStorePlaying = audioStore.backgroundAudio.isPlaying

		if (isPlaying && !isStorePlaying) {
			audioStore.backgroundAudio.play()
		}

		if (!isPlaying && isStorePlaying) {
			audioStore.backgroundAudio.pause()
		}
	})
</script>

{#if isVisible}
	<span transition:fade>
		<SheFlex class="SoundtrackControls" gap="12px" alignY="center" padding="4px 12px">
			<SheFlex class="Controls" gap="4px">
				<SheIconButton kind="dark" size="small" icon="prev" onClick={audioStore.playPrevious} />
				<SheIconButton kind="dark" size="small" icon={playButtonIcon} {onClick} />
				<SheIconButton kind="dark" size="small" icon="next" />
			</SheFlex>
			<SheFlex class="VolumeSlider" gap="4px" alignY="center">
				<SheIcon size="small" icon="volume-3" />
				<SheSlider step="1" decimals="0" min="0" max="100" value={audioStore.volume} onChange={audioStore.setVolume} />
			</SheFlex>
		</SheFlex>
	</span>
{/if}

<style lang="postcss">
	:global {
		.SoundtrackControls {
			background: rgba(0, 0, 0, 0.75);
			border-radius: 5px;
			position: absolute;
			bottom: 12px;
			left: 12px;
			z-index: 155;
		}
	}
</style>
