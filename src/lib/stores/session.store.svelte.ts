class SessionStore {
	isAuthenticated = $state(true)
	user = $state(null)

	async login(email: string, password: string) {
		this.isAuthenticated = true
	}

	async logout() {
		this.isAuthenticated = false
	}

	async register(options: { email: string; username: string; password: string }) {
		this.isAuthenticated = true
	}

	async forgotPassword(email: string) {
		this.isAuthenticated = true
	}
}

const sessionStore = new SessionStore()
globalThis.sessionStore = sessionStore
export default sessionStore
