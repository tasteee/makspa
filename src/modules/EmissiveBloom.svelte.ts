import './styles.css'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

import { SelectiveBloom } from './js/SelectiveBloom'
import { DatGUI } from './js/DatGUI'

let scene = new THREE.Scene()
let camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000)
camera.position.set(0, 0, 2)
let renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.toneMapping = THREE.ReinhardToneMapping
document.body.appendChild(renderer.domElement)

let controls = new OrbitControls(camera, renderer.domElement)
controls.target.set(0, 0.5, 0)
controls.update()

let selectiveBloom = new SelectiveBloom(scene, camera, renderer)
new DatGUI(renderer, selectiveBloom)

let light = new THREE.DirectionalLight()
light.position.setScalar(1)
scene.add(light, new THREE.AmbientLight(0xffffff, 0.5))

let model
let mixer
let loader = new GLTFLoader()
loader.load('https://cywarr.github.io/small-shop/Egg.glb', (gltf) => {
	model = gltf.scene.getObjectByName('Egg_with_Animation')
	model.userData = {
		color: new THREE.Color().copy(model.material.color)
	}

	mixer = new THREE.AnimationMixer(gltf.scene)
	mixer.clipAction(gltf.animations[0]).play()

	scene.add(model)
})

let clock = new THREE.Clock()

window.addEventListener('resize', onResize)
renderer.setAnimationLoop(() => {
	let delta = clock.getDelta()
	if (mixer) mixer.update(delta)

	if (model) {
		model.material.color.set(0x000000)
	}
	renderer.setClearColor(0x000000)
	selectiveBloom.bloomComposer.render()
	if (model) {
		model.material.color.copy(model.userData.color)
	}
	renderer.setClearColor(0x102040)
	selectiveBloom.finalComposer.render()
})

function onResize() {
	camera.aspect = window.innerWidth / window.innerHeight
	camera.updateProjectionMatrix()
	renderer.setSize(window.innerWidth, window.innerHeight)
	selectiveBloom.bloomComposer.setSize(window.innerWidth, window.innerHeight)
	selectiveBloom.finalComposer.setSize(window.innerWidth, window.innerHeight)
}
