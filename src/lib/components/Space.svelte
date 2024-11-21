<script lang="ts">
	import store from '../stores/store.svelte'
	import ThirdPersonItem from './ThirdPersonItem.svelte'
	import { T } from '@threlte/core'
	import * as THREE from 'three'
	type PropsT = { uid: string }
	const props: PropsT = $props()
	let group = $state<THREE.Group | null>(null)
	let activeItems = $derived(store.activeSpaceItems.slice(0, 10))

	$effect(() => {
		store.itemsGroup = group
	})
</script>

{#if activeItems.length > 0}
	<T.Group bind:ref={group}>
		{#each activeItems as item}
			<ThirdPersonItem uid={item.uid} />
		{/each}
	</T.Group>
{/if}
