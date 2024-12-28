import models from '~/database/data/models.json'

class ShopStore {
	results = $state([])
	query = $state('')
	isLoading = $state(false)

	setQuery = (value: string) => {
		this.query = value
	}

	searchModels = async () => {
		this.isLoading = true

		setTimeout(() => {
			this.results = models.filter(model => {
				return model.name.toLowerCase().includes(this.query.toLowerCase())
			})

			this.isLoading = false
		}, 123)

		return

		// const [error, _models] = await api.searchModels(this.query)
		// if (!error) console.log('searchModels results: ', models)
		// if (error) throw error

		// const final = models.map((model) => ({
		// 	id: model.id,
		// 	alt: model.name,
		// 	src: model.thumbnail,
		// 	addItem: () => items.addItemFromModel(model)
		// }))

		// this.results = final
		// this.isLoading = false
	}
}

const shopStore = new ShopStore()
globalThis.shopStore = shopStore
export default shopStore
