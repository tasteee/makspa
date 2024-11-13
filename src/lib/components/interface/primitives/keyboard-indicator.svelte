<script lang="ts">
	import { Kbd, ArrowKeyUp, ArrowKeyDown, ArrowKeyRight, ArrowKeyLeft } from 'flowbite-svelte'
	import keyboardStore from '../../../stores/keyboard.svelte.ts'

	type PropsT = { identifier: string; screenReaderText: string; children: any }
	const props: PropsT = $props()

	const isPressed = $derived(keyboardstore[props.identifier])
	const isPressedClass = isPressed ? 'isPressed' : ''
</script>

<kbd data-testid="keyboard-indicator" class="KeyboardIndicator {isPressedClass}">
	{@render props.children()}

	{#if props.screenReaderText}
		<span class="sr-only">{props.screenReaderText}</span>
	{/if}
</kbd>

<style>
	.KeyboardIndicator {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		padding: 1.5px 2px;
		margin-inline-end: 0.25rem;
		border-radius: 4px;
		min-width: 16px;
		padding: 0px 4px;
		display: inline-flex;
		justify-content: center;
		align-items: center;
		padding: 3.2px 8px;
		border-width: 1px;
		border-color: #e5e7eb;
		font-size: 0.75rem;
		line-height: 1rem;
		font-weight: 600;
		color: #1f2937;
		background-color: #f3f4f6;
	}

	.isPressed {
		box-shadow: inset 0px 0px 8px var(--black);
		color: #adbfc2;
	}
</style>
