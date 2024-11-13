import { onDestroy, onMount } from 'svelte'
import { useTask } from '@threlte/core'
import type { RigidBody } from '@dimforge/rapier3d-compat'
import { Vector3 } from 'three'

const MOVE_KEYS = ['w', 'a', 's', 'd']
const MOVEMENT_FORCE = 10
const JUMP_FORCE = 5

let position = $state({ x: 0, y: 1, z: 0 })
let rigidBody: RigidBody | null = $state(null)
let isOnGround = $state(true)

let directionalKeysPressed = $state({
	w: false,
	a: false,
	s: false,
	d: false
})

const handleKeyDown = (event: KeyboardEvent) => {
	const key = event.key.toLowerCase()
	const isSpace = key === ' '
	const isMoveKey = MOVE_KEYS.includes(key)
	const isJump = isSpace && isOnGround
	if (isMoveKey) directionalKeysPressed[key] = true
	if (isJump) jump()
}

const handleKeyUp = (event: KeyboardEvent) => {
	const key = event.key.toLowerCase()
	const isMoveKey = MOVE_KEYS.includes(key)
	if (isMoveKey) directionalKeysPressed[key] = false
}

const jump = () => {
	if (rigidBody && isOnGround) {
		const impulse = new Vector3(0, JUMP_FORCE, 0)
		rigidBody.applyImpulse(impulse, true)
		isOnGround = false
	}
}

const movePlayer = () => {
	if (!rigidBody) return

	const movement = new Vector3()

	if (directionalKeysPressed.w) {
		movement.x -= 1
		movement.z -= 1
	}
	if (directionalKeysPressed.s) {
		movement.x += 1
		movement.z += 1
	}
	if (directionalKeysPressed.a) {
		movement.x -= 1
		movement.z += 1
	}
	if (directionalKeysPressed.d) {
		movement.x += 1
		movement.z -= 1
	}

	movement.normalize().multiplyScalar(MOVEMENT_FORCE)
	rigidBody.applyImpulse({ x: movement.x, y: 0, z: movement.z }, true)
}

export const usePlayerStore = () => {
	useTask(() => {
		if (rigidBody) {
			const translation = rigidBody.translation()
			position = { x: translation.x, y: translation.y, z: translation.z }

			// Check if player is on ground
			const raycastResult = rigidBody.world.castRay(
				{ x: translation.x, y: translation.y, z: translation.z },
				{ x: translation.x, y: translation.y - 0.6, z: translation.z },
				true
			)
			isOnGround = raycastResult !== null
		}
		movePlayer()
	})

	onMount(() => {
		window.addEventListener('keydown', handleKeyDown)
		window.addEventListener('keyup', handleKeyUp)
	})

	onDestroy(() => {
		window.removeEventListener('keydown', handleKeyDown)
		window.removeEventListener('keyup', handleKeyUp)
	})

	return {
		get position() {
			return position
		},
		get isOnGround() {
			return isOnGround
		},

		get rigidBody() {
			return rigidBody
		},

		set rigidBody(value: RigidBody) {
			// console.log('setting ridigBody ', value)
			rigidBody = value
		}
	}
}
