<script lang="ts">
	import mainStore from '~/stores/main-store.svelte'

	import { T } from '@threlte/core'
	import * as THREE from 'three'
	import stores from '~/stores'

	type PropsT = { id: string; children: any }
	let { children, id, ...props }: PropsT = $props()
	let userData = { id }

	const onCreate = (meshRef: THREE.Mesh) => {
		mainStore.saveMesh(id, meshRef)
	}
</script>

<T.Mesh {...props} {userData} oncreate={onCreate}>
	{@render children?.()}
</T.Mesh>
