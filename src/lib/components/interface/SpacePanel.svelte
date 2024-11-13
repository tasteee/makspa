<script>
	import { Label, Input, Textarea, Helper } from 'flowbite-svelte'

	let name = $state('')
	let about = $state('')
	let gridColor = $state('#000000')
	let gridOpacity = $state(0.5)
	let floorColor = $state('#cccccc')
	let spaceWidth = $state(10)
	let spaceHeight = $state(10)
	let spaceDepth = $state(10)

	function handleSubmit() {
		// Handle form submission
		console.log({ name, about, gridColor, gridOpacity, floorColor, spaceWidth, spaceHeight, spaceDepth })
	}
</script>

<form onsubmit={handleSubmit} class="space-y-3">
	<div>
		<Label for="name" class="mb-2">Name</Label>
		<Input id="name" required bind:value={name} />
	</div>

	<div>
		<Label for="about" class="mb-2">About</Label>
		<Textarea id="about" rows={4} bind:value={about} />
	</div>

	<div>
		<Label for="gridOpacity" class="mb-2">Grid Opacity</Label>
		<Input id="gridOpacity" type="range" min="0" max="1" step="0.01" bind:value={gridOpacity} />
		<Helper>{Math.floor(gridOpacity * 100)}%</Helper>
	</div>

	<div class="flex gap-4">
		<div class="w-1/2">
			<Label for="gridColor" class="mb-2">Grid Color</Label>
			<Input id="gridColor" type="color" bind:value={gridColor} />
		</div>

		<div class="w-1/2">
			<Label for="floorColor" class="mb-2">Floor Color</Label>
			<Input id="floorColor" type="color" bind:value={floorColor} />
		</div>
	</div>

	<div class="flex gap-4">
		<div class="w-1/3">
			<Label for="spaceWidth" class="mb-2">Width</Label>
			<Input id="spaceWidth" type="number" bind:value={spaceWidth} min="1" />
		</div>

		<div class="w-1/3">
			<Label for="spaceHeight" class="mb-2">Height</Label>
			<Input id="spaceHeight" type="number" bind:value={spaceHeight} min="1" />
		</div>

		<div class="w-1/3">
			<Label for="spaceDepth" class="mb-2">Depth</Label>
			<Input id="spaceDepth" type="number" bind:value={spaceDepth} min="1" />
		</div>
	</div>

	<button
		type="submit"
		class="mb-2 mr-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
	>
		Submit
	</button>
</form>

<style>
	:global([type='color']) {
		height: 48px;
	}
</style>
