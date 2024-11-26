import { useLoader } from '@threlte/core'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js'
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js'
import { TextureLoader } from 'three/src/loaders/TextureLoader.js'

import { T } from '@threlte/core'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import * as THREE from 'three'
import u from './utilities'

const loader = new GLTFLoader()

export const loadModelJSON = async (url: string): Promise<any> => {
	const response = await fetch(url)
	if (!response.ok) throw new Error(`ERROR loading GLTF ${url}: ${response.statusText}`)
	const data = await response.json()
	return data
}

type LoadModelReturnT = { model: THREE.Group; dimensions: { x: number; y: number; z: number } }

export const loadModel = async (url: string): Promise<LoadModelReturnT> => {
	const json = await loadModelJSON(url)
	const dimensions = u.meshes.getDimensionsFromGLTF(json)
	const arrayBuffer = JSON.stringify(json)

	const model = await new Promise<THREE.Group>((resolve, reject) => {
		const onLoad = (gltf) => resolve(gltf.scene)
		const onError = (error) => reject(error)
		loader.parse(arrayBuffer, '', onLoad, onError)
	})

	return { model, dimensions }
}

// Function to create paths based on the item ID
const createPaths = (id) => ({
	object: `/vox/${id}.obj`,
	material: `/vox/${id}.mtl`,
	texture: `/vox/${id}.png`
})

// Promisified loader for materials, objects, and textures
export const loadObject = async (id) => {
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
	const texturePromise = loadTexture()
	const materialsPromise = loadMaterial()
	const objectPromise = loadObjectWithMaterials(materials)
	const promises = [texturePromise, materialsPromise, objectPromise]
	const [texture, materials, object] = await Promise.all(promises)

	// Apply the texture to the object
	object.traverse((child) => {
		if (child.isMesh) {
			child.material.map = texture
		}
	})

	return object // Return the fully loaded object with texture
}
