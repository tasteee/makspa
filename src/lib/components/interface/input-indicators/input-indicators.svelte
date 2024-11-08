<script lang="ts">
	import ArrowKeysIndicators from './arrow-keys-indicators.svelte'
	import FunctionKeysIndicators from './function-keys-indicators.svelte'
</script>

<div class="InputIndicators">
	<ArrowKeysIndicators />
	<FunctionKeysIndicators />
</div>

<style>
	.InputIndicators {
		display: flex;
		gap: 12px;
		position: absolute;
		top: 0px;
		left: 0px;
		width: 100vw;
		height: 32px;
		padding: 0px 12px;
		display: flex;
		align-items: center;
		z-index: 105;
	}
</style>
