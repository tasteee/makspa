let isOnline = $state(false)

function setIsOnline(value: boolean) {
	isOnline = value
}

export function useGameSceneStore() {
	return {
		get isOnline() {
			return isOnline
		},

		setIsOnline,
	}
}
