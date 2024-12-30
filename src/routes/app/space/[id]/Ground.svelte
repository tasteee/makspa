<script lang="ts">
	import * as THREE from 'three'
	import { T } from '@threlte/core'
	import { AutoColliders } from '@threlte/rapier'
	import { Grid } from '@threlte/extras'
	import mainStore from '~/stores/main-store.svelte'

	const handleGroundClick = (event: MouseEvent) => {
		event.stopPropagation()
		const isFloorClick = event.eventObject.name === 'floor'
		const isGroundClick = event.eventObject.name === 'ground'
		console.log({ isFloorClick, isGroundClick })
		if (!isFloorClick && !isGroundClick) return
		console.log('Ground clicked', event)
		const shouldDeselect = !!mainStore.selectedItemId
		if (shouldDeselect) mainStore.deselectItem()
	}

	let grid = $state<THREE.Mesh>(null)
	let group = $state<THREE.Group>(null)
	let floor = $state<THREE.Mesh>(null)
	let floorGroup = $state<THREE.Group>(null)
	let space = $derived(mainStore.space)

	$effect(() => {
		if (!grid) return
		window.grid = grid
		if (!space.isGridVisible) return
		const opacity = space.gridOpacity / 100
		grid.material.transparent = true
		grid.material.opacity = opacity

		grid.traverse((child) => {
			if (child.isMesh) {
				child.material.transparent = true
				child.material.opacity = opacity
			}
		})
	})
</script>

<T.Group position={[0.5, -0.0005, 0.5]} bind:ref={group} name="ground">
	{#if space.isGridVisible}
		<Grid
			receiveShadow
			type="grid"
			gridSize={[space.sizeX, space.sizeZ]}
			cellSize={space.gridCellSize}
			cellThickness={space.gridCellLineThickness}
			cellColor={space.gridCellLineColor}
			sectionColor={space.gridSectionLineColor}
			sectionThickness={space.gridSectionLineThickness}
			sectionSize={space.gridSectionSize}
			fadeStrength={space.gridFadeAmount}
			fadeDistance={space.gridFadeDistance}
			backgroundColor={space.floorColor1}
			backgroundOpacity={space.floorOpacity1 / 100}
			ondblclick={handleGroundClick}
			transparent={true}
			followCamera={false}
			bind:ref={grid}
		/>
	{/if}

	{#if space.isFloorVisible}
		<T.Group name="floor" position={[0, -0.03, 0]} receiveShadow bind:ref={floorGroup} ondblclick={handleGroundClick}>
			<AutoColliders shape={'cuboid'}>
				<T.Mesh bind:ref={floor} receiveShadow>
					<T.BoxGeometry args={[space.sizeX, 0.05, space.sizeZ]} />
					<T.MeshStandardMaterial color={space.floorColor2} opacity={space.floorOpacity2 / 100} transparent />
				</T.Mesh>
			</AutoColliders>
		</T.Group>
	{/if}
</T.Group>
