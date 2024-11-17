<script lang="ts">
	import keyboardStore from '../../stores/keyboard.svelte'
	type PropsT = { identifier: string; displayValue?: string; screenReaderText: string; children: any }
	let props: PropsT = $props()
	let displayValue = $derived(props.displayValue || props.identifier)
	let isPressed = $derived(keyboardStore[props.identifier])
	let isPressedClass = $derived(isPressed ? 'isPressed' : '')
	let className = $derived('KeyboardIndicator kbd ' + isPressedClass)
</script>

<kbd class={className}>
	{displayValue}
	{#if props.screenReaderText}
		<span class="sr-only">{props.screenReaderText}</span>
	{/if}
</kbd>

<style>
	/* .KeyboardIndicator {
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
	} */

	.isPressed {
		box-shadow: inset 0px 0px 8px var(--black);
		background-color: var(--white);
		color: var(--black);
	}
</style>
