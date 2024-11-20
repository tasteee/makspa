<script lang="ts">
	import { T } from '@threlte/core'
	import { onMount } from 'svelte'
	import { TransformControls } from '@threlte/extras'
	import { useGltf, useSuspense } from '@threlte/extras'
	import store from '../stores/store.svelte'
	import { windowEvent } from '../modules/windowEvent'
	import BoundingBox from './Helpers/BoundingBox.svelte'
	import * as helpers from '../modules/three.helpers'
	import cameraStore from './Camera/camera.store.svelte'
	import * as THREE from 'three'
	import { Box3, Vector3 } from 'three'
	import { useCursor } from '@threlte/extras'
	import { percentageToRadians, radiansToPercentage } from '../modules/numbers'

	type PropsT = {
		uid: string
	}

	let boundingBox = $state(new Box3())
	let boundingBoxSize = $state(new Vector3())
	let boundingBoxCenter = $state(new Vector3())

	let cameraControls = cameraStore.isometric.controls
	let props: PropsT = $props()

	let item = $derived.by(() => store.findItem(props.uid) || {})
	let isSelected = $derived.by(() => store.checkIsItemSelected(props.uid))

	let mesh = $state(null)
	let controls = $state(null)

	const suspend = useSuspense()
	const gltfUrl = item.file + `?uid=${props.uid}`
	const gltf = suspend(useGltf(gltfUrl))

	let sizeX = $derived(item.size_x)
	let sizeY = $derived(item.size_y)
	let sizeZ = $derived(item.size_z)
	let positionX = $derived(item.position_x)
	let positionY = $derived(item.position_y)
	let positionZ = $derived(item.position_z)
	let rotationX = $derived(item.rotation_x)
	let rotationY = $derived(item.rotation_y)
	let rotationZ = $derived(item.rotation_z)
	let scaleX = $derived(item.scale_x)
	let scaleY = $derived(item.scale_y)
	let scaleZ = $derived(item.scale_z)
	let opacity = $derived(item.opacity / 100)
	let isVisible = $derived(item.is_visible)
	let isGlowing = $derived(item.is_glowing)
	let isObstructive = $derived(item.is_obstructive)

	$effect(() => {
		if (!mesh) return

		// Calculate the bounding box based on the transformed object
		boundingBox.setFromObject(mesh)

		// Get the size and center
		boundingBox.getSize(boundingBoxSize) // Gives the width, height, depth
		boundingBox.getCenter(boundingBoxCenter) // Center of the bounding box
	})

	$effect(() => {
		if (!mesh) return
		const adjustment = helpers.getNegativeAdjustmentToZeroY(mesh)
		if (adjustment === 0) return
		const newPositionY = item.position_y + adjustment
		store.updateItem(props.uid, { position_y: newPositionY })
	})

	$effect(() => {
		if (!mesh) return
		const rotationDegrees = helpers.getRotationYDegrees(mesh)
		const isAligned = helpers.checkMeshAlignedAxis(rotationDegrees)
		if (isAligned) return
		const correctedRotation = helpers.getCorrectedAlignmentRotationY(rotationDegrees)
		store.updateItem(props.uid, { rotation_y: correctedRotation })
	})

	let shouldRenderControls = $derived.by(() => isSelected && mesh)
	let position = $derived.by(() => [positionX, positionY, positionZ])
	let scale = $derived.by(() => [scaleX, scaleY, scaleZ])
	let size = $derived.by(() => [sizeX, sizeY, sizeZ])

	let rotation = $derived.by(() => {
		return [percentageToRadians(rotationX), percentageToRadians(rotationY), percentageToRadians(rotationZ)]
	})

	let glowPosition = $derived.by(() => {
		if (!boundingBoxSize) return [0, 0, 0]

		// Calculate offsets based on the bounding box dimensions
		const xOffset = (item.glow_position_x / 100) * boundingBoxSize.x
		const yOffset = (item.glow_position_y / 100) * boundingBoxSize.y
		const zOffset = (item.glow_position_z / 100) * boundingBoxSize.z

		// Start at the corner (boundingBox.min) and add offsets
		const x = boundingBox.min.x + xOffset + positionX
		const y = boundingBox.min.y + yOffset + (positionY - 0.5)
		const z = boundingBox.min.z + zOffset + positionZ

		return [x, y, z]
	})

	function focusOnSelectedItem() {
		cameraControls.moveTo(positionX, positionY, positionZ, true)
	}

	function handleMouseDown(event) {
		store.setMouseDownOnUid(props.uid)
		cameraControls.enabled = false
	}

	function handleMouseUp(event) {
		cameraControls.enabled = true
		const position = event.target.object.position
		const rotation = event.target.object.rotation
		const scale = event.target.object.scale

		store.updateItem(props.uid, {
			position_x: position.x,
			position_y: position.y,
			position_z: position.z,
			scale_x: scale.x,
			scale_y: scale.y,
			scale_z: scale.z,
			rotation_x: radiansToPercentage(rotation.x),
			rotation_y: radiansToPercentage(rotation.y),
			rotation_z: radiansToPercentage(rotation.z)
		})
	}

	$effect(() => {
		if (mesh) {
			mesh.traverse((child) => {
				if (child.material) {
					child.material.transparent = true
					child.material.opacity = opacity
				}
			})
		}
	})

	// event handler for when the item is clicked
	function handleClick(event) {
		event?.stopPropagation?.()
		event?.preventDefault?.()
		store.selectItem(props.uid)
		focusOnSelectedItem()
	}

	// event handler for when the transform controls are used
	// to translate, rotate or scale the mesh
	function onObjectChange(event) {
		// console.log('on object change...')
		// TODO: On move, play clicks sound.
	}

	function handleMeshMouseEnter(event) {
		event?.stopPropagation?.()
		event?.preventDefault?.()
		store.setMouseOverUid(props.uid)
	}

	function handleMeshMouseLeave(event) {
		event?.stopPropagation?.()
		event?.preventDefault?.()
		store.setMouseOverUid(null)
	}

	function handleMeshMouseDown(event) {
		store.setMouseDownOnUid(props.uid)
	}

	// event handler to delete or deselect item
	// using escape key or delete key
	const handleKeydown = (event) => {
		const isDeleteKey = event.key === 'Delete'
		const isEscapeKey = event.key === 'Escape'
		const isNumber1Key = event.key === '1'
		const isNumber2Key = event.key === '2'
		const isNumber3Key = event.key === '3'
		if (isNumber1Key) store.setTransformItemMode('translate')
		if (isNumber2Key) store.setTransformItemMode('rotate')
		if (isNumber3Key) store.setTransformItemMode('scale')
		if (isDeleteKey) store.removeItem(props.uid)
		if (isEscapeKey) store.deselectItem()
	}

	// add event listener to deselect with escape key,
	// or to delete the item with delete key
	$effect(() => {
		if (!isSelected) return
		return windowEvent('keydown', handleKeydown)
	})

	// event handler to attach controls to the mesh
	// when the gltf has loaded and the mesh selected
	$effect(() => {
		if (!shouldRenderControls || !controls || !mesh) return
		controls.attach(mesh)
	})

	onMount(() => {
		focusOnSelectedItem()
		// TODO: Play pop sound.
	})

	// TODO: On delete, play unpop sound.
</script>

{#await gltf then data}
	<T
		is={data.scene.children[0]}
		castShadow
		receiveShadow
		bind:ref={mesh}
		onclick={handleClick}
		{size}
		{position}
		{rotation}
		{scale}
		onpointerenter={handleMeshMouseEnter}
		onpointerleave={handleMeshMouseLeave}
	/>

	{#if item.is_glowing}
		<T.PointLight
			castShadow
			color={item.glow_color}
			intensity={item.glow_intensity}
			distance={item.glow_distance}
			position={glowPosition}
		/>

		{#if isSelected}
			<T.Mesh position={glowPosition}>
				<T.BoxGeometry args={[0.05, 0.05, 0.05]} />
				<T.MeshBasicMaterial color="limegreen" />
			</T.Mesh>
		{/if}
	{/if}

	{#if shouldRenderControls}
		<TransformControls
			bind:controls
			space="local"
			translationSnap={0.02}
			scaleSnap={0.02}
			rotationSnap={0.02}
			rotationSnapThreshold={0.02}
			scaleSnapThreshold={0.02}
			translationSnapThreshold={0.02}
			onobjectChange={onObjectChange}
			onmouseDown={handleMouseDown}
			onmouseUp={handleMouseUp}
			autoPauseOrbitControls
			mode={store.transformItemMode as any}
		/>
	{/if}
{/await}

{#if mesh && isSelected}
	<BoundingBox target={mesh} positionY={position[1]} />
{/if}
