<script lang="ts">
	import { ZoomIn, ZoomOut } from 'lucide-svelte'
	import cameraStore from './camera.store.svelte'
	import SheButtonGroup from '../Interface/SheButtonGroup.svelte'
	import SheButton from '../Interface/SheButton.svelte'
	import SheInput from '../Interface/SheInput.svelte'

	const camera = cameraStore.getActiveCamera()
	let zoom = $derived(camera.zoom)

	const onZoomChange = (event: Event) => {
		const target = event.target as HTMLInputElement
		cameraStore.setZoom(target.valueAsNumber)
	}
</script>

<div class="CameraZoomInput">
	<SheButtonGroup divClass="CameraZoomInputGroup">
		<SheButton onclick={cameraStore.zoomOut}>
			<ZoomOut />
		</SheButton>
		<SheInput class="CameraZoomInputInput" type="number" value={zoom} onchange={onZoomChange} />
		<SheButton onclick={cameraStore.zoomIn}>
			<ZoomIn />
		</SheButton>
	</SheButtonGroup>
</div>

<style>
	:global(.CameraZoomInputInput) {
		width: 80px;
	}

	.CameraZoomInput {
		position: absolute;
		top: 0px;
		left: 0px;
		width: 100vw;
		z-index: 100;
		display: flex;
		justify-content: center;
	}

	:global(.CameraZoomInputGroup) {
		position: absolute;
		top: 12px;
		right: 12px;
		display: flex;
		gap: 0;
	}

	:global(.modeActiveButton) {
		outline: 1px solid rgba(239, 86, 47, 1);
		z-index: 100;
	}
</style>
