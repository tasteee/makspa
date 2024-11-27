export function useToggler(initialValue?: any) {
	let value = $state(!!initialValue)
	const toggle = () => (value = !value)
	const set = (newValue: boolean) => (value = newValue)
	return { value, toggle, set }
}

export function useStateHandler<T>(initialValue: T) {
	let value = $state(initialValue)
	const set = (newValue: T) => (value = newValue)
	return { value, set }
}
