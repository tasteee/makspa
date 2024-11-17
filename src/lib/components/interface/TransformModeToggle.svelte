<script lang="ts">
	import SheButton from './SheButton.svelte'
	import store from '../../stores/store.svelte'

	const onButtonClick = (value: string) => () => {
		store.setTransformItemMode(value)
	}

	let translateColor = $derived(store.transformItemMode === 'translate' ? 'light' : 'dark')
	let rotateColor = $derived(store.transformItemMode === 'rotate' ? 'light' : 'dark')
	let scaleColor = $derived(store.transformItemMode === 'scale' ? 'light' : 'dark')
</script>

<div class="TransformModeToggle">
	<div class="TransformModeToggleGroup">
		<SheButton class="translateButton" kind={translateColor} onClick={onButtonClick('translate')}>Move</SheButton>
		<SheButton class="rotateButton" kind={rotateColor} onClick={onButtonClick('rotate')}>Rotate</SheButton>
		<SheButton class="scaleButton" kind={scaleColor} onClick={onButtonClick('scale')}>Scale</SheButton>
	</div>
</div>

<style>
	:global {
		.TransformModeToggle .TransformModeToggleGroup .rotateButton {
			border-radius: 0px;
		}

		.TransformModeToggle .TransformModeToggleGroup .translateButton {
			border-radius: 5px 0px 0px 5px;
		}

		.TransformModeToggle .TransformModeToggleGroup .scaleButton {
			border-radius: 0px 5px 5px 0px;
		}

		.TransformModeToggle {
			position: absolute;
			top: 0px;
			left: 0px;
			width: 100vw;
			z-index: 100;
			display: flex;
			justify-content: center;
			height: 0px;
			overflow: visible;
		}

		.TransformModeToggleGroup {
			position: relative;
			margin-top: 12px;
			display: flex;
			gap: 0;
		}

		.TransformModeToggle .modeActiveButton {
			outline: 1px solid rgba(239, 86, 47, 1);
			z-index: 100;
		}
	}
</style>
