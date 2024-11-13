import { DEFAULT_ITEM } from '../data/item'
import { nanoid } from 'nanoid'
import api from '../api'
import models from '../data/models.json'
import spaces from '../data/spaces.json'
import artists from '../data/artists.json'
import { sizeToScale } from '../modules/numbers'

class Store {
	session = $state({})

	isAuthenticated = $state(true)
	isLoadingArtist = $state(false)
	isLoadingSpaces = $state(false)
	isEnteringSpace = $state(false)
	isLoadingItems = $state(false)
	isLoadingSpace = $state(false)

	activeArtist = $state(artists[0])
	activeArtistUid = $state(artists[0].uid)
	activeSpaceItems = $state([])
	selectedItemUid = $state(null)
	transformItemMode = $state('translate')
	models = $state(models)
	artists = $state(artists)
	spaces = $state(spaces)
	activeSpaceUid = $state(spaces[0].uid)
	activeSpace = $derived.by(() => this.findSpace(this.activeSpaceUid))
	isSelectionActive = $derived.by(() => this.selectedItemUid !== null)

	findSpace = (uid: string) => this.spaces.find(this.matchUid(uid))
	findArtist = (uid: string) => this.artists.find(this.matchUid(uid))
	findItem = (uid: string) => this.activeSpaceItems.find(this.matchUid(uid))

	matchUid = (uid: string) => (item: any) => item.uid === uid
	unmatchUid = (uid: string) => (item: any) => item.uid !== uid

	checkSelectionActive = () => this.selectedItemUid !== null
	checkIsItemSelected = (uid: string) => this.selectedItemUid === uid
	getSelectedItem = () => this.findItem(this.selectedItemUid)
	selectedItem = $derived.by(() => this.getSelectedItem())

	setTransformItemMode = (value: string) => {
		this.transformItemMode = value
	}

	removeItem = (uid: string) => {
		this.activeSpaceItems = this.activeSpaceItems.filter(this.unmatchUid(uid))
		this.deselectItem()
	}

	selectItem = (uid: string) => {
		this.selectedItemUid = uid
	}

	deselectItem = () => {
		this.selectedItemUid = null
		this.setTransformItemMode('translate')
	}

	addItem = (item: any) => {
		this.activeSpaceItems = [...this.activeSpaceItems, item]
		this.selectItem(item.uid)
	}

	loadSpace = async (uid: string) => {
		this.isLoadingSpace = true
		const [error, space] = await api.getSpace(uid)
		this.activeSpace = space as any
		this.isLoadingSpace = false
	}

	loadArtist = async (uid: string) => {
		this.isLoadingArtist = true
		const [error, artist] = await api.getArtist(uid)
		this.activeArtist = artist as any
		this.isLoadingArtist = false
	}

	loadItems = async (uid: string) => {
		this.isLoadingItems = true
		const [error, items] = await api.getSpaceItems(uid)
		this.activeSpaceItems = items as any
		this.isLoadingItems = false
	}

	addItemToSpace = (model: any) => {
		const item = { ...model, ...DEFAULT_ITEM } as any
		item.size_x = sizeToScale(item.size_x)
		item.size_y = sizeToScale(item.size_y)
		item.size_z = sizeToScale(item.size_z)
		item.modelUrl = model.file + `?uid=${item.uid}`
		item.model = model.uid
		item.uid = nanoid()
		this.addItem(item)
	}

	enterSpace = (uid: string) => {
		this.activeSpaceUid = uid
	}

	updateItem = (uid: string, update: any) => {
		this.activeSpaceItems = this.activeSpaceItems.map((item) => {
			if (item.uid === uid) return { ...item, ...update }
			return item
		})
	}
}

const store = new Store()
globalThis.store = store
export default store
