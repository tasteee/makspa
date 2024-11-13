<script lang="ts">
	import { Drawer, Label, Input, Toggle, Range, Helper } from 'flowbite-svelte'
	import { sineInOut } from 'svelte/easing'
	import store from '../../stores/store.svelte'

	const panelParams = {
		x: 320,
		duration: 300,
		easing: sineInOut
	}

	let isHidden = $derived.by(() => !store.checkSelectionActive())
	let item = $derived.by(() => store.selectedItem)

	const updater = (key: string) => (event: Event) => {
		store.updateItem(item.uid, { [key]: parseFloat(event.target.value) })
	}

	const updatePositionX = updater('position_x')
	const updatePositionY = updater('position_y')
	const updatePositionZ = updater('position_z')
	const updateRotationX = updater('rotation_x')
	const updateRotationY = updater('rotation_y')
	const updateRotationZ = updater('rotation_z')
	const updateSizeX = updater('size_x')
	const updateSizeY = updater('size_y')
	const updateSizeZ = updater('size_z')
	const updateScaleX = updater('scale_x')
	const updateScaleY = updater('scale_y')
	const updateScaleZ = updater('scale_z')
	const updateOpacity = updater('opacity')
	const updateIsVisible = updater('is_visible')
	const updateIsGlowing = updater('is_glowing')
	const updateIsObstructive = updater('is_obstructive')

	// const positionX = $derived(item.position_x)
	// const positionY = $derived(item.position_y)
	// const positionZ = $derived(item.position_z)

	$effect(() => {
		// !isHidden && console.log('showing drawer: ', isHidden)
		// item?.uid && console.log('rendering fields: ', item)
	})
</script>

<Drawer
	class="ItemPanel"
	placement="right"
	activateClickOutside={false}
	backdrop={false}
	transitionType="fly"
	transitionParams={panelParams}
	hidden={isHidden}
>
	<form class="space-y-6">
		<div>
			<h3 class="mb-2 text-lg font-semibold">Size</h3>
			<div class="grid grid-cols-3 gap-4">
				<div>
					<Label for="sizeX" class="mb-2">X</Label>
					<Input id="sizeX" type="number" min="0.1" max="20" step="0.01" value={item.size_x} onchange={updateSizeX} />
				</div>
				<div>
					<Label for="sizeY" class="mb-2">Y</Label>
					<Input id="sizeY" type="number" min="0.1" max="20" step="0.01" value={item.size_y} onchange={updateSizeY} />
				</div>
				<div>
					<Label for="sizeZ" class="mb-2">Z</Label>
					<Input id="sizeZ" type="number" min="0.1" max="20" step="0.01" value={item.size_z} onchange={updateSizeZ} />
				</div>
			</div>
		</div>

		<div>
			<h3 class="mb-2 text-lg font-semibold">Position</h3>
			<div class="grid grid-cols-3 gap-4">
				<div>
					<Label for="positionX" class="mb-2">X</Label>
					<Input
						id="positionX"
						type="number"
						min="-64"
						max="64"
						value={item.position_x}
						onchange={updatePositionX}
						step="0.01"
					/>
				</div>
				<div>
					<Label for="positionY" class="mb-2">Y</Label>
					<Input
						id="positionY"
						type="number"
						min="-64"
						max="64"
						value={item.position_y}
						onchange={updatePositionY}
						step="0.01"
					/>
				</div>
				<div>
					<Label for="positionZ" class="mb-2">Z</Label>
					<Input
						id="positionZ"
						type="number"
						min="-64"
						max="64"
						value={item.position_z}
						onchange={updatePositionZ}
						step="0.01"
					/>
				</div>
			</div>
		</div>

		<div>
			<h3 class="mb-2 text-lg font-semibold">Rotation</h3>
			<div class="grid grid-cols-3 gap-4">
				<div>
					<Label for="rotationX" class="mb-2">X</Label>
					<Input
						id="rotationX"
						type="number"
						min="0"
						max="100"
						step="0.01"
						value={item.rotation_x}
						onchange={updateRotationX}
					/>
				</div>
				<div>
					<Label for="rotationY" class="mb-2">Y</Label>
					<Input
						id="rotationY"
						type="number"
						min="0"
						max="100"
						step="0.01"
						value={item.rotation_y}
						onchange={updateRotationY}
					/>
				</div>
				<div>
					<Label for="rotationZ" class="mb-2">Z</Label>
					<Input
						id="rotationZ"
						type="number"
						min="0"
						max="100"
						step="0.01"
						value={item.rotation_z}
						onchange={updateRotationZ}
					/>
				</div>
			</div>
		</div>

		<div>
			<h3 class="mb-2 text-lg font-semibold">Scale</h3>
			<div class="grid grid-cols-3 gap-4">
				<div>
					<Label for="scaleX" class="mb-2">X</Label>
					<Input
						id="scaleX"
						type="number"
						min="0.1"
						max="20"
						step="0.01"
						value={item.scale_x}
						onchange={updateScaleX}
					/>
				</div>
				<div>
					<Label for="scaleY" class="mb-2">Y</Label>
					<Input
						id="scaleY"
						type="number"
						min="0.1"
						max="20"
						step="0.01"
						value={item.scale_y}
						onchange={updateScaleY}
					/>
				</div>
				<div>
					<Label for="scaleZ" class="mb-2">Z</Label>
					<Input
						id="scaleZ"
						type="number"
						min="0.1"
						max="20"
						step="0.01"
						value={item.scale_z}
						onchange={updateScaleZ}
					/>
				</div>
			</div>
		</div>

		<div>
			<Label for="opacity" class="mb-2">Grid Opacity</Label>
			<Input id="opacity" type="range" min="0" max="1" step="0.01" value={item.opacity} onchange={updateOpacity} />
			<Helper>{Math.floor(item.opacity * 100)}%</Helper>
		</div>

		<div class="flex gap-4">
			<div class="w-1/3">
				<Label class="mb-2" for="isVisible">Visible?</Label>
				<Toggle id="isVisible" bind:checked={item.is_visible} onchange={updateIsVisible} />
			</div>
			<div class="w-1/3">
				<Label class="mb-2" for="isGlowing">Glowing?</Label>
				<Toggle id="isGlowing" bind:checked={item.is_glowing} onchange={updateIsGlowing} />
			</div>
			<div class="w-1/3">
				<Label class="mb-2" for="isObstructive">Obstructive?</Label>
				<Toggle id="isObstructive" bind:checked={item.is_obstructive} onchange={updateIsObstructive} />
			</div>
		</div>
	</form>
</Drawer>

<style>
	:global(.ItemPanel) {
		width: 300px;
		height: calc(100vh - 256px);
		right: 24px;
		top: 24px;
		outline: 2px solid var(--black);
		border-radius: 4px;
		z-index: 106;
		position: absolute;
	}
</style>
