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
	import { useToggler } from '~/modules/state-hooks.svelte'

	let isOpen = $derived.by(() => menuBar.activePanel === 'space')
	let space = $derived(mainStore.space)

	const updateName = mainStore.updateSpaceKey('name')
	const updateAbout = mainStore.updateSpaceKey('about')
	const updateSpaceWidth = mainStore.updateSpaceKey('sizeX')
	const updateSpaceHeight = mainStore.updateSpaceKey('sizeY')
	const updateSpaceDepth = mainStore.updateSpaceKey('sizeZ')
	const updateGridOpacity = mainStore.updateSpaceKey('gridOpacity')
	const updateGridSectionColor = mainStore.updateSpaceKey('gridSectionLineColor')
	const updateGridColor = mainStore.updateSpaceKey('gridCellLineColor')
	const updateCellSize = mainStore.updateSpaceKey('gridCellSize')
	const updateCellThickness = mainStore.updateSpaceKey('gridCellLineThickness')
	const updateSectionSize = mainStore.updateSpaceKey('gridSectionSize')
	const updateSectionThickness = mainStore.updateSpaceKey('gridSectionLineThickness')
	const updateFadeStrength = mainStore.updateSpaceKey('gridFadeAmount')
	const updateFadeDistance = mainStore.updateSpaceKey('gridFadeDistance')
	const updatebackgroundMode = mainStore.updateSpaceKey('backgroundMode')
	const updatebackgroundColor = mainStore.updateSpaceKey('backgroundColor')
	const updateShowEnvironment = mainStore.updateSpaceKey('isHdrEnabled')
	const updateHdr = mainStore.updateSpaceKey('hdr')
	const updatehdrBlur = mainStore.updateSpaceKey('hdrBlur')
	const updatehdrIntensity = mainStore.updateSpaceKey('hdrIntensity')
	const updateShowFloor = mainStore.updateSpaceKey('isFloorVisible')
	const updateFloorOpacity1 = mainStore.updateSpaceKey('floorOpacity1')
	const updateFloorColor1 = mainStore.updateSpaceKey('floorColor1')
	const updateFloorOpacity2 = mainStore.updateSpaceKey('floorOpacity2')
	const updateFloorColor2 = mainStore.updateSpaceKey('floorColor2')
	const updateShowGrid = mainStore.updateSpaceKey('isGridVisible')
	const updateSpaceColor = mainStore.updateSpaceKey('color')

	const floorSectionOpen = useToggler(true)
	const floorColorOpen1 = useToggler(true)
	const floorColorOpen2 = useToggler(true)
	const gridSectionOpen = useToggler(true)
	const sizeSectionOpen = useToggler(true)
	const infoSectionOpen = useToggler(true)
	const visibilitySectionOpen = useToggler(true)
	const cellsSectionOpen = useToggler(true)
	const sectionsSectionOpen = useToggler(true)
	const environmentSectionOpen = useToggler(true)

	const toggleGridOpen = () => {
		console.log('--------clickedddd')
		gridSectionOpen.toggle()
	}

	const hdrOptions = hdrs.map((hdr) => ({
		label: hdr.name,
		value: hdr.fileName
	}))
</script>

{#snippet environmentSection()}
	<ShePanelSection label="Environment" isOpen={environmentSectionOpen.value} onClick={environmentSectionOpen.toggle}>
		<SheSwitch label="Enable HDR" value={space.isHdrEnabled} onChange={updateShowEnvironment} />

		{#if space.isHdrEnabled}
			<SheSelect label="HDR" options={hdrOptions} value={space.hdr} onChange={updateHdr} />

			<SheInput
				type="range"
				label="Intensity"
				min="0"
				max="100"
				step="1"
				value={space.hdrIntensity}
				onChange={updatehdrIntensity}
			/>
		{/if}
		<SheColorInput label="Background" value={space.backgroundColor} onChange={updatebackgroundColor} />
	</ShePanelSection>
{/snippet}

{#snippet infoSection()}
	<ShePanelSection label="Info" isOpen={infoSectionOpen.value} onClick={infoSectionOpen.toggle}>
		<SheInput label="Name" value={space.name} onChange={updateName} />
		<SheInput type="textarea" label="About" value={space.about} onChange={updateAbout} />
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
		value={space.gridOpacity}
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
	<ShePanelSection label="Grid" isOpen={gridSectionOpen.value} onClick={toggleGridOpen}>
		{@render gridOptions()}
		{@render gridLines()}
	</ShePanelSection>
{/snippet}

{#snippet cellsSection()}
	<ShePanelInnerSection label="Cell Lines" isOpen={cellsSectionOpen.value} onClick={cellsSectionOpen.toggle}>
		<SheColorInput label="Color" value={space.gridCellLineColor} onChange={updateGridColor} />
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
	<ShePanelInnerSection label="Section Lines" isOpen={sectionsSectionOpen.value} onClick={sectionsSectionOpen.toggle}>
		<SheColorInput label="2Color" value={space.gridSectionLineColor} onChange={updateGridSectionColor} />
		<ShePanelRow>
			<SheInput
				type="number"
				label="Size"
				min="0.1"
				max="10"
				step="0.1"
				decimals="1"
				value={space.gridSectionSize}
				onChange={updateSectionSize}
			/>
			<SheInput
				type="number"
				label="Thickness"
				min="0.1"
				max="10"
				step="0.1"
				decimals="1"
				value={space.gridSectionLineThickness}
				onChange={updateSectionThickness}
			/>
		</ShePanelRow>
	</ShePanelInnerSection>
{/snippet}

{#snippet visibilitySection()}
	<ShePanelSection label="Visibility" row isOpen={visibilitySectionOpen.value} onClick={visibilitySectionOpen.toggle}>
		<SheInput type="number" label="Strength" value={space.gridFadeAmount} onChange={updateFadeStrength} />
		<SheInput type="number" label="Distance" value={space.gridFadeDistance} onChange={updateFadeDistance} />
	</ShePanelSection>
{/snippet}

{#snippet floorSection()}
	<ShePanelSection label="Floor" isOpen={floorSectionOpen.value} onClick={floorSectionOpen.toggle}>
		{@render sizeSection()}

		<ShePanelInnerSection label="Color 1" isOpen={floorColorOpen1.value} onClick={floorColorOpen1.toggle}>
			<SheColorInput label="Color" value={space.floorColor1} onChange={updateFloorColor1} />
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
		<ShePanelInnerSection label="Color 2" isOpen={floorColorOpen2.value} onClick={floorColorOpen2.toggle}>
			<SheColorInput label="Color" value={space.floorColor2} onChange={updateFloorColor2} />
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
	<ShePanelInnerSection label="Size" isOpen={sizeSectionOpen.value} onClick={sizeSectionOpen.toggle}>
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
