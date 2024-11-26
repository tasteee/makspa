import store from 'store'
import pocket from '../database/pocket'
import api from '../database/api'

class Auth {
	authData = $state(pocket.authStore.model)
	token = $state(pocket.authStore.token)
	isAuthenticated = $state(pocket.authStore.isValid)

	login = async (username: string, password: string) => {
		const [error, authData] = await api.login(username, password)
		if (error) return console.error('failed auth', error)
		if (!error) console.log('logged in', authData)
		this.authData = authData
		this.isAuthenticated = true
		this.token = pocket.authStore.token
	}

	logout() {
		pocket.authStore.clear()
		store.clearAll()
		window.location.assign('/')
	}
}

const authStore = new Auth()
globalThis.authStore = authStore
export default authStore
