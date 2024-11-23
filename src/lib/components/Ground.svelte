<script lang="ts">
	import { T } from '@threlte/core'
	import { AutoColliders } from '@threlte/rapier'
	import { Grid } from '@threlte/extras'
	import stores from '../stores'

	const handleGroundClick = (event: MouseEvent) => {
		event.stopPropagation()
		const shouldDeselect = !!stores.spaceItems.selectedItemUid
		if (shouldDeselect) stores.spaceItems.deselectItem()
	}

	let space = $derived(stores.main.activeSpace)
	let spaceSizeX = $derived(space.size_x)
	let spaceSizeZ = $derived(space.size_z)
	let floorSize = $derived([spaceSizeX, 0.05, spaceSizeZ])
	let gridSize = $derived([spaceSizeX, spaceSizeZ])
	let cellColor = $derived(space.grid_cell_color)
	let sectionColor = $derived(space.grid_section_color)
	let cellSize = $derived(space.grid_cell_size)
	let cellThickness = $derived(space.is_grid_visible ? space.grid_cell_thickness : 0)
	let sectionSize = $derived(space.grid_section_size)
	let sectionThickness = $derived(space.is_grid_visible ? space.grid_section_thickness : 0)
	let fadeStrength = $derived(space.grid_fade_strength)
	let fadeDistance = $derived(space.grid_fade_distance)

	let floorColor1 = $derived(space.floor_color_1)
	let floorColor2 = $derived(space.floor_color_2)
	let floorOpacity1 = $derived(space.is_floor_visible ? space.floor_opacity_1 / 100 : 0)
	let floorOpacity2 = $derived(space.is_floor_visible ? space.floor_opacity_2 / 100 : 0)
</script>

<!-- @ts-ignore file -->
<Grid
	type="grid"
	position.y={-0.005}
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
/>

<T.Group position={[0, -0.04, 0]} ondblclick={handleGroundClick} receiveShadow castShadow>
	<AutoColliders shape={'cuboid'}>
		<T.Mesh>
			<T.BoxGeometry args={floorSize} />
			<T.MeshStandardMaterial color={floorColor2} opacity={floorOpacity2} transparent />
		</T.Mesh>
	</AutoColliders>
</T.Group>
