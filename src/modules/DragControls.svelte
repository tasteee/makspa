<script lang="ts">
	import * as THREE from 'three'
	import { onMount, onDestroy } from 'svelte'
	import { useThrelte } from '@threlte/core'
	import { DragControls } from './DragController.js'
	import stores from '~/stores'
	import debounce from 'just-debounce'

	type MaybeVector2 = THREE.Vector2 | undefined
	type ObjectEventT = { object: THREE.Object3D }
	type EventWithObjectT<Name extends string> = THREE.Event<Name, DragControls> & ObjectEventT
	type DragStartEventT = EventWithObjectT<'dragstart'>
	type DragEventT = EventWithObjectT<'drag'>
	type DragEndEventT = EventWithObjectT<'dragend'>
	type HoverStartEventT = EventWithObjectT<'hoveron'>
	type HoverEndEventT = EventWithObjectT<'hoveroff'>

	type DragControlsPropsT = {
		isEnabled?: boolean
		axes: string
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

	let isCapsLocked = $derived(stores.input.isCapsLocked)
	let snapAmount = $derived(isCapsLocked ? 0.0005 : 0.01)

	const { camera, renderer, invalidate } = useThrelte()
	let props: DragControlsPropsT = $props()
	let isAxisEnabledX = $derived(props.axes.includes('x'))
	let isAxisEnabledY = $derived(props.axes.includes('y'))
	let isAxisEnabledZ = $derived(props.axes.includes('z'))
	let previousMousePosition = new THREE.Vector2()
	let controls = $state<DragControls>(null!)
	let draggableObjects = $state<THREE.Object3D[]>([])
	let previousPosition = new THREE.Vector3()
	let delta = new THREE.Vector3()
	let isEnabled = $derived(props.isEnabled)

	// Track initial drag state
	let initialIntersectPoint = new THREE.Vector3()
	let initialObjectOffset = new THREE.Vector3()
	let newPosition = new THREE.Vector3()

	const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0)) // XZ plane
	const raycaster = new THREE.Raycaster()
	const mouse = new THREE.Vector2()
	const intersectPoint = new THREE.Vector3()

	$effect(() => {
		if (!controls) return
		controls.enabled = !!isEnabled
	})

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
		previousMousePosition.set(stores.input.mouseX, stores.input.mouseY)
		props.onDragStart?.(event)
		invalidate()
	}

	const onDragEnd = (event: DragEndEventT) => {
		props.onDragEnd?.(event)
		invalidate()
	}

	const getLimitedPosition = (position: THREE.Vector3): THREE.Vector3 => {
		if (!props.dragLimits) return position
		const [xLimits, yLimits, zLimits] = props.dragLimits
		if (xLimits) position.x = Math.max(xLimits[0]!, Math.min(xLimits[1]!, position.x))
		if (yLimits) position.y = Math.max(yLimits[0]!, Math.min(yLimits[1]!, position.y))
		if (zLimits) position.z = Math.max(zLimits[0]!, Math.min(zLimits[1]!, position.z))
		return position
	}

	const onDragY = (event: DragEventT) => {
		const constrainedPosition = applyAxisConstraints(event.object.position)
		const limitedPosition = getLimitedPosition(constrainedPosition)
		limitedPosition.y = Math.floor(limitedPosition.y / snapAmount) * snapAmount

		event.object.position.copy(limitedPosition)
		delta.subVectors(limitedPosition, previousPosition)
		previousPosition.copy(limitedPosition)
		props.onDrag?.(event, delta)
		invalidate()
	}

	const onDrag = (event: DragEventT) => {
		previousMousePosition.set(stores.input.mouseX, stores.input.mouseY)
		if (isAxisEnabledY) return onDragY(event)
		onDragXZ(event)
	}

	const onDragXZ = (event: DragEventT) => {
		const intersectionPoint = getIntersectionPoint()
		newPosition.copy(intersectionPoint).add(initialObjectOffset)
		newPosition.y = previousPosition.y

		const constrainedPosition = applyAxisConstraints(newPosition)
		const limitedPosition = getLimitedPosition(constrainedPosition)
		limitedPosition.z = Math.floor(limitedPosition.z / snapAmount) * snapAmount
		limitedPosition.x = Math.floor(limitedPosition.x / snapAmount) * snapAmount

		event.object.position.copy(limitedPosition)
		delta.subVectors(limitedPosition, previousPosition)
		previousPosition.copy(limitedPosition)

		props.onDrag?.(event, delta)
		invalidate()
	}

	const onClickRight = debounce((event) => {
		props.onRightClick?.(event)
	}, 100)

	onMount(() => {
		if (props.target) draggableObjects.push(props.target)
		controls = new DragControls(draggableObjects, camera.current, renderer.domElement)

		renderer.domElement.addEventListener('contextmenu', onClickRight)

		controls.addEventListener('hoveron', onHoverStart)
		controls.addEventListener('hoveroff', onHoverEnd)
		controls.addEventListener('dragstart', onDragStart)
		// controls.addEventListener('rightclick', onRightClick)
		controls.addEventListener('dragend', onDragEnd)
		controls.addEventListener('drag', onDrag)
		props.onCreate?.(controls)
	})

	onDestroy(() => {
		controls?.dispose()
	})
</script>
