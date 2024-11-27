import too from '~/modules/too'
import store from 'store'
import pocket from './pocket'

const artists = pocket.collection('artists')
const spaces = pocket.collection('spaces')
const models = pocket.collection('models')
const users = pocket.collection('accounts')

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
		...filterLike('owner', id),
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

const createSpace = (space: SpaceT) => {
	const result = spaces.create(space)
	return too('createSpace', result)
}

const updateSpace = (space: Partial<SpaceT>) => {
	const { id, ...rest } = space
	const result = spaces.update(id, rest)
	return too('updateSpace', result)
}

const login = (username: string, password: string) => {
	return too('login', users.authWithPassword(username, password))
}

const logout = () => {
	pocket.authStore.clear()
	store.clearAll()
}

function getFileUrl(record: any, filename: string, options?: { thumb?: string }) {
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
	models,
	artists,
	spaces,
	users,
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
