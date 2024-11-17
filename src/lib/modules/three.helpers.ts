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

export {
	getBottomMostPointY,
	getNegativeAdjustmentToZeroY,
	moveMeshToZeroY,
	checkMeshAlignedAxis,
	getRotationYDegrees,
	getCorrectedAlignmentRotationY
}
