<script lang="ts">
	import { useTask, useThrelte } from '@threlte/core'
	import { BlendFunction, EffectComposer, EffectPass, OutlineEffect, RenderPass } from 'postprocessing'
	import { onMount } from 'svelte'
	import * as THREE from 'three'

	type PropsT = {
		target: THREE.Mesh
	}

	let { target }: PropsT = $props()
	const { scene, renderer, camera, size, autoRender, renderStage } = useThrelte()
	const composer = new EffectComposer(renderer)

	const setupEffectComposer = (camera: THREE.Camera, target: THREE.Mesh) => {
		composer.removeAllPasses()
		composer.addPass(new RenderPass(scene, camera))

		const outlineEffect = new OutlineEffect(scene, camera, {
			blendFunction: BlendFunction.ALPHA,
			edgeStrength: 100,
			pulseSpeed: 0.0,
			visibleEdgeColor: 0xffffff,
			hiddenEdgeColor: 0x9900ff,
			xRay: true,
			blur: true
		})

		if (target !== undefined) {
			outlineEffect.selection.add(target)
		}

		composer.addPass(new EffectPass(camera, outlineEffect))
	}

	onMount(() => {
		let before = autoRender.current
		autoRender.set(false)
		setupEffectComposer(camera.current, target)
		composer.setSize(size.current.width, size.current.height)
		return () => {
			autoRender.set(before)
		}
	})

	useTask(
		(delta) => {
			composer.render(delta)
		},
		{ stage: renderStage, autoInvalidate: false }
	)
</script>
