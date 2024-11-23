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
	const log = createLoggable({ prefix: options.key, background: options.color }) as any

	return {
		log
	}
}

export default createLogger
