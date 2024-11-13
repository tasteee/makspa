// MovementControls.ts
import { TransformControls } from 'three/examples/jsm/controls/TransformControls'
import * as THREE from 'three'

export class MovementControls extends TransformControls {
	constructor(camera: THREE.Camera, domElement?: HTMLElement) {
		super(camera, domElement)

		this.setSize(0.75)
		this.showX = true
		this.showY = false
		this.showZ = true
	}

	setMode(mode: string) {
		super.setMode(mode)

		// Customize the gizmo here
		if (this.gizmo) {
			this.gizmo.traverse((child: THREE.Object3D) => {
				if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshBasicMaterial) {
					if (child.name.includes('X')) {
						child.material.color.setHex(0xff5900)
					} else if (child.name.includes('Y')) {
						child.material.color.setHex(0xff9c59)
					} else if (child.name.includes('Z')) {
						child.material.color.setHex(0xffc800)
					}
				}
			})
		}
	}
}
