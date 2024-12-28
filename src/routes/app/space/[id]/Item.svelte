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
	import * as THREE from 'three'
	import HeightLines from '~/modules/HeightLines.svelte'
	import { withMinMax } from '~/modules/withMinMax'

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
	let mouseDownTime = $state(0)
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

	$effect(() => {
		if (!mesh) return
		const box = u.three.getBoxCornerPoints(mesh)
	})

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

	const handleDragStart = () => {
		if (!isSelected) return
		cameraStore.controls.enabled = false
		isDragging = true
		mainStore.isDragging = true
	}

	const handleDragEnd = () => {
		if (!isSelected) return
		cameraStore.controls.enabled = true
		isDragging = false
		mainStore.isDragging = false
	}

	const handleDrag = (event) => {
		if (!isSelected) return
		audioStore.playClip('itemMove')

		const maxX = (mainStore.space.sizeX / 2) + 0.5
		const minX = -maxX
		const positionX = withMinMax(minX, maxX, event.object.position.x)

		const maxY = mainStore.space.sizeY / 2
		const minY = -maxY
		const positionY = withMinMax(minY, maxY, event.object.position.y)

		const maxZ = (mainStore.space.sizeZ / 2) + 0.5
		const minZ = -maxZ
		const positionZ = withMinMax(minZ, maxZ, event.object.position.z)

		mainStore.updateItem({
			id: props.item.id,
			positionX,
			positionY,
			positionZ,
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
				const amount = inputStore.isCapsLocked ? 0.005 : 0.01
				if (key === 'arrowup') updateScale(amount)
				if (key === 'arrowdown') updateScale(-amount)
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
		if (inputStore.isMouseDown) return
		event.stopPropagation()
		const amount = isSelected ? 0.1: 0.05
				// console.log({ midColor: mainStore.midColor })
		event.object.material.emissive.set('#ffffff')
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
		event?.preventDefault?.()
		if (isDragging) return
		if (isSelected) return
	}

	const handlePointerDown = () => {
		if (isSelected) return
		console.log('pointer down')
		isMouseDown = true
		mouseDownTime = Date.now()
	}

	const handlePointerUp = (event) => {
		event?.stopPropagation?.()
		event?.preventDefault?.()
		if (isSelected) return
		console.log('pointer up')
		const clickDuration = Date.now() - mouseDownTime
		const wasMouseDown = !!isMouseDown
		console.log(wasMouseDown, clickDuration)
		isMouseDown = false
		if (!wasMouseDown || clickDuration > 400) return
		audioStore.playClip('itemSelect')
		mainStore.selectItem(props.item.id)
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
	<HeightLines positionX={position[0]} positionY={position[1]} positionZ={position[2]} target={mesh} />
{/if}
