<script lang="ts">
	import SheIcon from './SheIcon.svelte'

	let props = $props()
	let stateValue = $state(props.value ?? '#000000') // Default to black
	const gradientStop = '20%'

	// Determine if the text should be black or white based on the selected color
	function getContrastingTextColor(hex: string): string {
		if (!hex.startsWith('#')) return 'black' // Default to black for invalid colors

		// Convert hex to RGB
		let r = parseInt(hex.slice(1, 3), 16)
		let g = parseInt(hex.slice(3, 5), 16)
		let b = parseInt(hex.slice(5, 7), 16)

		// Calculate brightness using the formula
		// Brightness = (0.299*R + 0.587*G + 0.114*B)
		let brightness = (0.299 * r + 0.587 * g + 0.114 * b) / 255

		return brightness > 0.5 ? 'black' : 'white' // Choose black for light colors, white for dark
	}

	let textColor = $state(getContrastingTextColor(stateValue))

	function copyToClipboard(event: Event) {
		event.preventDefault()
		event.stopPropagation()
		console.log(event)
		navigator.clipboard.writeText(stateValue).then(
			() => console.log('Copied to clipboard:', stateValue),
			(err) => console.error('Failed to copy:', err)
		)
	}

	function handleInput(event: Event) {
		const target = event.target as HTMLInputElement
		stateValue = target.value.toUpperCase()
		props.onChange?.(stateValue)
		textColor = getContrastingTextColor(stateValue)
	}
</script>

<label
	class="SheInput SheInput-color {props.class}"
	data-disabled={props.isDisabled}
	style="--selected-color: {stateValue}; --gradient-stop: {gradientStop}; --text-color: {textColor};"
>
	<!-- Hidden color picker -->
	<input type="color" class="color-picker" value={stateValue} oninput={handleInput} disabled={props.isDisabled} />

	<!-- Label -->
	{#if props.label}
		<span class="label">{props.label}</span>
	{/if}

	<!-- Display color value -->
	<span class="color-display" style="color: var(--text-color);">{stateValue}</span>

	<!-- Copy icon -->
	<button class="copyButton" onclick={copyToClipboard}>
		<SheIcon library="pixelarticons" icon="copy" size="small" color="var(--text-color)" />
	</button>
</label>

<style>
	.copyButton {
		all: unset;
		height: 24px;
		width: 24px;
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 9999;
	}
	.SheInput-color {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 8px;
		width: 100%;
		padding: 0 8px;
		background: linear-gradient(to left, var(--selected-color, #000) var(--gradient-stop, 20%), transparent);
		color: var(--gray12);
		font-size: 14px;
		height: 30px;
		border-radius: 5px;
		box-shadow: inset 0 0 0 1px var(--gray25);
		transition: all 0.2s ease-in-out;
		cursor: pointer; /* Opens the color picker */
		position: relative;
	}

	.SheInput-color[data-disabled='true'] {
		pointer-events: none;
		background: var(--gray25);
		color: var(--gray20);
		box-shadow: inset 0 0 0 1px var(--gray20);
	}

	.color-picker {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		opacity: 0;
		cursor: pointer;
	}

	.label {
		flex: 1;
		font-weight: 500;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
	}

	.color-display {
		font-size: 14px;
		font-weight: 500;
		margin-left: auto;
		margin-right: 8px;
	}

	.SheIcon {
		cursor: pointer;
		transition: transform 0.1s ease-in-out;
		z-index: 1; /* Ensures icon is above hidden input */
	}

	.SheIcon:hover {
		transform: scale(1.1);
	}

	.SheIcon:active {
		transform: scale(1);
	}
</style>
