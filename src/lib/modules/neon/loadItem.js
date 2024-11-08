import { T } from '@threlte/core'
import { useLoader } from '@threlte/core'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js'
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js'
import { TextureLoader } from 'three/src/loaders/TextureLoader.js'

// Function to create paths based on the item ID
const createPaths = (id) => ({
	object: `/vox/${id}.obj`,
	material: `/vox/${id}.mtl`,
	texture: `/vox/${id}.png`
})

// Promisified loader for materials, objects, and textures
export const loadItem = async (id) => {
	const paths = createPaths(id)
	const materialLoader = new MTLLoader()
	const objectLoader = new OBJLoader()
	const textureLoader = new TextureLoader()

	// Load material first, and return a promise
	const loadMaterial = () => {
		return new Promise((resolve, reject) => {
			materialLoader.load(paths.material, resolve, undefined, reject)
		})
	}

	// Load object with the materials, and return a promise
	const loadObjectWithMaterials = (materials) => {
		return new Promise((resolve, reject) => {
			materials.preload()
			objectLoader.setMaterials(materials)
			objectLoader.load(paths.object, resolve, undefined, reject)
		})
	}

	// Load texture and return a promise
	const loadTexture = () => {
		return new Promise((resolve, reject) => {
			textureLoader.load(paths.texture, resolve, undefined, reject)
		})
	}

	// Now execute the loaders in sequence
	const texture = await loadTexture()
	const materials = await loadMaterial()
	const object = await loadObjectWithMaterials(materials)

	// Apply the texture to the object
	object.traverse((child) => {
		if (child.isMesh) {
			child.material.map = texture
		}
	})

	return object // Return the fully loaded object with texture
}
