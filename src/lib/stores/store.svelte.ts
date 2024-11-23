import * as THREE from 'three'
import { DEFAULT_ITEM } from '../data/item'
import { nanoid } from 'nanoid'
import api from '../api'
import models from '../data/models.json'
import spaces from '../data/spaces.json'
import artists from '../data/artists.json'
import u from '../modules/utilities'
import loaderStore from './loaders.store.svelte'

class Store {
	activeMainBarPanel = $state('')
	isEnteringSpace = $state(false)
	isLoadingItems = $state(false)
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
	isItemPanelOpen = $state(false)

	findSpace = (uid: string) => this.spaces.find(u.array.matchUid(uid))
	findArtist = (uid: string) => this.artists.find(u.array.matchUid(uid))
	findItem = (uid: string) => this.activeSpaceItems.find(u.array.matchUid(uid))

	checkIsPanelOpen = (panel: string) => this.activeMainBarPanel === panel
	closePanel = () => (this.activeMainBarPanel = '')

	setActivePanel = (panel: string) => {
		if (!panel) return this.closePanel()
		const isActive = this.checkIsPanelOpen(panel)
		if (isActive) return this.closePanel()
		this.activeMainBarPanel = panel
	}

	checkItemSelectionActive = () => this.selectedItemUid !== null
	checkIsItemSelected = (uid: string) => this.selectedItemUid === uid
	getSelectedItem = () => this.findItem(this.selectedItemUid)
	isAnyItemSelected = $derived.by(() => this.checkItemSelectionActive())
	selectedItem = $state(null)

	setTransformItemMode = (value: string) => {
		this.transformItemMode = value
	}

	removeItem = (uid: string) => {
		this.activeSpaceItems = this.activeSpaceItems.filter(u.array.unmatchUid(uid))
		this.deselectItem()
	}

	selectItem = (uid: string) => {
		this.selectedItemUid = uid
		this.isItemPanelOpen = true
		const selected = this.findItem(uid)
		this.selectedItem = selected
	}

	deselectItem = () => {
		this.isItemPanelOpen = false
		this.setTransformItemMode('translate')
		this.selectedItemUid = null
		this.selectedItem = null
	}

	addItem = (item: any) => {
		this.activeSpaceItems = [...this.activeSpaceItems, item]
		this.selectItem(item.uid)
	}

	loadSpace = async (uid: string) => {
		loaderStore.start('space')
		const [error, space] = await api.getSpace(uid)
		this.activeSpace = space as any
		loaderStore.stop('space')
	}

	loadArtist = async (uid: string) => {
		loaderStore.start('artist')
		const [error, artist] = await api.getArtist(uid)
		this.activeArtist = artist as any
		loaderStore.stop('artist')
	}

	loadItems = async (uid: string) => {
		loaderStore.start('items')
		const [error, items] = await api.getSpaceItems(uid)
		this.activeSpaceItems = items as any
		loaderStore.stop('items')
	}

	addItemToSpace = (model: any) => {
		const item = { ...model, ...DEFAULT_ITEM } as any
		item.size_x = u.number.sizeToScale(item.size_x)
		item.size_y = u.number.sizeToScale(item.size_y)
		item.size_z = u.number.sizeToScale(item.size_z)
		item.modelUrl = model.file + `?uid=${item.uid}`
		item.model = model.uid
		item.uid = nanoid()
		this.addItem(item)
		this.selectItem(item.uid)
	}

	enterSpace = (uid: string) => {
		this.activeSpaceUid = uid
	}

	updateSpace = (key: string, value: any) => {
		const activeSpace = this.findSpace(this.activeSpaceUid)
		activeSpace[key] = value
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
