<script lang="ts">
	import { T, useTask } from '@threlte/core'
	import { BoxHelper, Object3D } from 'three'

	type PropsT = {
		target: Object3D
		color?: string
		isVisible?: boolean
		positionY: number
	}

	let props: PropsT = $props()
	let boxHelper = $state(null)
	let target = $derived(props.target)
	let isVisible = $derived(props.isVisible ?? true)
	let color = $derived(props.color ?? '#eb4f27')
	let positionY = $derived(props.positionY)

	const disposer = () => {
		if (boxHelper) {
			boxHelper.geometry.dispose()
		}
	}

	// Create the box helper when target changes
	$effect(() => {
		if (target) {
			const helper = new BoxHelper(target, color)
			helper.visible = isVisible
			helper.update()
			boxHelper = helper
			return disposer
		}
	})

	// Update visibility when isVisible changes
	$effect(() => {
		if (boxHelper) {
			boxHelper.visible = isVisible
		}
	})

	// Update color when color changes
	$effect(() => {
		if (boxHelper) {
			boxHelper.material.color.set(color)
		}
	})

	// Update the box helper every frame
	useTask(() => {
		if (boxHelper && target) {
			boxHelper.update()
		}
	})
</script>

{#if boxHelper}
	<T is={boxHelper} />
{/if}
