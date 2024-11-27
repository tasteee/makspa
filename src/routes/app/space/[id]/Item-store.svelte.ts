import mainStore from '~/stores/main-store.svelte'
import inputStore from '~/stores/input.store.svelte'
import utilities from '~/modules/utilities'
import audioStore from '~/stores/audio-store.svelte'
import cameraStore from '~/stores/camera.store.svelte'
import type { Mesh } from 'three'

const getCorrectedAlignmentRotationY = utilities.three.getCorrectedAlignmentRotationY
const getNegativeAdjustmentToZeroY = utilities.three.getNegativeAdjustmentToZeroY
const getRotationYDegrees = utilities.three.getRotationYDegrees

export type PropsT = {
	item: ItemT
}

export const useItemStore = (props: PropsT) => {
	let mesh = $state(null)
	let item = $derived(mainStore.space.items[props.item.id])
	let isMouseDown = $derived(mainStore.mouseDownItemId === item.id)
	let isDragging = $derived(mainStore.draggingItemId === item.id)
	let isSelected = $derived(mainStore.selectedItemId === item.id)

	let dragAxes = $derived.by(() => {
		if (!isSelected) return ''
		if (inputStore.isPressedAlt) return 'y'
		return 'xz'
	})

	$effect(() => {
		console.log('---isPressedAlt', inputStore.isPressedAlt)
	})

	$effect(() => {
		console.log('---selected', isSelected)
	})

	// On mouse up, IF the item is already selected, do not select.
	// If not selected and the click began on this item, select it.
	const checkShouldSelect = () => {
		const isAlreadySelected = mainStore.selectedItemId === item.id
		const isMouseDownOnThisItem = mainStore.mouseDownItemId === item.id
		return isMouseDownOnThisItem || !isAlreadySelected
	}

	const updateRotation = (axis, amount) => {
		const key = `rotation` + axis.toUpperCase()
		const value = props.item[key] + amount
		const final = value >= 100 ? 0 : value <= 0 ? 99 : value
		audioStore.playClip('itemRotate')

		mainStore.updateItem({
			id: props.item.id,
			[key]: final
		})
	}

	const updatePosition = (event) => {
		audioStore.playClip('itemMove')

		mainStore.updateItem({
			id: props.item.id,
			positionX: event.object.position.x,
			positionY: event.object.position.y,
			positionZ: event.object.position.z
		})
	}

	const handleDrag = (event) => {
		if (!isSelected) return
		updatePosition(event)
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

	const handleHoverStart = (event) => {
		event.stopPropagation()
		const amount = isSelected ? 0.4 : 0.25
		event.object.material.emissive.set('#FFFFFF')
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

	// On click (which is for some reason the same as on pointer up)
	// If the click began on this item, and if it's not already selected,
	// select it.
	const handleItemClick = (event) => {
		event.stopPropagation()
		// event.preventDefault()
		// if (isDragging) return
		const shouldSelect = checkShouldSelect()
		if (shouldSelect) mainStore.selectItem(item.id)
		if (shouldSelect) audioStore.playClip('itemSelect')
	}

	const setUpMesh = (mesh: Mesh) => {
		if (item.hasBeenSetUp) return
		const adjustment = getNegativeAdjustmentToZeroY(mesh)
		const newPositionY = item.positionY + adjustment
		const rotationDegrees = getRotationYDegrees(mesh)
		const correctedRotation = getCorrectedAlignmentRotationY(rotationDegrees)
		item.rotationY = correctedRotation
		item.positionY = newPositionY
		item.hasBeenSetUp = true
	}

	const handleRightClick = (event) => {
		console.log('right click', { event })
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
			const isScale = !!event.shiftKey
			const isPressedAlt = !!event.altKey
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

	const handlePointerDown = () => {
		if (isSelected) return
		mainStore.mouseDownItemId = item.id
	}

	const handlePointerUp = () => {
		if (isSelected) return
		if (!isMouseDown) return
		mainStore.mouseDownItemId = null
	}

	const handleDragStart = (event) => {
		console.log({ event })
		if (!isSelected) return
		cameraStore.controls.enabled = false
		mainStore.draggingItemId = item.id
	}

	const handleDragEnd = () => {
		if (!isSelected) return
		cameraStore.controls.enabled = true
		mainStore.draggingItemId = null
	}

	const handlers = {
		drag: handleDrag,
		hoverStart: handleHoverStart,
		hoverEnd: handleHoverEnd,
		click: handleItemClick,
		rightClick: handleRightClick,
		keyDown: handleKeyDown,
		pointerDown: handlePointerDown,
		pointerUp: handlePointerUp,
		dragStart: handleDragStart,
		dragEnd: handleDragEnd
	}

	return {
		isDragging,
		isMouseDown,
		isSelected,
		dragAxes,
		mesh,
		handlers,
		setUpMesh
	}
}
