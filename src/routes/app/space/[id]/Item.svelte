<script lang="ts">
	import * as THREE from 'three'
	import { onMount } from 'svelte'
	import inputStore from '~/stores/input.store.svelte'
	import { T } from '@threlte/core'
	import BoundingBox from '~/modules/BoundingBox.svelte'
	import { percentageToRadians, radiansToPercentage } from '~/modules/numbers'
	import DragControls from '~/modules/DragControls.svelte'
	import { useModel } from '~/modules/useModel.svelte'
	import mainStore from '~/stores/main-store.svelte'
	import cameraStore from '~/stores/camera.store.svelte'
	import audioStore from '~/stores/audio-store.svelte'
	import HeightLines from '~/modules/HeightLines.svelte'
	import { withMinMax } from '~/modules/withMinMax'

	type PropsT = {
		item: ItemT
	}

	let mesh = $state(null)
	let props: PropsT = $props()
	let isDragging = $state(false)
	let isMouseDown = $state(false)
	let mouseDownTime = $state(0)

	// svelte-ignore state_referenced_locally
	let gltf = useModel(props.item.modelUrl)
	let isSelected = $derived(mainStore.selectedItemId === props.item.id)
	let position = $derived([props.item.positionX, props.item.positionY, props.item.positionZ])
	let scale = $derived([props.item.scaleX, props.item.scaleY, props.item.scaleZ])

	let rotation = $derived([
		percentageToRadians(props.item.rotationX),
		percentageToRadians(props.item.rotationY),
		percentageToRadians(props.item.rotationZ)
	])

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
		audioStore.playDragSound()
		const maxX = mainStore.space.sizeX / 2 + 0.5
		const minX = -maxX
		const positionX = withMinMax(minX, maxX, event.object.position.x)
		const maxY = mainStore.space.sizeY / 2
		const minY = -maxY
		const positionY = withMinMax(minY, maxY, event.object.position.y)
		const maxZ = mainStore.space.sizeZ / 2 + 0.5
		const minZ = -maxZ
		const positionZ = withMinMax(minZ, maxZ, event.object.position.z)
		const scaleX = event.object.scale.x
		const scaleY = event.object.scale.y
		const scaleZ = event.object.scale.z
		const rotationX = Math.round(radiansToPercentage(event.object.rotation.x))
		const rotationY = Math.round(radiansToPercentage(event.object.rotation.y))
		const rotationZ = Math.round(radiansToPercentage(event.object.rotation.z))

		mainStore.updateItem({
			id: props.item.id,
			positionX,
			positionY,
			positionZ,
			scaleX,
			scaleY,
			scaleZ,
			rotationX,
			rotationY,
			rotationZ
		})
	}

	const handleHoverStart = (event) => {
		if (inputStore.isMouseDown) return
		event.stopPropagation()
		const amount = isSelected ? 0.1 : 0.05
		event.object.material.emissive.set('#ffffff')
		event.object.material.emissiveIntensity = amount
		event.object.material.emissive.opacity = amount
		audioStore.playClip('itemHover')
	}

	const handleHoverEnd = (event) => {
		event.stopPropagation()
		event.object.material.emissive.set(0, 0, 0)
	}

	const handleClick = (event) => {
		event.stopPropagation()
		event?.preventDefault?.()
		if (isDragging) return
		if (isSelected) return
	}

	const handlePointerDown = () => {
		if (isSelected) return
		isMouseDown = true
		mouseDownTime = Date.now()
	}

	const handlePointerUp = (event) => {
		audioStore.playClip('itemSelect')
		event?.stopPropagation?.()
		event?.preventDefault?.()
		if (isSelected) return
		const clickDuration = Date.now() - mouseDownTime
		const wasMouseDown = !!isMouseDown
		isMouseDown = false
		if (!wasMouseDown || clickDuration > 400) return
		mainStore.selectItem(props.item.id)
	}

	onMount(() => {
		audioStore.playClip('itemAdd')
	})

	$effect(() => {
		if (!isSelected) return
	})

	const getMeshFromGltfData = (data) => {
		if (data.scene) return data.scene.children[0]
		if (data.v) return data.v.scene.children[0]
	}
</script>

{#await gltf then data}
	<T.Mesh
		is={getMeshFromGltfData(data)}
		castShadow
		receiveShadow
		bind:ref={mesh}
		onclick={handleClick}
		onpointerdown={handlePointerDown}
		onpointerup={handlePointerUp}
		onpointerover={handleHoverStart}
		onpointerout={handleHoverEnd}
		oncreate={() => mainStore.setUpMesh({ item: props.item, mesh })}
		{position}
		{rotation}
		{scale}
	/>
{/await}

{#if mesh && isSelected}
	<BoundingBox target={mesh} positionY={position[1]} />
	<HeightLines positionX={position[0]} positionY={position[1]} positionZ={position[2]} target={mesh} />
	<DragControls onDragStart={handleDragStart} onDragEnd={handleDragEnd} onDrag={handleDrag} target={mesh} />
{/if}

<!-- <SheFlex gap="12px"> -->
<!-- <SheButtonGroup> -->
<!-- <SheButton size="large" kind="dark">Rotate</SheButton>
    <SheButton size="large" kind="dark">Tilt</SheButton>
    <SheButton size="large" kind="dark">Lean</SheButton>
    <SheButton size="large" kind="dark">Paint</SheButton> -->

<!-- <SheIcon class="rotateCurveIcon" library="iconoir" icon="arc-3d"></SheIcon> -->

<!-- <SheIconButton class="rotateCurveIcon" kind="mid" library="material-symbols" icon="line-curve-rounded"
    ></SheIconButton>
    <SheIconButton class="tiltCurveIcon" kind="mid" library="material-symbols" icon="line-curve-rounded"
    ></SheIconButton>
    <SheIconButton class="leanCurveIcon" kind="mid" library="material-symbols" icon="line-curve-rounded"
    ></SheIconButton> -->
<!-- 
    <SheIconButton kind="mid" library="si" icon="up-down-fill"></SheIconButton>
    <SheIconButton kind="mid" library="si" icon="left-right-fill"></SheIconButton>
    <SheIconButton kind="mid" library="mingcute" icon="rotate-x-fill"></SheIconButton>
    <SheIconButton kind="mid" library="mingcute" icon="rotate-y-line"></SheIconButton>
    <SheIconButton kind="mid" library="mingcute" icon="rotate-x-line"></SheIconButton>
    <SheIconButton kind="mid" library="lineicons" icon="brush-1-rotated"></SheIconButton> -->
<!-- </SheButtonGroup> -->
<!-- </SheFlex> -->
