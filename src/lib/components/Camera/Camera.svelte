<script lang="ts">
	import cameraStore from './camera.store.svelte'
	import IsometricCamera from './IsometricCamera.svelte'
	import ThirdPersonCamera from './ThirdPersonCamera.svelte'
	import FirstPersonCamera from './FirstPersonCamera.svelte'
	import Player from './Player.svelte'
</script>

{#if cameraStore.state.activeCamera === 'isometric'}
	<IsometricCamera />
{/if}

{#if cameraStore.state.activeCamera === 'thirdPerson'}
	<ThirdPersonCamera />
{/if}

{#if cameraStore.state.activeCamera === 'firstPerson'}
	<Player />
{/if}

{#if cameraStore.state.activeCamera === 'pointerLock'}
	<Player />
{/if}
