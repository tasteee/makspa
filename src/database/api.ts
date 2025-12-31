import too from '~/modules/too'
import store from 'store'
import { pocket } from './pocket'

const artists = pocket.collection('artists')
const spaces = pocket.collection('spaces')
const models = pocket.collection('models')
const items = pocket.collection('items')

const filterLike = (field: string, value: string) => {
  return { filter: `${field}="${value}"` }
}

const sortBy = (value: string) => {
  return { sort: value }
}

const searchModels = (query: string) => {
  const filter = filterLike('name', query)
  const result = models.getFullList(filter)
  return too('searchModels', result)
}

const getSpacesByArtistId = (id: string) => {
  const result = spaces.getFullList({
    ...filterLike('artist', id),
    ...sortBy('-created')
  })

  return too('getSpacesByArtistId', result)
}

const getSpaceById = (id: string) => {
  const result = spaces.getOne(id)
  return too('getSpaceById', result)
}

const getArtistById = (id: string) => {
  const result = artists.getOne(id)
  return too('getArtistById', result)
}

const getArtistByName = (name: string) => {
  const result = artists.getFirstListItem(`name="${name}"`)
  return too('getArtistByName', result)
}

const getModelById = (id: string) => {
  const result = models.getOne(id)
  return too('getModelById', result)
}

const getItemById = (id: string) => {
  const result = items.getOne(id, { expand: 'model' })
  return too('getItemById', result)
}

const getItemsBySpaceId = (spaceId: string) => {
  const result = items.getFullList({
    filter: `spaceId="${spaceId}"`,
    expand: 'model'
  })
  return too('getItemsBySpaceId', result)
}

const createItem = (item: Partial<ItemT>) => {
  const result = items.create(item)
  return too('createItem', result)
}

const updateItem = (item: Partial<ItemT>) => {
  const { id, ...rest } = item
  const result = items.update(id, rest)
  return too('updateItem', result)
}

const deleteItem = (id: string) => {
  const result = items.delete(id)
  return too('deleteItem', result)
}

const createSpace = (space: SpaceT) => {
  const result = spaces.create(space)
  return too('createSpace', result)
}

const updateSpace = (space: Partial<SpaceT>) => {
  const { id, ...rest } = space
  const result = spaces.update(id, rest)
  return too('updateSpace', result)
}

const login = async (username: string, password: string) => {
  const result = await too('login', artists.authWithPassword(username, password))
  console.log(pocket.authStore.isValid);
  console.log(pocket.authStore.token);
  console.log(pocket.authStore.model.id);
  console.log(pocket.authStore);
  // debugger;
  return result
}

const logout = () => {
  pocket.authStore.clear()
  store.clearAll()
  window.location.assign('/')
}

globalThis.logout = logout

function getFileUrl(record: any, filename: string, options?: { thumb?: string }) {
  if (!record || !filename) return ''
  const collectionId = record.collectionId || record.collectionName
  const recordId = record.id
  if (!collectionId || !recordId) return ''
  return pocket.files.getURL(record, filename, options)
}


function deleteItemileUrl(record: any, filename: string, options?: { thumb?: string }) {
  if (!record || !filename) return ''
  const collectionId = record.collectionId || record.collectionName
  const recordId = record.id
  if (!collectionId || !recordId) return ''
  return pocket.files.getURL(record, filename, options)
}

type SubscriptionOptionsT = {
  id: string
  onUpdate?: Function
  onDelete?: Function
}

const subscribeToSpace = (options: SubscriptionOptionsT) => {
  const handlers = { update: options.onUpdate, delete: options.onDelete }
  pocket.collection('spaces').subscribe(options.id, (event) => {
    handlers[event.action](event.record)
  })
}



export const api = {
  subscribeToSpace,
  getFileUrl,
  items,
  getItemById,
  getItemsBySpaceId,
  createItem,
  updateItem,
  deleteItemileUrl,
  models,
  artists,
  spaces,
  pocket,
  getModelById,
  updateSpace,
  getArtistById,
  getArtistByName,
  getSpaceById,
  createSpace,
  getSpacesByArtistId,
  searchModels,
  login,
  logout
}

export default api
