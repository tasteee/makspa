<script lang="ts">
	import store from '../../stores/store.svelte'
	import ShePanel from './ShePanel.svelte'
	import ShePanelSection from './ShePanelSection.svelte'
	import ShePanelInnerSection from './ShePanelInnerSection.svelte'
	import SheInput from './SheInput.svelte'
	import SheSwitch from './SheSwitch.svelte'
	import SheButton from './SheButton.svelte'
	import SheSpacer from './SheSpacer.svelte'
	import SheIconButton from './SheIconButton.svelte'
	import { toDecimals } from '../../modules/numbers'
	import SheColorInput from './SheColorInput.svelte'
	import ShePanelRow from './ShePanelRow.svelte'

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
	const updateGlowPositionX = updater('glow_position_x')
	const updateGlowPositionY = updater('glow_position_y')
	const updateGlowPositionZ = updater('glow_position_z')

	const scaleUp = () => {
		const scale_x = item.scale_x + 0.25
		const scale_y = item.scale_y + 0.25
		const scale_z = item.scale_z + 0.25
		store.updateItem(item.uid, { scale_x, scale_y, scale_z })
	}

	const scaleDown = () => {
		const scale_x = item.scale_x - 0.25
		const scale_y = item.scale_y - 0.25
		const scale_z = item.scale_z - 0.25
		store.updateItem(item.uid, { scale_x, scale_y, scale_z })
	}

	const rotateX = () => {
		const newValue = item.rotation_x + 5
		const isHigherThan100 = newValue > 100
		const remainder = newValue - 100
		const rotation_x = isHigherThan100 ? remainder : newValue
		store.updateItem(item.uid, { rotation_x })
	}

	const rotateY = () => {
		const newValue = item.rotation_y + 5
		const isHigherThan100 = newValue > 100
		const remainder = newValue - 100
		const rotation_y = isHigherThan100 ? remainder : newValue
		store.updateItem(item.uid, { rotation_y })
	}

	const rotateZ = () => {
		const newValue = item.rotation_z + 5
		const isHigherThan100 = newValue > 100
		const remainder = newValue - 100
		const rotation_z = isHigherThan100 ? remainder : newValue
		store.updateItem(item.uid, { rotation_z })
	}

	let isSizeOpen = $state(false)
	let isPositionOpen = $state(false)
	let isRotationOpen = $state(false)
	let isScaleOpen = $state(false)
	let isOptionsOpen = $state(true)
	let isGlowOpen = $state(true)
	let isGlowPositionOpen = $state(true)
	const toggleSize = () => (isSizeOpen = !isSizeOpen)
	const togglePosition = () => (isPositionOpen = !isPositionOpen)
	const toggleRotation = () => (isRotationOpen = !isRotationOpen)
	const toggleScale = () => (isScaleOpen = !isScaleOpen)
	const toggleOptions = () => (isOptionsOpen = !isOptionsOpen)
	const toggleGlow = () => (isGlowOpen = !isGlowOpen)
	const toggleGlowPosition = () => (isGlowPositionOpen = !isGlowPositionOpen)

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
	let glowPositionX = $derived.by(() => toDecimals(item.glow_position_x, 0))
	let glowPositionY = $derived.by(() => toDecimals(item.glow_position_y, 0))
	let glowPositionZ = $derived.by(() => toDecimals(item.glow_position_z, 0))
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
	<ShePanel side="right" title="Item" onCloseClick={store.deselectItem} isOpen isCollapsible>
		<ShePanelSection label="Quick Actions">
			<ShePanelRow shouldWrap>
				<SheButton kind="dark">Lock Scale</SheButton>
				<SheButton kind="dark">Drop to Floor</SheButton>
				<SheButton kind="dark" onClick={rotateX}>Rotate X</SheButton>
				<SheButton kind="dark" onClick={rotateY}>Rotate Y</SheButton>
				<SheButton kind="dark" onClick={rotateZ}>Rotate Z</SheButton>
				<SheButton kind="dark" onClick={scaleUp}>Scale Up</SheButton>
				<SheButton kind="dark" onClick={scaleDown}>Scale Down</SheButton>
				<SheButton kind="dark">Delete</SheButton>
			</ShePanelRow>
		</ShePanelSection>
		<ShePanelSection label="General" isOpen={isOptionsOpen} onClick={toggleOptions}>
			<SheInput type="range" label="Opacity" min={0} max={100} step={1} value={opacity} onChange={updateOpacity} />
			<SheSpacer />
			<SheSwitch label="Visible" value={isVisible} onChange={updateIsVisible} />
			<SheSwitch label="Obstructive" value={isObstructive} onChange={updateIsObstructive} />
		</ShePanelSection>

		<ShePanelSection label="Glow" isOpen={isGlowOpen} onClick={toggleGlow}>
			<SheSwitch label="Glowing" value={isGlowing} onChange={updateIsGlowing} />
			{#if isGlowing}
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
				<ShePanelInnerSection row label="Position" isOpen={isGlowPositionOpen} onClick={toggleGlowPosition}>
					<SheInput
						type="number"
						label="X"
						decimals={2}
						min={0}
						max={100}
						step={1}
						value={glowPositionX}
						onChange={updateGlowPositionX}
					/>
					<SheInput
						type="number"
						label="Y"
						decimals={2}
						min={0}
						max={100}
						step={1}
						value={glowPositionY}
						onChange={updateGlowPositionY}
					/>
					<SheInput
						type="number"
						label="Z"
						decimals={2}
						min={0}
						max={100}
						step={1}
						value={glowPositionZ}
						onChange={updateGlowPositionZ}
					/>
				</ShePanelInnerSection>
			{/if}
		</ShePanelSection>

		<ShePanelSection label="Position" isOpen={isPositionOpen} onClick={togglePosition}>
			<ShePanelRow>
				<SheInput
					type="number"
					label="X"
					decimals={2}
					min={-64}
					max={64}
					step={0.1}
					value={positionX}
					onChange={updatePositionX}
				/>
				<SheInput
					type="number"
					label="Y"
					decimals={2}
					min={-64}
					max={64}
					step={0.1}
					value={positionY}
					onChange={updatePositionY}
				/>
				<SheInput
					type="number"
					label="Z"
					decimals={2}
					min={-64}
					max={64}
					step={0.1}
					value={positionZ}
					onChange={updatePositionZ}
				/>
			</ShePanelRow>
			<!-- <SheIconButton kind="mid" library="pixelarticons" icon="arrow-bar-down"></SheIconButton> -->
			<!-- <ShePanelRow shouldWrap xAlign="end">
				<SheIconButton kind="dark" library="pixelarticons" icon="arrow-bar-down"></SheIconButton>
			</ShePanelRow> -->
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

		<ShePanelSection label="Scale" isOpen={isScaleOpen} onClick={toggleScale}>
			<ShePanelInnerSection row label="Size" isOpen={isSizeOpen} onClick={toggleSize}>
				<SheInput
					type="number"
					label="X"
					decimals={4}
					min={0.1}
					max={50}
					step={0.1}
					value={sizeX}
					isDisabled
					onChange={updateSizeX}
				/>
				<SheInput
					type="number"
					label="Y"
					decimals={4}
					min={0.1}
					max={50}
					step={0.1}
					value={sizeY}
					isDisabled
					onChange={updateSizeY}
				/>
				<SheInput
					type="number"
					label="Z"
					decimals={4}
					min={0.1}
					max={50}
					step={0.1}
					value={sizeZ}
					isDisabled
					onChange={updateSizeZ}
				/>
			</ShePanelInnerSection>
			<div class="row" style="gap: 8px;">
				<SheInput
					type="number"
					label="X"
					decimals={3}
					min={0.1}
					max={100}
					step={0.1}
					value={scaleX}
					onChange={updateScaleX}
				/>
				<SheInput
					type="number"
					label="Y"
					decimals={3}
					min={0.1}
					max={100}
					step={0.1}
					value={scaleY}
					onChange={updateScaleY}
				/>
				<SheInput
					type="number"
					label="Z"
					decimals={3}
					min={0.1}
					max={100}
					step={0.1}
					value={scaleZ}
					onChange={updateScaleZ}
				/>
			</div>
		</ShePanelSection>
	</ShePanel>
{/if}

<style>
</style>
