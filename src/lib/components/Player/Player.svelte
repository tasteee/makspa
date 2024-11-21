<script lang="ts">
	import type { RigidBody as RapierRigidBody } from '@dimforge/rapier3d-compat'
	import { T, useTask, useThrelte } from '@threlte/core'
	import { RigidBody, CollisionGroups, Collider } from '@threlte/rapier'
	import { onDestroy } from 'svelte'
	import { PerspectiveCamera, Vector3 } from 'three'
	import PointerLockControls from '../Camera/PointerLockControls.svelte'

	let props = $props()
	const initialPosition = props.position || [0, 0, 0]
	let position: VectorList3 = $state(initialPosition)
	let radius = props.radius || 0.3
	let height = props.height || 1.7
	let speed = props.speed || 6

	let lockControl = $state(null)
	let rigidBody: RapierRigidBody = $state(null)
	let camera: PerspectiveCamera = $state(null)
	let forward = $state(0)
	let backward = $state(0)
	let left = $state(0)
	let right = $state(0)
	const vector = new Vector3()
	const lockControls = () => lockControl()

	const { renderer } = useThrelte()

	renderer.domElement.addEventListener('click', lockControls)

	onDestroy(() => {
		renderer.domElement.removeEventListener('click', lockControls)
	})

	useTask(() => {
		if (!rigidBody) return
		// get direction
		const velVec = vector.fromArray([right - left, 0, backward - forward])
		// sort rotate and multiply by speed
		velVec.applyEuler(camera.rotation).multiplyScalar(speed)
		// don't override falling velocity
		const linVel = rigidBody.linvel()
		vector.y = linVel.y
		// finally set the velocities and wake up the body
		rigidBody.setLinvel(vector, true)

		// when body position changes update position prop for camera
		const pos = rigidBody.translation()
		position = [pos.x, pos.y, pos.z]
	})

	function onKeyDown(e: KeyboardEvent) {
		switch (e.key) {
			case 's':
				backward = 1
				break
			case 'w':
				forward = 1
				break
			case 'a':
				left = 1
				break
			case 'd':
				right = 1
				break
			default:
				break
		}
	}

	function onKeyUp(e: KeyboardEvent) {
		switch (e.key) {
			case 's':
				backward = 0
				break
			case 'w':
				forward = 0
				break
			case 'a':
				left = 0
				break
			case 'd':
				right = 0
				break
			default:
				break
		}
	}
</script>

<svelte:window on:keydown|preventDefault={onKeyDown} on:keyup={onKeyUp} />

<T.Group position.y={0.9}>
	<T.PerspectiveCamera
		makeDefault
		fov={90}
		bind:ref={camera}
		position.x={position[0]}
		position.y={position[1]}
		position.z={position[2]}
		oncreate={({ ref }) => {
			ref.lookAt(new Vector3(0, 2, 0))
		}}
	>
		<PointerLockControls bind:lock={lockControl} />
	</T.PerspectiveCamera>
</T.Group>

<T.Group {position}>
	<RigidBody bind:rigidBody {position} enabledRotations={[false, false, false]}>
		<CollisionGroups groups={[0]}>
			<Collider shape={'capsule'} args={[height / 2 - radius, radius]} />
		</CollisionGroups>

		<CollisionGroups groups={[15]}>
			<T.Group position={[0, -height / 2 + radius, 0]}>
				<Collider sensor shape={'ball'} args={[radius * 1.2]} />
			</T.Group>
		</CollisionGroups>
	</RigidBody>
</T.Group>
