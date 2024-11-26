<script lang="ts">
	import ShePanel from '~/components/she/ShePanel.svelte'
	import ShePanelSection from '~/components/she/ShePanelSection.svelte'
	import ShePanelInnerSection from '~/components/she/ShePanelInnerSection.svelte'
	import SheInput from '~/components/she/SheInput.svelte'
	import SheSwitch from '~/components/she/SheSwitch.svelte'
	import SheButton from '~/components/she/SheButton.svelte'
	import SheSpacer from '~/components/she/SheSpacer.svelte'
	import SheIconButton from '~/components/she/SheIconButton.svelte'
	import u from '~/modules/utilities'
	import SheColorInput from '~/components/she/SheColorInput.svelte'
	import ShePanelRow from '~/components/she/ShePanelRow.svelte'
	import mainStore from '~/stores/main-store.svelte'

	let item = $derived(mainStore.selectedItem)
	let isPanelOpen = $derived(!!mainStore.selectedItemId)

	const updater = (key: string) => {
		return (value: PrimitiveT) => {
			mainStore.updateItem({ id: item.id, [key]: value })
		}
	}

	const updatePositionX = updater('positionX')
	const updatePositionY = updater('positionY')
	const updatePositionZ = updater('positionZ')
	const updateRotationX = updater('rotationX')
	const updateRotationY = updater('rotationY')
	const updateRotationZ = updater('rotationZ')
	const updateSizeX = updater('sizeX')
	const updateSizeY = updater('sizeY')
	const updateSizeZ = updater('sizeZ')
	const updateScaleX = updater('scaleX')
	const updateScaleY = updater('scaleY')
	const updateScaleZ = updater('scaleZ')
	const updateOpacity = updater('opacity')
	const updateIsVisible = updater('isVisible')
	const updateIsGlowing = updater('isGlowing')
	const updateIsObstructive = updater('isObstructive')
	const updateGlowPositionX = updater('glowPositionX')
	const updateGlowPositionY = updater('glowPositionY')
	const updateGlowPositionZ = updater('glowPositionZ')

	const scaleUp = () => {
		const scaleX = item.scaleX + 0.25
		const scaleY = item.scaleY + 0.25
		const scaleZ = item.scaleZ + 0.25
		mainStore.updateItem({ id: item.id, scaleX, scaleY, scaleZ })
	}

	const scaleDown = () => {
		const scaleX = item.scaleX - 0.25
		const scaleY = item.scaleY - 0.25
		const scaleZ = item.scaleZ - 0.25
		mainStore.updateItem({ id: item.id, scaleX, scaleY, scaleZ })
	}

	const rotateX = () => {
		const newValue = item.rotationX + 5
		const isHigherThan100 = newValue > 100
		const remainder = newValue - 100
		const rotationX = isHigherThan100 ? remainder : newValue
		mainStore.updateItem({ id: item.id, rotationX })
	}

	const rotateY = () => {
		const newValue = item.rotationY + 5
		const isHigherThan100 = newValue > 100
		const remainder = newValue - 100
		const rotationY = isHigherThan100 ? remainder : newValue
		mainStore.updateItem({ id: item.id, rotationY })
	}

	const rotateZ = () => {
		const newValue = item.rotationZ + 5
		const isHigherThan100 = newValue > 100
		const remainder = newValue - 100
		const rotationZ = isHigherThan100 ? remainder : newValue
		mainStore.updateItem({ id: item.id, rotationZ })
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

	let sizeX = $derived.by(() => u.number.toDecimals(item.sizeX, 2))
	let sizeY = $derived.by(() => u.number.toDecimals(item.sizeY, 2))
	let sizeZ = $derived.by(() => u.number.toDecimals(item.sizeZ, 2))
	let positionX = $derived.by(() => u.number.toDecimals(item.positionX, 2))
	let positionY = $derived.by(() => u.number.toDecimals(item.positionY, 2))
	let positionZ = $derived.by(() => u.number.toDecimals(item.positionZ, 2))
	let rotationX = $derived.by(() => u.number.toDecimals(item.rotationX, 0))
	let rotationY = $derived.by(() => u.number.toDecimals(item.rotationY, 0))
	let rotationZ = $derived.by(() => u.number.toDecimals(item.rotationZ, 0))
	let scaleX = $derived.by(() => u.number.toDecimals(item.scaleX, 3))
	let scaleY = $derived.by(() => u.number.toDecimals(item.scaleY, 3))
	let scaleZ = $derived.by(() => u.number.toDecimals(item.scaleZ, 3))
	let glowPositionX = $derived.by(() => u.number.toDecimals(item.glowPositionX, 0))
	let glowPositionY = $derived.by(() => u.number.toDecimals(item.glowPositionY, 0))
	let glowPositionZ = $derived.by(() => u.number.toDecimals(item.glowPositionZ, 0))
	let opacity = $derived.by(() => u.number.toDecimals(item.opacity, 1))
	let isVisible = $derived.by(() => item.isVisible)
	let isGlowing = $derived.by(() => item.isGlowing)
	let isObstructive = $derived.by(() => item.isObstructive)
	let glowIntensity = $derived.by(() => item.glowIntensity)
	let glowColor = $derived.by(() => item.glowColor)
	const updateGlowIntensity = updater('glowIntensity')
	const updateGlowColor = updater('glowColor')
</script>

<ShePanel side="right" title="Item" onCloseClick={mainStore.deselectItem} isOpen={isPanelOpen} isCollapsible>
	{#if isPanelOpen}
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
	{/if}
</ShePanel>

<style>
</style>
