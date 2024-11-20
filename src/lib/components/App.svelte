<script lang="ts">
	import { Canvas } from '@threlte/core'
	import Scene from './Scene.svelte'
	import TransformModeToggle from './Interface/TransformModeToggle.svelte'
	import { World } from '@threlte/rapier'
	import keyboard from '../stores/keyboard.svelte'
	import { onMount } from 'svelte'
	import store from '../stores/store.svelte'
	import ItemPanelVertical from './Interface/ItemPanelVertical.svelte'
	import SheTopBar from './Interface/SheTopBar.svelte'
	import CameraDetails from './Interface/CameraDetails.svelte'
	onMount(() => {
		keyboard.registerListeners()
	})
</script>

<Canvas background="#010101">
	<World>
		<Scene />
	</World>
</Canvas>

<!-- <ModelsGallery /> -->
<!-- <BottomNav /> -->
<!-- <CameraZoomInput /> -->
<!-- <SideBar /> -->
<!-- <TopBar /> -->
<SheTopBar />
<!-- <ShePanel title="Settings" isOpen={true} onCloseClick={() => {}} side="right">
	<SheDivider label="Icons" />
	<div class="row gap2">
	
		<SheIcon library="pixelarticons" icon="close" size="small" />
		<SheIcon library="pixelarticons" icon="heart" size="small" />
		<SheIcon library="pixelarticons" icon="plus" size="small" />
		<SheIcon library="pixelarticons" icon="coin" size="small" />
		<SheIcon library="pixelarticons" icon="users" size="small" />
	</div>
	<div class="row gap2">
		<SheIcon library="pixelarticons" icon="close" size="medium" />
		<SheIcon library="pixelarticons" icon="heart" size="medium" />
		<SheIcon library="pixelarticons" icon="plus" size="medium" />
		<SheIcon library="pixelarticons" icon="coin" size="medium" />
		<SheIcon library="pixelarticons" icon="users" size="medium" />
	</div>
	<div class="row gap2">
		<SheIcon library="pixelarticons" icon="close" size="large" />
		<SheIcon library="pixelarticons" icon="heart" size="large" />
		<SheIcon library="pixelarticons" icon="plus" size="large" />
		<SheIcon library="pixelarticons" icon="coin" size="large" />
		<SheIcon library="pixelarticons" icon="users" size="large" />
	</div>
	<SheDivider label="Buttons" />
	<div class="row gap2 wrap">
		<SheButton>Default</SheButton>
		<SheButton variant="primary">Primary</SheButton>
		<SheButton isDisabled>Disabled</SheButton>
		<SheButton variant="primary" size="small">
			<SheIcon library="pixelarticons" icon="close" size="xsmall" color="black" />
		</SheButton>
		<SheButton variant="primary" size="medium">
			<SheIcon library="pixelarticons" icon="close" size="medium" color="black" />
		</SheButton>
		<SheButton variant="primary" size="large">
			<SheIcon library="pixelarticons" icon="close" size="large" color="black" />
		</SheButton>
	</div>
	<SheDivider label="Inputs (small)" />
	<div class="column gap2">
		<SheInput label="Text" size="small" />
		<SheInput label="Number" type="number" value={123} size="small" />
		<SheInput label="Color" type="color" value="#FFFFFF" size="small" />
		<SheInput
			label="Range"
			type="range"
			value={rangeValue}
			decimals={0}
			min={0}
			max={100}
			size="small"
			onChange={updateRangeValue}
		/>
		<SheInput label="Long text" type="longtext" value="" size="small" />
	</div>
	<SheDivider label="Inputs (medium)" />
	<div class="column gap2">
		<SheInput label="Text" size="medium" />
		<SheInput label="Number" type="number" value={123} size="medium" />
		<SheInput label="Color" type="color" value="#FFFFFF" size="medium" />
		<SheInput
			label="Range"
			type="range"
			value={rangeValue}
			decimals={0}
			min={0}
			max={100}
			size="medium"
			onChange={updateRangeValue}
		/>
		<SheInput label="Long text" type="longtext" value="" size="medium" />
	</div>
	<SheDivider label="Inputs (large)" />
	<div class="column gap2">
		<SheInput label="Text" size="large" />
		<SheInput label="Number" type="number" value={123} size="large" />
		<SheInput label="Color" type="color" value="#FFFFFF" size="large" />
		<SheInput
			label="Range"
			type="range"
			value={rangeValue}
			decimals={0}
			min={0}
			max={100}
			size="large"
			onChange={updateRangeValue}
		/>
		<SheInput label="Long text" type="longtext" value="" size="large" />
	</div>
	<SheDivider label="Switches" />
	<div class="column gap2">
		<SheSwitch size="small" label="Switch" value={isSwitchOn0} onChange={(value) => (isSwitchOn0 = value)} />
		<SheSwitch size="medium" label="Switch" value={isSwitchOn1} onChange={(value) => (isSwitchOn1 = value)} />
		<SheSwitch size="large" label="Switch" value={isSwitchOn2} onChange={(value) => (isSwitchOn2 = value)} />
	</div>
	<SheDivider label="Dividers" />
	<div class="column gap2">
		<SheDivider label="Foo" labelPosition="start" />
		<SheDivider label="Bar" labelPosition="center" />
		<SheDivider label="Baz" labelPosition="end" />
	</div>
</ShePanel> -->

{#if store.isItemPanelOpen}
	{#if store.selectedItemUid}
		<ItemPanelVertical />
		<TransformModeToggle />
	{/if}
	<!-- <TransformModeControl /> -->
{/if}
<!-- <InputIndicators /> -->

<!-- <CameraDetails /> -->
