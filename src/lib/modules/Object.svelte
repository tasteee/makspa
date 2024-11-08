<script>
	import { T } from '@threlte/core'
	import { onMount } from 'svelte'
	import { loadItem } from 'utilities/loadItem'
	import { useItemsStore } from 'stores/items.svelte'

	const { id, ...props } = $props()
	let object = $state(null)
	let error = $state(null)
	let isLoading = $state(true)
	let position = $state({ x: 0, y: 0, z: 0 })
	const itemsStore = useItemsStore()

	async function handleMount() {
		const setObject = (_object) => (object = _object)
		const setError = (_error) => (error = _error)
		const setLoading = () => (isLoading = false)
		loadItem(id).then(setObject).then(setLoading).catch(setError)
	}

	function handleClick() {
		itemsStore.handleObjectClick(object, position)
	}

	onMount(handleMount)
</script>

{#if object}
	<T is={object} scale={1} onclick={handleClick} position={[position.x, position.y, position.z]} {...props} />
{/if}
