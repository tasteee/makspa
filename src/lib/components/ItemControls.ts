import {
	Camera,
	CylinderGeometry,
	Group,
	Mesh,
	MeshStandardMaterial,
	Object3D,
	Plane,
	Quaternion,
	Raycaster,
	TorusGeometry,
	Vector2,
	Vector3,
	WebGLRenderer
} from 'three'
import * as THREE from 'three'
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js'

// Constants
const SELECT_COLOR = 0xaaaa00
const DEFAULT_COLOR = 0x0055aa
const ARROW_RADIUS = 0.025
const ARROW_HEIGHT = 0.05
const ARROW_SEGMENTS = 20
const TORUS_SEGMENTS = 64
const TORUS_TUBE_SEGMENTS = 10
const TORUS_TUBE_RADIUS = ARROW_RADIUS / 5

// Cartesian basis vectors
const EX = new Vector3(1, 0, 0)
const EY = new Vector3(0, 1, 0)
const EZ = new Vector3(0, 0, 1)

// Helper functions
const createArrow = (radius: number, axis: Vector3, angle: number, plane: Plane) => {
	const arrow = new CylinderGeometry(0.0, ARROW_RADIUS, ARROW_HEIGHT, ARROW_SEGMENTS)
	arrow.translate(0, ARROW_HEIGHT * 1.5, 0)
	const base = new CylinderGeometry(ARROW_RADIUS / 5, ARROW_RADIUS / 5, ARROW_HEIGHT, ARROW_SEGMENTS)
	base.translate(0, ARROW_HEIGHT / 2, 0)
	const geometry = mergeGeometries([base, arrow])
	geometry.translate(0, radius || 0, 0)

	const material = new MeshStandardMaterial({
		color: DEFAULT_COLOR,
		wireframe: false,
		clippingPlanes: [plane],
		depthWrite: false,
		depthTest: false,
		transparent: true
	})

	const mesh = new Mesh(geometry, material)
	const q = new Quaternion().setFromAxisAngle(axis, angle)
	mesh.applyQuaternion(q)
	mesh.name = 'arrow'
	return mesh
}

const createTorus = (radius: number, axis: Vector3, angle: number, plane: Plane) => {
	const geometry = new TorusGeometry(radius, TORUS_TUBE_RADIUS, TORUS_TUBE_SEGMENTS, TORUS_SEGMENTS)
	const material = new MeshStandardMaterial({
		color: DEFAULT_COLOR,
		wireframe: false,
		clippingPlanes: [plane],
		depthWrite: false,
		depthTest: false,
		transparent: true
	})

	const mesh = new Mesh(geometry, material)
	const q = new Quaternion().setFromAxisAngle(axis, angle)
	mesh.applyQuaternion(q)
	mesh.name = 'torus'
	return mesh
}

class HelperGroup extends Group {
	radius: number
	pA: Vector3
	pB: Vector3
	dir: Vector3
	radial: Vector3
	normal: Vector3
	q: Quaternion
	selected: boolean
	colorArr: number[]

	constructor(radius: number) {
		super()
		this.radius = radius
		this.pA = new Vector3()
		this.pB = new Vector3()
		this.dir = new Vector3()
		this.radial = new Vector3()
		this.normal = new Vector3()
		this.q = new Quaternion()
		this.selected = false
		this.colorArr = []
	}

	select() {
		if (this.selected) return
		this.colorArr = []
		this.children.forEach((child: Mesh) => {
			this.colorArr.push(child.material.color.getHex())
			child.material.color.setHex(SELECT_COLOR)
		})
		this.selected = true
	}

	unselect() {
		if (!this.selected) return
		this.children.forEach((child: Mesh, index: number) => {
			child.material.color.setHex(this.colorArr[index])
		})
		this.selected = false
	}
}

class TorusGroup extends HelperGroup {
	speed: number

	constructor(radius: number, plane: Plane) {
		super(radius)
		this.speed = 10.0
		this.add(createTorus(radius, new Vector3(0, 0, 1), Math.PI / 2, plane))
		this.name = 'torusGroup'
	}

	move(pointerA: Vector3, pointerB: Vector3, camera: Camera, ipoint: Vector3) {
		this.pA.copy(pointerA).unproject(camera)
		this.pB.copy(pointerB).unproject(camera)

		const q = new Quaternion()
		const p = new Vector3()
		this.matrixWorld.decompose(p, q, new Vector3(1, 1, 1))

		this.normal.copy(EZ).applyQuaternion(q)
		this.radial.copy(ipoint).sub(p).projectOnPlane(this.normal).normalize().multiplyScalar(this.radius)
		this.dir.copy(this.normal).cross(this.radial)

		const d = this.pB.sub(this.pA).multiplyScalar(this.speed).length() * Math.sign(this.pB.dot(this.dir))
		this.q.setFromAxisAngle(this.normal, d)
		this.parent.parent.applyQuaternion(this.q)
	}
}

class ArrowGroup extends HelperGroup {
	speed: number

	constructor(radius: number, plane: Plane) {
		super(radius)
		this.speed = 1
		this.add(createArrow(radius, new Vector3(0, 0, 1), Math.PI / 2, plane))
		this.add(createArrow(radius, new Vector3(0, 0, 1), -Math.PI / 2, plane))
		this.name = 'arrowGroup'
	}

	move(pointerA: Vector3, pointerB: Vector3, camera: Camera) {
		this.pA.copy(pointerA).unproject(camera)
		this.pB.copy(pointerB).unproject(camera)

		this.q = new Quaternion()
		this.p = new Vector3()
		this.matrixWorld.decompose(this.p, this.q, new Vector3(1, 1, 1))

		this.dir.copy(EX).applyQuaternion(this.q)
		const d = this.pB.sub(this.pA).multiplyScalar(this.speed).length() * Math.sign(this.pB.dot(this.dir))
		this.dir.multiplyScalar(d)
		this.parent.parent.position.add(this.dir)
	}
}

class ControlEvents extends Object3D {
	camera: Camera
	renderer: WebGLRenderer
	debug: boolean
	domElement: HTMLCanvasElement
	va: Vector2
	vb: Vector2
	startPointer: Vector3
	ipoint: Vector3
	q: Quaternion
	p: Vector3
	n: Vector3
	plane: Plane
	raycaster: Raycaster
	current: HelperGroup | undefined
	isTap: boolean

	constructor(camera: Camera, renderer: WebGLRenderer) {
		super()
		this.camera = camera
		this.renderer = renderer
		this.renderer.localClippingEnabled = true
		this.domElement = renderer.domElement
		this.domElement.style.touchAction = 'none'
		this.va = new Vector2()
		this.vb = new Vector2()
		this.q = new Quaternion()
		this.p = new Vector3()
		this.n = new Vector3()
		this.plane = new Plane(new Vector3(0, 0, 1.0), 0.0)
		this.raycaster = new Raycaster()
		this.debug = false
		this.isTap = false

		this.init()
	}

	init() {
		this.domElement.addEventListener('pointerdown', this.onPointerDown.bind(this))
		this.domElement.addEventListener('pointermove', this.onMouseMove.bind(this))
	}

	dispose() {
		this.domElement.removeEventListener('pointerdown', this.onPointerDown.bind(this))
		this.domElement.removeEventListener('pointermove', this.onMouseMove.bind(this))
	}

	getPointer(event: PointerEvent) {
		const rect = this.domElement.getBoundingClientRect()
		return new Vector3(
			((event.clientX - rect.left) / rect.width) * 2 - 1,
			(-(event.clientY - rect.top) / rect.height) * 2 + 1,
			this.getScreenZ(this.camera)
		)
	}

	getScreenZ(camera: Camera) {
		if (camera.isPerspectiveCamera) {
			const e = camera.matrixWorldInverse.elements
			const z = e[14] / e[15]
			const pe = camera.projectionMatrix.elements
			return (pe[10] * z + pe[14]) / (pe[11] * z + pe[15])
		} else if ((camera as any).isOrthographicCamera) {
			return ((camera as any).near + (camera as any).far) / ((camera as any).near - (camera as any).far)
		}
		return 0
	}

	onPointerDown(event: PointerEvent) {
		// if (this.debug) console.log('onPointerDown')
		this.isTap = true
		this.domElement.setPointerCapture(event.pointerId)
		const pointer = this.getPointer(event)
		this.startPointer = pointer

		if (this.intersect(pointer)) {
			this.domElement.addEventListener('pointermove', this.onPointerMove.bind(this))
			this.domElement.addEventListener('pointerup', this.onPointerUp.bind(this))
		}
	}

	onPointerUp(event: PointerEvent) {
		if (this.debug) console.log('onPointerUp')
		this.startPointer = undefined
		this.ipoint = undefined
		this.domElement.releasePointerCapture(event.pointerId)
		this.domElement.removeEventListener('pointermove', this.onPointerMove.bind(this))
		this.domElement.removeEventListener('pointerup', this.onPointerUp.bind(this))

		if (!this.isTap) {
			this.hoverClear()
			return
		}
		this.onTap(event)
	}

	onMouseMove(event: PointerEvent) {
		if (event.pressure === 0) {
			const pointer = this.getPointer(event)
			this.intersect(pointer)
		}
		this.isTap = false
	}

	onPointerMove(event: PointerEvent) {
		const pointer = this.getPointer(event)
		if (this.current && this.current.move) {
			this.current.move(this.startPointer, pointer, this.camera, this.ipoint)
		}
		this.startPointer = pointer
		// if (this.debug) console.log('onPointerMove')
		this.isTap = false
	}

	onTap(event: PointerEvent) {
		// if (this.debug) console.log('onTap')
	}

	intersect(pointer: Vector3) {
		this.raycaster.setFromCamera(pointer, this.camera)
		const intersects = this.raycaster.intersectObjects(this.children, true)
		if (intersects.length > 0) {
			this.ipoint = intersects[0].point
			this.hover(intersects)
			return true
		} else {
			this.hoverClear()
			return false
		}
	}

	hover(intersects: THREE.Intersection[]) {
		const item = intersects[0].object.parent
		if (item instanceof HelperGroup) {
			this.hoverClear()
			item.select()
			this.current = item
		}
	}

	hoverClear() {
		if (this.current && this.current.unselect) {
			this.current.unselect()
		}
		this.current = undefined
	}

	update() {
		this.n.set(0, 0, 1).applyQuaternion(this.camera.quaternion)
		this.plane.normal.copy(this.n)
		this.matrixWorld.decompose(this.p, this.q, new Vector3(1, 1, 1))
		this.plane.constant = -this.n.dot(this.p)
	}
}

class AtomiControls extends ControlEvents {
	radius: number
	torusN: TorusGroup
	torusZ: TorusGroup
	torusY: TorusGroup
	torusX: TorusGroup
	arrowX: ArrowGroup
	arrowY: ArrowGroup
	arrowZ: ArrowGroup

	constructor(camera: Camera, renderer: WebGLRenderer, radius: number = 0.2) {
		super(camera, renderer)
		this.radius = radius

		this.torusN = new TorusGroup(this.radius, this.plane)
		this.torusN.children[0].material.color.setHex(0x999999)
		this.torusN.name = 'torusN'
		this.add(this.torusN)

		this.torusZ = new TorusGroup(this.radius, this.plane)
		this.torusZ.name = 'torusZ'
		this.add(this.torusZ)

		this.torusY = new TorusGroup(this.radius, this.plane)
		this.torusY.applyQuaternion(new Quaternion().setFromAxisAngle(EX, Math.PI / 2))
		this.torusY.name = 'torusY'
		this.add(this.torusY)

		this.torusX = new TorusGroup(this.radius, this.plane)
		this.torusX.applyQuaternion(new Quaternion().setFromAxisAngle(EY, Math.PI / 2))
		this.torusX.name = 'torusX'
		this.add(this.torusX)

		this.arrowX = new ArrowGroup(this.radius, this.plane)
		this.arrowX.name = 'arrowX'
		this.add(this.arrowX)

		this.arrowY = new ArrowGroup(this.radius, this.plane)
		this.arrowY.applyQuaternion(new Quaternion().setFromAxisAngle(EZ, Math.PI / 2))
		this.arrowY.name = 'arrowY'
		this.add(this.arrowY)

		this.arrowZ = new ArrowGroup(this.radius, this.plane)
		this.arrowZ.applyQuaternion(new Quaternion().setFromAxisAngle(EY, -Math.PI / 2))
		this.arrowZ.name = 'arrowZ'
		this.add(this.arrowZ)
	}

	update() {
		super.update()
		this.position.copy(this.parent.position)
		this.quaternion.copy(this.parent.quaternion)
		this.scale.copy(this.parent.scale)
	}

	setRadius(radius: number) {
		this.radius = radius
		this.children.forEach((child) => {
			if (child instanceof HelperGroup) {
				child.radius = radius
				child.children.forEach((grandChild) => {
					if (grandChild instanceof Mesh) {
						grandChild.scale.setScalar(radius / 0.2)
					}
				})
			}
		})
	}

	setVisible(visible: boolean) {
		this.visible = visible
	}

	dispose() {
		super.dispose()
		this.children.forEach((child) => {
			if (child instanceof HelperGroup) {
				child.children.forEach((grandChild) => {
					if (grandChild instanceof Mesh) {
						grandChild.geometry.dispose()
						grandChild.material.dispose()
					}
				})
			}
		})
	}
}
