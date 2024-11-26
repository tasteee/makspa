import { to } from 'await-to-js'

export default async <T = any>(label: string, promise: Promise<T>): Promise<[Error, T]> => {
	const [error, data] = await to<T>(promise)
	if (error) console.error(`❌ ${label}: `, error)
	if (!error) console.log(`✅ ${label}: `, data)
	return [error, data as any]
}
