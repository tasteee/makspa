<script>
</script>

<div id="TransformModeControl">
	<div class="ButtonSelectButtonGroup join">
		<input class="ButtonSelectButton btn-sm join-item btn" type="radio" name="options" aria-label="Move" />
		<input class="ButtonSelectButton btn-sm join-item btn" type="radio" name="options" aria-label="Scale" />
		<input class="ButtonSelectButton btn-sm join-item btn" type="radio" name="options" aria-label="Rotate" />
	</div>
</div>

<style scoped>
	#TransformModeControl {
		transform: translateX(calc(50vw - (190px / 2)));
		position: absolute;
		top: 80px;
		z-index: 100;
	}

	.ButtonSelectButtonGroup {
		outline: 2px solid var(--surface-0);
	}

	input {
		background: var(--surface-1);
		padding: 0px 32px;
	}

	input:active {
		box-shadow: none;
		border: none;
		outline: none;
	}

	input:checked {
		outline: unset;
		outline-offset: unset;
		--tw-ring-inset: unset;
		--tw-ring-offset-width: unset;
		--tw-ring-offset-color: unset;
		--tw-ring-color: unset;
		--tw-ring-offset-shadow: unset;
		--tw-ring-shadow: unset;
		box-shadow: none;
		background: none;
		background: var(--chess) !important;
		filter: drop-shadow(0px 1px 29px rgba(255, 255, 255, 0.1));
	}

	input:checked::after {
		color: var(--white);
	}
</style>
