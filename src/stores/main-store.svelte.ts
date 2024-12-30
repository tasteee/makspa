import loaders from '~/stores/loaders.store.svelte'
import api from '~/database/api'
import u from '~/modules/utilities'
import { nanoid } from 'nanoid'
import camera from './camera.store.svelte'
import auth from './auth.store.svelte'
import debounce from 'just-debounce'
import { radiansToPercentage } from '~/modules/numbers'
import inputStore from './input.store.svelte'

const handleKeyPress = (key: string, handler: any) => {
	const outerHandler = (event) => {
		if (event.repeat) return
		console.log('key', key, event.key)
		if (event.key.toLowerCase() === key.toLowerCase()) handler()
	}

	window.addEventListener('keypress', outerHandler)
	return () => window.removeEventListener('keypress', outerHandler)
}

class MainStore {
	artist = $state(auth.authData)
	space = $state<SpaceT>({} as any)
	meshes = {}

	snapAmount = $state(0.05)
	isDragging = $state(false)
	selectedItemId = $state(null)
	hoveredItemId = $state(null)
	clickedItemId = $state(null)
	draggingItemId = $state(null)
	mouseDownItemId = $state(null)
	getSelectedItem = () => this.getItemById(this.selectedItemId)
	selectedItem = $derived.by(() => this.getSelectedItem())
	isItemSelected = $derived(() => !!this.selectedItemId)

	dragControlsAxes = $state('xz')
	dragControlsMode = $state('move')

	dragPositionLimits = $derived({
		x: { min: -24, max: 24 },
		y: { min: 0, max: 12 },
		z: { min: -24, max: 24 }
	})

	setUpMesh = (options) => {
		if (options.item.hasBeenSetUp) return
		const adjustment = u.three.getNegativeAdjustmentToZeroY(options.mesh)
		const newPositionY = options.item.positionY + adjustment
		const rotationDegrees = u.three.getRotationYDegrees(options.mesh)
		const correctedRotation = u.three.getCorrectedAlignmentRotationY(rotationDegrees)
		const updates = { id: options.item.id, rotationY: correctedRotation, positionY: newPositionY }
		options.item.hasBeenSetUp = true
		mainStore.updateItem(updates)
	}

	syncSpaceWithDatabase = debounce(() => {
		api.updateSpace(this.space)
	}, 1599)

	updateSpace = (updates: Partial<SpaceT>) => {
		this.space = { ...this.space, ...updates }
		this.syncSpaceWithDatabase()
	}

	getItemRotationPercentage = (value: number) => {
		const percentageValue = radiansToPercentage(value)
		const step = 5
		const final = Math.round(percentageValue / step) * step
		console.log(value, '-->', final)
		return final
	}

	loadSpace = async (spaceId: string) => {
		loaders.start('space')
		const [, space] = await api.getSpaceById(spaceId)
		this.space = space as any

		for (const key in space.items) {
			const item = space.items[key]
			item.isScaleLinked = true
		}

		loaders.stop('space')
	}

	subscribeToSpace = () => {
		const onUpdate = (space) => {
			console.log('SUBSCRIPTION UPDATE SPACE!!!! ', space)
		}

		api.subscribeToSpace({
			id: this.space.id,
			onUpdate
		})
	}

	reset = () => {
		this.meshes = {}
		this.space.items = {}
		this.selectedItemId = null
		this.hoveredItemId = null
		this.clickedItemId = null
	}

	getItemById = (id: string) => this.space?.items?.[id]
	saveMesh = (id: string, mesh: any) => (this.meshes[id] = mesh)
	getMesh = (id: string) => this.meshes[id]

	addItemFromModel = (model: any) => {
		const item = { ...model, ...DEFAULT_ITEM } as any
		item.id = nanoid()
		item.model = model.id
		item.sizeX = u.number.sizeToScale(item.sizeX)
		item.sizeY = u.number.sizeToScale(item.sizeY)
		item.sizeZ = u.number.sizeToScale(item.sizeZ)
		item.modelUrl = '/models/' + model.file + `?id=${item.id}`
		item.hasBeenSetUp = false
		this.space.items[item.id] = item
		this.selectItem(item.id)
		this.syncSpaceWithDatabase()
		return item.id
	}

	cloneItem = (id: string) => {
		const targetItem = this.space.items[id]
		const [modelUrl] = targetItem.modelUrl.split('?')
		const item = { ...targetItem }
		const newId = nanoid()
		item.id = newId
		item.positionX += 0.25
		item.positionZ += 0.25
		item.modelUrl = `${modelUrl}?id=${newId}`
		this.space.items[newId] = item
		this.selectItem(newId)
		this.syncSpaceWithDatabase()
	}

	updateItem = ({ id, ...updates }) => {
		const item = this.space.items[id]
		this.space.items[id] = { ...item, ...updates }
		this.syncSpaceWithDatabase()
	}

	deleteItem = (id: string) => {
		delete this.meshes[id]
		delete this.space.items[id]
		if (this.selectedItemId === id) this.deselectItem()
		this.syncSpaceWithDatabase()
	}

	selectItem = (id: string) => {
		this.selectedItemId = id
		camera.moveToItem(id)
	}

	deselectItem = () => {
		this.selectedItemId = null
	}

	updateSpaceKey = (key: string) => (value: boolean | string | number) => {
		this.updateSpace({ [key]: value })
	}
}

const mainStore = new MainStore()
globalThis.mainStore = mainStore
export default mainStore

const DEFAULT_ITEM = {
	mass: 10,
	opacity: 100,
	tint: '#FFFFFF',
	positionX: 0,
	positionY: 0,
	positionZ: 0,
	rotationX: 0,
	rotationY: 0,
	rotationZ: 0,
	scaleX: 1,
	scaleY: 1,
	scaleZ: 1,
	glowColor: '#ffffff',
	glowIntensity: 1,
	glowDistance: 1,
	glowThreshold: 50,
	glowPositionX: 0,
	glowPositionY: 0,
	glowPositionZ: 0,
	isObstructive: false,
	isGlowing: false,
	isVisible: true
}
