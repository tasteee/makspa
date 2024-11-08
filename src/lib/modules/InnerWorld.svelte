<script lang="ts">
	import { onDestroy, setContext, tick } from 'svelte'
	import { createRapierContext } from './createRapierContext'

	let {
		gravity = [0, -9.81, 0],
		rawIntegrationParameters,
		rawIslands,
		rawBroadPhase,
		rawNarrowPhase,
		rawBodies,
		rawColliders,
		rawImpulseJoints,
		rawMultibodyJoints,
		rawCCDSolver,
		rawQueryPipeline,
		rawPhysicsPipeline,
		rawSerializationPipeline,
		rawDebugRenderPipeline,
		framerate,
		autoStart = true,
		simulationStageOptions,
		synchronizationStageOptions,
		children
	} = $props()

	const rapierContext = createRapierContext(
		[
			{ x: gravity[0], y: gravity[1], z: gravity[2] },
			rawIntegrationParameters,
			rawIslands,
			rawBroadPhase,
			rawNarrowPhase,
			rawBodies,
			rawColliders,
			rawImpulseJoints,
			rawMultibodyJoints,
			rawCCDSolver,
			rawQueryPipeline,
			rawPhysicsPipeline,
			rawSerializationPipeline,
			rawDebugRenderPipeline
		],
		{
			framerate,
			autoStart,
			simulationStageOptions,
			synchronizationStageOptions
		}
	)

	setContext('threlte-rapier-context', rapierContext)

	$effect.pre(() => {
		if (gravity !== undefined) {
			rapierContext.world.gravity = { x: gravity[0], y: gravity[1], z: gravity[2] }
		}
	})

	$effect.pre(() => {
		if (framerate !== undefined) rapierContext.framerate.set(framerate)
	})

	onDestroy(async () => {
		await tick()
		rapierContext.world.free()
	})
</script>

{@render children?.()}
