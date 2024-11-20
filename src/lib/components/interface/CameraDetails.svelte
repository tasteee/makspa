<script lang="ts">
	import SheInput from './SheInput.svelte'
	import store from '../../stores/store.svelte'
</script>

{#if store.camera}
	<div class="CameraDetails">
		<SheInput value={store.cameraPositionX} label="Position X" isDisabled />
		<SheInput value={store.cameraPositionY} label="Position Y" isDisabled />
		<SheInput value={store.cameraPositionZ} label="Position Z" isDisabled />
	</div>
{/if}

<style>
	:global {
		.CameraDetails {
			position: absolute;
			bottom: 24px;
			left: 24px;
			z-index: 100;
			display: flex;
			gap: 12px;
		}
	}
</style>
