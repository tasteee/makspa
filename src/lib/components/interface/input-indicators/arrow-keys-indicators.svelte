<script lang="ts">
	import { ArrowKeyUp, ArrowKeyDown, ArrowKeyRight, ArrowKeyLeft } from 'flowbite-svelte'
	import KeyboardIndicator from '../primitives/keyboard-indicator.svelte'
</script>

<div class="ArrowKeysIndicators">
	<KeyboardIndicator identifier="arrowup" screenReaderText="Arrow key up">
		<ArrowKeyUp />
	</KeyboardIndicator>

	<KeyboardIndicator identifier="arrowdown" screenReaderText="Arrow key down">
		<ArrowKeyDown />
	</KeyboardIndicator>

	<KeyboardIndicator identifier="arrowleft" screenReaderText="Arrow key left">
		<ArrowKeyLeft />
	</KeyboardIndicator>

	<KeyboardIndicator identifier="arrowright" screenReaderText="Arrow key right">
		<ArrowKeyRight />
	</KeyboardIndicator>
</div>

<style>
	.ArrowKeysIndicators {
		display: flex;
		flex-direction: row;
		gap: 0.25rem;
	}
</style>
