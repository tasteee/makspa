<script lang="ts">
	import { T } from '@threlte/core'
	import * as THREE from 'three'
	import stores from '../stores/index'

	type PropsT = { uid: string; children: any }
	let { children, uid, ...props }: PropsT = $props()
	let userData = { uid }

	const onCreate = (groupRef: THREE.Group) => {
		stores.spaceItems.saveObject(uid, groupRef)
	}
</script>

<T.Group {...props} {userData} oncreate={onCreate}>
	{@render children?.()}
</T.Group>
