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

	let isOpen = $derived.by(() => store.checkIsPanelOpen('home'))
</script>

<ShePanel class="HomePanel" side="left" title="Home" {isOpen}>
	<ShePanelSection label="News">
		<p>howdy</p>
	</ShePanelSection>
</ShePanel>
