<script lang="ts">
	import ShePanel from '~/components/she/ShePanel.svelte'
	import SheIcon from '~/components/she/SheIcon.svelte'
	import ShePanelRow from '~/components/she/ShePanelRow.svelte'
	import SheDivider from '~/components/she/SheDivider.svelte'
	import SheButton from '~/components/she/SheButton.svelte'
	import SheSwitch from '~/components/she/SheSwitch.svelte'
	import SheSelect from '~/components/she/SheSelect.svelte'
	import SheInput from '~/components/she/SheInput.svelte'
	import ShePanelSection from '~/components/she/ShePanelSection.svelte'
	import ShePanelInnerSection from '~/components/she/ShePanelInnerSection.svelte'
	import SheSpacer from '~/components/she/SheSpacer.svelte'
	import SheColorInput from '~/components/she/SheColorInput.svelte'
	import hdrs from '~/database/data/hdrs.json'
	import menuBar from '~/stores/menuBar.store.svelte'
	import mainStore from '~/stores/main-store.svelte'

	let isOpen = $derived.by(() => menuBar.activePanel === 'space')
	let space = $derived(mainStore.space)
	let name = $derived(space.name)
	let about = $derived(space.about)

	let gridOpacity = $derived(space.gridOpacity / 100)
	let gridCellLineColor = $derived(space.gridCellLineColor)
	let gridSectionLineColor = $derived(space.gridSectionLineColor)
	let sectionSize = $derived(space.gridSectionSize)
	let sectionThickness = $derived(space.gridSectionLineThickness)
	let environmentBlur = $derived(space.environmentBlur)
	let showEnvironment = $derived(space.isEnvironmentVisible)
	let backgroundType = $derived(space.backgroundType)
	let backgroundColor = $derived(space.backgroundColor)

	const updater = (key: string) => (value: boolean | string | number) => {
		mainStore.updateSpace({ [key]: value })
	}

	const updateName = updater('name')
	const updateAbout = updater('about')
	const updateSpaceWidth = updater('sizeX')
	const updateSpaceHeight = updater('sizeY')
	const updateSpaceDepth = updater('sizeZ')
	const updateGridOpacity = updater('gridOpacity')
	const updateGridSectionColor = updater('gridSectionLineColor')
	const updateGridColor = updater('gridCellLineColor')
	const updateCellSize = updater('gridCellSize')
	const updateCellThickness = updater('gridCellLineThickness')
	const updateSectionSize = updater('gridSectionSize')
	const updateSectionThickness = updater('gridSectionLineThickness')
	const updateFadeStrength = updater('gridFadeStrength')
	const updateFadeDistance = updater('gridFadeDistance')
	const updateBackgroundType = updater('backgroundType')
	const updatebackgroundColor = updater('backgroundColor')

	const updateShowFloor = updater('isFloorVisible')
	const updateFloorOpacity1 = updater('floorOpacity1')
	const updateFloorColor1 = updater('floorColor1')
	const updateFloorOpacity2 = updater('floorOpacity2')
	const updateFloorColor2 = updater('floorColor2')
	const updateShowGrid = updater('isGridVisible')
	const updateEnvironmentBlur = updater('environmentBlur')
	const updateShowEnvironment = updater('isEnvironmentVisible')
	const updateEnvironmentOnly = updater('environmentOnly')
	const updateSpaceColor = updater('color')

	let isFloorSectionOpen = $state(true)
	let isFloorColorOpen1 = $state(true)
	let isFloorColorOpen2 = $state(true)
	let isGridSectionOpen = $state(true)
	let isSizeSectionOpen = $state(true)
	let isInfoSectionOpen = $state(true)
	let isVisibilitySectionOpen = $state(true)
	let isCellsSectionOpen = $state(true)
	let isSectionsSectionOpen = $state(true)
	let isEnvironmentSectionOpen = $state(true)
	let isBackgroundSectionOpen = $state(true)

	const toggleEnvironmentSection = () => (isEnvironmentSectionOpen = !isEnvironmentSectionOpen)
	let toggleFloorSectionOpen = () => (isFloorSectionOpen = !isFloorSectionOpen)
	let toggleFloorColorOpen1 = () => (isFloorColorOpen1 = !isFloorColorOpen1)
	let toggleFloorColorOpen2 = () => (isFloorColorOpen2 = !isFloorColorOpen2)
	let toggleGridSection = () => (isGridSectionOpen = !isGridSectionOpen)
	let toggleSizeSection = () => (isSizeSectionOpen = !isSizeSectionOpen)
	let toggleInfoSection = () => (isInfoSectionOpen = !isInfoSectionOpen)
	let toggleVisibilitySection = () => (isVisibilitySectionOpen = !isVisibilitySectionOpen)
	let toggleCellsSection = () => (isCellsSectionOpen = !isCellsSectionOpen)
	let toggleSectionsSection = () => (isSectionsSectionOpen = !isSectionsSectionOpen)
	let toggleBackgroundSection = () => (isBackgroundSectionOpen = !isBackgroundSectionOpen)

	let environment = $derived(space.environment)
	let updateEnvironment = updater('environment')

	const environmentOptions = hdrs.map((hdr) => ({
		label: hdr.name,
		value: hdr.fileName
	}))
</script>

{#snippet environmentSection()}
	<ShePanelSection label="Environment" isOpen={isEnvironmentSectionOpen} onClick={toggleEnvironmentSection}>
		<SheSwitch label="Enable HDR" value={showEnvironment} onChange={updateShowEnvironment} />
		{#if showEnvironment}
			<SheSelect label="HDR" options={environmentOptions} value={environment} onChange={updateEnvironment} />

			<ShePanelInnerSection label="Background" isOpen={isBackgroundSectionOpen} onClick={toggleBackgroundSection}>
				<SheSelect
					label="Type"
					options={[
						{ label: 'None', value: 'none' },
						{ label: 'HDR Background', value: 'hdr' },
						{ label: 'Solid Color', value: 'color' }
					]}
					value={backgroundType}
					onChange={updateBackgroundType}
				/>

				{#if backgroundType === 'hdr'}
					<SheInput
						type="range"
						label="Blur"
						min="0"
						max="1"
						step="0.05"
						value={environmentBlur}
						onChange={updateEnvironmentBlur}
					/>
				{/if}

				<!-- Background Options -->
				{#if backgroundType === 'color'}
					<SheColorInput label="0 Color" value={backgroundColor} onChange={updatebackgroundColor} />
				{/if}
			</ShePanelInnerSection>
		{/if}
	</ShePanelSection>
{/snippet}

{#snippet infoSection()}
	<ShePanelSection label="Info" isOpen={isInfoSectionOpen} onClick={toggleInfoSection}>
		<SheInput label="Name" value={name} onChange={updateName} />
		<SheInput type="textarea" label="About" value={about} onChange={updateAbout} />
		<SheColorInput label="Color" value={space.color} onChange={updateSpaceColor} />
	</ShePanelSection>
{/snippet}

{#snippet gridOptions()}
	<SheInput
		isDisabled
		type="range"
		label="Opacity"
		step="1"
		decimals="1"
		min="0"
		max="100"
		value={gridOpacity}
		onChange={updateGridOpacity}
	/>
	<SheSwitch label="Show Grid" value={space.isGridVisible} onChange={updateShowGrid} />
	<SheSwitch label="Show Floor" value={space.isFloorVisible} onChange={updateShowFloor} />
{/snippet}

{#snippet gridLines()}
	{@render cellsSection()}
	{@render sectionsSection()}
{/snippet}

{#snippet gridSection()}
	<ShePanelSection label="Grid" isOpen={isGridSectionOpen} onClick={toggleGridSection}>
		{@render gridOptions()}
		{@render gridLines()}
	</ShePanelSection>
{/snippet}

{#snippet cellsSection()}
	<ShePanelInnerSection label="Cell Lines" isOpen={isCellsSectionOpen} onClick={toggleCellsSection}>
		<SheColorInput label="1 Color" value={gridCellLineColor} onChange={updateGridColor} />
		<ShePanelRow>
			<SheInput
				type="number"
				label="Size"
				decimals="1"
				step="0.1"
				min="0.1"
				max="1"
				value={space.gridCellSize}
				onChange={updateCellSize}
			/>
			<SheInput
				type="number"
				label="Weight"
				decimals="1"
				step="0.1"
				min="0.5"
				max="10"
				value={space.gridCellLineThickness}
				onChange={updateCellThickness}
			/>
		</ShePanelRow>
	</ShePanelInnerSection>
{/snippet}

{#snippet sectionsSection()}
	<ShePanelInnerSection label="Section Lines" isOpen={isSectionsSectionOpen} onClick={toggleSectionsSection}>
		<SheColorInput label="2Color" value={gridSectionLineColor} onChange={updateGridSectionColor} />
		<ShePanelRow>
			<SheInput
				type="number"
				label="Size"
				min="0.1"
				max="10"
				step="0.1"
				decimals="1"
				value={sectionSize}
				onChange={updateSectionSize}
			/>
			<SheInput
				type="number"
				label="Thickness"
				min="0.1"
				max="10"
				step="0.1"
				decimals="1"
				value={sectionThickness}
				onChange={updateSectionThickness}
			/>
		</ShePanelRow>
	</ShePanelInnerSection>
{/snippet}

{#snippet visibilitySection()}
	<ShePanelSection label="Visibility" row isOpen={isVisibilitySectionOpen} onClick={toggleVisibilitySection}>
		<SheInput type="number" label="Strength" value={space.gridFadeStrength} onChange={updateFadeStrength} />
		<SheInput type="number" label="Distance" value={space.gridFadeDistance} onChange={updateFadeDistance} />
	</ShePanelSection>
{/snippet}

{#snippet floorSection()}
	<ShePanelSection label="Floor" isOpen={isFloorSectionOpen} onClick={toggleFloorSectionOpen}>
		{@render sizeSection()}

		<ShePanelInnerSection label="Color 1" isOpen={isFloorColorOpen1} onClick={toggleFloorColorOpen1}>
			<SheColorInput label="3 Color" value={space.floorColor1} onChange={updateFloorColor1} />
			<SheInput
				type="range"
				label="Opacity"
				step="1"
				decimals="1"
				min="0"
				max="100"
				value={space.floorOpacity1}
				onChange={updateFloorOpacity1}
			/>
		</ShePanelInnerSection>
		<ShePanelInnerSection label="Color 2" isOpen={isFloorColorOpen2} onClick={toggleFloorColorOpen2}>
			<SheColorInput label="4 Color" value={space.floorColor2} onChange={updateFloorColor2} />
			<SheInput
				type="range"
				label="Opacity"
				step="1"
				decimals="1"
				min="0"
				max="100"
				value={space.floorOpacity2}
				onChange={updateFloorOpacity2}
			/>
		</ShePanelInnerSection>
	</ShePanelSection>
{/snippet}

{#snippet sizeSection()}
	<ShePanelInnerSection label="Size" isOpen={isSizeSectionOpen} onClick={toggleSizeSection}>
		<div class="row gap1">
			<SheInput
				type="number"
				decimals={0}
				label="X"
				step="1"
				min="6"
				max="64"
				value={space.sizeX}
				onChange={updateSpaceWidth}
			/>
			<SheInput
				type="number"
				decimals={0}
				label="Y"
				step="1"
				min="6"
				max="64"
				value={space.sizeY}
				onChange={updateSpaceHeight}
			/>
			<SheInput
				type="number"
				decimals={0}
				label="Z"
				step="1"
				min="6"
				max="64"
				value={space.sizeZ}
				onChange={updateSpaceDepth}
			/>
		</div>
	</ShePanelInnerSection>
{/snippet}

<ShePanel side="left" title="Space" {isOpen}>
	{#if space.id}
		{@render infoSection()}
		{@render environmentSection()}
		{@render floorSection()}
		{@render gridSection()}
		{@render visibilitySection()}
	{/if}
</ShePanel>

<style lang="scss" scoped>
	:global([type='color']) {
		height: 48px;
	}
</style>
