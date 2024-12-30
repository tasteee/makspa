<script lang="ts">
	import { onMount, onDestroy } from 'svelte'
	import inputStore from '~/stores/input.store.svelte'
	import { T } from '@threlte/core'
	import BoundingBox from '~/modules/BoundingBox.svelte'
	import { percentageToRadians } from '~/modules/numbers'
	import DragControls from '~/modules/DragControls.svelte'
	import { useModel } from '~/modules/useModel.svelte'
	import mainStore from '~/stores/main-store.svelte'
	import cameraStore from '~/stores/camera.store.svelte'
	import audioStore from '~/stores/audio-store.svelte'
	import { type PropsT, useItemStore } from './Item-store.svelte'

	let props: PropsT = $props()
	let store = useItemStore(props)
	let rotation = $derived([props.item.rotationX, props.item.rotationY, props.item.rotationZ])
	let scale = $derived([props.item.scaleX, props.item.scaleY, props.item.scaleZ])
	let position = $derived([props.item.positionX, props.item.positionY, props.item.positionZ])

	// svelte-ignore state_referenced_locally
	const gltf = useModel(props.item.modelUrl)

	onMount(() => {
		window.addEventListener('keydown', store.handlers.keyDown)
		if (!props.item.hasBeenSetUp) audioStore.playClip('itemAdd')
	})

	onDestroy(() => {
		window.removeEventListener('keydown', store.handlers.keyDown)
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
		bind:ref={store.mesh}
		onclick={store.handlers.click}
		onpointerdown={store.handlers.pointerDown}
		onpointerup={store.handlers.pointerUp}
		onpointerover={store.handlers.hoverStart}
		onpointerout={store.handlers.hoverEnd}
		oncontextmenu={store.handlers.rightClick}
		{position}
		{rotation}
		{scale}
		oncreate={store.setUpMesh}
	/>

	{#if store.mesh}
		<DragControls
			isEnabled={store.isSelected}
			axes={store.dragAxes}
			onDragStart={store.handlers.dragStart}
			onDragEnd={store.handlers.dragEnd}
			onDrag={store.handlers.drag}
			target={store.mesh}
		/>
	{/if}
{/await}

{#if store.mesh && store.isSelected}
	<BoundingBox target={store.mesh} positionY={position[1]} />
{/if}
