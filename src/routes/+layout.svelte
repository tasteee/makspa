<script lang="ts">
	import { onMount } from 'svelte'
	let props = $props()
</script>

{@render props.children()}
