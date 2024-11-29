export const useDebounce = (initialValue: any, delay: number = 250) => {
	let timeout = $state<any | null>(null)
	let value = $state<any>(initialValue)
	let isLoading = $state<boolean>(false)

	const set = (newValue: any) => {
		if (timeout) clearTimeout(timeout)
		isLoading = true

		timeout = setTimeout(() => {
			value = newValue
			isLoading = false
		}, delay)
	}

	return {
		set,

		get value() {
			return value
		},

		get loading() {
			return isLoading
		}
	}
}
