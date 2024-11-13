export const windowEvent = (eventName: string, handler: (event: Event) => void) => {
	window.addEventListener(eventName, handler)
	return () => window.removeEventListener(eventName, handler)
}
