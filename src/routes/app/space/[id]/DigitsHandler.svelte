<script lang="ts">
	import inputStore from '~/stores/input.store.svelte'
	import mainStore from '~/stores/main-store.svelte'

	// When an item is selected...
	// If shift is pressed, set mode to move, axes to y.
	// If control is pressed, set mode to scale, axes to xyz.
	// If alt is pressed, set mode to rotate, axes to y.
	$effect(() => {
		if (!mainStore.isItemSelected) return

		if (inputStore.isPressedShift) {
			mainStore.dragControlsMode = 'move'
			mainStore.dragControlsAxes = 'y'
			return
		}

		if (inputStore.isPressedControl) {
			mainStore.dragControlsMode = 'scale'
			mainStore.dragControlsAxes = 'xyz'
			return
		}

		if (inputStore.isPressedAlt) {
			mainStore.dragControlsMode = 'rotate'
			mainStore.dragControlsAxes = 'y'
			return
		}

		mainStore.dragControlsMode = 'move'
		mainStore.dragControlsAxes = 'xz'
	})

	// When an item is selected...
	// And when escape key is pressed...
	// Deselect the selected item.
	$effect(() => {
		if (!mainStore.isItemSelected) return
		if (inputStore.isPressedEscape) mainStore.deselectItem()
	})

	// When an item is selected...
	// And when backspace key is pressed...
	// Delete the selected item.
	$effect(() => {
		if (!mainStore.isItemSelected) return
		if (!inputStore.isBackspacePressed) return
		mainStore.deleteItem(mainStore.selectedItemId)
	})
</script>
