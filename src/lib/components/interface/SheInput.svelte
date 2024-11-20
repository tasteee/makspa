<script lang="ts">
	import * as helpers from '../../modules/numbers'
	import SheIcon from './SheIcon.svelte'

	type PropsT = {
		label?: string
		type?: 'text' | 'number' | 'color' | 'range' | 'longtext'
		value?: string | number
		placeholder?: string
		min?: string | number
		max?: string | number
		step?: string | number
		decimals?: string | number
		class?: string
		isDisabled?: boolean
		size?: 'small' | 'medium' | 'large'
		onChange?: (value: string | number) => void
	}

	let props: PropsT = $props()
	let size = $derived(props.size ?? 'medium')
	let type = $derived(props.type ?? 'text')
	let stateValue = $state(props.value ?? '')
	let shouldShowRangeValue = $derived(type === 'range')

	// Format number according to decimals
	function formatNumber(value: number | string): any {
		const num = parseFloat(value as string)
		if (isNaN(num)) return value
		if (typeof props.decimals !== 'number') return num
		return Number(num.toFixed(props.decimals))
	}

	function handleInput(event: Event) {
		const target = event.target as HTMLInputElement | HTMLTextAreaElement
		let value: string | number = target.value

		if (type === 'number' || type === 'range') {
			if (target.value === '') value = ''
			else value = formatNumber(Number(target.value))
		}

		if (type === 'color') value = target.value.toUpperCase()
		props.onChange?.(value)
		stateValue = value
	}
</script>

<label class="SheInput {props.class}" data-type={type} data-disabled={props.isDisabled} data-size={size}>
	{#if props.label}
		<span class="label">{props.label}</span>
	{/if}
	{#if type === 'longtext'}
		<textarea value={props.value} placeholder={props.placeholder} disabled={props.isDisabled} oninput={handleInput}
		></textarea>
	{:else if type === 'color'}
		<div class="color-input-wrapper">
			<input type="color" value={props.value} disabled={props.isDisabled} oninput={handleInput} />
			<span class="color-value">{props.value}</span>
			<SheIcon library="pixelarticons" icon="copy" size="small" />
		</div>
	{:else}
		<input
			{type}
			value={props.value}
			placeholder={props.placeholder}
			min={props.min}
			max={props.max}
			step={props.step}
			disabled={props.isDisabled}
			oninput={handleInput}
		/>
	{/if}
	{#if shouldShowRangeValue}
		<input
			class="rangeValueInput"
			type="number"
			value={props.value}
			min={props.min}
			max={props.max}
			step={props.step}
			disabled={props.isDisabled}
			oninput={handleInput}
		/>
	{/if}
</label>

<style>
	.SheInput {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		height: 30px;
		padding: 0 8px;
		border-radius: 5px;
		background-color: transparent;
		box-shadow: var(--shadowBorder25);
		color: var(--gray0);
		font-size: 14px;
		transition: all 0.1s ease-in-out;
		width: 100%;
	}

	.SheInput[data-size='small'] {
		height: 24px;
		font-size: 12px;
	}

	.SheInput[data-size='medium'] {
		height: 30px;
		font-size: 14px;
	}

	.SheInput[data-size='large'] {
		height: 36px;
		font-size: 16px;
	}

	.SheInput[data-size='small'] input,
	.SheInput[data-size='small'] textarea {
		font-size: 12px;
	}

	.SheInput[data-size='medium'] input,
	.SheInput[data-size='medium'] textarea {
		font-size: 14px;
	}

	.SheInput[data-size='large'] input,
	.SheInput[data-size='large'] textarea {
		font-size: 16px;
	}

	.SheInput:hover {
		box-shadow: var(--hoverShadowBorder);
	}

	.SheInput:active {
		box-shadow: var(--activeShadowBorder);
	}

	.SheInput:hover {
		background: var(--gray35);
	}

	.SheInput:focus-within {
		background: var(--gray35);
		box-shadow: var(--shadowBorder8);

		& .label {
			color: var(--gray0);
		}
	}

	.label {
		color: var(--gray12);
		user-select: none;
	}

	input,
	textarea {
		background: transparent;
		border: none;
		outline: none;
		color: var(--gray12);
		font-size: 14px;
		width: 100%;
		min-width: 0;
		padding: 0;
		padding-top: 1px;
	}

	/* Remove number input arrows */
	input[type='number']::-webkit-inner-spin-button,
	input[type='number']::-webkit-outer-spin-button {
		appearance: none;
		margin: 0;
	}

	/* Custom range slider styling */
	input[type='range'] {
		appearance: none;
		background: var(--gray20);
		height: 2px;
		border-radius: 1px;
		padding-top: 0;
	}

	input[type='range'] + .rangeValueInput {
		padding-top: 1px;
		width: 30%;
	}

	input[type='range']::-webkit-slider-thumb {
		appearance: none;
		width: 12px;
		height: 12px;
		border-radius: 50%;
		background: var(--gray12);
		cursor: pointer;
	}

	/* Textarea styling */
	.SheInput[data-type='longtext'] {
		height: auto;
		align-items: flex-start;
		padding: 8px;
		flex-direction: column;
	}

	textarea {
		resize: vertical;
		min-height: 60px;
		font-family: inherit;
	}

	/* Range value display */
	.rangeValueInput {
		min-width: 30px;
		text-align: right;
		color: var(--gray12);
	}

	.rangeValueInput::before {
		position: relative;
		left: -10px;
		top: 2px;
		display: flex;
		font-size: 12px;
		color: var(--gray12);
		content: '%';
		width: 20px;
		height: 20px;
	}

	/* Disabled state */
	.SheInput[data-disabled='true'] {
		box-shadow: var(--shadowBorder20);
		color: var(--gray20);
		cursor: not-allowed;
		pointer-events: none;
	}

	.SheInput[data-disabled='true'] input,
	.SheInput[data-disabled='true'] textarea {
		color: var(--gray20);
	}

	/* Color input styling */
	.color-input-wrapper {
		display: flex;
		align-items: center;
		gap: 8px;
		width: 100%;
	}

	input[type='color'] {
		width: 20px;
		height: 20px;
		padding: 0;
		border: none;
		cursor: pointer;
	}

	input[type='color']::-webkit-color-swatch-wrapper {
		padding: 0;
	}

	input[type='color']::-webkit-color-swatch {
		border: none;
		border-radius: 3px;
		box-shadow: var(--shadowBorder12);
	}

	.color-value {
		font-size: 14px;
		font-weight: 500;
		color: var(--gray12);
	}
</style>
