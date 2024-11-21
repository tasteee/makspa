import * as THREE from 'three'
import { useLoader } from '@threlte/core'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { useSuspense } from '@threlte/extras'

const getBottomMostPointY = (mesh: THREE.Mesh) => {
	const boundingBox = new THREE.Box3().setFromObject(mesh)
	const bottomY = boundingBox.min.y
	return bottomY
}

const getNegativeAdjustmentToZeroY = (mesh: THREE.Mesh) => {
	const bottomY = getBottomMostPointY(mesh)
	const adjustment = -bottomY
	return adjustment
}

const moveMeshToZeroY = (mesh: THREE.Mesh) => {
	const adjustment = getNegativeAdjustmentToZeroY(mesh)
	mesh.position.y += adjustment
}

const checkMeshAlignedAxis = (rotationDegrees: number) => {
	const THRESHOLD = 5
	const alignmentCase0 = rotationDegrees % 90 < THRESHOLD
	const alignmentCase1 = 90 - (rotationDegrees % 90) < THRESHOLD
	const isAligned = alignmentCase0 || alignmentCase1
	return isAligned
}

const getRotationYDegrees = (mesh: THREE.Mesh) => {
	const rotation = mesh.rotation.y
	const rotationDegrees = THREE.MathUtils.radToDeg(rotation)
	return rotationDegrees
}

const getCorrectedAlignmentRotationY = (rotationDegrees: number) => {
	const nearestRightAngle = Math.round(rotationDegrees / 90) * 90
	const correctedRotation = THREE.MathUtils.degToRad(nearestRightAngle)
	return correctedRotation
}

export const buildSceneGraph = (target: THREE.Object3D) => {
	const data = { nodes: {}, materials: {} }

	if (target) {
		target.traverse((object: THREE.Mesh) => {
			if (object.name) data.nodes[object.name] = object
			const material = object?.material as THREE.MeshStandardMaterial
			const hasMaterial = !!material
			if (!hasMaterial) return
			const isMaterialRegistered = data.materials[material?.name]
			console.log({ material, hasMaterial, isMaterialRegistered, object })
			if (!isMaterialRegistered) data.materials[material.name] = material
		})
	}

	return data
}

const getMeshDimensions = (gltfData) => {
	// Find the accessor for the POSITION attribute
	console.log({ gltfData })
	const positionAccessorIndex = gltfData.meshes[0].primitives[0].attributes.POSITION
	const positionAccessor = gltfData.accessors[positionAccessorIndex]

	// Get the min and max values from the accessor
	const { min, max } = positionAccessor

	if (!min || !max || min.length !== 3 || max.length !== 3) {
		throw new Error('Invalid POSITION accessor: min and max values are required and should have 3 components.')
	}

	// Calculate dimensions
	const xDimension = max[0] - min[0]
	const yDimension = max[1] - min[1]
	const zDimension = max[2] - min[2]

	return {
		x: xDimension,
		y: yDimension,
		z: zDimension
	}
}

const useGltf = (path: string) => {
	const loader = useLoader(GLTFLoader)

	const transform = (result) => {
		console.log({ result })
		const sceneGraph = buildSceneGraph(result.scene)
		let dimensions = getMeshDimensions(result)
		const gltf = { ...result, ...sceneGraph }
		return { gltf, dimensions }
	}

	return loader.load(path, { transform })
}

const calculateDimensionsFromScene = (scene: THREE.Object3D) => {
	const boundingBox = new THREE.Box3() // Initialize a global bounding box

	// Traverse the scene to find meshes
	scene.traverse((object) => {
		if (object.isMesh) {
			// Ensure the geometry is valid and calculate the local bounding box
			const mesh = object as THREE.Mesh
			const geometry = mesh.geometry

			if (geometry) {
				const localBoundingBox = new THREE.Box3().setFromObject(mesh)
				boundingBox.union(localBoundingBox) // Expand the global bounding box
			}
		}
	})

	// Calculate dimensions from the global bounding box
	const size = new THREE.Vector3()
	boundingBox.getSize(size)

	return {
		x: size.x,
		y: size.y,
		z: size.z
	}
}

export {
	getBottomMostPointY,
	getNegativeAdjustmentToZeroY,
	moveMeshToZeroY,
	checkMeshAlignedAxis,
	getRotationYDegrees,
	getCorrectedAlignmentRotationY,
	getMeshDimensions,
	useGltf,
	calculateDimensionsFromScene
}
