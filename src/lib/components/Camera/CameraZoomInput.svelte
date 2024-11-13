<script lang="ts">
	import { ButtonGroup, Button, Input } from 'flowbite-svelte'
	import { ZoomIn, ZoomOut } from 'lucide-svelte'
	import cameraStore from './camera.store.svelte'

	const camera = cameraStore.getActiveCamera()
	let zoom = $derived(camera.zoom)

	const onZoomChange = (event: Event) => {
		const target = event.target as HTMLInputElement
		cameraStore.setZoom(target.valueAsNumber)
	}
</script>

<div class="CameraZoomInput">
	<ButtonGroup divClass="CameraZoomInputGroup">
		<Button onclick={cameraStore.zoomOut}>
			<ZoomOut />
		</Button>
		<Input class="CameraZoomInputInput" type="number" value={zoom} onchange={onZoomChange} />
		<Button onclick={cameraStore.zoomIn}>
			<ZoomIn />
		</Button>
	</ButtonGroup>
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
