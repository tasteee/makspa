import { useGltf, useSuspense } from '@threlte/extras'

export const useModel = (url: string) => {
	const suspend = useSuspense()
	const gltf = suspend(useGltf(url))
	return gltf
}
