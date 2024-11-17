<script lang="ts">
	import { Drawer, Label, Input, Toggle, Range, Helper } from 'flowbite-svelte'
	import { sineInOut } from 'svelte/easing'
	import SheDivider from './SheDivider.svelte'
	import store from '../../stores/store.svelte'

	const panelParams = {
		x: -320,
		duration: 300,
		easing: sineInOut
	}

	let isHidden = $derived.by(() => !store.checkSelectionActive())
	let item = $derived.by(() => store.selectedItem)

	const updater = (key: string) => (event: Event) => {
		store.updateItem(item.uid, { [key]: parseFloat(event.target.value) })
	}

	const closePanel = () => {
		store.deselectItem()
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
</script>

{#snippet namedDivider(label)}
	<div class="flex w-full flex-col">
		<div class="divider divider-start">{label}</div>
	</div>
{/snippet}

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
		<div class="PanelHeader">
			<div class="flex items-center justify-between">
				<h2>Item</h2>
				<button class="btn btn-square" aria-label="Close" onclick={closePanel}>
					<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
					</svg>
				</button>
			</div>
		</div>
		<SheDivider label="Size" />
		<div class="PanelSection">
			<h3>Size</h3>
			<div>
				<label class="input input-bordered flex items-center gap-2">
					X
					<input value={item.size_x} oninput={updateSizeX} min="0.1" max="50" step="0.01" type="number" class="grow" />
				</label>
			</div>
			<div>
				<label class="input input-bordered flex items-center gap-2">
					Y
					<input value={item.size_y} oninput={updateSizeY} min="0.1" max="50" step="0.01" type="number" class="grow" />
				</label>
			</div>
			<div>
				<label class="input input-bordered flex items-center gap-2">
					Z
					<input value={item.size_z} oninput={updateSizeZ} min="0.1" max="50" step="0.01" type="number" class="grow" />
				</label>
			</div>

			<SheDivider label="Position" />
			<div class="PanelSection">
				<h3>Position</h3>
				<div>
					<label class="input input-bordered flex items-center gap-2">
						X
						<input
							value={item.position_x}
							oninput={updatePositionX}
							min="-64"
							max="64"
							step="0.01"
							type="number"
							class="grow"
						/>
					</label>
				</div>
				<div>
					<label class="input input-bordered flex items-center gap-2">
						Y
						<input
							value={item.position_y}
							oninput={updatePositionY}
							min="-64"
							max="64"
							step="0.01"
							type="number"
							class="grow"
						/>
					</label>
				</div>
				<div>
					<label class="input input-bordered flex items-center gap-2">
						Z
						<input
							value={item.position_z}
							oninput={updatePositionZ}
							min="-64"
							max="64"
							step="0.01"
							type="number"
							class="grow"
						/>
					</label>
				</div>

				<SheDivider label="Rotation" />
				<div class="PanelSection">
					<h3>Rotation</h3>
					<div>
						<label class="input input-bordered flex items-center gap-2">
							X
							<input
								value={item.rotation_x}
								oninput={updateRotationX}
								min="0"
								max="100"
								step="0.01"
								type="number"
								class="grow"
							/>
						</label>
					</div>
					<div>
						<label class="input input-bordered flex items-center gap-2">
							Y
							<input
								value={item.rotation_y}
								oninput={updateRotationY}
								min="0"
								max="100"
								step="0.01"
								type="number"
								class="grow"
							/>
						</label>
					</div>
					<div>
						<label class="input input-bordered flex items-center gap-2">
							Z
							<input
								value={item.rotation_z}
								oninput={updateRotationZ}
								min="0"
								max="100"
								step="0.01"
								type="number"
								class="grow"
							/>
						</label>
					</div>

					<SheDivider label="Scale" />
					<div class="PanelSection">
						<h3>Scale</h3>
						<div>
							<label class="input input-bordered flex items-center gap-2">
								X
								<input
									value={item.scale_x}
									oninput={updateScaleX}
									min="0.1"
									max="20"
									step="0.01"
									type="number"
									class="grow"
								/>
							</label>
						</div>
						<div>
							<label class="input input-bordered flex items-center gap-2">
								Y
								<input
									value={item.scale_y}
									oninput={updateScaleY}
									min="0.1"
									max="20"
									step="0.01"
									type="number"
									class="grow"
								/>
							</label>
						</div>
						<div>
							<label class="input input-bordered flex items-center gap-2">
								Z
								<input
									value={item.scale_z}
									oninput={updateScaleZ}
									min="0.1"
									max="20"
									step="0.01"
									type="number"
									class="grow"
								/>
							</label>
						</div>
					</div>
				</div>
			</div>
		</div>

		<SheDivider label="Options" />
		<div class="PanelSection">
			<h3>Options</h3>
			<div>
				<input id="opacity" type="range" min="0" max="100" step="1" value={item.opacity} onchange={updateOpacity} />
				<Helper>{Math.floor(item.opacity)}%</Helper>
			</div>
			<div class="flex gap-4">
				<div class="form-control">
					<label class="label cursor-pointer">
						<span class="label-text">Visible?</span>
						<input type="checkbox" class="toggle" checked={item.is_visible} onchange={updateIsVisible} />
					</label>
				</div>
				<div class="form-control">
					<label class="label cursor-pointer">
						<span class="label-text">Glowing?</span>
						<input type="checkbox" class="toggle" checked={item.is_glowing} onchange={updateIsGlowing} />
					</label>
				</div>
				<div class="form-control">
					<label class="label cursor-pointer">
						<span class="label-text">Obstructive?</span>
						<input type="checkbox" class="toggle" checked={item.is_obstructive} onchange={updateIsObstructive} />
					</label>
				</div>
			</div>
		</div>
	</form>
</Drawer>

<style scoped>
	:global(.ItemPanel) {
		width: 300px;
		height: calc(100vh - 256px);
		right: 24px;
		top: 96px;
		outline: 2px solid var(--black);
		border-radius: 4px;
		z-index: 106;
		position: absolute;
	}
</style>
