import { Controls, Matrix4, Plane, Raycaster, Vector2, Vector3, MOUSE, TOUCH } from 'three'

const MOUSE_BUTTONS = { LEFT: MOUSE.PAN, MIDDLE: MOUSE.PAN, RIGHT: MOUSE.RIGHT }

const MOUSE_ACTIONS = {
	0: MOUSE_BUTTONS.LEFT,
	1: MOUSE_BUTTONS.MIDDLE,
	2: MOUSE_BUTTONS.RIGHT
}

const STATE = {
	NONE: -1,
	PAN: 0,
	ROTATE: -1
}

const PLANE = new Plane()
const POINTER = new Vector2()
const OFFSET = new Vector3()
const DIFF = new Vector2()
const PREVIOUSPOINTER = new Vector2()
const INTERSECTION = new Vector3()
const WORLD_POSITION = new Vector3()
const INVERSE_MATRIX = new Matrix4()
const UP_VECTOR = new Vector3()
const RIGHT_VECTOR = new Vector3()
const INTERSECTIONS = []
let selectedObject = null
let hoveredObject = null

class DragControls extends Controls {
	controlMode = 'move'
	controlAxes = 'xz'
	recursive = true
	transformGroup = false
	rotateSpeed = 0.05
	raycaster = new Raycaster()
	mouseButtons = MOUSE_BUTTONS
	touches = { ONE: TOUCH.PAN }

	constructor(objects, camera, domElement = null) {
		super(camera, domElement)
		this.objects = objects
		if (domElement !== null) this.connect()
	}

	connect() {
		this.domElement.addEventListener('pointermove', this.onPointerMove)
		this.domElement.addEventListener('pointerdown', this.onPointerDown)
		this.domElement.addEventListener('pointerup', this.onPointerCancel)
		this.domElement.addEventListener('pointerleave', this.onPointerCancel)
		this.domElement.addEventListener('contextmenu', this.onContextMenu)
		this.domElement.style.touchAction = 'none' // disable touch scroll
	}

	dispose() {
		this.domElement.removeEventListener('pointermove', this.onPointerMove)
		this.domElement.removeEventListener('pointerdown', this.onPointerDown)
		this.domElement.removeEventListener('pointerup', this.onPointerCancel)
		this.domElement.removeEventListener('pointerleave', this.onPointerCancel)
		this.domElement.removeEventListener('contextmenu', this.onContextMenu)
		this.domElement.style.touchAction = 'auto'
		this.domElement.style.cursor = ''
	}

	updatePointer = (event) => {
		const rect = this.domElement.getBoundingClientRect()
		POINTER.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
		POINTER.y = (-(event.clientY - rect.top) / rect.height) * 2 + 1
	}

	updateState = (event) => {
		const action = MOUSE_ACTIONS[event.button] || null
		this.state = STATE.NONE
		if (action === MOUSE.PAN) this.state = STATE.PAN
		if (action === MOUSE.ROTATE) this.state = STATE.ROTATE
		const shouldEnableAxisY = this.state === STATE.PAN
		this.enableYAxisMovement = shouldEnableAxisY
	}

	onPointerMove = (event) => {
		// If right clicking, do nothing.
		if (event.button === 2) return
		if (!this.enabled) return

		const camera = this.object
		const domElement = this.domElement
		const raycaster = this.raycaster

		this.updatePointer(event)
		raycaster.setFromCamera(POINTER, camera)

		const isPan = this.state === STATE.PAN && this.controlMode === 'move'
		const isRotate = this.controlMode === 'rotate'

		if (selectedObject) {
			if (isPan) {
				if (raycaster.ray.intersectPlane(PLANE, INTERSECTION)) {
					selectedObject.position.copy(INTERSECTION.sub(OFFSET).applyMatrix4(INVERSE_MATRIX))
					// selectedObject.position.divideScalar(0.1).floor().multiplyScalar(0.25).addScalar(0.05)
					// selectedObject.position.x = Math.floor(selectedObjecZt.position.x / 0.1) * 0.1 + 0.05
					// selectedObject.position.z = Math.floor(selectedObject.position.z / 0.1) * 0.1 + 0.05
					// selectedObject.position.y = 0.05
				}
			}

			if (isRotate) {
				DIFF.subVectors(POINTER, PREVIOUSPOINTER).multiplyScalar(this.rotateSpeed)
			}

			this.dispatchEvent({ event, type: 'drag', object: selectedObject })
			PREVIOUSPOINTER.copy(POINTER)
		} else {
			const isMouse = event.pointerType === 'mouse'
			const isPen = event.pointerType === 'pen'

			if (isMouse || isPen) {
				INTERSECTIONS.length = 0

				raycaster.setFromCamera(POINTER, camera)
				raycaster.intersectObjects(this.objects, this.recursive, INTERSECTIONS)

				if (INTERSECTIONS.length > 0) {
					const object = INTERSECTIONS[0].object

					PLANE.setFromNormalAndCoplanarPoint(
						camera.getWorldDirection(PLANE.normal),
						WORLD_POSITION.setFromMatrixPosition(object.matrixWorld)
					)

					if (hoveredObject !== object && hoveredObject !== null) {
						this.dispatchEvent({ type: 'hoveroff', object: hoveredObject })

						domElement.style.cursor = 'auto'
						hoveredObject = null
					}

					if (hoveredObject !== object) {
						this.dispatchEvent({ type: 'hoveron', object: object })

						domElement.style.cursor = 'pointer'
						hoveredObject = object
					}
				} else {
					if (hoveredObject !== null) {
						this.dispatchEvent({ type: 'hoveroff', object: hoveredObject })

						domElement.style.cursor = 'auto'
						hoveredObject = null
					}
				}
			}
		}

		PREVIOUSPOINTER.copy(POINTER)
	}

	onPointerDown = (event) => {
		if (event.button === 2) {
			// return this.dispatchRightClick(event, this.dispatchEvent)
			return
		}

		const camera = this.object
		const domElement = this.domElement
		const raycaster = this.raycaster

		if (this.enabled === false) return

		this.updatePointer(event)
		this.updateState(event)

		INTERSECTIONS.length = 0

		raycaster.setFromCamera(POINTER, camera)
		raycaster.intersectObjects(this.objects, this.recursive, INTERSECTIONS)

		if (INTERSECTIONS.length > 0) {
			if (this.transformGroup === true) {
				// look for the outermost group in the object's upper hier = findGroup(INTERSECTIONS[0].object)
			} else {
				selectedObject = INTERSECTIONS[0].object
			}

			PLANE.setFromNormalAndCoplanarPoint(
				camera.getWorldDirection(PLANE.normal),
				WORLD_POSITION.setFromMatrixPosition(selectedObject.matrixWorld)
			)

			if (raycaster.ray.intersectPlane(PLANE, INTERSECTION)) {
				if (this.state === STATE.PAN) {
					INVERSE_MATRIX.copy(selectedObject.parent.matrixWorld).invert()
					OFFSET.copy(INTERSECTION).sub(WORLD_POSITION.setFromMatrixPosition(selectedObject.matrixWorld))
				} else if (this.state === STATE.ROTATE) {
					// the controls only support Y+ up
					UP_VECTOR.set(0, 1, 0).applyQuaternion(camera.quaternion).normalize()
					RIGHT_VECTOR.set(1, 0, 0).applyQuaternion(camera.quaternion).normalize()
				}
			}

			domElement.style.cursor = 'move'

			this.dispatchEvent({ event, type: 'dragstart', object: selectedObject })
		}

		PREVIOUSPOINTER.copy(POINTER)
	}

	onPointerCancel = () => {
		if (this.enabled === false) return

		if (selectedObject) {
			this.dispatchEvent({ type: 'dragend', object: selectedObject })
			selectedObject = null
		}

		this.domElement.style.cursor = hoveredObject ? 'pointer' : 'auto'
		this.state = STATE.NONE
	}

	onContextMenu = (event) => {
		if (this.enabled === false) return
		event.preventDefault()
	}
}

function findGroup(obj, group = null) {
	if (obj.isGroup) group = obj
	if (obj.parent === null) return group
	return findGroup(obj.parent, group)
}

export { DragControls }
