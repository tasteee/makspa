<script lang="ts">
	type PropsT = {
		class?: string
		label?: string
		type?: string
		maxLength?: number
		minLength?: number
		placeholder?: string
	}

	const props: PropsT = $props()
</script>

<div class="SheTextInput {props.class}}" data-componentid="SheTextInput">
	<label class="SheTextInputLabel">
		<span class="SheTextInputLabelText">{props.label}</span>
		<input
			spellcheck="false"
			type={props.type || 'text'}
			maxlength={props.maxLength || 32}
			minlength={props.minLength || 1}
			placeholder={props.placeholder}
			class="SheTextInputInput"
		/>
	</label>
</div>

<style lang="postcss">
	.SheTextInput {
		--input-height: 40px;
		--label-font-size: 12px;
		--input-font-size: 16px;
		--horizontal-padding: 12px;
		--vertical-padding: 8px;

		position: relative;
		width: 100%;
		font-family: sans-serif;
	}

	.SheTextInputLabel {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
		box-shadow: inset 0px 0px 0px 1px var(--surfaceA0);
		border-radius: 5px;
		background: var(--surfaceA2);
		padding: var(--vertical-padding) var(--horizontal-padding);
		box-sizing: border-box;
	}

	.SheTextInputLabelText {
		font-size: var(--label-font-size);
		color: var(--surfaceA50);
		margin-bottom: 2px;
	}

	.SheTextInputInput {
		border: none;
		background: transparent;
		padding: 0;
		font-size: var(--input-font-size);
		color: var(--surfaceA100);
		width: 100%;
		outline: none;
	}

	.SheTextInputInput::placeholder {
		color: var(--surfaceA30);
	}

	.SheTextInputInput:focus {
		outline: none;
	}

	.SheTextInputLabel:focus-within {
		box-shadow: inset 0px 0px 0px 2px var(--brandColorA0);
	}
</style>
