<script lang="ts">
	import { T } from '@threlte/core'
	import * as THREE from 'three'
	import u from '~/modules/utilities'

	let props = $props<{
		target: THREE.Mesh
	}>()

	let line = $state<THREE.Line>(null)
	let points = $derived(() => {
		if (!props.target) return null

		// Get the bottom center point of the mesh
		const box = new THREE.Box3().setFromObject(props.target)
		const bottomCenter = new THREE.Vector3((box.min.x + box.max.x) / 2, box.min.y, (box.min.z + box.max.z) / 2)

		// Create points for the line (bottom center to ground)
		return new Float32Array([bottomCenter.x, bottomCenter.y, bottomCenter.z, bottomCenter.x, 0, bottomCenter.z])
	})

	let geometry = $derived(() => {
		if (!points) return null
		return new THREE.BufferGeometry().setAttribute('position', new THREE.BufferAttribute(points, 3))
	})
</script>

{#if geometry}
	<T.Line>
		<T.BufferGeometry is={geometry} />
		<T.LineBasicMaterial color="#666666" linewidth={1} transparent={true} opacity={0.5} depthTest={false} />
	</T.Line>
{/if}
