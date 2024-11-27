import loaders from '~/stores/loaders.store.svelte'
import api from '~/database/api'
import u from '~/modules/utilities'
import { nanoid } from 'nanoid'
import camera from './camera.store.svelte'
import auth from './auth.store.svelte'
import { colord } from '~/modules/colors'
import debounce from 'just-debounce'

class MainStore {
	artist = $state(auth.authData)
	space = $state<SpaceT>(null)
	items = $state<ItemMapT>({})
	itemIds = $derived(Object.keys(this.items))
	objects = {}
	selectedItemId = $state(null)
	hoveredItemId = $state(null)
	clickedItemId = $state(null)
	getHoveredItem = () => this.getItemById(this.hoveredItemId)
	getSelectedItem = () => this.getItemById(this.selectedItemId)
	getClickedItem = () => this.getItemById(this.clickedItemId)
	hoveredItem = $derived.by(() => this.getHoveredItem())
	selectedItem = $derived.by(() => this.getSelectedItem())
	clickedItem = $derived.by(() => this.getClickedItem())
	isItemSelected = $derived(() => !!this.selectedItemId)

	midColor = $derived.by(() => {
		if (!this.space.color) return '#777777'
		const lch = colord(this.space.color).toLch()
		lch.l = 50
		return colord(lch).toHex()
	})

	saveArtistData = (data: ArtistT) => {
		this.artist = data
	}

	syncSpaceWithDatabase = debounce(() => {
		// console.log('syncing')
		api.updateSpace({
			...this.space,
			items: this.items
		})
	}, 500)

	syncSpaceItemsWithDatabase = debounce(() => {
		// console.log('syncing')
		api.updateSpace({
			id: this.space.id,
			items: this.items
		})
	}, 500)

	updateSpace = (updates: Partial<SpaceT>) => {
		// console.log('updating space', updates)
		this.space = { ...this.space, ...updates }
		this.syncSpaceWithDatabase()
	}

	navigateToSpaceView = (spaceId: string) => {
		window.location.assign(`/app/space/${spaceId}`)
	}

	enterSpace = async (spaceId: string) => {
		// console.log('entering space', spaceId)
		const fullSpace = await this.loadSpace(spaceId)
		// console.log('loadedspace', fullSpace)
		const { items, ...space } = fullSpace
		this.space = space
		this.items = items
	}

	exitSpace = () => {
		// console.log('exiting space')
		this.space = null
		window.location.assign('/app/home')
	}

	loadSpaces = async () => {
		const [error, spaces] = await api.getSpacesByArtistId(this.artist.id)
		// console.log('loaded spaces', this.artist.id, spaces)
		return spaces
	}

	loadSpace = async (spaceId: string) => {
		loaders.start('space')
		const [error, space] = await api.getSpaceById(spaceId)
		if (!error) console.log('loadSpace results: ', space)
		if (error) throw error
		loaders.stop('space')

		return space
	}

	addItemRotationPercentage = (id: string, axis: 'x' | 'y' | 'z', amount: number) => {
		const propertyName = `rotation${axis.toUpperCase()}`
		const newAmount = this.items[id][propertyName] + amount
		const normalized = newAmount > 99.99999999 ? 0 : newAmount < 0.00001 ? 100 : newAmount
		this.updateItem({ id, [propertyName]: normalized })
	}

	subscribeToSpace = () => {
		const onUpdate = (space) => {
			console.log('SUBSCRIPTION UPDATE SPACE!!!! ', space)
		}

		console.log('SUBSCRIBING TO SPACE')

		api.subscribeToSpace({
			id: this.space.id,
			onUpdate
		})
	}

	reset = () => {
		this.objects = {}
		this.items = {}
		this.selectedItemId = null
		this.hoveredItemId = null
		this.clickedItemId = null
	}

	getItemById = (id: string) => this.items[id]
	saveObject = (id: string, mesh: any) => (this.objects[id] = mesh)
	getObject = (id: string) => this.objects[id]

	setItems = (items: ItemMapT) => {
		this.items = items
	}

	models = {}

	addItemFromModel = (model: any) => {
		this.models[model.id] = model
		const item = { ...model, ...DEFAULT_ITEM } as any
		item.id = nanoid()
		item.model = model.id
		item.sizeX = u.number.sizeToScale(item.sizeX)
		item.sizeY = u.number.sizeToScale(item.sizeY)
		item.sizeZ = u.number.sizeToScale(item.sizeZ)
		item.modelUrl = '/models/' + model.file + `?id=${item.id}`
		this.items[item.id] = item
		this.selectItem(item.id)
		this.syncSpaceItemsWithDatabase()
		return item.id
	}

	cloneItem = (id: string) => {
		const baseItem = { ...this.getItemById(id) }
		baseItem.id = nanoid()
		baseItem.positionX += 0.5
		baseItem.positionZ += 0.5
		baseItem.modelUrl = baseItem.modelUrl + baseItem.id
		// console.log({ baseItem })
		this.items[baseItem.id] = baseItem
		this.selectItem(baseItem.id)
		this.syncSpaceItemsWithDatabase()
	}

	// loadItemsForSpace = async (id: SpaceIdT) => {
	// 	const [error, items] = await api.getSpaceItems(id)
	// 	this.list = items as any
	// }

	updateItem = ({ id, ...updates }) => {
		const newItem = { ...this.items[id], ...updates }
		this.items[id] = newItem
		this.syncSpaceItemsWithDatabase()
	}

	deleteItem = (id: string) => {
		this.objects = Object.fromEntries(Object.entries(this.objects).filter(([key]) => key !== id))
		this.items = Object.fromEntries(Object.entries(this.items).filter(([key]) => key !== id))
		// console.log('ITEMS:', this.items)

		// If the deleted item was selected, deselect it
		if (this.selectedItemId === id) {
			this.deselectItem()
		}
	}

	selectItem = (id: string) => {
		this.selectedItemId = id
		camera.moveToItem(id)
	}

	deselectItem = () => {
		this.selectedItemId = null
	}

	createUpdater = (key: string) => (value: boolean | string | number) => {
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
