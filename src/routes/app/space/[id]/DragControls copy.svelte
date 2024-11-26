<script lang="ts">
	import * as THREE from 'three'
	import { onMount, onDestroy } from 'svelte'
	import { useThrelte } from '@threlte/core'
	import { DragControls } from 'three/examples/jsm/controls/DragControls'
	import createLogger from '../modules/hmu.svelte'

	const hmu = createLogger({
		key: 'DragControls',
		color: 'linear-gradient(to right, #000, #666)'
	})

	type Vector2 = [number, number]
	type MaybeVector2 = Vector2 | undefined

	type ObjectEventT = { object: THREE.Object3D }
	type EventWithObjectT<Name extends string> = THREE.Event<Name, DragControls> & ObjectEventT

	type DragStartEventT = EventWithObjectT<'dragstart'>
	type DragEventT = EventWithObjectT<'drag'>
	type DragEndEventT = EventWithObjectT<'dragend'>
	type HoverStartEventT = EventWithObjectT<'hoveron'>
	type HoverEndEventT = EventWithObjectT<'hoveroff'>

	type DragControlsPropsT = {
		isLoggingEnabled?: boolean
		isEnabled?: boolean
		target?: THREE.Object3D
		dragLimits?: [MaybeVector2, MaybeVector2, MaybeVector2]
		onHoverStart?: (event: HoverStartEventT) => void
		onHoverEnd?: (event: HoverEndEventT) => void
		onDragStart?: (event: DragStartEventT) => void
		onDragEnd?: (event: DragEndEventT) => void
		onDrag?: (event: DragEventT, delta: THREE.Vector3) => void
		onCreate?: (dragControls: DragControls) => void
	}

	const { camera, renderer, invalidate } = useThrelte()

	let props: DragControlsPropsT = $props()
	let controls = $state<DragControls>(null!)
	let draggableObjects = $state<THREE.Object3D[]>([])
	let previousPosition = new THREE.Vector3()
	let delta = new THREE.Vector3()
	let isEnabled = $derived(props.isEnabled)

	$effect(() => {
		if (!controls) return
		if (!isEnabled) controls.enabled = false
		if (isEnabled) controls.enabled = true
	})

	const onHoverStart = (event: HoverStartEventT) => {
		hmu.log('[onHoverStart]', event)
		props.onHoverStart?.(event)
		invalidate()
	}

	const onHoverEnd = (event: HoverEndEventT) => {
		hmu.log('[onHoverEnd]', event)
		props.onHoverEnd?.(event)
		invalidate()
	}

	const onDragStart = (event: DragStartEventT) => {
		hmu.log('[onDragStart]', event)
		previousPosition.copy(event.object.position)
		props.onDragStart?.(event)
		invalidate()
	}

	const onDragEnd = (event: DragEndEventT) => {
		hmu.log('[onDragEnd]', event)
		props.onDragEnd?.(event)
		invalidate()
	}

	const onDrag = (event: DragEventT) => {
		console.log('ON DRAG', event)
		hmu.log(222222, '[onDrag]', event)
		delta.subVectors(event.object.position, previousPosition)

		if (props.dragLimits) {
			const xy = props.dragLimits[0][1]
			const xx = props.dragLimits[0][0]
			const yy = props.dragLimits[1][1]
			const yx = props.dragLimits[1][0]
			const zy = props.dragLimits[2][1]
			const zx = props.dragLimits[2][0]
			const minX = Math.min(event.object.position.x, xy)
			const minY = Math.min(event.object.position.y, yy)
			const minZ = Math.min(event.object.position.z, zy)
			const maxX = Math.max(minX, xx)
			const maxY = Math.max(minY, yx)
			const maxZ = Math.max(minZ, zx)
			const positionX = props.dragLimits[0] ? maxX : event.object.position.x
			const positionY = props.dragLimits[1] ? maxY : event.object.position.y
			const positionZ = props.dragLimits[2] ? maxZ : event.object.position.z
			hmu.log('[object.position.set]', [positionX, positionY, positionZ])
			event.object.position.set(positionX, positionY, positionZ)
		}

		previousPosition.copy(event.object.position)
		props.onDrag?.(event, delta)
		invalidate()
	}

	onMount(() => {
		hmu.log('[onMount]')
		if (props.target) draggableObjects.push(props.target)
		controls = new DragControls(draggableObjects, camera.current, renderer.domElement)
		hmu.log('[dragControls]', controls)
		controls.addEventListener('hoveron', onHoverStart)
		controls.addEventListener('hoveroff', onHoverEnd)
		controls.addEventListener('dragstart', onDragStart)
		controls.addEventListener('dragend', onDragEnd)
		controls.addEventListener('drag', onDrag)
		hmu.log('[event listeners added]')
		props.onCreate?.(controls)
	})

	onDestroy(() => {
		hmu.log('[onDestroy]')
		controls?.dispose()
		controls = null
	})
</script>
