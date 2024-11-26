import u from '~/modules/utilities'

class LoadersStore {
	loaders = $state([])
	isLoading = $derived(this.loaders.length > 0)

	start(key: string) {
		this.loaders.push(key)
	}

	stop(key: string) {
		this.loaders = u.array.without(this.loaders, key)
	}

	isLoaderActive(key: string) {
		return this.loaders.includes(key)
	}
}

const loadersStore = new LoadersStore()
globalThis.loadersStore = loadersStore
export default loadersStore
