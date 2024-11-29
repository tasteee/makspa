<script lang="ts">
	import ShePanel from '~/components/she/ShePanel.svelte'
	import SheButton from '~/components/she/SheButton.svelte'
	import SheIcon from '~/components/she/SheIcon.svelte'
	import SheButtonGroup from '~/components/she/SheButtonGroup.svelte'

	let activeButton = $state('xz')
	let setActiveButton = (value: string) => () => (activeButton = value)
</script>

{#snippet buttonOption(label, icon, key)}
	{@const kind = activeButton === key ? 'light' : 'dark'}
	{@const iconColor = kind === 'light' ? 'black' : 'white'}

	<SheButton {kind} gap="6px" onClick={setActiveButton(key)}>
		{label}
		<SheIcon {icon} size="small" color={iconColor} />
	</SheButton>
{/snippet}

<SheButtonGroup class="MovementControlOptions" style="position: absolute; top: 12px; right: 12px;">
	{@render buttonOption('XZ', 'arrows-horizontal', 'xz')}
	{@render buttonOption('Y', 'arrows-vertical', 'y')}
</SheButtonGroup>
