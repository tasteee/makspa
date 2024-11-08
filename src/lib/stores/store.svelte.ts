import { DEFAULT_ITEM } from '../data/item'
import { nanoid } from 'nanoid'
import api from '../api'
import models from '../data/models.json'
import spaces from '../data/spaces.json'
import artists from '../data/artists.json'

export const store = $state({
	isAuthenticated: true,
	isLoadingArtist: false,
	isLoadingSpaces: false,
	isEnteringSpace: false,
	isLoadingItems: false,
	isLoadingSpace: false,

	session: {},
	artist: artists[0],
	artistSpaces: [],

	space: spaces[0],
	activeSpaceUid: 'shenobi',

	items: [],
	selectedItemUid: null,

	models,
	artists,
	spaces
})

const matchUid = (uid: string) => (item: any) => item.uid === uid
const findItem = (uid: string) => store.items.find(matchUid(uid))
const findArtist = (uid: string) => store.artists.find(matchUid(uid))
const findSpace = (uid: string) => store.spaces.find(matchUid(uid))
const findModel = (uid: string) => store.models.find(matchUid(uid))

const mapSetKeyValue = (target: any[], property: string, value: any) => {
	return target.map((item) => {
		return { ...item, [property]: value }
	})
}

const mapMerge = (target: any[], source: any) => {
	return target.map((item) => {
		return { ...item, ...source }
	})
}

const mapCheckKeyValue = (target: any[], property: string, value: any) => {
	return !!target.find((item) => item[property] === value)
}

const replaceWhere = (predicate: (item: any) => boolean) => (replacement: any) => {
	const index = store.items.findIndex(predicate)
	if (index !== -1) store.items[index] = replacement
}

// [SECTION] Item

// [FUNCTION] updateItem

const updateItem = (uid: string, update: any) => {
	const item = findItem(uid)
	const updatedItem = { ...item, ...update }
	console.log({ updatedItem })
	// replaceWhere(matchUid(uid))(updatedItem)
	store.items = store.items.map((item) => {
		if (item.uid === uid) return updatedItem
		return item
	})
}

// [FUNCTION] selectItem

const selectItem = (uid: string) => {
	store.selectedItemUid = uid
}

// [FUNCTION] deselectItems

const deselectItems = () => {
	store.selectedItemUid = null
}

const isSelectionActive = () => !!store.selectedItemUid
const checkItemSelected = (uid: string) => store.selectedItemUid === uid

async function loadSpace(uid: string) {
	store.isLoadingSpace = true
	const [error, space] = await api.getSpace(uid)
	store.space = space as any
	store.isLoadingSpace = false
}

async function loadArtist(uid: string) {
	store.isLoadingArtist = true
	const [error, artist] = await api.getArtist(uid)
	store.artist = artist as any
	store.isLoadingArtist = false
}

async function loadItems(uid: string) {
	store.isLoadingItems = true
	const [error, items] = await api.getSpaceItems(uid)
	store.items = items as any
	store.isLoadingItems = false
}

function addItemToSpace(uid: string) {
	console.log('addItemToSpace', uid)
	const model = findModel(uid)
	const item = { ...model, ...DEFAULT_ITEM } as any
	item.uid = nanoid()
	item.model = uid
	store.items = [...store.items, item]
	selectItem(item.uid)
}

function enterSpace(uid: string) {
	console.log('enterSpace', uid)
	store.activeSpaceUid = uid
}

const final = {
	addItemToSpace,
	findItem,
	findArtist,
	findSpace,
	findModel,

	loadSpace,
	loadArtist,
	loadItems,

	updateItem,
	enterSpace,
	isSelectionActive,
	selectItem,
	deselectItems,
	checkItemSelected,

	get state() {
		return store
	}
}

globalThis.store = final
export default final
