<script lang="ts">
	import IsometricCamera from './IsometricCamera.svelte'
	import ThirdPersonCamera from './ThirdPersonCamera.svelte'
	import FirstPersonCamera from './FirstPersonCamera.svelte'
	import Player from '../Player/Player.svelte'
	import cameraStore from './camera.store.svelte'
</script>

{#if cameraStore.activeCameraName === 'isometric'}
	<ThirdPersonCamera />
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
