const store = $state({
	position: [0, 0.5, 0],
	velocity: [0, 0, 0],
	isAirborne: false,
	moveSpeed: 0.1,
	jumpForce: 0.3,
	gravity: 0.01
})

type PlayerState = {
	position: number[]
	velocity: number[]
	isJumping: boolean
	moveSpeed: number
	jumpForce: number
	gravity: number
}

const setPosition = (position: number[]) => {
	store.position = position
}

const setVelocity = (velocity: number[]) => {
	store.velocity = velocity
}

const jump = (isJumping: boolean) => {
	store.isAirborne = isJumping
}

const final = {
	setPosition,
	setVelocity,
	jump,

	get state() {
		return store
	}
}

export default final
globalThis.playerStore = final
