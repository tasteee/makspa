<script lang="ts">
	import * as THREE from 'three'
	import { T } from '@threlte/core'
	import { AutoColliders } from '@threlte/rapier'
	import { Grid } from '@threlte/extras'
	import mainStore from '~/stores/main-store.svelte'

	const handleGroundClick = (event: MouseEvent) => {
		event.stopPropagation()
		const shouldDeselect = !!mainStore.selectedItemId
		if (shouldDeselect) mainStore.deselectItem()
	}

	let grid = $state<THREE.Mesh>(null)
	let space = $derived(mainStore.space)
	let spaceSizeX = $derived(space.sizeX)
	let spaceSizeZ = $derived(space.sizeZ)
	let floorSize = $derived([spaceSizeX + 0.5, 0.05, spaceSizeZ + 0.5])
	let gridSize = $derived([spaceSizeX, spaceSizeZ] as [number, number])
	let gridOpacity = $derived(space.gridOpacity / 100)
	let cellColor = $derived(space.gridCellLineColor)
	let sectionColor = $derived(space.gridSectionLineColor)
	let cellSize = $derived(space.gridCellSize)
	let cellThickness = $derived(space.isGridVisible ? space.gridCellLineThickness : 0)
	let sectionSize = $derived(space.gridSectionSize)
	let sectionThickness = $derived(space.isGridVisible ? space.gridSectionLineThickness : 0)
	let fadeStrength = $derived(space.gridFadeStrength)
	let fadeDistance = $derived(space.gridFadeDistance)
	let floorColor1 = $derived(space.floorColor1)
	let floorColor2 = $derived(space.floorColor2)
	let floorOpacity1 = $derived(space.isFloorVisible ? space.floorOpacity1 / 100 : 0)
	let floorOpacity2 = $derived(space.isFloorVisible ? space.floorOpacity2 / 100 : 0)

	$effect(() => {
		if (!grid) return
		grid.material.transparent = true
		grid.material.opacity = gridOpacity
	})
</script>

<T.Group position={[0.5, -0.0005, 0.5]}>
	<Grid
		type="grid"
		position.y={0}
		position.x={0}
		position.z={0}
		{gridSize}
		{cellSize}
		{cellThickness}
		{cellColor}
		{sectionColor}
		{sectionThickness}
		{sectionSize}
		{fadeStrength}
		{fadeDistance}
		followCamera={false}
		backgroundColor={floorColor1}
		backgroundOpacity={floorOpacity1}
		opacity={gridOpacity}
		transparent={true}
		ondblclick={handleGroundClick}
		bind:ref={grid}
	/>

	<T.Group position={[0, -0.05, 0]} receiveShadow castShadow>
		<AutoColliders shape={'cuboid'}>
			<T.Mesh>
				<T.BoxGeometry args={floorSize} />
				<T.MeshStandardMaterial color={floorColor2} opacity={floorOpacity2} transparent />
			</T.Mesh>
		</AutoColliders>
	</T.Group>
</T.Group>
