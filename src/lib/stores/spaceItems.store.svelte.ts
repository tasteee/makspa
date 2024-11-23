import * as THREE from 'three'
import { DEFAULT_ITEM } from '../data/item'
import { nanoid } from 'nanoid'
import api from '../api'
import u from '../modules/utilities'
import camera from './camera.store.svelte'

class SpaceItemsStore {
	objects = {}
	list = $state([])
	uids = $derived.by(() => this.list.map((item) => item.uid))

	selectedItemUid = $state(null)
	hoveredItemUid = $state(null)
	clickedItemUid = $state(null)
	getHoveredItem = () => this.getItemByUid(this.hoveredItemUid)
	getSelectedItem = () => this.getItemByUid(this.selectedItemUid)
	getClickedItem = () => this.getItemByUid(this.clickedItemUid)
	hoveredItem = $derived.by(() => this.getHoveredItem())
	selectedItem = $derived.by(() => this.getSelectedItem())
	clickedItem = $derived.by(() => this.getClickedItem())
	isItemSelected = $derived(() => !!this.selectedItemUid)

	reset = () => {
		this.objects = {}
		this.list = []
		this.selectedItemUid = null
		this.hoveredItemUid = null
		this.clickedItemUid = null
	}

	getItemByUid = (uid: string) => this.list.find((item) => item.uid === uid)
	saveObject = (uid: string, mesh: any) => (this.objects[uid] = mesh)
	getObject = (uid: string) => this.objects[uid]

	addItemFromModel = (model: any) => {
		const item = { ...model, ...DEFAULT_ITEM } as any
		item.size_x = u.number.sizeToScale(item.size_x)
		item.size_y = u.number.sizeToScale(item.size_y)
		item.size_z = u.number.sizeToScale(item.size_z)
		item.modelUrl = model.file + `?uid=${item.uid}`
		item.model = model.uid
		item.uid = nanoid()
		this.list = [...this.list, item]
		this.selectItem(item.uid)
	}

	cloneItem = (uid: string) => {
		const baseItem = this.getItemByUid(uid)
		const item = { ...baseItem, uid: nanoid() }
		item.position_x -= 0.25
		item.position_z -= 0.25
		this.list = [...this.list, item]
		this.selectedItemUid = item.uid
	}

	loadItemsForSpace = async (uid: string) => {
		const [error, items] = await api.getSpaceItems(uid)
		this.list = items as any
	}

	updateItem = ({ uid, ...updates }) => {
		for (const item of this.list) {
			if (item.uid === uid) {
				for (const key in updates) {
					item[key] = updates[key]
				}
			}
		}
	}

	deleteItem = (uid: string) => {
		const filter = (item: any) => item.uid !== uid
		this.list = this.list.filter(filter)
		delete this.objects[uid]
	}

	selectItem = (uid: string) => {
		this.selectedItemUid = uid
		camera.moveToItem(uid)
	}

	deselectItem = () => {
		this.selectedItemUid = null
	}
}

const spaceItemsStore = new SpaceItemsStore()
globalThis.spaceItemsStore = spaceItemsStore
export default spaceItemsStore
