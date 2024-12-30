<script lang="ts">
	import * as THREE from 'three'
	import { onMount, onDestroy } from 'svelte'
	import { useThrelte } from '@threlte/core'
	import { DragControls } from './DragController.js'
	import stores from '~/stores'
	import debounce from 'just-debounce'
	import mainStore from '~/stores/main-store.svelte.js'
	import inputStore from '~/stores/input.store.svelte.js'

	type MaybeVector2 = THREE.Vector2 | undefined
	type ObjectEventT = { object: THREE.Object3D }
	type EventWithObjectT<Name extends string> = THREE.Event<Name, DragControls> & ObjectEventT
	type DragStartEventT = EventWithObjectT<'dragstart'>
	type DragEventT = EventWithObjectT<'drag'>
	type DragEndEventT = EventWithObjectT<'dragend'>
	type HoverStartEventT = EventWithObjectT<'hoveron'>
	type HoverEndEventT = EventWithObjectT<'hoveroff'>

	type DragControlsPropsT = {
		target?: THREE.Object3D
		dragLimits?: [MaybeVector2, MaybeVector2, MaybeVector2]
		onHoverStart?: (event: HoverStartEventT) => void
		onHoverEnd?: (event: HoverEndEventT) => void
		onDragStart?: (event: DragStartEventT) => void
		onDragEnd?: (event: DragEndEventT) => void
		onDrag?: (event: DragEventT, delta: THREE.Vector3) => void
		onCreate?: (dragControls: DragControls) => void
		onRightClick?: (event: MouseEvent) => void
	}

	const { camera, renderer, invalidate } = useThrelte()
	let props: DragControlsPropsT = $props()
	let isAxisEnabledX = $derived(mainStore.dragControlsAxes.includes('x'))
	let isAxisEnabledY = $derived(mainStore.dragControlsAxes.includes('y'))
	let isAxisEnabledZ = $derived(mainStore.dragControlsAxes.includes('z'))
	let previousMousePosition = new THREE.Vector2()
	let controls = $state<DragControls>(null!)
	let previousPosition = new THREE.Vector3()
	let delta = new THREE.Vector3()

	// Track initial states
	let initialIntersectPoint = new THREE.Vector3()
	let initialObjectOffset = new THREE.Vector3()
	let initialScale = new THREE.Vector3()
	let initialRotation = new THREE.Euler()
	let newPosition = new THREE.Vector3()

	const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0)) // XZ plane
	const raycaster = new THREE.Raycaster()
	const mouse = new THREE.Vector2()
	const intersectPoint = new THREE.Vector3()

	$effect(() => {
		if (!controls) return
		controls.enabled = true
		controls.controlAxes = mainStore.dragControlsAxes
		controls.controlMode = mainStore.dragControlsMode
	})

	const getMouseDelta = () => {
		return {
			x: stores.input.mouseX - previousMousePosition.x,
			y: stores.input.mouseY - previousMousePosition.y
		}
	}

	const applyAxisConstraints = (position: THREE.Vector3): THREE.Vector3 => {
		const constrainedPosition = position.clone()
		if (!isAxisEnabledX) constrainedPosition.x = previousPosition.x
		if (!isAxisEnabledY) constrainedPosition.y = previousPosition.y
		if (!isAxisEnabledZ) constrainedPosition.z = previousPosition.z
		return constrainedPosition
	}

	const getIntersectionPoint = (whereX?: number, whereY?: number): THREE.Vector3 => {
		const clientX = whereX ?? stores.input.mouseX
		const clientY = whereY ?? stores.input.mouseY
		const rect = renderer.domElement.getBoundingClientRect()
		mouse.x = ((clientX - rect.left) / rect.width) * 2 - 1
		mouse.y = -((clientY - rect.top) / rect.height) * 2 + 1
		raycaster.setFromCamera(mouse, camera.current)
		raycaster.ray.intersectPlane(plane, intersectPoint)
		return intersectPoint
	}

	const clampNumber = ({ min, max, value }) => {
		return Math.max(min, Math.min(max, value))
	}

	// Clamps the x y and z positions to a min and max value.
	const clampPosition = (position: THREE.Vector3): THREE.Vector3 => {
		const dragLimits = mainStore.dragPositionLimits
		position.x = clampNumber({ ...dragLimits.x, value: position.x })
		position.y = clampNumber({ ...dragLimits.y, value: position.y })
		position.z = clampNumber({ ...dragLimits.z, value: position.z })
		return position
	}

	const handleLift = (event: DragEventT) => {
		const snapAmount = mainStore.snapAmount
		const constrainedPosition = applyAxisConstraints(event.object.position)
		const limitedPosition = clampPosition(constrainedPosition)
		limitedPosition.y = Math.floor(limitedPosition.y / snapAmount) * snapAmount
		event.object.position.copy(limitedPosition)
		delta.subVectors(limitedPosition, previousPosition)
		previousPosition.copy(limitedPosition)
		props.onDrag?.(event, delta)
		invalidate()
	}

	const handleMove = (event: DragEventT) => {
		const snapAmount = mainStore.snapAmount

		const intersectionPoint = getIntersectionPoint()
		newPosition.copy(intersectionPoint).add(initialObjectOffset)
		newPosition.y = previousPosition.y
		const constrainedPosition = applyAxisConstraints(newPosition)
		const limitedPosition = clampPosition(constrainedPosition)
		limitedPosition.z = Math.floor(limitedPosition.z / snapAmount) * snapAmount
		limitedPosition.x = Math.floor(limitedPosition.x / snapAmount) * snapAmount
		event.object.position.copy(limitedPosition)
		delta.subVectors(limitedPosition, previousPosition)
		previousPosition.copy(limitedPosition)

		props.onDrag?.(event, delta)
		invalidate()
	}

	const handleScale = (event: DragEventT) => {
		const mouseDelta = getMouseDelta()
		const scaleFactor = 1 - mouseDelta.y * 0.01

		if (isAxisEnabledX) event.object.scale.x *= scaleFactor
		if (isAxisEnabledY) event.object.scale.y *= scaleFactor
		if (isAxisEnabledZ) event.object.scale.z *= scaleFactor

		previousMousePosition.set(stores.input.mouseX, stores.input.mouseY)
		props.onDrag?.(event, delta)
		invalidate()
	}

	const handleRotate = (event: DragEventT) => {
		const mouseDelta = getMouseDelta()
		const rotationFactor = mouseDelta.x * 0.001
		if (isAxisEnabledX) event.object.rotation.x += rotationFactor
		if (isAxisEnabledY) event.object.rotation.y += rotationFactor
		if (isAxisEnabledZ) event.object.rotation.z += rotationFactor
		previousMousePosition.set(stores.input.mouseX, stores.input.mouseY)
		props.onDrag?.(event, delta)
		invalidate()
	}

	const onHoverStart = (event: HoverStartEventT) => {
		previousMousePosition.set(stores.input.mouseX, stores.input.mouseY)
		props.onHoverStart?.(event)
		invalidate()
	}

	const onHoverEnd = (event: HoverEndEventT) => {
		props.onHoverEnd?.(event)
		invalidate()
	}

	const onDragStart = (event: DragStartEventT) => {
		initialIntersectPoint.copy(getIntersectionPoint())
		initialObjectOffset.copy(event.object.position).sub(initialIntersectPoint)
		previousPosition.copy(event.object.position)
		initialScale.copy(event.object.scale)
		initialRotation.copy(event.object.rotation)
		previousMousePosition.set(stores.input.mouseX, stores.input.mouseY)
		props.onDragStart?.(event)
		invalidate()
	}

	const onDragEnd = (event: DragEndEventT) => {
		props.onDragEnd?.(event)
		invalidate()
	}

	const onDrag = (event: DragEventT) => {
		const isMove = mainStore.dragControlsMode === 'move'
		const isScale = mainStore.dragControlsMode === 'scale'
		const isRotate = mainStore.dragControlsMode === 'rotate'
		const isAxisY = mainStore.dragControlsAxes.includes('y')

		if (isMove && isAxisY) handleLift(event)
		if (isMove && !isAxisY) handleMove(event)
		if (isScale) handleScale(event)
		if (isRotate) handleRotate(event)
	}

	const onClickRight = debounce((event) => {
		props.onRightClick?.(event)
	}, 100)

	onMount(() => {
		controls = new DragControls([props.target], camera.current, renderer.domElement)

		renderer.domElement.addEventListener('contextmenu', onClickRight)
		controls.addEventListener('hoveron', onHoverStart)
		controls.addEventListener('hoveroff', onHoverEnd)
		controls.addEventListener('dragstart', onDragStart)
		controls.addEventListener('dragend', onDragEnd)
		controls.addEventListener('drag', onDrag)
		controls.enabled = true

		props.onCreate?.(controls)
	})

	onDestroy(() => {
		controls.enabled = false
		controls.dispose()
		renderer.domElement.removeEventListener('contextmenu', onClickRight)
	})
</script>
