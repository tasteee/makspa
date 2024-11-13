<script lang="ts">
	import { T } from '@threlte/core'
	import { AutoColliders } from '@threlte/rapier'
	import { Grid } from '@threlte/extras'
	import store from '../stores/store.svelte'

	const handleGroundClick = (event: MouseEvent) => {
		event.stopPropagation()
		const shouldDeselect = store.isSelectionActive()
		if (shouldDeselect) store.deselectItem()
	}

	const spaceSizeX = store.state.space.size_x
	const spaceSizeZ = store.state.space.size_z
	const spaceSizeY = store.state.space.size_y
	const floorSize = [spaceSizeX, 0.1, spaceSizeZ]
</script>

<Grid
	type="solid"
	sectionThickness={0.5}
	cellColor="#515151"
	cellSize={0.2}
	cellThickness={1}
	cellDividers={true}
	position.y={0}
	sectionColor="#d1d1d1"
	sectionDividers={true}
	sectionSize={1}
	fadeStrength={1}
	fadeDistance={25}
	followCamera={false}
/>

<T.Group position={[0, -0.2, 0]} ondblclick={handleGroundClick} receiveShadow castShadow>
	<AutoColliders shape={'cuboid'}>
		<T.Mesh>
			<T.BoxGeometry args={floorSize} />
			<T.MeshStandardMaterial color="#010101" />
		</T.Mesh>
	</AutoColliders>
</T.Group>
