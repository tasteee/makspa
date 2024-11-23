<script lang="ts">
	import { T } from '@threlte/core'
	import BoundingBox from '../modules/BoundingBox.svelte'
	import * as helpers from '../modules/three.helpers'
	import { percentageToRadians } from '../modules/numbers'
	import DragControls from '../modules/DragControls.svelte'
	import { useModel } from './useModel.svelte'
	import stores from '../stores'

	type PropsT = {
		uid: string
	}

	let props: PropsT = $props()
	let mesh = $state(null)
	let item = $derived(stores.spaceItems.getItemByUid(props.uid) || {})
	let isSelected = $derived(stores.spaceItems.selectedItemUid === props.uid)
	let isVisible = $derived(item.is_visible)
	let isGlowing = $derived(item.is_glowing)
	let isObstructive = $derived(item.is_obstructive)
	let isDragging = $state(false)
	let isMouseDown = $state(false)
	let isPressedAlt = $derived.by(() => stores.keyboard.pressedKeys.includes('alt'))

	let dragAxes = $derived.by(() => {
		if (!isSelected) return ''
		if (isPressedAlt) return 'y'
		return 'xz'
	})

	let positionX = $derived(item.position_x)
	let positionY = $derived(item.position_y)
	let positionZ = $derived(item.position_z)
	let rotationX = $derived(percentageToRadians(item.rotation_x))
	let rotationY = $derived(percentageToRadians(item.rotation_y))
	let rotationZ = $derived(percentageToRadians(item.rotation_z))
	let scaleX = $derived(item.scale_x)
	let scaleY = $derived(item.scale_y)
	let scaleZ = $derived(item.scale_z)
	let opacity = $derived(item.opacity / 100)

	let position = $derived.by(() => [positionX, positionY, positionZ])
	let scale = $derived.by(() => [item.scale_x, item.scale_y, item.scale_z])
	let size = $derived.by(() => [item.size_x, item.size_y, item.size_z])
	let rotation = $derived([item.rotation_x, item.rotation_y, item.rotation_z])

	const gltf = useModel(item.modelUrl)

	const setUpMesh = () => {
		const adjustment = helpers.getNegativeAdjustmentToZeroY(mesh)
		const newPositionY = item.position_y + adjustment
		const rotationDegrees = helpers.getRotationYDegrees(mesh)
		const correctedRotation = helpers.getCorrectedAlignmentRotationY(rotationDegrees)
		const updates = { uid: props.uid, rotation_y: correctedRotation, position_y: newPositionY }
		stores.spaceItems.updateItem(updates)
	}

	const handleDragStart = () => {
		if (!isSelected) return
		stores.camera.controls.enabled = false
		isDragging = true
		console.log('dragging')
	}

	const handleDragEnd = () => {
		if (!isSelected) return
		stores.camera.controls.enabled = true
		isDragging = false
		console.log('drag end')
	}

	const handleDrag = (event) => {
		if (!isSelected) return

		stores.spaceItems.updateItem({
			uid: props.uid,
			position_x: event.object.position.x,
			position_y: event.object.position.y,
			position_z: event.object.position.z
		})
	}

	const handleHoverStart = (event) => {
		event.object.material.emissive.set('#00FFD5')
		event.object.material.emissiveIntensity = 0.05
		event.object.material.emissive.opacity = 0.1
		event.object.castShadow = true
		event.object.receiveShadow = true
	}

	const handleHoverEnd = (event) => {
		event.object.material.emissive.set(0, 0, 0)
	}

	function handleClick(event) {
		if (isDragging) return
		if (isSelected) return
		event?.stopPropagation?.()
		event?.preventDefault?.()
		stores.spaceItems.selectItem(props.uid)
	}

	const handlePointerDown = (event) => {
		if (isSelected) return
		isMouseDown = true
	}

	const handlePointerUp = (event) => {
		if (isSelected) return
		if (!isMouseDown) return
		isMouseDown = false
	}

	$effect(() => {
		if (!isSelected) return
		console.log('isPressedAlt', isPressedAlt)
		if (stores.keyboard.isPressedDelete) stores.spaceItems.deleteItem(props.uid)
		if (stores.keyboard.isPressedEscape) stores.spaceItems.deselectItem()
		if (stores.keyboard.isPressedSpace) stores.camera.moveToItem(props.uid)
		// if (keyboardStore.isPressedDigit1) store.setTransformItemMode('translate')
		// if (keyboardStore.isPressedDigit2) store.setTransformItemMode('rotate')
		// if (keyboardStore.isPressedDigit3) store.setTransformItemMode('scale')
	})
</script>

{#await gltf then data}
	<T.Mesh
		is={data.scene.children[0]}
		castShadow
		receiveShadow
		bind:ref={mesh}
		onclick={handleClick}
		onpointerdown={handlePointerDown}
		onpointerup={handlePointerUp}
		position={[positionX, positionY, positionZ]}
		rotation={[rotationX, rotationY, rotationZ]}
		scale={[scaleX, scaleY, scaleZ]}
		oncreate={setUpMesh}
	/>

	{#if mesh}
		<DragControls
			isEnabled={isSelected}
			axes={dragAxes}
			onHoverStart={handleHoverStart}
			onHoverEnd={handleHoverEnd}
			onDragStart={handleDragStart}
			onDragEnd={handleDragEnd}
			onDrag={handleDrag}
			target={mesh}
		/>
	{/if}
{/await}

{#if mesh && isSelected}
	<BoundingBox target={mesh} positionY={position[1]} />
{/if}
