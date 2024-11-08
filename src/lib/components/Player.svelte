<script lang="ts">
	import { T } from '@threlte/core'
	import { RigidBody, AutoColliders, BasicPlayerController } from '@threlte/rapier'
	import { usePlayerStore } from './player.store.svelte'
	import { CapsuleGeometry, MeshStandardMaterial, SphereGeometry } from 'three'
	const playerStore = usePlayerStore()
	const props = $props()
</script>

<BasicPlayerController
	{position}
	speed={3}
	radius={0.3}
	height={1.8}
	jumpStrength={2}
	groundCollisionGroups={[15]}
	playerCollisionGroups={[0]}
>
	<T.Mesh
		bind:ref={props.playerMesh}
		position.y={0.9}
		receiveShadow
		castShadow
		geometry={new CapsuleGeometry(0.3, 1.8 - 0.3 * 2)}
		material={new MeshStandardMaterial()}
	/>
</BasicPlayerController>
