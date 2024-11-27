<script>
	import audio from '~/stores/audio-store.svelte'
	import SheFlex from '~/components/she/SheFlex.svelte'
</script>

{#snippet AudioVizBar(bar)}
	{@const height = bar.height}
	{@const background = bar.background}
	<div class="bar" style="height: {height}; background: {background}"></div>
{/snippet}

<SheFlex class="visualizer">
	{#each audio.vizBars as bar, i}
		{@render AudioVizBar(bar, i)}
	{/each}
</SheFlex>

<style lang="postcss">
	:global {
		.visualizer {
			position: absolute;
			bottom: 0%;
			left: 0;
			width: 100vw;
			height: 80px;
			display: flex;
			justify-content: space-evenly;
			align-items: flex-end;
			/* background: linear-gradient(to top, rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0)); */
			padding: 0px;
			z-index: 150;
		}

		.bar {
			flex: 1;
			min-width: 2px;
			/* transform-origin: bottom; */
			transition: height 0.05s ease;
			/* box-shadow:
				20px 0px 12px -5px rgba(0, 0, 0, 0.3),
				20px 0px 24px -5px rgba(0, 0, 0, 0.5); */
		}
	}
</style>
