<script lang="ts">
	import { onDestroy } from 'svelte'

	import inputStore from '~/stores/input.store.svelte'

	import { T } from '@threlte/core'
	import BoundingBox from '~/modules/BoundingBox.svelte'
	import u from '~/modules/utilities'
	import { percentageToRadians } from '~/modules/numbers'
	import DragControls from '~/modules/DragControls.svelte'
	import { useModel } from '~/modules/useModel.svelte'
	import stores from '~/stores'
	import mainStore from '~/stores/main-store.svelte'

	type PropsT = {
		item: ItemT
	}

	let mesh = $state(null)
	let props: PropsT = $props()
	let isSelected = $derived(mainStore.selectedItemId === props.item.id)
	let isVisible = $derived(props.item.isVisible)
	let isGlowing = $derived(props.item.isGlowing)
	let isObstructive = $derived(props.item.isObstructive)
	let isDragging = $state(false)
	let isMouseDown = $state(false)
	let isPressedAlt = $derived.by(() => stores.input.pressedKeys.includes('alt'))

	let dragAxes = $derived.by(() => {
		if (!isSelected) return ''
		if (isPressedAlt) return 'y'
		return 'xz'
	})

	let positionX = $derived(props.item.positionX)
	let positionY = $derived(props.item.positionY)
	let positionZ = $derived(props.item.positionZ)
	let rotationX = $derived(percentageToRadians(props.item.rotationX))
	let rotationY = $derived(percentageToRadians(props.item.rotationY))
	let rotationZ = $derived(percentageToRadians(props.item.rotationZ))
	let scaleX = $derived(props.item.scaleX)
	let scaleY = $derived(props.item.scaleY)
	let scaleZ = $derived(props.item.scaleZ)
	let opacity = $derived(props.item.opacity / 100)
	let position = $derived.by(() => [positionX, positionY, positionZ])

	// svelte-ignore state_referenced_locally
	const gltf = useModel(props.item.modelUrl)

	const setUpMesh = () => {
		const adjustment = u.three.getNegativeAdjustmentToZeroY(mesh)
		const newPositionY = positionY + adjustment
		const rotationDegrees = u.three.getRotationYDegrees(mesh)
		const correctedRotation = u.three.getCorrectedAlignmentRotationY(rotationDegrees)
		const updates = { id: props.item.id, rotationY: correctedRotation, positionY: newPositionY }
		mainStore.updateItem(updates)
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

		mainStore.updateItem({
			id: props.item.id,
			positionX: event.object.position.x,
			positionY: event.object.position.y,
			positionZ: event.object.position.z
		})
	}

	const updateRotation = (axis, amount) => {
		const key = `rotation` + axis.toUpperCase()
		const value = props.item[key] + amount

		mainStore.updateItem({
			id: props.item.id,
			[key]: value
		})
	}

	const handleKeyDown = (event) => {
		if (!isSelected) return
		const key = event.key.toLowerCase()
		console.log(props.item.name + ' IS SELECTED WHEN KEY PRESSED: ' + key)
		if (key === 'delete') mainStore.deleteItem(props.item.id)
		if (key === ' ') stores.camera.moveToItem(props.item.id)
		if (key === 'escape') mainStore.deselectItem()
		if (!event.altKey && key === 'arrowup') updateRotation('x', -1)
		if (!event.altKey && key === 'arrowdown') updateRotation('x', 1)
		if (!event.altKey && key === 'arrowleft') updateRotation('y', 1)
		if (!event.altKey && key === 'arrowright') updateRotation('y', -1)
		if (event.altKey && key === 'arrowup') updateRotation('z', -1)
		if (event.altKey && key === 'arrowdown') updateRotation('z', 1)
	}

	window.addEventListener('keydown', handleKeyDown)

	const handleHoverStart = (event) => {
		// console.log({ midColor: mainStore.midColor })
		event.object.material.emissive.set(mainStore.midColor)
		event.object.material.emissiveIntensity = 0.5
		event.object.material.emissive.opacity = 0.5
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
		mainStore.selectItem(props.item.id)
	}

	const handlePointerDown = () => {
		if (isSelected) return
		isMouseDown = true
	}

	const handlePointerUp = () => {
		if (isSelected) return
		if (!isMouseDown) return
		isMouseDown = false
	}

	onDestroy(() => {
		window.removeEventListener('keydown', handleKeyDown)
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
