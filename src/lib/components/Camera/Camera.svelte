<script lang="ts">
	import IsometricCamera from './IsometricCamera.svelte'
	import ThirdPersonCamera from './ThirdPersonCamera.svelte'
	import FirstPersonCamera from './FirstPersonCamera.svelte'
	import Player from '../Player/Player.svelte'
	import cameraStore from './camera.store.svelte'

	$inspect(cameraStore.activeCameraName)
</script>

{#if cameraStore.activeCameraName === 'isometric'}
	<IsometricCamera />
{/if}

{#if cameraStore.activeCameraName === 'thirdPerson'}
	<ThirdPersonCamera />
{/if}

{#if cameraStore.activeCameraName === 'firstPerson'}
	<FirstPersonCamera />
{/if}

{#if cameraStore.activeCameraName === 'pointerLock'}
	<Player />
{/if}
