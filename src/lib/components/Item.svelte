<script>
	import { T } from '@threlte/core'
	import { TransformControls } from '@threlte/extras'
	import { useGltf, useSuspense } from '@threlte/extras'
	import store from '../stores/store.svelte'
	import { windowEvent } from '../modules/windowEvent'
	import { Box3, Vector3 } from 'three'
	import * as THREE from 'three'

	let { uid } = $props()
	let scene = $state(null)
	let item = $derived(store.findItem(uid))
	let isSelected = $derived(store.checkItemSelected(uid))
	let model = $state(null)
	let controls = $state(null)
	const suspend = useSuspense()
	let boundingBoxSize = $state(new Vector3()) // to store true size
	let offsetY = $state(item.size_y / 50) // to correct vertical positioning
	const gltfUrl = item.file + `?uid=${uid}`
	const gltf = suspend(useGltf(gltfUrl))

	$effect(() => {
		if (!model) return
		;(async () => {
			const { scene } = await gltf
			console.log('scene', scene)

			// Center the model
			const box = new THREE.Box3().setFromObject(scene)
			const center = box.getCenter(new THREE.Vector3())
			scene.position.sub(center)

			// Move the scene up so it sits on the floor
			const boundingBox = new THREE.Box3().setFromObject(scene)
			const sceneHeight = boundingBox.max.y - boundingBox.min.y
			scene.position.y += sceneHeight / 2
		})()
	})

	let position = $derived([item.position_x, offsetY, item.position_z])
	let rotation = $derived([item.rotation_x, item.rotation_y, item.rotation_z])
	let scale = $derived([item.scale_x, item.scale_y, item.scale_z])
	let size = $derived([item.size_x, item.size_y, item.size_z])
	let shouldRenderControls = $derived(isSelected && model)

	function handleClick(event) {
		event.stopPropagation()
		store.selectItem(uid)
	}

	function handleMove(event) {
		const position = event.target.object.position
		store.updateItem(uid, {
			position_x: position.x,
			position_y: position.y,
			position_z: position.z
		})
	}

	function handleRotate(event) {
		const rotation = event.target.object.rotation
		store.updateItem(uid, {
			rotation_x: rotation.x,
			rotation_y: rotation.y,
			rotation_z: rotation.z
		})
	}

	function handleScale(event) {
		const scale = event.target.object.scale
		store.updateItem(uid, {
			scale_x: scale.x,
			scale_y: scale.y,
			scale_z: scale.z
		})
	}

	const handlers = {
		translate: handleMove,
		rotate: handleRotate,
		scale: handleScale
	}

	function onObjectChange(event) {
		const handler = handlers[store.state.transformItemMode]
		handler(event)
	}

	const handleKeydown = (event) => {
		const isDeleteKey = event.key === 'Delete'
		const isBackspaceKey = event.key === 'Backspace'
		const isEscapeKey = event.key === 'Escape'
		if (isDeleteKey || isBackspaceKey) store.removeItem(uid)
		if (isEscapeKey) store.deselectItem()
	}

	$effect(() => {
		if (!isSelected) return
		return windowEvent('keydown', handleKeydown)
	})

	$inspect({ scene, gltf }).with(console.log)

	$effect(() => {
		if (!shouldRenderControls || !controls || !model) return
		controls.attach(model)
		model.position.set(item.position_x, item.position_y + offsetY, item.position_z)
		console.log('model.position', model.position.x, model.position.y, model.position.z)
		console.log('item position', item.position_x, item.position_y, item.position_z)
		console.log('item size', item.size_x, item.size_y, item.size_z)
	})
</script>

{#await gltf then data}
	<T
		is={data.scene}
		{size}
		{position}
		{rotation}
		{scale}
		castShadow
		receiveShadow
		bind:ref={model}
		onclick={handleClick}
	/>

	{#if shouldRenderControls}
		<TransformControls
			bind:controls
			space="local"
			mode={store.state.transformItemMode}
			translationSnap={0.025}
			autoPauseOrbitControls
			scaleSnap={0.025}
			rotationSnap={0.025}
			rotationSnapThreshold={0.025}
			scaleSnapThreshold={0.025}
			translationSnapThreshold={0.025}
			onobjectChange={onObjectChange}
			position.x={item.size_x / 100 / 2}
			position.y={item.size_y / 100 / 2}
			position.z={item.size_z / 100 / 2}
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
