<script lang="ts">
	import ShePanel from '~/components/she/ShePanel.svelte'
	import SheIcon from '~/components/she/SheIcon.svelte'
	import SheDivider from '~/components/she/SheDivider.svelte'
	import SheButton from '~/components/she/SheButton.svelte'
	import SheSwitch from '~/components/she/SheSwitch.svelte'
	import SheInput from '~/components/she/SheInput.svelte'
	import ShePanelSection from '~/components/she/ShePanelSection.svelte'
	import ShePanelInnerSection from '~/components/she/ShePanelInnerSection.svelte'
	import SheSpacer from '~/components/she/SheSpacer.svelte'
	import SheColorInput from '~/components/she/SheColorInput.svelte'
	import stores from '~/stores'
	let isOpen = $derived.by(() => stores.menuBar.activePanel === 'home')
</script>

<ShePanel class="HomePanel" side="left" title="Home" {isOpen}>
	<ShePanelSection label="News">
		<p>howdy</p>
	</ShePanelSection>
</ShePanel>
