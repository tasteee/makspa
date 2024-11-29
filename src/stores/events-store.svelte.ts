import mitt from 'mitt'

const emitter = mitt()

const setup = () => {
	window.addEventListener('contextmenu', (event) => {
		if (event.button === 2) {
			console.log('rightMouseDown')
			emitter.emit('rightMouseDown', event)
		}
	})

	window.addEventListener('mousedown', (event) => {
		if (event.button === 2) {
			console.log('rightMouseDown')
			emitter.emit('rightMouseDown', event)
		}
	})

	window.addEventListener('mouseup', (event) => {
		if (event.button === 2) {
			console.log('rightMouseUp')
			emitter.emit('rightMouseUp', event)
		}
	})
}

const useEventHandler = (event: string, handler: (event: any) => void) => {
	emitter.on(event, handler)
	return () => emitter.off(event, handler)
}

const useRightMouseDown = (handler: (event: PointerEvent) => void) => {
	return useEventHandler('rightMouseDown', handler)
}

export default {
	emitter,
	setup,
	useEventHandler,
	useRightMouseDown
}
