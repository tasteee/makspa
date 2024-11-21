<script lang="ts">
	import thirdPersonCameraStore from '../Camera/thirdPersonCamera.store.svelte'

	const baseStyle = {
		position: 'fixed',
		top: '50%',
		left: '50%',
		width: '4px',
		height: '4px',
		transform: 'translate(-50%, -50%)',
		pointerEvents: 'none',
		zIndex: '1000',
		transition: 'all 0.1s ease'
	}
</script>

<div
	style={Object.entries({
		...baseStyle,
		backgroundColor: thirdPersonCameraStore.intersectedObject ? '#00ff00' : '#ffffff',
		boxShadow: thirdPersonCameraStore.intersectedObject ? '0 0 4px #00ff00' : 'none',
		width: thirdPersonCameraStore.intersectedObject ? '6px' : '4px',
		height: thirdPersonCameraStore.intersectedObject ? '6px' : '4px'
	})
		.map(([key, value]) => `${key}: ${value}`)
		.join(';')}
></div>

{#if thirdPersonCameraStore.isPointerLocked}
	<style>
		div {
			display: block;
		}
	</style>
{:else}
	<style>
		div {
			display: none;
		}
	</style>
{/if}
