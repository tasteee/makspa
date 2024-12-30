<script lang="ts">
	import { T } from '@threlte/core'
	import * as THREE from 'three'
	import { onMount, onDestroy } from 'svelte'

	type PropsT = {
		color?: string
		intensity?: number
		positionX?: number
		positionY?: number
		positionZ?: number
		shouldCastShadows?: boolean

		helperSize?: number
		helperColor?: string
		shouldShowHelper?: boolean

		shouldShowMarker?: boolean
		shouldShowDirection?: boolean
	}

	let props: PropsT = $props()
	let helper = $state(null)
	let arrowHelper = $state(null)
	let light = new THREE.DirectionalLight()

	$effect(() => {
		light.color = new THREE.Color(props.color)
		light.position.x = props.positionX
		light.position.y = props.positionY
		light.position.z = props.positionZ
		light.castShadow = props.shouldCastShadows
	})

	$effect(() => {
		if (!props.shouldShowHelper) return
		if (helper) return
		helper = new THREE.DirectionalLightHelper(light, props.helperSize, props.helperColor)
	})

	$effect(() => {
		if (!props.shouldShowDirection) return
		if (arrowHelper) return

		const direction = new THREE.Vector3(0, 0, -1)
		const origin = new THREE.Vector3(0, 0, 0)
		const length = 5
		const arrowColor = 0xffff00

		arrowHelper = new THREE.ArrowHelper(direction, origin, length, arrowColor)
	})
</script>

<T.Group position.x={props.positionX} position.y={props.positionY} position.z={props.positionZ}>
	<T is={light} />

	{#if props.shouldShowHelper && helper}
		<T is={helper} />
	{/if}

	{#if props.shouldShowMarker}
		<T.Mesh>
			<T.SphereGeometry args={[0.5, 32, 32]} />
			<T.MeshBasicMaterial color={props.helperColor || '#ffffff'} />
		</T.Mesh>
	{/if}

	{#if props.shouldShowDirection}
		<T is={arrowHelper} />
	{/if}
</T.Group>
