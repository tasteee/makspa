import * as THREE from 'three'

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

export { getBottomMostPointY, getNegativeAdjustmentToZeroY, moveMeshToZeroY }
