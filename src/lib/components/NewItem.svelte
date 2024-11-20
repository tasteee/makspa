<script lang="ts">
	import { T } from '@threlte/core'
	import { onMount } from 'svelte'
	import { useGltf, useSuspense } from '@threlte/extras'
	import store from '../stores/store.svelte'
	import { useThrelte } from '@threlte/core'
	import { windowEvent } from '../modules/windowEvent'
	import BoundingBox from './Helpers/BoundingBox.svelte'
	import * as helpers from '../modules/three.helpers'
	import cameraStore from './Camera/camera.store.svelte'
	import * as THREE from 'three'
	import { percentageToRadians, radiansToPercentage } from '../modules/numbers'
	import * as FreeformControls from 'three-freeform-controls' // Import the custom controls

	type PropsT = { uid: string }

	const { camera, renderer } = useThrelte()
	let cameraControls = cameraStore.isometric.controls
	let props: PropsT = $props()
	let item = $derived.by(() => store.findItem(props.uid) || {})
	let isSelected = $derived.by(() => store.checkIsItemSelected(props.uid))
	let mesh = $state(null)
	let controls = $state(null) // Placeholder for custom controls
	const suspend = useSuspense()
	const gltfUrl = item.file + `?uid=${props.uid}`
	const gltf = suspend(useGltf(gltfUrl))

	let position = $derived.by(() => [item.position_x, item.position_y, item.position_z])

	let rotation = $derived.by(() => [
		percentageToRadians(item.rotation_x),
		percentageToRadians(item.rotation_y),
		percentageToRadians(item.rotation_z)
	])
	let scale = $derived.by(() => [item.scale_x, item.scale_y, item.scale_z])

	function handleObjectChange() {
		if (!mesh) return
		const { position, rotation, scale } = mesh

		store.updateItem(props.uid, {
			position_x: position.x,
			position_y: position.y,
			position_z: position.z,
			rotation_x: radiansToPercentage(rotation.x),
			rotation_y: radiansToPercentage(rotation.y),
			rotation_z: radiansToPercentage(rotation.z),
			scale_x: scale.x,
			scale_y: scale.y,
			scale_z: scale.z
		})
	}

	$effect(() => {
		if (!isSelected || !mesh) return
		if (!controls) {
			console.log(camera.current, renderer.domElement)
			const cm = new FreeformControls.ControlsManager(camera.current, renderer.domElement)
			// cm.translationSnap = 0.02
			// cm.rotationSnap = 0.02
			// cm.scaleSnap = 0.02

			// cm.addEventListener('change', handleObjectChange)

			// Attach to your scene or camera as needed
			console.log(cm)

			// anchor controls to the box
			controls = cm.anchor(mesh, {
				snapTranslation: {
					x: true,
					y: false,
					z: true
				}
			})
			controls.showByNames(
				[
					FreeformControls.DEFAULT_HANDLE_GROUP_NAME.XR,
					FreeformControls.DEFAULT_HANDLE_GROUP_NAME.YR,
					FreeformControls.DEFAULT_HANDLE_GROUP_NAME.ZR,
					FreeformControls.DEFAULT_HANDLE_GROUP_NAME.ER
				],
				true
			)

			controls.attach(mesh)
			controls.enabled = true

			// const xHandleLabel = new SpriteText("x-axis (snap)", 0.3);
			// const yHandleLabel = new SpriteText("y-axis", 0.3);
			// const zHandleLabel = new SpriteText("z-axis (snap)", 0.3);
			// xHandleLabel.position.x = 3;
			// yHandleLabel.position.y = 3;
			// zHandleLabel.position.z = 3;
			// controls.add(xHandleLabel);
			// controls.add(yHandleLabel);
			// controls.add(zHandleLabel);

			// disable orbit controls while the freeform-controls are in use
			// controlsManager.listen(FreeformControls.EVENTS.DRAG_START, () => {
			//   orbitControls.enabled = false;
			// });
			// controlsManager.listen(FreeformControls.EVENTS.DRAG_STOP, () => {
			//   orbitControls.enabled = true;
			// });
		}

		// controls.enabled = isSelected // Enable or disable based on selection
	})

	onMount(() => {
		if (controls) controls.attach(mesh)
	})
</script>

{#await gltf then data}
	<T is={data.scene.children[0]} {position} {rotation} {scale} castShadow receiveShadow bind:ref={mesh} />
{/await}

{#if isSelected && controls}
	<BoundingBox target={mesh} positionY={position[1]} />
{/if}
