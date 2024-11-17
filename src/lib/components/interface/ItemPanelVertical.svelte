<script lang="ts">
	import store from '../../stores/store.svelte'
	import ShePanel from './ShePanel.svelte'
	import ShePanelSection from './ShePanelSection.svelte'
	import ShePanelInnerSection from './ShePanelInnerSection.svelte'
	import SheInput from './SheInput.svelte'
	import SheSwitch from './SheSwitch.svelte'
	import SheButton from './SheButton.svelte'
	import SheSpacer from './SheSpacer.svelte'

	let item = $derived(store.selectedItem ?? {})

	const updater = (key: string) => (value: number | boolean | string) => {
		store.updateItem(item.uid, { [key]: value })
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

	let isSizeOpen = $state(true)
	let isPositionOpen = $state(true)
	let isRotationOpen = $state(true)
	let isScaleOpen = $state(true)
	let isOptionsOpen = $state(true)

	const toggleSize = () => (isSizeOpen = !isSizeOpen)
	const togglePosition = () => (isPositionOpen = !isPositionOpen)
	const toggleRotation = () => (isRotationOpen = !isRotationOpen)
	const toggleScale = () => (isScaleOpen = !isScaleOpen)
	const toggleOptions = () => (isOptionsOpen = !isOptionsOpen)

	$inspect('ITEM.rotation_y', item.rotation_y)
</script>

{#if !!item.uid}
	<ShePanel side="right" title="Item" onCloseClick={() => store.deselectItem()} isOpen>
		<ShePanelSection row label="Size" isOpen={isSizeOpen} onClick={toggleSize}>
			<SheInput
				type="number"
				label="X"
				decimals={2}
				min={0.1}
				max={50}
				step={0.01}
				value={item.size_x}
				onChange={updateSizeX}
			/>
			<SheInput
				type="number"
				label="Y"
				decimals={2}
				min={0.1}
				max={50}
				step={0.01}
				value={item.size_y}
				onChange={updateSizeY}
			/>
			<SheInput
				type="number"
				label="Z"
				decimals={2}
				min={0.1}
				max={50}
				step={0.01}
				value={item.size_z}
				onChange={updateSizeZ}
			/>
		</ShePanelSection>

		<ShePanelSection row label="Position" isOpen={isPositionOpen} onClick={togglePosition}>
			<SheInput
				type="number"
				label="X"
				decimals={2}
				min={-64}
				max={64}
				step={0.02}
				value={item.position_x}
				onChange={updatePositionX}
			/>
			<SheInput
				type="number"
				label="Y"
				decimals={2}
				min={-64}
				max={64}
				step={0.02}
				value={item.position_y}
				onChange={updatePositionY}
			/>
			<SheInput
				type="number"
				label="Z"
				decimals={2}
				min={-64}
				max={64}
				step={0.02}
				value={item.position_z}
				onChange={updatePositionZ}
			/>
		</ShePanelSection>

		<ShePanelSection row label="Rotation" isOpen={isRotationOpen} onClick={toggleRotation}>
			<SheInput
				type="number"
				label="X"
				decimals={1}
				min={0}
				max={100}
				step={0.1}
				value={item.rotation_x}
				onChange={updateRotationX}
			/>
			<SheInput
				type="number"
				label="Y"
				decimals={1}
				min={0}
				max={100}
				step={0.1}
				value={item.rotation_y}
				onChange={updateRotationY}
			/>
			<SheInput
				type="number"
				label="Z"
				decimals={1}
				min={0}
				max={100}
				step={0.1}
				value={item.rotation_z}
				onChange={updateRotationZ}
			/>
		</ShePanelSection>

		<ShePanelSection row label="Scale" isOpen={isScaleOpen} onClick={toggleScale}>
			<SheInput
				type="number"
				label="X"
				decimals={3}
				min={0.1}
				max={100}
				step={0.025}
				value={item.scale_x}
				onChange={updateScaleX}
			/>
			<SheInput
				type="number"
				label="Y"
				decimals={3}
				min={0.1}
				max={100}
				step={0.025}
				value={item.scale_y}
				onChange={updateScaleY}
			/>
			<SheInput
				type="number"
				label="Z"
				decimals={3}
				min={0.1}
				max={100}
				step={0.025}
				value={item.scale_z}
				onChange={updateScaleZ}
			/>
		</ShePanelSection>

		<ShePanelSection label="Options" isOpen={isOptionsOpen} onClick={toggleOptions}>
			<SheInput type="range" label="Opacity" min={0} max={100} step={1} value={item.opacity} onChange={updateOpacity} />
			<SheSpacer />
			<SheSwitch label="Visible" value={item.is_visible} onChange={updateIsVisible} />
			<SheSwitch label="Glowing" value={item.is_glowing} onChange={updateIsGlowing} />
			<SheSwitch label="Obstructive" value={item.is_obstructive} onChange={updateIsObstructive} />
		</ShePanelSection>
	</ShePanel>
{/if}

<style>
	.row {
		display: flex;
		width: 100%;
	}

	.gap1 {
		gap: 4px;
	}
</style>
