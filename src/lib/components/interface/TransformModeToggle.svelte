<script lang="ts">
	import { ButtonGroup, Button } from 'flowbite-svelte'
	import store from '../../stores/store.svelte'

	const onButtonClick = (value: string) => () => {
		store.setTransformItemMode(value)
	}

	let translateColor = $derived(store.state.transformItemMode === 'translate' ? 'primary' : 'light')
	let rotateColor = $derived(store.state.transformItemMode === 'rotate' ? 'primary' : 'light')
	let scaleColor = $derived(store.state.transformItemMode === 'scale' ? 'primary' : 'light')
</script>

<div class="TransformModeToggle">
	<ButtonGroup divClass="TransformModeToggleGroup">
		<Button color={translateColor as any} onclick={onButtonClick('translate')}>Move</Button>
		<Button color={rotateColor as any} onclick={onButtonClick('rotate')}>Rotate</Button>
		<Button color={scaleColor as any} onclick={onButtonClick('scale')}>Scale</Button>
	</ButtonGroup>
</div>

<style>
	.TransformModeToggle {
		position: absolute;
		top: 0px;
		left: 0px;
		width: 100vw;
		z-index: 100;
		display: flex;
		justify-content: center;
	}

	:global(.TransformModeToggleGroup) {
		position: relative;
		top: 12px;
		display: flex;
		gap: 0;
	}

	:global(.modeActiveButton) {
		outline: 1px solid rgba(239, 86, 47, 1);
		z-index: 100;
	}
</style>
