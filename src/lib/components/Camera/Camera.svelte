<script lang="ts">
	import IsometricCamera from './IsometricCamera.svelte'
	import ThirdPersonCamera from './ThirdPersonCamera.svelte'
	import FirstPersonCamera from './FirstPersonCamera.svelte'
	import Player from './Player.svelte'
	import cameraStore from './camera.store.svelte'
</script>

{#if cameraStore.activeCamera === 'isometric'}
	<IsometricCamera />
{/if}

{#if cameraStore.activeCamera === 'thirdPerson'}
	<ThirdPersonCamera />
{/if}

{#if cameraStore.activeCamera === 'firstPerson'}
	<Player />
{/if}

{#if cameraStore.activeCamera === 'pointerLock'}
	<Player />
{/if}
