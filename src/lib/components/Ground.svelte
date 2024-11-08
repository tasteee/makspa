<script lang="ts">
	import { T } from '@threlte/core'
	import { AutoColliders } from '@threlte/rapier'
	import { Grid } from '@threlte/extras'
	import store from '../stores/store.svelte'

	const handleGroundClick = (event: MouseEvent) => {
		event.stopPropagation()
		const shouldDeselect = store.isSelectionActive()
		if (shouldDeselect) console.log('[ground clicked, deselecting]')
		if (shouldDeselect) store.deselectItems()
	}
</script>

<T.Group position={[0, -0.7, 0]} ondblclick={handleGroundClick}>
	<AutoColliders shape={'cuboid'}>
		<T.Mesh>
			<T.BoxGeometry args={[100, 1, 100]} />
			<T.MeshStandardMaterial />
		</T.Mesh>
	</AutoColliders>
</T.Group>

<Grid
	position.y={-0.001}
	cellColor="#ffffff"
	sectionColor="#ffffff"
	sectionThickness={0}
	fadeDistance={25}
	cellSize={0.1}
/>
