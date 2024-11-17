<script lang="ts">
	// ItemFocuser.svelte | Watches for changes to the selected item
	// in the store. When the selected item changes, this component
	// will handle updating the camera to slide over to where the selected
	// item is now in the middle of the screen.
	import { useThrelte } from '@threlte/core'
	import store from '../stores/store.svelte'
	import { Vector3 } from 'three'
	import { tweened } from 'svelte/motion'
</script>
