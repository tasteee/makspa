<script lang="ts">
	import { T } from '@threlte/core'
	import { TransformControls } from '@threlte/extras'
	import { useGltf, useSuspense } from '@threlte/extras'
	import store from '../stores/store.svelte'
	import { windowEvent } from '../modules/windowEvent'
	import BoundingBox from './BoundingBox.svelte'
	import { Box3, Vector3 } from 'three'
	import * as THREE from 'three'
	import { getNegativeAdjustmentToZeroY } from '../modules/three.helpers'

	type PropsT = {
		uid: string
	}

	let props: PropsT = $props()

	let item = $derived(store.findItem(props.uid))
	let isSelected = $derived(store.checkIsItemSelected(props.uid))

	let mesh = $state(null)
	let controls = $state(null)

	const suspend = useSuspense()
	const gltfUrl = item.file + `?uid=${props.uid}`
	const gltf = suspend(useGltf(gltfUrl))

	$effect(() => {
		if (!mesh) return
		const adjustment = getNegativeAdjustmentToZeroY(mesh)
		if (adjustment === 0) return
		const newPositionY = item.position_y + adjustment
		store.updateItem(props.uid, { position_y: newPositionY })
	})

	$effect(() => {
		if (!mesh) return
		const THRESHOLD = 5
		const rotation = mesh.rotation.y
		const rotationDegrees = THREE.MathUtils.radToDeg(rotation)
		const alignmentCase0 = rotationDegrees % 90 < THRESHOLD
		const alignmentCase1 = 90 - (rotationDegrees % 90) < THRESHOLD
		const isAligned = alignmentCase0 || alignmentCase1

		if (!isAligned) {
			const nearestRightAngle = Math.round(rotationDegrees / 90) * 90
			const correctedRotation = THREE.MathUtils.degToRad(nearestRightAngle)
			store.updateItem(props.uid, { rotation_y: correctedRotation })
		}
	})

	let position = $derived([item.position_x, item.position_y, item.position_z])
	let rotation = $derived([item.rotation_x, item.rotation_y, item.rotation_z])
	let scale = $derived([item.scale_x, item.scale_y, item.scale_z])
	let size = $derived([item.size_x, item.size_y, item.size_z])
	let shouldRenderControls = $derived(isSelected && mesh)

	// event handler for when the item is clicked
	function handleClick(event) {
		event.stopPropagation()
		store.selectItem(props.uid)
	}

	// for when the transform controls are used
	// to translate the mesh
	function handleMove(event) {
		const position = event.target.object.position
		store.updateItem(props.uid, {
			position_x: position.x,
			position_y: position.y,
			position_z: position.z
		})
	}

	// for when the transform controls are used
	// to rotate the mesh
	function handleRotate(event) {
		const rotation = event.target.object.rotation
		store.updateItem(props.uid, {
			rotation_x: rotation.x,
			rotation_y: rotation.y,
			rotation_z: rotation.z
		})
	}

	// for when the transform controls are used
	// to scale the mesh
	function handleScale(event) {
		const scale = event.target.object.scale
		store.updateItem(props.uid, {
			scale_x: scale.x,
			scale_y: scale.y,
			scale_z: scale.z
		})
	}

	// transform mode specific event handlers for
	// onobjectchange event from transform controls
	const handlers = {
		translate: handleMove,
		rotate: handleRotate,
		scale: handleScale
	}

	// event handler for when the transform controls are used
	// to translate, rotate or scale the mesh
	function onObjectChange(event) {
		const handler = handlers[store.transformItemMode]
		handler(event)
	}

	// event handler to delete or deselect item
	// using escape key, backspace key or delete key
	const handleKeydown = (event) => {
		const isDeleteKey = event.key === 'Delete'
		const isBackspaceKey = event.key === 'Backspace'
		const isEscapeKey = event.key === 'Escape'
		const isNumber1Key = event.key === '1'
		const isNumber2Key = event.key === '2'
		const isNumber3Key = event.key === '3'
		if (isNumber1Key) store.setTransformItemMode('translate')
		if (isNumber2Key) store.setTransformItemMode('rotate')
		if (isNumber3Key) store.setTransformItemMode('scale')
		if (isDeleteKey || isBackspaceKey) store.removeItem(props.uid)
		if (isEscapeKey) store.deselectItem()
	}

	// add event listener to deselect with escape key,
	// or to delete the item with backspace key or delete key
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
</script>

{#await gltf then data}
	<T
		is={data.scene.children[0]}
		{size}
		{position}
		{rotation}
		{scale}
		castShadow
		receiveShadow
		bind:ref={mesh}
		onclick={handleClick}
	/>

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
			autoPauseOrbitControls
			mode={store.transformItemMode as any}
		/>
	{/if}

	{#if item.is_glowing}
		<T.PointLight
			castShadow
			color={item.glow_color}
			intensity={item.glow_intensity}
			distance={item.glow_distance}
			position={[item.glow_position_x, item.glow_position_y, item.glow_position_z]}
		/>
	{/if}
{/await}

{#if mesh && isSelected}
	<BoundingBox target={mesh} positionY={position[1]} />
{/if}
