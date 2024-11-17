<script>
	import Icon from '@iconify/svelte'
</script>

<div id="LeftPanelControl">
	<div class="LeftPanelControlGroup join-vertical">
		<input class="LeftPanelControlButton join-item btn" type="radio" name="options" aria-label="Move" />
		<input class="LeftPanelControlButton join-item btn" type="radio" name="options" aria-label="Scale" />
		<input class="LeftPanelControlButton join-item btn" type="radio" name="options" aria-label="Rotate" />
	</div>
</div>

<style scoped>
	#LeftPanelControl {
		position: absolute;
		top: 24px;
		left: 0px;
		width: 100vw;
		z-index: 100;
		display: flex;
		justify-content: center;
	}

	.LeftPanelControlGroup {
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
	}

	input:checked::after {
		color: var(--white);
	}
</style>
