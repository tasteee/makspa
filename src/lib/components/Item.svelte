<script>
	import { T } from '@threlte/core'
	import { TransformControls } from '@threlte/extras'
	import { Vector3 } from 'three'
	import { useCursor } from '@threlte/extras'
	import { useGltf, useSuspense } from '@threlte/extras'
	import store from '../stores/store.svelte'

	let { uid } = $props()
	const cursor = useCursor()
	let item = $derived(store.findItem(uid))
	let isSelected = $derived(store.checkItemSelected(uid))
	let group = $state(null)
	let model = $state(null)
	let controls = $state(null)
	let initialPosition = $state(null)
	const suspend = useSuspense()
	const gltf = suspend(useGltf(item.file))

	let scaleMultiplier = $derived(cursor.hovering ? 1.5 : 1)
	let position = $derived([item.position_x, item.position_y, item.position_z])
	let rotation = $derived([item.rotation_x, item.rotation_y, item.rotation_z])
	let baseScale = $derived([item.scale_x, item.scale_y, item.scale_z])
	let scale = $derived(baseScale.map((s) => s * scaleMultiplier))
	let shouldRenderControls = $derived(isSelected && group)

	function handleClick(event) {
		event.stopPropagation()
		store.selectItem(uid)
	}

	function onObjectChange(event) {
		const position = event.target.object.position
		store.updateItem(uid, {
			position_x: position.x,
			position_y: position.y,
			position_z: position.z
		})
	}

	$effect(() => {
		if (controls && group) {
			controls.position.set(item.position_x, item.position_y, item.position_z)
			group.position.set(0, 0, 0) // Reset group position to origin
		}
	})
</script>

{#await gltf then { scene }}
	{#if !shouldRenderControls}
		<T.Group
			bind:ref={group}
			{position}
			{rotation}
			{scale}
			onpointerenter={cursor.onPointerEnter}
			onpointerleave={cursor.onPointerLeave}
			onclick={handleClick}
		>
			<T is={scene} bind:ref={model} />
		</T.Group>
	{/if}

	{#if shouldRenderControls}
		<TransformControls
			object={group}
			bind:controls
			mode="translate"
			translationSnap={0.5}
			autoPauseOrbitControls
			scaleSnap={0.5}
			rotationSnap={15}
			onobjectChange={onObjectChange}
		>
			<T.Group
				bind:ref={group}
				{position}
				{rotation}
				{scale}
				onpointerenter={cursor.onPointerEnter}
				onpointerleave={cursor.onPointerLeave}
			>
				<T is={scene} bind:ref={model} />
			</T.Group>
		</TransformControls>
	{/if}
{/await}
