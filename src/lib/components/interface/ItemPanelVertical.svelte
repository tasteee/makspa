<script lang="ts">
	import store from '../../stores/store.svelte'
	import ShePanel from './ShePanel.svelte'
	import ShePanelSection from './ShePanelSection.svelte'
	import ShePanelInnerSection from './ShePanelInnerSection.svelte'
	import SheInput from './SheInput.svelte'
	import SheSwitch from './SheSwitch.svelte'
	import SheButton from './SheButton.svelte'
	import SheSpacer from './SheSpacer.svelte'
	import { toDecimals } from '../../modules/numbers'
	import SheColorInput from './SheColorInput.svelte'

	let item = $derived.by(() => store.getSelectedItem())

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
	let isGlowOpen = $state(true)

	const toggleSize = () => (isSizeOpen = !isSizeOpen)
	const togglePosition = () => (isPositionOpen = !isPositionOpen)
	const toggleRotation = () => (isRotationOpen = !isRotationOpen)
	const toggleScale = () => (isScaleOpen = !isScaleOpen)
	const toggleOptions = () => (isOptionsOpen = !isOptionsOpen)
	const toggleGlow = () => (isGlowOpen = !isGlowOpen)
	let sizeX = $derived.by(() => toDecimals(item.size_x, 2))
	let sizeY = $derived.by(() => toDecimals(item.size_y, 2))
	let sizeZ = $derived.by(() => toDecimals(item.size_z, 2))
	let positionX = $derived.by(() => toDecimals(item.position_x, 2))
	let positionY = $derived.by(() => toDecimals(item.position_y, 2))
	let positionZ = $derived.by(() => toDecimals(item.position_z, 2))
	let rotationX = $derived.by(() => toDecimals(item.rotation_x, 0))
	let rotationY = $derived.by(() => toDecimals(item.rotation_y, 0))
	let rotationZ = $derived.by(() => toDecimals(item.rotation_z, 0))
	let scaleX = $derived.by(() => toDecimals(item.scale_x, 3))
	let scaleY = $derived.by(() => toDecimals(item.scale_y, 3))
	let scaleZ = $derived.by(() => toDecimals(item.scale_z, 3))
	let opacity = $derived.by(() => toDecimals(item.opacity, 1))
	let isVisible = $derived.by(() => item.is_visible)
	let isGlowing = $derived.by(() => item.is_glowing)
	let isObstructive = $derived.by(() => item.is_obstructive)
	let glowIntensity = $derived.by(() => item.glow_intensity)
	let glowColor = $derived.by(() => item.glow_color)
	const updateGlowIntensity = updater('glow_intensity')
	const updateGlowColor = updater('glow_color')
</script>

{#if !!item.uid}
	<ShePanel side="right" title="Item" onCloseClick={store.deselectItem} isOpen>
		<ShePanelSection
			row
			label="Size"
			isOpen={isSizeOpen}
			onClick={toggleSize}
			bottomText="Position is static. Change scale to resize an item."
		>
			<SheInput
				type="number"
				label="X"
				decimals={2}
				min={0.1}
				max={50}
				step={0.01}
				value={sizeX}
				isDisabled
				onChange={updateSizeX}
			/>
			<SheInput
				type="number"
				label="Y"
				decimals={2}
				min={0.1}
				max={50}
				step={0.01}
				value={sizeY}
				isDisabled
				onChange={updateSizeY}
			/>
			<SheInput
				type="number"
				label="Z"
				decimals={2}
				min={0.1}
				max={50}
				step={0.01}
				value={sizeZ}
				isDisabled
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
				step={0.05}
				value={positionX}
				onChange={updatePositionX}
			/>
			<SheInput
				type="number"
				label="Y"
				decimals={2}
				min={-64}
				max={64}
				step={0.05}
				value={positionY}
				onChange={updatePositionY}
			/>
			<SheInput
				type="number"
				label="Z"
				decimals={2}
				min={-64}
				max={64}
				step={0.05}
				value={positionZ}
				onChange={updatePositionZ}
			/>
		</ShePanelSection>

		<ShePanelSection row label="Rotation" isOpen={isRotationOpen} onClick={toggleRotation}>
			<SheInput
				type="number"
				label="X"
				decimals={0}
				min={0}
				max={100}
				step={1}
				value={rotationX}
				onChange={updateRotationX}
			/>
			<SheInput
				type="number"
				label="Y"
				decimals={0}
				min={0}
				max={100}
				step={1}
				value={rotationY}
				onChange={updateRotationY}
			/>
			<SheInput
				type="number"
				label="Z"
				decimals={0}
				min={0}
				max={100}
				step={1}
				value={rotationZ}
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
				value={scaleX}
				onChange={updateScaleX}
			/>
			<SheInput
				type="number"
				label="Y"
				decimals={3}
				min={0.1}
				max={100}
				step={0.025}
				value={scaleY}
				onChange={updateScaleY}
			/>
			<SheInput
				type="number"
				label="Z"
				decimals={3}
				min={0.1}
				max={100}
				step={0.025}
				value={scaleZ}
				onChange={updateScaleZ}
			/>
		</ShePanelSection>

		<ShePanelSection label="Glow" isOpen={isGlowOpen} onClick={toggleGlow}>
			<SheSwitch label="Glowing" value={isGlowing} onChange={updateIsGlowing} />
			<SheColorInput label="Color" value={glowColor} onChange={updateGlowColor} />
			<SheInput
				type="range"
				label="Intensity"
				min={0}
				max={100}
				step={1}
				value={glowIntensity}
				isDisabled={!isGlowing}
				onChange={updateGlowIntensity}
			/>
		</ShePanelSection>

		<ShePanelSection label="Options" isOpen={isOptionsOpen} onClick={toggleOptions}>
			<SheInput type="range" label="Opacity" min={0} max={100} step={1} value={opacity} onChange={updateOpacity} />
			<SheSpacer />
			<SheSwitch label="Visible" value={isVisible} onChange={updateIsVisible} />
			<SheSwitch label="Obstructive" value={isObstructive} onChange={updateIsObstructive} />
		</ShePanelSection>
	</ShePanel>
{/if}

<style>
</style>
