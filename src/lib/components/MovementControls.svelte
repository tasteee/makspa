<!-- MovementControlsWrapper.svelte -->
<script lang="ts">
	import { T, useTask, useThrelte } from '@threlte/core'
	import { AtomiControls } from './ItemControls'

	let {
		mode,
		translationSnap,
		scaleSnap,
		rotationSnap,
		rotationSnapThreshold,
		scaleSnapThreshold,
		translationSnapThreshold,
		onobjectChange,
		autoPauseOrbitControls,
		children
	} = $props()

	let controls = $state(null)
	const { camera, scene, renderer } = useThrelte()

	$effect(() => {
		if (!controls && camera && scene) {
			controls = new AtomiControls(camera, renderer.domElement)
			controls.addEventListener('objectChange', onobjectChange)
		}

		return () => {
			if (controls) {
				controls.removeEventListener('objectChange', onobjectChange)
				controls.dispose()
			}
		}
	})

	$effect(() => {
		if (controls) {
			controls.mode = mode
			controls.translationSnap = translationSnap
			controls.scaleSnap = scaleSnap
			controls.rotationSnap = rotationSnap
			controls.rotationSnapThreshold = rotationSnapThreshold
			controls.scaleSnapThreshold = scaleSnapThreshold
			controls.translationSnapThreshold = translationSnapThreshold
		}
	})

	useTask(() => {
		if (controls) {
			controls.update()
		}
	})
</script>

<T
	is={AtomiControls}
	bind:ref={controls}
	args={[]}
	mode={mode || 'translate'}
	translationSnap={translationSnap || 0.025}
	scaleSnap={scaleSnap || 0.025}
	rotationSnap={rotationSnap || 0.025}
	rotationSnapThreshold={rotationSnapThreshold || 0.025}
	scaleSnapThreshold={scaleSnapThreshold || 0.025}
	translationSnapThreshold={translationSnapThreshold || 0.025}
	{autoPauseOrbitControls}
	{onobjectChange}
/>
