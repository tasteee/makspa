import { NOOP } from '../constants'

type CreateLoggableOptionsT = {
	prefix: string
	blackBoxStyle?: string
	background?: string
}

type CreateLoggerOptionsT = {
	key: string
	color: string
}

const createLoggable = (options: CreateLoggableOptionsT) => {
	const background = options.background || '#000'
	const boxStyle = `background: ${background}; color: white; padding: 2px 4px; border-radius: 2px;`
	const prefix = `%c ${options.prefix} %c`
	return (...args) => console.log(prefix, boxStyle, ...args)
}

const createLogger = (options: CreateLoggerOptionsT) => {
	let isEnabled = true

	const log = createLoggable({ prefix: options.key, background: options.color }) as any
	const inspect = (...args) => $inspect(options.key, ...args)
	const snapshot = (value: any) => log('SNAPSHOT', $state.snapshot(value))
	const disable = () => (isEnabled = false)
	const enable = () => (isEnabled = true)

	return {
		snapshot,
		enable,
		disable,

		get inspect() {
			return isEnabled ? inspect : NOOP
		},

		get log() {
			return isEnabled ? log : NOOP
		}
	}
}

export default createLogger
