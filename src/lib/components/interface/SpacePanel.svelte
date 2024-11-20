<script lang="ts">
	import store from '../../stores/store.svelte'
	import ShePanel from './ShePanel.svelte'
	import SheIcon from './SheIcon.svelte'
	import SheDivider from './SheDivider.svelte'
	import SheButton from './SheButton.svelte'
	import SheSwitch from './SheSwitch.svelte'
	import SheInput from './SheInput.svelte'
	import ShePanelSection from './ShePanelSection.svelte'
	import ShePanelInnerSection from './ShePanelInnerSection.svelte'
	import SheSpacer from './SheSpacer.svelte'
	import SheColorInput from './SheColorInput.svelte'

	let isOpen = $derived(store.checkIsPanelOpen('space'))
	let space = $derived(store.activeSpace)
	let name = $derived(space.name)
	let about = $derived(space.about)
	let spaceSizeX = $derived(space.size_x)
	let spaceSizeZ = $derived(space.size_z)
	let spaceSizeY = $derived(space.size_y)

	let gridCellColor = $derived(space.grid_cell_color)
	let gridSectionColor = $derived(space.grid_section_color)
	let cellSize = $derived(space.grid_cell_size)
	let cellThickness = $derived(space.grid_cell_thickness)
	let sectionSize = $derived(space.section_size)
	let sectionThickness = $derived(space.section_thickness)
	let fadeStrength = $derived(space.fade_strength)
	let fadeDistance = $derived(space.fade_distance)
	// let showCellDividers = $derived(space.show_grid_cell_dividers)
	// let showSectionDividers = $derived(space.show_section_dividers)

	let floorOpacity1 = $derived(space.floor_opacity_1)
	let floorColor1 = $derived(space.floor_color_1)
	let floorOpacity2 = $derived(space.floor_opacity_2)
	let floorColor2 = $derived(space.floor_color_2)
	let showGrid = $derived(space.is_grid_visible)
	let showFloor = $derived(space.is_floor_visible)

	const updater = (key: string) => (value: boolean | string | number) => {
		store.updateSpace(key, value)
	}

	const updateName = updater('name')
	const updateAbout = updater('about')
	const updateSpaceWidth = updater('size_x')
	const updateSpaceHeight = updater('size_y')
	const updateSpaceDepth = updater('size_z')

	const updateGridOpacity = updater('grid_opacity')
	const updateGridSectionColor = updater('grid_section_color')
	const updateGridColor = updater('grid_cell_color')
	const updateCellSize = updater('grid_cell_size')
	const updateCellThickness = updater('grid_cell_thickness')
	const updateSectionSize = updater('section_size')
	const updateSectionThickness = updater('section_thickness')
	const updateFadeStrength = updater('fade_strength')
	const updateFadeDistance = updater('fade_distance')
	// const updateShowCellDividers = updater('show_grid_cell_dividers')
	// const updateShowSectionDividers = updater('show_section_dividers')

	const updateShowFloor = updater('is_floor_visible')
	const updateFloorOpacity1 = updater('floor_opacity_1')
	const updateFloorColor1 = updater('floor_color_1')
	const updateFloorOpacity2 = updater('floor_opacity_2')
	const updateFloorColor2 = updater('floor_color_2')
	const updateShowGrid = updater('is_grid_visible')

	let isFloorSectionOpen = $state(true)
	let isFloorColorOpen1 = $state(true)
	let isFloorColorOpen2 = $state(true)
	let isGridSectionOpen = $state(true)
	let isSizeSectionOpen = $state(true)
	let isInfoSectionOpen = $state(true)
	let isVisibilitySectionOpen = $state(true)
	let isCellsSectionOpen = $state(true)
	let isSectionsSectionOpen = $state(true)

	let toggleFloorSectionOpen = () => (isFloorSectionOpen = !isFloorSectionOpen)
	let toggleFloorColorOpen1 = () => (isFloorColorOpen1 = !isFloorColorOpen1)
	let toggleFloorColorOpen2 = () => (isFloorColorOpen2 = !isFloorColorOpen2)
	let toggleGridSection = () => (isGridSectionOpen = !isGridSectionOpen)
	let toggleSizeSection = () => (isSizeSectionOpen = !isSizeSectionOpen)
	let toggleInfoSection = () => (isInfoSectionOpen = !isInfoSectionOpen)
	let toggleVisibilitySection = () => (isVisibilitySectionOpen = !isVisibilitySectionOpen)
	let toggleCellsSection = () => (isCellsSectionOpen = !isCellsSectionOpen)
	let toggleSectionsSection = () => (isSectionsSectionOpen = !isSectionsSectionOpen)
</script>

{#snippet infoSection()}
	<ShePanelSection label="Info" isOpen={isInfoSectionOpen} onClick={toggleInfoSection}>
		<SheInput label="Name" value={name} onChange={updateName} />
		<SheInput type="longtext" label="About" value={about} onChange={updateAbout} />
	</ShePanelSection>
{/snippet}

{#snippet gridOptions()}
	<SheSwitch label="Show Grid" value={showGrid} onChange={updateShowGrid} />
	<SheSwitch label="Show Floor" value={showFloor} onChange={updateShowFloor} />

	<!-- <SheSwitch label="Show Cell Dividers" value={showCellDividers} onChange={updateShowCellDividers} /> -->
	<!-- <SheSwitch label="Show Section Dividers" value={showSectionDividers} onChange={updateShowSectionDividers} /> -->
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
		<SheColorInput label="Color" value={gridCellColor} onChange={updateGridColor} />
		<SheInput
			type="number"
			label="Size"
			decimals="1"
			step="0.1"
			min="0.1"
			max="1"
			value={cellSize}
			onChange={updateCellSize}
		/>
		<SheInput
			type="number"
			label="Thickness"
			decimals="1"
			step="0.1"
			min="0.5"
			max="10"
			value={cellThickness}
			onChange={updateCellThickness}
		/>
	</ShePanelInnerSection>
{/snippet}

{#snippet sectionsSection()}
	<ShePanelInnerSection label="Section Lines" isOpen={isSectionsSectionOpen} onClick={toggleSectionsSection}>
		<SheColorInput label="Color" value={gridSectionColor} onChange={updateGridSectionColor} />
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
	</ShePanelInnerSection>
{/snippet}

{#snippet visibilitySection()}
	<ShePanelSection label="Visibility" row isOpen={isVisibilitySectionOpen} onClick={toggleVisibilitySection}>
		<SheInput type="number" label="Strength" value={fadeStrength} onChange={updateFadeStrength} />
		<SheInput type="number" label="Distance" value={fadeDistance} onChange={updateFadeDistance} />
	</ShePanelSection>
{/snippet}

{#snippet floorSection()}
	<ShePanelSection label="Floor" isOpen={isFloorSectionOpen} onClick={toggleFloorSectionOpen}>
		{@render sizeSection()}

		<ShePanelInnerSection label="Color 1" isOpen={isFloorColorOpen1} onClick={toggleFloorColorOpen1}>
			<SheColorInput label="Color" value={floorColor1} onChange={updateFloorColor1} />
			<SheInput
				type="range"
				label="Opacity"
				step="1"
				decimals="1"
				min="0"
				max="100"
				value={floorOpacity1}
				onChange={updateFloorOpacity1}
			/>
		</ShePanelInnerSection>
		<ShePanelInnerSection label="Color 2" isOpen={isFloorColorOpen2} onClick={toggleFloorColorOpen2}>
			<SheColorInput label="Color" value={floorColor2} onChange={updateFloorColor2} />
			<SheInput
				type="range"
				label="Opacity"
				step="1"
				decimals="1"
				min="0"
				max="100"
				value={floorOpacity2}
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
				value={spaceSizeX}
				onChange={updateSpaceWidth}
			/>
			<SheInput
				type="number"
				decimals={0}
				label="Y"
				step="1"
				min="6"
				max="64"
				value={spaceSizeY}
				onChange={updateSpaceHeight}
			/>
			<SheInput
				type="number"
				decimals={0}
				label="Z"
				step="1"
				min="6"
				max="64"
				value={spaceSizeZ}
				onChange={updateSpaceDepth}
			/>
		</div>
	</ShePanelInnerSection>
{/snippet}

<ShePanel side="left" title="Space" {isOpen}>
	{@render infoSection()}
	{@render floorSection()}
	{@render gridSection()}
	{@render visibilitySection()}
</ShePanel>

<style lang="scss" scoped>
	:global([type='color']) {
		height: 48px;
	}

	:global(.SheButton) {
		padding: 0px 8px;
		display: flex;
		align-items: center;
	}
</style>
