<script lang="ts">
	import { T } from '@threlte/core'
	import * as THREE from 'three'
	import * as u from './three.helpers'

	let { target, positionX, positionY, positionZ } = $props<{
		target: THREE.Mesh
		positionX: number
		positionY: number
		positionZ: number
	}>()

	let bottomCorners = $state<THREE.Vector3[]>([])

	$effect(() => {
		if (!target) return
		const allCorners = u.getBoxCornerPoints(target)
		bottomCorners = allCorners
			.filter((corner) => corner.y === u.getBottomMostPointY(target))
			.map((corner) => {
				return new THREE.Vector3(
					corner.x - target.position.x + positionX,
					corner.y,
					corner.z - target.position.z + positionZ
				)
			})
	})

	const LINE_WIDTH = 0.005
</script>

{#if bottomCorners.length}
	{#each bottomCorners as corner}
		<T.Mesh position={[corner.x, positionY / 2, corner.z]}>
			<T.BoxGeometry args={[LINE_WIDTH, positionY, LINE_WIDTH]} />
			<T.MeshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.5} />
		</T.Mesh>
	{/each}
{/if}
