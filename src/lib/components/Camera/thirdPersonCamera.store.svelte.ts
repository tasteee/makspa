import * as THREE from 'three'
import store from '../../stores/store.svelte'
import throttle from 'just-throttle'

const FIFTEEN_DEGREES = THREE.MathUtils.degToRad(15)
const MINUS_FIFTEEN_DEGREES = THREE.MathUtils.degToRad(-15)
const V2 = new THREE.Vector2(0, 0)
class ThirdPersonCameraStore {
	player = $state<THREE.Mesh>(null)
	camera = $state<THREE.PerspectiveCamera>(null)
	isPointerLocked = $state(false)
	playerPosition = $state(new THREE.Vector3(0, 0, 0))
	playerRotation = $state(new THREE.Euler(0, 0, 0))
	cameraRotation = $state({ yaw: 0, pitch: FIFTEEN_DEGREES })
	cameraOffset = $state(new THREE.Vector3(0, 3, -8))

	movement = $state({
		velocity: new THREE.Vector3(),
		verticalVelocity: 0,
		isJumping: false,
		canDoubleJump: false
	})

	config = $state({
		rotationSpeed: 0.003,
		movementSpeed: 0.1,
		gravity: -0.005,
		jumpForce: 0.15,
		groundLevel: 0.4,
		cameraPitchDamping: 0.05
	})

	keys = $state({
		forward: false,
		backward: false,
		left: false,
		right: false
	})

	raycaster = $state(new THREE.Raycaster())
	intersectedObject = $state<THREE.Object3D | null>(null)

	updateMovement = () => {
		const moveDirection = new THREE.Vector3()

		if (this.keys.forward) moveDirection.z += 1
		if (this.keys.backward) moveDirection.z -= 1
		if (this.keys.left) moveDirection.x += 1
		if (this.keys.right) moveDirection.x -= 1

		if (moveDirection.length() > 0) {
			moveDirection.normalize()
			moveDirection.applyEuler(new THREE.Euler(0, this.cameraRotation.yaw, 0))
			this.playerPosition.addScaledVector(moveDirection, this.config.movementSpeed)
		}

		// Apply gravity and update vertical position
		this.movement.verticalVelocity += this.config.gravity
		this.playerPosition.y += this.movement.verticalVelocity

		// Ground collision
		if (this.playerPosition.y <= this.config.groundLevel) {
			this.playerPosition.y = this.config.groundLevel
			this.movement.verticalVelocity = 0
			this.movement.isJumping = false
		}
	}

	updateCamera = () => {
		if (!this.camera) return

		const offset = new THREE.Vector3()
			.copy(this.cameraOffset)
			.applyEuler(new THREE.Euler(this.cameraRotation.pitch, this.cameraRotation.yaw, 0, 'YXZ'))

		this.camera.position.copy(this.playerPosition).add(offset)
		this.camera.lookAt(this.playerPosition)
	}

	updatePlayer = () => {
		if (!this.player) return
		this.player.position.copy(this.playerPosition)
		this.playerRotation.y = this.cameraRotation.yaw
		this.player.setRotationFromEuler(this.playerRotation)
	}

	jump = () => {
		const isGrounded = this.playerPosition.y <= this.config.groundLevel + 0.01

		if (isGrounded) {
			this.movement.verticalVelocity = this.config.jumpForce
			this.movement.isJumping = true
			this.movement.canDoubleJump = true
		} else if (this.movement.canDoubleJump) {
			this.movement.verticalVelocity = this.config.jumpForce
			this.movement.canDoubleJump = false
		}
	}

	handleKeyUp = (event: KeyboardEvent) => {
		console.log(event.code, event.key, event.which)
		const isTab = event.code === 'Tab'
		const isW = event.code === 'KeyW'
		const isS = event.code === 'KeyS'
		const isA = event.code === 'KeyA'
		const isD = event.code === 'KeyD'
		if (isTab) this.togglePointerLock(event)
		if (isW) this.keys.forward = false
		if (isS) this.keys.backward = false
		if (isA) this.keys.left = false
		if (isD) this.keys.right = false
	}

	togglePointerLock = (event: KeyboardEvent) => {
		event.preventDefault()
		event.stopPropagation()
		if (this.isPointerLocked) {
			document.exitPointerLock()
		} else {
			document.body.requestPointerLock()
		}
	}

	handleKeyDown = (event: KeyboardEvent) => {
		const isW = event.code === 'KeyW'
		const isS = event.code === 'KeyS'
		const isA = event.code === 'KeyA'
		const isD = event.code === 'KeyD'
		const isSpace = event.code === 'Space'
		const isE = event.code === 'KeyE'
		if (isE) this.handleClick()
		if (isW) this.keys.forward = true
		if (isS) this.keys.backward = true
		if (isA) this.keys.left = true
		if (isD) this.keys.right = true
		if (isSpace) this.jump()
	}

	handlePointerLock = () => {
		if (!this.isPointerLocked) {
			document.body.requestPointerLock()
		}
	}

	updatePointerLockState = () => {
		this.isPointerLocked = document.pointerLockElement !== null
	}

	handleMouseMove = (event: MouseEvent) => {
		if (!this.isPointerLocked) return
		this.cameraRotation.yaw -= event.movementX * this.config.rotationSpeed
		// Add pitch control if you want vertical looking
		// this.cameraRotation.pitch = Math.max(
		//     MINUS_FIFTEEN_DEGREES,
		//     Math.min(FIFTEEN_DEGREES,
		//     this.cameraRotation.pitch + event.movementY * this.config.rotationSpeed)
		// )
	}

	updateCarriedItem() {
		if (this.carriedItem) {
			// Update carried item position
			const carryPosition = new THREE.Vector3()
			carryPosition.copy(this.playerPosition)

			// Calculate position in front of player based on camera rotation
			const offset = this.carryOffset.clone().applyEuler(new THREE.Euler(0, this.cameraRotation.yaw, 0))

			carryPosition.add(offset)
			this.carriedItem.position.copy(carryPosition)

			// Update carried item rotation to match camera
			this.carriedItem.rotation.y = this.cameraRotation.yaw
			return
		}
	}

	checkIntersections = throttle(() => {
		if (!store.itemsGroup) return
		if (!store.itemMeshes.length) return

		if (!this.camera || !this.isPointerLocked) {
			if (this.intersectedObject) this.intersectedObject = null
			return
		}

		this.raycaster.setFromCamera(V2, this.camera)
		const itemsMeshes = store.getItemMeshes()
		const intersects = this.raycaster.intersectObjects(itemsMeshes)

		if (intersects.length > 0 && intersects[0].distance <= this.maxCarryDistance) {
			console.log('INTERSECTION!!!!', intersects, itemsMeshes)
			let object = intersects[0].object
			while (object.parent && !object.userData.uid) {
				object = object.parent
			}
			console.log('Found intersection with:', object.userData.uid)
			this.intersectedObject = object
		}
	}, 100)

	carriedItem = $state<THREE.Object3D | null>(null)
	maxCarryDistance = $state(10) // Maximum distance to pick up items
	carryOffset = $state(new THREE.Vector3(0, 0.25, 0)) // Offset in front of player

	handleClick = () => {
		const uid = this.intersectedObject?.userData?.uid
		if (!this.isPointerLocked || !this.intersectedObject) return

		if (this.carriedItem) {
			this.carriedItem = null
			return
		}

		if (uid) {
			this.carriedItem = this.intersectedObject
			store.selectItem(uid)
		}
	}
}

const thirdPersonCameraStore = new ThirdPersonCameraStore()
export default thirdPersonCameraStore
globalThis.thirdPersonCameraStore = thirdPersonCameraStore
