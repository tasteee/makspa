<script lang="ts">
	import mainStore from '~/stores/main-store.svelte'
	import cameraStore from '~/stores/camera.store.svelte'
	import SheIconButton from '~/components/she/SheIconButton.svelte'
	import stores from '~/stores'
	import TopBarPanels from './TopBarPanels.svelte'

	type TopBarPropsT = {
		title?: string
		class?: string
	}

	let props: TopBarPropsT = $props()
	let activePanel = $derived(stores.menuBar.activePanel)
	let togglePanel = (panel: string) => () => stores.menuBar.togglePanel(panel)
</script>

<div class="TopBar noselect {props.class}">
	{#if props.title}
		<div class="TopBarTitle">{props.title}</div>
	{/if}

	<div class="IconsContainer">
		<SheIconButton
			kind={activePanel === 'space' ? 'light' : 'dark'}
			isActive={activePanel === 'space'}
			size="large"
			class="TopBarIconButton"
			onClick={togglePanel('space')}
			library="pixelarticons"
			icon="edit"
		/>
		<SheIconButton
			kind={activePanel === 'shop' ? 'light' : 'dark'}
			isActive={activePanel === 'shop'}
			size="large"
			class="TopBarIconButton"
			onClick={togglePanel('shop')}
			library="pixelarticons"
			icon="coin"
		/>
		<SheIconButton
			kind={activePanel === 'home' ? 'light' : 'dark'}
			isActive={activePanel === 'home'}
			size="large"
			class="TopBarIconButton"
			onClick={togglePanel('home')}
			library="pixelarticons"
			icon="home"
		/>

		<SheIconButton size="large" class="TopBarIconButton" onClick={cameraStore.resetCamera} icon="camera" />
	</div>
</div>

{#if !!mainStore.space?.id}
	<TopBarPanels />
{/if}

<style>
	:global {
		.TopBar {
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			z-index: 1000;
			height: 0px;
			overflow: visible;
			display: inline-flex;
		}

		.TopBar .TopBarTitle {
			color: var(--gray0);
			font-size: 18px;
			font-weight: 500;
		}

		.TopBar .IconsContainer {
			margin-top: 16px;
			margin-left: 12px;
			display: inline-flex;
			gap: 12px;
			align-items: center;
			height: 40px;
		}

		.TopBar .TopBarIconButton {
			width: 48px;
			height: 48px;
			display: flex;
			align-items: center;
			justify-content: center;
			/* background: var(--gray40);
			border: none;
			box-shadow: var(--shadowBorder32);
			border-radius: 8px;
			color: var(--gray10);
			cursor: pointer;
			transition: all 0.2s ease; */
		}

		.TopBar .TopBarPanels {
			position: absolute;
			top: 76px; /* 64px + 12px gap */
			left: 0;
			right: 0;
			height: 128px;
			background-color: var(--gray40);
			box-shadow: var(--shadowBorder32);
			padding: 16px;
			overflow: hidden;
		}
	}
</style>
