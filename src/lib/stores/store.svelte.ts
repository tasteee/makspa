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
	transformItemMode: 'translate',

	models,
	artists,
	spaces
})

const unmatchUid = (uid: string) => (item: any) => item.uid !== uid
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

// [SECTION]

const setTransformItemMode = (value: string) => {
	console.log('setTransformItemMode', value)
	store.transformItemMode = value
}

// [FUNCTION] updateItem

const updateItem = (uid: string, update: any) => {
	store.items = store.items.map((item) => {
		if (item.uid === uid) return { ...item, ...update }
		return item
	})
}

const removeItem = (uid: string) => {
	store.items = store.items.filter(unmatchUid(uid))
	deselectItem()
}

// [FUNCTION] selectItem

const selectItem = (uid: string) => {
	store.selectedItemUid = uid
}

// [FUNCTION] deselectItem

const deselectItem = () => {
	store.selectedItemUid = null
	store.transformItemMode = 'translate'
}

// [FUNCTION] addItem

const addItem = (item: any) => {
	store.items = [...store.items, item]
	selectItem(item.uid)
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
	const model = findModel(uid)
	const item = { ...model, ...DEFAULT_ITEM } as any
	item.position_y = item.size_y / 100
	item.uid = nanoid()
	item.model = uid
	console.log('addItemToSpace', item.uid, item)
	addItem(item)
}

function enterSpace(uid: string) {
	console.log('enterSpace', uid)
	store.activeSpaceUid = uid
}

const final = {
	addItemToSpace,
	addItem,
	removeItem,
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
	deselectItem,
	checkItemSelected,
	setTransformItemMode,

	get state() {
		return store
	}
}

globalThis.store = final
export default final
