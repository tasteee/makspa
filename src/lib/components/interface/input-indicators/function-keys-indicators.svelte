<script lang="ts">
	import KeyboardIndicator from '../primitives/keyboard-indicator.svelte'
</script>

<div class="FunctionKeysIndicators">
	<KeyboardIndicator identifier="f1" screenReaderText="Function key F1">F1</KeyboardIndicator>
	<KeyboardIndicator identifier="f2" screenReaderText="Function key F2">F2</KeyboardIndicator>
	<KeyboardIndicator identifier="f3" screenReaderText="Function key F3">F3</KeyboardIndicator>
	<KeyboardIndicator identifier="f4" screenReaderText="Function key F4">F4</KeyboardIndicator>
	<KeyboardIndicator identifier="f5" screenReaderText="Function key F5">F5</KeyboardIndicator>
	<KeyboardIndicator identifier="f6" screenReaderText="Function key F6">F6</KeyboardIndicator>
	<KeyboardIndicator identifier="f7" screenReaderText="Function key F7">F7</KeyboardIndicator>
	<KeyboardIndicator identifier="f8" screenReaderText="Function key F8">F8</KeyboardIndicator>
	<KeyboardIndicator identifier="f9" screenReaderText="Function key F9">F9</KeyboardIndicator>
	<KeyboardIndicator identifier="f10" screenReaderText="Function key F10">F10</KeyboardIndicator>
	<KeyboardIndicator identifier="f11" screenReaderText="Function key F11">F11</KeyboardIndicator>
	<KeyboardIndicator identifier="f12" screenReaderText="Function key F12">F12</KeyboardIndicator>
</div>

<style>
	.FunctionKeysIndicators {
		display: flex;
		gap: 0.25rem;
	}
</style>
