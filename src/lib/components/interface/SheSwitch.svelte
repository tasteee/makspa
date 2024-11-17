<script lang="ts">
	type PropsT = {
		label?: string
		size?: 'small' | 'medium' | 'large'
		isDisabled?: boolean
		value?: boolean
		class?: string
		onChange?: (value: boolean) => void
	}

	let props: PropsT = $props()
	let checked = $derived(props.value ?? false)
	let size = $derived(props.size ?? 'medium')

	function handleChange(e: Event) {
		const target = e.target as HTMLInputElement
		props.onChange?.(target.checked)
	}
</script>

<label class="SheSwitch {props.class}" data-size={size} data-checked={checked} data-disabled={props.isDisabled}>
	{#if props.label}
		<span class="label">{props.label}</span>
	{/if}

	<div class="switch-wrapper {size}">
		<input type="checkbox" {checked} disabled={props.isDisabled} onchange={handleChange} />
		<div class="circle"></div>
	</div>
</label>

<style>
	.switch-wrapper.small {
		width: 32px;
		height: 18px;
	}

	.switch-wrapper.large {
		width: 48px;
		height: 26px;
	}

	.switch-wrapper.medium {
		width: 40px;
		height: 22px;
	}

	.switch-wrapper.small .circle {
		width: 14px;
		height: 14px;
	}

	.switch-wrapper.large .circle {
		width: 22px;
		height: 22px;
	}

	.switch-wrapper.medium .circle {
		width: 18px;
		height: 18px;
	}

	.SheSwitch {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		cursor: pointer;
		user-select: none;
	}

	.SheSwitch:hover .switch-wrapper {
		background: var(--gray30);
	}

	.label {
		color: var(--gray15);
		font-size: 14px;
	}

	.SheSwitch[data-checked='true'] .label {
		color: var(--gray0);
	}

	.switch-wrapper {
		position: relative;
		border-radius: 999px;
		box-shadow: inset 0 0 0 1px var(--gray15);
		transition: all 0.2s ease;
	}

	input {
		position: absolute;
		opacity: 0;
		width: 100%;
		height: 100%;
		cursor: pointer;
		margin: 0;
		padding: 0;
	}

	.circle {
		position: absolute;
		top: 50%;
		left: 2px;
		transform: translateY(-50%);
		background-color: var(--gray15);
		border-radius: 50%;
		transition: all 0.2s ease;
	}

	/* Checked state */
	.SheSwitch[data-checked='true'] .switch-wrapper {
		box-shadow: inset 0 0 0 1px var(--gray0);
	}

	.SheSwitch[data-checked='true'] .circle {
		background-color: var(--gray0);
		left: calc(100% - 2px);
		transform: translate(-100%, -50%);
	}

	/* Disabled state */
	.SheSwitch[data-disabled='true'] {
		cursor: not-allowed;
	}

	.SheSwitch[data-disabled='true'] .label {
		color: var(--gray25);
	}

	.SheSwitch[data-disabled='true'] .switch-wrapper {
		box-shadow: inset 0 0 0 1px var(--gray25);
	}

	.SheSwitch[data-disabled='true'] .circle {
		background-color: var(--gray25);
	}

	/* Size specific styles */
	.SheSwitch[data-size='small'] .label {
		font-size: 12px;
	}

	.SheSwitch[data-size='large'] .label {
		font-size: 16px;
	}
</style>
