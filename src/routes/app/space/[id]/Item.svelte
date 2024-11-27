<script lang="ts">
	import { onMount, onDestroy } from 'svelte'
	import inputStore from '~/stores/input.store.svelte'
	import { T } from '@threlte/core'
	import BoundingBox from '~/modules/BoundingBox.svelte'
	import u from '~/modules/utilities'
	import { percentageToRadians } from '~/modules/numbers'
	import DragControls from '~/modules/DragControls.svelte'
	import { useModel } from '~/modules/useModel.svelte'
	import mainStore from '~/stores/main-store.svelte'
	import cameraStore from '~/stores/camera.store.svelte'
	import audioStore from '~/stores/audio-store.svelte'

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
	let isPressedAlt = $derived.by(() => inputStore.pressedKeys.includes('alt'))
	let isPressedShift = $derived.by(() => inputStore.pressedKeys.includes('shift'))

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
		if (props.item.hasBeenSetUp) return
		const adjustment = u.three.getNegativeAdjustmentToZeroY(mesh)
		const newPositionY = positionY + adjustment
		const rotationDegrees = u.three.getRotationYDegrees(mesh)
		const correctedRotation = u.three.getCorrectedAlignmentRotationY(rotationDegrees)
		const updates = { id: props.item.id, rotationY: correctedRotation, positionY: newPositionY }
		props.item.hasBeenSetUp = true
		mainStore.updateItem(updates)
	}

	const handleDragStart = (event) => {
		console.log({ event })
		if (!isSelected) return
		cameraStore.controls.enabled = false
		isDragging = true
		// console.log('dragging')
	}

	const handleDragEnd = () => {
		if (!isSelected) return
		cameraStore.controls.enabled = true
		isDragging = false
		// console.log('drag end')
	}

	const handleDrag = (event) => {
		if (!isSelected) return
		audioStore.playClip('itemMove')

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
		audioStore.playClip('itemRotate')

		mainStore.updateItem({
			id: props.item.id,
			[key]: value
		})
	}

	const updateScale = (amount: number) => {
		audioStore.playClip('itemScale')
		mainStore.updateItem({
			id: props.item.id,
			scaleX: props.item.scaleX + amount,
			scaleY: props.item.scaleY + amount,
			scaleZ: props.item.scaleZ + amount
		})
	}

	const handleKeyDown = (event) => {
		const arrowKeys = ['arrowup', 'arrowdown', 'arrowleft', 'arrowright']
		if (!isSelected) return
		const key = event.key.toLowerCase()
		const withControl = inputStore.pressedKeys.includes('control')
		const isDuplicate = withControl && key === 'd'
		const isDelete = key === 'delete'
		const isFocus = key === ' '
		const isDeselect = key === 'escape'
		const isArrow = arrowKeys.includes(key)

		if (isDuplicate) event.preventDefault()
		if (isDuplicate) mainStore.cloneItem(props.item.id)
		if (isDuplicate) audioStore.playClip('itemDuplicate')

		if (isDelete) mainStore.deleteItem(props.item.id)
		if (isDelete) audioStore.playClip('itemDelete')

		if (isFocus) cameraStore.moveToItem(props.item.id)
		if (isFocus) audioStore.playClip('itemFocus')

		if (isDeselect) mainStore.deselectItem()
		if (isDeselect) audioStore.playClip('itemDeselect')

		if (isArrow) {
			const isScale = isPressedShift
			const isRotation = !isScale

			if (isScale) {
				if (key === 'arrowup') updateScale(0.1)
				if (key === 'arrowdown') updateScale(-0.1)
			}

			if (isRotation) {
				if (isPressedAlt && key === 'arrowup') updateRotation('z', -1)
				if (isPressedAlt && key === 'arrowdown') updateRotation('z', 1)
				if (!isPressedAlt && key === 'arrowup') updateRotation('x', -1)
				if (!isPressedAlt && key === 'arrowdown') updateRotation('x', 1)
				if (!isPressedAlt && key === 'arrowleft') updateRotation('y', 1)
				if (!isPressedAlt && key === 'arrowright') updateRotation('y', -1)
			}
		}
	}

	const handleHoverStart = (event) => {
		event.stopPropagation()
		const amount = isSelected ? 0.4 : 0.25
		// console.log({ midColor: mainStore.midColor })
		event.object.material.emissive.set(mainStore.midColor)
		event.object.material.emissiveIntensity = amount
		event.object.material.emissive.opacity = amount
		event.object.castShadow = true
		event.object.receiveShadow = true
		audioStore.playClip('itemHover')
	}

	const handleHoverEnd = (event) => {
		event.stopPropagation()
		event.object.material.emissive.set(0, 0, 0)
	}

	function handleClick(event) {
		event.stopPropagation()
		console.log('click', { event })
		audioStore.playClip('itemSelect')
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

	const handleRightClick = (event) => {
		console.log('right click', { event })
	}

	onMount(() => {
		window.addEventListener('keydown', handleKeyDown)
		audioStore.playClip('itemAdd')
	})

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
		onpointerover={handleHoverStart}
		onpointerout={handleHoverEnd}
		oncontextmenu={handleRightClick}
		position={[positionX, positionY, positionZ]}
		rotation={[rotationX, rotationY, rotationZ]}
		scale={[scaleX, scaleY, scaleZ]}
		oncreate={setUpMesh}
	/>

	{#if mesh}
		<DragControls
			isEnabled={isSelected}
			axes={dragAxes}
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
