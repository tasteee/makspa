<script lang="ts">
	import KeyboardIndicator from './KeyboardIndicator.svelte'
	import { ArrowKeyUp, ArrowKeyDown, ArrowKeyRight, ArrowKeyLeft } from 'flowbite-svelte'
</script>

<div class="InputIndicators">
	<div class="FunctionKeysIndicators">
		<KeyboardIndicator identifier="F1" screenReaderText="Function key F1">F1</KeyboardIndicator>
		<KeyboardIndicator identifier="F2" screenReaderText="Function key F2">F2</KeyboardIndicator>
		<KeyboardIndicator identifier="F3" screenReaderText="Function key F3">F3</KeyboardIndicator>
		<KeyboardIndicator identifier="F4" screenReaderText="Function key F4">F4</KeyboardIndicator>
		<KeyboardIndicator identifier="F5" screenReaderText="Function key F5">F5</KeyboardIndicator>
		<KeyboardIndicator identifier="F6" screenReaderText="Function key F6">F6</KeyboardIndicator>
		<KeyboardIndicator identifier="F7" screenReaderText="Function key F7">F7</KeyboardIndicator>
		<KeyboardIndicator identifier="F8" screenReaderText="Function key F8">F8</KeyboardIndicator>
		<KeyboardIndicator identifier="F9" screenReaderText="Function key F9">F9</KeyboardIndicator>
		<KeyboardIndicator identifier="F10" screenReaderText="Function key F10">F10</KeyboardIndicator>
		<KeyboardIndicator identifier="F11" screenReaderText="Function key F11">F11</KeyboardIndicator>
		<KeyboardIndicator identifier="F12" screenReaderText="Function key F12">F12</KeyboardIndicator>
	</div>

	<div class="ArrowKeysIndicators">
		<KeyboardIndicator identifier="arrowup" displayValue="▲" screenReaderText="Arrow key up">
			<ArrowKeyUp />
		</KeyboardIndicator>

		<KeyboardIndicator identifier="arrowdown" displayValue="▼" screenReaderText="Arrow key down">
			<ArrowKeyDown />
		</KeyboardIndicator>

		<KeyboardIndicator identifier="arrowleft" displayValue="◀︎" screenReaderText="Arrow key left">
			<ArrowKeyLeft />
		</KeyboardIndicator>

		<KeyboardIndicator identifier="arrowright" displayValue="▶︎" screenReaderText="Arrow key right">
			<ArrowKeyRight />
		</KeyboardIndicator>
	</div>
</div>

<style>
	.InputIndicators {
		display: flex;
		gap: 12px;
		position: absolute;
		bottom: 0px;
		left: 0px;
		width: 100vw;
		height: 32px;
		padding: 0px 12px;
		display: flex;
		align-items: center;
		z-index: 105;
	}

	.ArrowKeysIndicators {
		display: flex;
		flex-direction: row;
		gap: 0.25rem;
	}

	.FunctionKeysIndicators {
		display: flex;
		gap: 0.25rem;
	}
</style>
